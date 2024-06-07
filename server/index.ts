import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { itemsRouter, route as itemsRoute } from "./routers/items";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./errorHandler";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

// #Middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.status(StatusCodes.OK).json({
    error: null,
    message: "Quantum REST API, if you want to test the API, go to /items.",
  });
});

// #Routes
app.use(itemsRoute, itemsRouter);

// #Error handling
app.use(errorHandler());

app.listen(port, () => {
  console.info(`[server] Running at http://localhost:${port}`);
});
