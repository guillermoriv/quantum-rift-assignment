import express, { Request, Response, Router } from "express";
import { z } from "zod";
import { validateData } from "../validationHandler";
import { StatusCodes } from "http-status-codes";

export const schema = z.object({
  name: z.string(),
  price: z.number().positive(),
});

export const route = "/items";

interface Item {
  name: string;
  price: number;
}

const items: Item[] = [
  { name: "Banana", price: 100 },
  { name: "Apple", price: 150 },
];

export const itemsRouter: Router = (() => {
  const router = express.Router();

  router.get("/", (_req: Request, res: Response) => {
    return res
      .status(StatusCodes.OK)
      .json({ error: null, message: null, data: items });
  });

  router.post("/", validateData(schema), (req: Request, res: Response) => {
    const { name, price } = req.body;
    items.push({ name, price });
    return res
      .status(StatusCodes.OK)
      .json({
        error: null,
        message: "Item added successfully",
        data: { name, price },
      });
  });

  return router;
})();
