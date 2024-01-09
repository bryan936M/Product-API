import express from "express";
import {productController} from "../Controllers";
import { PrismaClient } from "@prisma/client";

export default (prisma: PrismaClient) => {
  const router = express.Router();
  const controller = productController(prisma);

  router
    .route("/")
    .get(controller.getAllProducts)
    .post(controller.createProduct)
    .put(controller.updateProduct)
    .delete(controller.deleteAllProducts);

  router
    .route("/:id")
    .get(controller.getProductById)
    .delete(controller.deleteProductById);

  return router;
};
