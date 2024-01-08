import { Request, Response, NextFunction } from 'express';

export default
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res).catch(next);
  };