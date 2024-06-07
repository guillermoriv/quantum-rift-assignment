import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const formSchema = z.object({
  name: z.string().min(2),
  price: z.preprocess(Number, z.number().positive()),
});

export interface Item {
  name: string;
  price: number;
}

export const Route = createLazyFileRoute("/")({
  component: Index,
});

const dollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Index() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  const { data, isLoading } = useQuery<{ data: Item[] }>({
    queryKey: ["items"],
    queryFn: () => fetch(`${BASE_URL}/items`).then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: (item: Item) =>
      fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["items"] }),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate({ name: values.name, price: values.price });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col flex-grow justify-between">
      <div className="mb-4 border p-2 rounded-md max-h-96 overflow-y-auto">
        <h2 className="text-xl text-center">Marketplace Items</h2>
        <Table>
          <TableCaption>A list of items.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">
                  {dollar.format(item.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border p-4 rounded-md"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormDescription>Name of the item.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} />
                </FormControl>
                <FormDescription>Price of the item in USD.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
