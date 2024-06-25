import { ObjectId } from "mongodb"; // Assuming you're using MongoDB
import { z } from "zod";

const OrderValidationSchema = z.object({
  item: z.string().trim().min(1, "Item name is required"),
  itemId: z
    .string()
    .transform((value) => new ObjectId(value))
    .refine((value) => ObjectId.isValid(value), {
      message: "Invalid item ID format",
    }),
  quantity: z
    .number()
    .positive({ message: "Quantity must be a positive number" }),
  total: z
    .number()
    .positive({ message: "Total amount must be a positive number" }),
  email: z.string().email({ message: "Invalid email format" }),
  status: z.enum(["pending", "confirmed", "cancelled"]).optional(),
});

export default OrderValidationSchema;
