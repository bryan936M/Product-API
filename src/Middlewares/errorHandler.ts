import { Request, Response, NextFunction } from "express";
import { AppError } from "../Utils";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.message);

  if (err.name == "ValidationError") {
    return res.status(400).send({
      "type": "ValidationError",
      "details": err.details,
    });
  }

  if (err instanceof AppError.customError) {
    const { statusCode, description, name } = err;
    
    return res.status(statusCode).send({ [name]: description });
  }

  return res.status(500).send({ error: err.message });
};
