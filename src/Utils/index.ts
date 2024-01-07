import exp from "constants";
import { Request, Response, NextFunction } from "express";

const tryCatcher =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res).catch(next);
  };

export default tryCatcher;
