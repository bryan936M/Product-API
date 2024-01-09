import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {SALT_ROUNDS} from '../Config'

dotenv.config();

const saltRounds = parseInt(SALT_ROUNDS as string);
// const saltRounds = parseInt(process.env.SALT_ROUNDS as string);

export const encryptPW = async (
  myPlaintextPassword: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(myPlaintextPassword, salt);

  return hash;
};

export const comparePW = async (
  password: string,
  password1: string
): Promise<boolean> => {
  return bcrypt.compare(password, password1);
};

export const generateToken = async (
  email: string,
  secret: string,
  period: string | number,
) => {
  return jwt.sign({email}, secret, { expiresIn: period });
};
