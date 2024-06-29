"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("./user.constants");
const user_controllers_1 = require("./user.controllers");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), user_controllers_1.UserControllers.getAllUsers);
router.get("/login", user_controllers_1.UserControllers.login);
router.get("/access-token", user_controllers_1.UserControllers.generateAccessToken);
router.get("/:email", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), user_controllers_1.UserControllers.getUserByEmail);
router.post("/signup", user_controllers_1.UserControllers.createUser);
router.put("/admin/:email", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), user_controllers_1.UserControllers.makeAdmin);
exports.UserRoutes = router;
