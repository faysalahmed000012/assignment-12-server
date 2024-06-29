"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../User/user.constants");
const order_controllers_1 = require("./order.controllers");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), order_controllers_1.OrderControllers.getAllOrders);
router.put("/paid/:id", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), order_controllers_1.OrderControllers.paidOrder);
router.get("/:email", (0, auth_1.default)(user_constants_1.USER_ROLE.admin, user_constants_1.USER_ROLE.user), order_controllers_1.OrderControllers.getOrderByUser);
router.get("/order/:id", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), order_controllers_1.OrderControllers.getOrderById);
router.post("/", (0, auth_1.default)(user_constants_1.USER_ROLE.user), order_controllers_1.OrderControllers.createOrder);
router.delete("/:id", (0, auth_1.default)(user_constants_1.USER_ROLE.user), order_controllers_1.OrderControllers.cancelOrder);
exports.OrderRoutes = router;
