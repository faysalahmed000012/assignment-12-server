"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validEmail = zod_1.z
    .string({ required_error: "Name is required" })
    .email()
    .refine((value) => emailRegex.test(value), {
    message: "Invalid email format",
});
const ReviewValidationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, "Reviewer name is required"),
    description: zod_1.z.string().min(1, "Review description is required"),
    email: validEmail,
    picture: zod_1.z.string().min(1, "Review picture URL is required"),
    ratings: zod_1.z.number({ required_error: "Review ratings are required" }),
});
exports.default = ReviewValidationSchema;
