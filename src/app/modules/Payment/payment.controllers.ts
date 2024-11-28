import catchAsync from "../../utils/catchAsync";
import { PaymentServices } from "./payment.services";

const paymentIntent = catchAsync(async (req, res) => {
  const price = req.body.total;
  const amount = price * 100;
  const payment = await PaymentServices.paymentIntent(amount);
  res.send({
    clientSecret: payment,
  });
});

const saveOrder = catchAsync(async (req, res) => {
  const id = req.params.id;
  const payment = req.body;

  const updatedOrder = await PaymentServices.saveOrder(id, payment);
  res.status(200).json({
    success: true,
    message: "Order Placed Successfully",
    data: updatedOrder,
  });
});

export const PaymentControllers = {
  paymentIntent,
  saveOrder,
};
