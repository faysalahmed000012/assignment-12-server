import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constants";
import { OrderControllers } from "./order.controllers";

const router = Router();

router.get("/", auth(USER_ROLE.admin), OrderControllers.getAllOrders);
router.get(
  "/:email",
  auth(USER_ROLE.admin, USER_ROLE.user),
  OrderControllers.getOrderByUser
);
router.get("/order/:id", auth(USER_ROLE.admin), OrderControllers.getOrderById);
router.post("/", auth(USER_ROLE.user), OrderControllers.createOrder);
router.delete("/:id", auth(USER_ROLE.user), OrderControllers.cancelOrder);

export const OrderRoutes = router;
