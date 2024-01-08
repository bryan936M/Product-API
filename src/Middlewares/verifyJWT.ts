import JWT from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

interface CustomRequest extends Request {
    token?: any;
}

export default function verifyJWT(
    req: CustomRequest,
    res: Response,
    next: NextFunction
) {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.sendStatus(403);
    }

    const decoded = JWT.verify(token, ACCESS_TOKEN_SECRET);

    req.token = decoded;

    next();
}
