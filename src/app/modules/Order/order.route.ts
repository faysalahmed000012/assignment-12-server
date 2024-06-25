import { Router } from "express";
import { OrderControllers } from "./order.controllers";

const router = Router();

router.get("/", OrderControllers.getAllOrders);
router.get("/:email", OrderControllers.getOrderByUser);
router.get("/order/:id", OrderControllers.getOrderById);
router.post("/", OrderControllers.createOrder);
router.delete("/:id", OrderControllers.cancelOrder);

export const OrderRoutes = router;
