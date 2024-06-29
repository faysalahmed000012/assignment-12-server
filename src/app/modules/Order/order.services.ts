import IOrder from "./order.interface";
import { Order } from "./order.model";

// post order
const createOrder = async (payload: IOrder) => {
  const result = await Order.create(payload);
  return result;
};

// get all orders
const getAllOrders = async () => {
  const orders = await Order.find().lean();
  return orders;
};

// get orders by user

const getOrdersByUser = async (email: string) => {
  const result = await Order.find({ email: email });
  return result;
};

// get order by id

const getOrderById = async (id: string) => {
  const result = await Order.findOne({ _id: id });
  return result;
};

// cancel order
const cancelOrder = async (id: string) => {
  const result = await Order.findOneAndUpdate(
    { _id: id },
    { status: "cancelled" },
    { new: true }
  );
  return result;
};

const paidOrder = async (id: string) => {
  const updateDoc = {
    $set: {
      status: "confirmed",
    },
  };
  const result = await Order.findOneAndUpdate({ _id: id }, updateDoc, {
    new: true,
  });
  return result;
};

// const paymentInterest = async (payload: any) => {
//   const amount = Number(payload.price * 100); // calculating in cents
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount,
//     currency: "usd",
//     payment_method_types: ["card"],
//   });

//   return paymentIntent;
// };

export const OrderServices = {
  createOrder,
  getAllOrders,
  getOrdersByUser,
  getOrderById,
  cancelOrder,
  paidOrder,
};
