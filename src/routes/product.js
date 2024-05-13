import { Router } from "express";
import { ProductController } from "../controllers/product.js";

const productRouter = Router();

productRouter.get("/", ProductController.getProducts);

productRouter.get("/:id", ProductController.getProductByID);

productRouter.post("/", ProductController.create);

productRouter.put("/:id", ProductController.update);

productRouter.delete("/:id", ProductController.remove);

export default productRouter;
