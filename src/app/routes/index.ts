import { Router } from "express";
import { OrderRoutes } from "../modules/Order/order.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { ReviewRoutes } from "../modules/Review/review.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
