import catchAsync from "../../utils/catchAsync";
import { OrderServices } from "./order.services";

const createOrder = catchAsync(async (req, res) => {
  const order = req.body;
  const result = await OrderServices.createOrder(order);
  res.status(201).json({
    success: true,
    message: "Order Created Successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const orders = await OrderServices.getAllOrders();
  res.status(200).json({
    success: true,
    message: "All Orders Retrieved Successfully",
    data: orders,
  });
});

const getOrderByUser = catchAsync(async (req, res) => {
  const email = req.params.email;
  const orders = await OrderServices.getOrdersByUser(email);
  res.status(200).json({
    success: true,
    message: "Orders Retrieved Successfully",
    data: orders,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OrderServices.getOrderById(id);
  res.status(200).json({
    success: true,
    message: "Order Retrieved Successfully",
    data: result,
  });
});

const cancelOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OrderServices.cancelOrder(id);
  res.status(200).json({
    success: true,
    message: "Order Cancelled Successfully",
    data: result,
  });
});

const paidOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await OrderServices.paidOrder(id);

  res.status(200).json({
    success: true,
    message: "Successfully added paid order",
    data: result,
  });
});

export const OrderControllers = {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  createOrder,
  cancelOrder,
  paidOrder,
};
