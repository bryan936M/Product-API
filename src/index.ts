import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { verifyJWT, errorHandler } from "./Middlewares";
import { productRouter, userRouter} from "./Routers";


const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("E-commerce Product RESTful API!");
});

app.use("/auth", userRouter(prisma));
app.use("/products", verifyJWT, productRouter(prisma));

app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
