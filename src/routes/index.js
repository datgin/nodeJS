
import { Router } from "express";
import productRouter from "./product.js";
import authRouter from "./auth.js";

const routes = Router();

routes.use("/product", productRouter);
routes.use("/auth", authRouter);

export default routes;