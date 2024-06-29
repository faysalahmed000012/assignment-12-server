"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    item: {
        type: String,
        required: [true, "Item name is required"],
        trim: true,
        maxlength: [30, "Item name can not be more than 30 characters"],
    },
    about: {
        type: String,
        required: true,
    },
    maxQuantity: {
        type: Number,
        required: false,
    },
    minQuantity: {
        type: Number,
        required: false,
    },
    availableQuantity: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});
exports.Product = (0, mongoose_1.model)("products", ProductSchema);
