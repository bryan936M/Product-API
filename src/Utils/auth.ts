import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = parseInt(process.env.SALT_ROUNDS as string);

export const encryptPW = async (
  myPlaintextPassword: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(myPlaintextPassword, salt);

  return hash;
};
