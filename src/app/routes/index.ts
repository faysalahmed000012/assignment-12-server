import { Router } from "express";
import { OrderRoutes } from "../modules/Order/order.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { ReviewRoutes } from "../modules/Review/review.route";
import { UserRoutes } from "../modules/User/user.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
