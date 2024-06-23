import { model, Schema } from "mongoose";
import IProduct from "./product.interface";

const ProductSchema = new Schema<IProduct>({
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

export const Product = model<IProduct>("products", ProductSchema);
