"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
        required: true,
    },
});
exports.Review = (0, mongoose_1.model)("reviews", ReviewSchema);
