import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAccount, useConnect, useDisconnect, useBlockNumber } from "wagmi";

function clampAddress(address: string, startLength = 10, endLength = 10) {
  const start = address.slice(0, startLength + 2); // +2 to include '0x'
  const end = address.slice(-endLength);
  return `${start}...${end}`;
}

const Wallet = () => {
  const account = useAccount();
  const { connectors, connect, error } = useConnect();
  const { data } = useBlockNumber({ watch: true });
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (account.status === "connected") {
      setOpen(false);
    }
  }, [account.status]);

  return (
    <div className="flex flex-col p-2 space-y-2">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <span
          className={cn(
            "border overflow-hidden whitespace-nowrap text-sm p-2 rounded-sm text-center flex-grow",
            account.status === "connected" ? "text-green-400" : "text-red-600",
          )}
        >
          {account.status === "connected" ? "Connected" : "Disconnected"}
        </span>
        <span className="text-sm overflow-hidden whitespace-nowrap border p-2 rounded-sm text-center flex-grow">
          Block Number: {data ? Number(data) : "N\\A"}
        </span>
      </div>
      {account.status === "connected" && (
        <div className="text-center border overflow-hidden whitespace-nowrap text-sm p-2 rounded-md">
          {clampAddress(account.address)}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={account.status === "connected"}>
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Here you can choose from multiple providers, where you want to
              connect.
            </DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {connectors.map((connector) => (
                  <Button
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                    type="button"
                  >
                    {connector.name}
                  </Button>
                ))}
              </div>
              {error && <span className="text-red-600">{error.message}</span>}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      {account.status === "connected" && (
        <Button onClick={() => disconnect()}>Disconnect</Button>
      )}
    </div>
  );
};

export { Wallet };
