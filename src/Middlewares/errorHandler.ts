import { Request, Response, NextFunction } from "express";
import { AppError } from "../Utils";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);

  if (err.name === "ValidationError") {
    return res.status(400).send({
      "type": "ValidationError",
      "details": err.details,
    });
  }

  if (err instanceof AppError.customError) {
    return res.status(err.statusCode).send({ error: err.description });
  }

  return res.status(500).send({ error: err.message });
};
