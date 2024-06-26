import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constants";
import { ProductControllers } from "./product.controllers";

const router = Router();

router.get("/", ProductControllers.getProducts);
router.get("/:id", ProductControllers.getProductById);
router.delete("/:id", auth(USER_ROLE.admin), ProductControllers.deleteProduct);
router.patch("/:id", auth(USER_ROLE.admin), ProductControllers.updateProduct);
router.post("/", auth(USER_ROLE.admin), ProductControllers.addProduct);

export const ProductRoutes = router;
