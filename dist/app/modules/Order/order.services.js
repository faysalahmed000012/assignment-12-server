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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const order_model_1 = require("./order.model");
// post order
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(payload);
    return result;
});
// get all orders
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find().lean();
    return orders;
});
// get orders by user
const getOrdersByUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.find({ email: email });
    return result;
});
// get order by id
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findOne({ _id: id });
    return result;
});
// cancel order
const cancelOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.findOneAndUpdate({ _id: id }, { status: "cancelled" }, { new: true });
    return result;
});
const paidOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const updateDoc = {
        $set: {
            status: "confirmed",
        },
    };
    const result = yield order_model_1.Order.findOneAndUpdate({ _id: id }, updateDoc, {
        new: true,
    });
    return result;
});
// const paymentInterest = async (payload: any) => {
//   const amount = Number(payload.price * 100); // calculating in cents
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount,
//     currency: "usd",
//     payment_method_types: ["card"],
//   });
//   return paymentIntent;
// };
exports.OrderServices = {
    createOrder,
    getAllOrders,
    getOrdersByUser,
    getOrderById,
    cancelOrder,
    paidOrder,
};
