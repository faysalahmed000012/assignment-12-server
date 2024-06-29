"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_services_1 = require("./user.services");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_services_1.UserServices.createUser(user);
    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_services_1.UserServices.getAllUser();
    res.status(200).json({
        success: true,
        message: "All Users are Retrieved Successfully",
        data: users,
    });
}));
const getUserByEmail = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const user = yield user_services_1.UserServices.getUserByEmail(email);
    res.status(200).json({
        success: true,
        message: "User data Retrieved Successfully",
        data: user,
    });
}));
const login = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield user_services_1.UserServices.login(payload);
    res.cookie("refreshToken", result.refreshToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    res.status(200).json({
        success: true,
        message: "User Logged In  Successfully",
        data: result,
    });
}));
const generateAccessToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refreshToken;
    const accessToken = yield user_services_1.UserServices.generateAccessToken(token);
    res.status(200).json({
        success: true,
        message: "AccessToken Generated Successfully",
        data: {
            accessToken,
        },
    });
}));
const makeAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const result = yield user_services_1.UserServices.makeAdmin(email);
    res.status(200).json({
        success: true,
        message: "New Admin Created Successfully",
        data: result,
    });
}));
exports.UserControllers = {
    createUser,
    getAllUsers,
    getUserByEmail,
    login,
    generateAccessToken,
    makeAdmin,
};
