import Joi from "joi";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { tryCatcher as tryAndCatch, authUtils, AppError } from "../Utils";

const registrationSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

const loginSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export default (prisma: PrismaClient) => {
  const findUser = async (email: string) => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (user) {
      return true
    }

    return null;
  };

  const register = tryAndCatch(
    async (req: Request, res: Response) => {
      const { error, value } = registrationSchema.validate(req.body);

      if (error) {
        throw new Error(error.message);
      }

     const userExists = await findUser(value.email);

     if (userExists) {
       throw new AppError.BadRequestError("User already exists");
     }

      const hashedPassword = await authUtils.encryptPW(value.password);

      const user = prisma.user.create({
        data: { password: hashedPassword, ...value },
      });

      return res.status(200).json({ "User Created": user });
    }
  );

  const login = tryAndCatch(async (req: Request, res: Response) => {
    throw new AppError.APIError("Not implemented");
  });

  return {
    register,
    login,
  };
};
