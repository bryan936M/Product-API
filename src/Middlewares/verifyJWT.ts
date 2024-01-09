import JWT from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import {ACCESS_TOKEN_SECRET} from "../Config"

const TOKEN_SECRET = ACCESS_TOKEN_SECRET as string;
// const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

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

    const decoded = JWT.verify(token, TOKEN_SECRET);

    req.token = decoded;

    next();
}
