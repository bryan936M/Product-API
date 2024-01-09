import { PrismaClient } from "@prisma/client";
import express from "express";
import {userController} from "../Controllers/";

export default (prisma: PrismaClient) => {
  const router = express.Router();
  const controller = userController(prisma);

  router.route("/register").post(controller.register);

  router.route("/login").post(controller.login);

  return router;
};
