import { Types } from "mongoose";

export default interface IOrder {
  item: string;
  itemId: Types.ObjectId;
  quantity: number;
  total: number;
  email: string;
  status: "pending" | "confirmed" | "cancelled";
}
