import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constants";
import { PaymentControllers } from "./payment.controllers";

const router = Router();

router.post(
  "/create-payment-intent",
  auth(USER_ROLE.user, USER_ROLE.admin),
  PaymentControllers.paymentIntent
);

router.put("/order/:id", auth(USER_ROLE.user), PaymentControllers.saveOrder);

export const PaymentRoutes = router;
