import Joi from "joi";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { tryCatcher as tryAndCatch, authUtils, AppError } from "../Utils";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const registrationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[ -~]{3,30}$")).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
  .required(),
  password: Joi.string().pattern(new RegExp("^[ -~]{3,30}$")).required(),
});

export default (prisma: PrismaClient) => {
  const findUser = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return user;
  };

  const updateRefreshToken = async (email: string, refreshToken: string) => {
    const user = await prisma.user.update({
      where: { email },
      data: { refreshToken },
    });

    return user;
  };

  const register = tryAndCatch(async (req: Request, res: Response) => {
    const { error, value } = registrationSchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    const userExists = await findUser(value.email);

    if (userExists) {
      throw new AppError.BadRequestError("User already exists");
    }

    const hashedPassword = await authUtils.encryptPW(value.password);

    const user = await prisma.user.create({
      data: { ...value, password: hashedPassword },
    });

    return res.status(200).json({ "User Created": user });
  });

  const login = tryAndCatch(async (req: Request, res: Response) => {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      throw new Error(error.message);
    }

    // Check if user exists
    const user = await findUser(value.email);

    if (!user) {
      throw new AppError.BadRequestError("User not found");
    }

    const isPasswordCorrect = await authUtils.comparePW(
      value.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new AppError.BadRequestError("Invalid password");
    }

    // Generate tokens
    const accessToken = await authUtils.generateToken(
      user.email,
      ACCESS_TOKEN_SECRET,
      "15m"
    );
    
    const refreshToken = await authUtils.generateToken(
      user.email,
      REFRESH_TOKEN_SECRET,
      "7d"
    );

    // Save refresh token in database
    await updateRefreshToken(user.email, refreshToken);

    // Send tokens to client
    res.cookie("JWT", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({ accessToken });
  });

  return {
    register,
    login,
  };
};
