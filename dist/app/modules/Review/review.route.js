"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../User/user.constants");
const review_controllers_1 = require("./review.controllers");
const router = (0, express_1.Router)();
router.get("/", (0, auth_1.default)(user_constants_1.USER_ROLE.admin), review_controllers_1.ReviewControllers.getAllReviews);
router.post("/", (0, auth_1.default)(user_constants_1.USER_ROLE.user), review_controllers_1.ReviewControllers.addReview);
exports.ReviewRoutes = router;
