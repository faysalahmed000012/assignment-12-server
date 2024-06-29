"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    item: {
        type: String,
        required: true,
    },
    itemId: {
        type: mongoose_1.Schema.ObjectId,
        required: true,
        ref: "products",
    },
    quantity: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
        enum: ["pending", "confirmed", "cancelled"],
        default: "pending",
    },
});
exports.Order = (0, mongoose_1.model)("orders", OrderSchema);
