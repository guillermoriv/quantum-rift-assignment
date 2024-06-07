import {
  ErrorRequestHandler,
  Request,
  RequestHandler,
  Response,
} from "express";
import { StatusCodes } from "http-status-codes";

const unexpectedRequest: RequestHandler = (_req, res: Response) => {
  return res.status(404).json({ error: null, message: "Page not found." });
};

const errorHandler: ErrorRequestHandler = (
  error,
  _req: Request,
  res: Response,
  next,
) => {
  if (res.headersSent) {
    return next(error);
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "Internal Server Error", message: null });
};

export default () => [unexpectedRequest, errorHandler];
