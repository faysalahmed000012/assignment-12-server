"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb"); // Assuming you're using MongoDB
const zod_1 = require("zod");
const OrderValidationSchema = zod_1.z.object({
    item: zod_1.z.string().trim().min(1, "Item name is required"),
    itemId: zod_1.z
        .string()
        .transform((value) => new mongodb_1.ObjectId(value))
        .refine((value) => mongodb_1.ObjectId.isValid(value), {
        message: "Invalid item ID format",
    }),
    quantity: zod_1.z
        .number()
        .positive({ message: "Quantity must be a positive number" }),
    total: zod_1.z
        .number()
        .positive({ message: "Total amount must be a positive number" }),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    status: zod_1.z.enum(["pending", "confirmed", "cancelled"]).optional(),
});
exports.default = OrderValidationSchema;
