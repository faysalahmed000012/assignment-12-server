import { model, Schema } from "mongoose";
import IOrder from "./order.interface";

const OrderSchema = new Schema<IOrder>({
  item: {
    type: String,
    required: true,
  },
  itemId: {
    type: Schema.ObjectId,
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

export const Order = model<IOrder>("orders", OrderSchema);
