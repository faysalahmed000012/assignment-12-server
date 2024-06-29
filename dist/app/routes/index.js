"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_route_1 = require("../modules/Order/order.route");
const product_route_1 = require("../modules/Product/product.route");
const review_route_1 = require("../modules/Review/review.route");
const user_route_1 = require("../modules/User/user.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/products",
        route: product_route_1.ProductRoutes,
    },
    {
        path: "/reviews",
        route: review_route_1.ReviewRoutes,
    },
    {
        path: "/orders",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/user",
        route: user_route_1.UserRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
