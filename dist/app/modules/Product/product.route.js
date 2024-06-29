"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../User/user.constants");
const product_controllers_1 = require("./product.controllers");
const router = (0, express_1.Router)();
router.get("/", product_controllers_1.ProductControllers.getProducts);
router.get("/:id", product_controllers_1.ProductControllers.getProductById);
router.delete("/:id", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), product_controllers_1.ProductControllers.deleteProduct);
router.patch("/:id", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), product_controllers_1.ProductControllers.updateProduct);
router.post("/", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), product_controllers_1.ProductControllers.addProduct);
exports.ProductRoutes = router;
