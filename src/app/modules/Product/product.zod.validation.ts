import { z } from "zod";

const productValidationSchema = z.object({
  item: z
    .string()
    .trim()
    .min(1, "Item name is required")
    .max(30, "Item name cannot exceed 30 characters"),
  about: z.string().min(1, "Description is required"),
  maxQuantity: z
    .number()
    .optional()
    .transform((value) => (value === undefined ? undefined : Number(value))), // Handle optional number (convert to number if provided)
  minQuantity: z
    .number()
    .optional()
    .transform((value) => (value === undefined ? undefined : Number(value))), // Handle optional number (convert to number if provided)
  availableQuantity: z
    .number()
    .positive({ message: "Available quantity must be a positive number" }),
  picture: z.string().min(1, "Product picture URL is required"),
  price: z
    .number()
    .positive({ message: "Product price must be a positive number" })
    .transform((value) => parseFloat(value.toFixed(2))), // Ensure two decimal places
});

export default productValidationSchema;
