import express from "express";
import { PrismaClient } from "@prisma/client";
import productRouter from "./Routers/productRouter";
import { errorHandler } from "./Middlewares/errorHandler";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("E-commerce Product RESTful API!");
});

app.use("/products", productRouter(prisma));

app.use(errorHandler);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
