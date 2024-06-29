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
exports.UserServices = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if user already exists
    const user = yield user_model_1.User.findOne({ email: payload.email });
    if (user) {
        throw new AppError_1.default(501, "User Already Exists");
    }
    const result = yield user_model_1.User.create(payload);
    return result;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    return users;
});
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    return user;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const user = yield user_model_1.User.findOne({ email: email }).select("+password");
    if (!user) {
        throw new AppError_1.default(404, "User Does Not Exists");
    }
    if (!user_model_1.User.isPasswordMatched(password, user.password)) {
        throw new AppError_1.default(401, "Password Does not match");
    }
    else {
        const jwtPayload = {
            email: user === null || user === void 0 ? void 0 : user.email,
            role: user === null || user === void 0 ? void 0 : user.role,
        };
        const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
        const refreshToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
        return {
            accessToken,
            refreshToken,
        };
    }
});
const generateAccessToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email, role } = decoded;
    const jwtPayload = {
        email,
        role,
    };
    const accessToken = (0, user_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const makeAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const updateDoc = {
        $set: { role: "admin" },
    };
    const updated = yield user_model_1.User.findOneAndUpdate({ email }, updateDoc, {
        new: true,
    });
    return updated;
});
exports.UserServices = {
    createUser,
    getAllUser,
    getUserByEmail,
    login,
    generateAccessToken,
    makeAdmin,
};
