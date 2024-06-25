import { Router } from "express";
import { ProductControllers } from "./product.controllers";

const router = Router();

router.get("/", ProductControllers.getProducts);
router.get("/:id", ProductControllers.getProductById);
router.delete("/:id", ProductControllers.deleteProduct);
router.patch("/:id", ProductControllers.updateProduct);
router.post("/", ProductControllers.addProduct);

export const ProductRoutes = router;
