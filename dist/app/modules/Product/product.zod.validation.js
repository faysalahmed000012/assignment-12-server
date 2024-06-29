"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    item: zod_1.z
        .string()
        .trim()
        .min(1, "Item name is required")
        .max(30, "Item name cannot exceed 30 characters"),
    about: zod_1.z.string().min(1, "Description is required"),
    maxQuantity: zod_1.z
        .number()
        .optional()
        .transform((value) => (value === undefined ? undefined : Number(value))), // Handle optional number (convert to number if provided)
    minQuantity: zod_1.z
        .number()
        .optional()
        .transform((value) => (value === undefined ? undefined : Number(value))), // Handle optional number (convert to number if provided)
    availableQuantity: zod_1.z
        .number()
        .positive({ message: "Available quantity must be a positive number" }),
    picture: zod_1.z.string().min(1, "Product picture URL is required"),
    price: zod_1.z
        .number()
        .positive({ message: "Product price must be a positive number" })
        .transform((value) => parseFloat(value.toFixed(2))), // Ensure two decimal places
});
exports.default = productValidationSchema;
