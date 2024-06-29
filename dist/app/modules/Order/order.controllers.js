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
exports.OrderControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const order_services_1 = require("./order.services");
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    const result = yield order_services_1.OrderServices.createOrder(order);
    res.status(201).json({
        success: true,
        message: "Order Created Successfully",
        data: result,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_services_1.OrderServices.getAllOrders();
    res.status(200).json({
        success: true,
        message: "All Orders Retrieved Successfully",
        data: orders,
    });
}));
const getOrderByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const orders = yield order_services_1.OrderServices.getOrdersByUser(email);
    res.status(200).json({
        success: true,
        message: "Orders Retrieved Successfully",
        data: orders,
    });
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield order_services_1.OrderServices.getOrderById(id);
    res.status(200).json({
        success: true,
        message: "Order Retrieved Successfully",
        data: result,
    });
}));
const cancelOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield order_services_1.OrderServices.cancelOrder(id);
    res.status(200).json({
        success: true,
        message: "Order Cancelled Successfully",
        data: result,
    });
}));
const paidOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield order_services_1.OrderServices.paidOrder(id);
    res.status(200).json({
        success: true,
        message: "Successfully added paid order",
        data: result,
    });
}));
exports.OrderControllers = {
    getAllOrders,
    getOrderById,
    getOrderByUser,
    createOrder,
    cancelOrder,
    paidOrder,
};
