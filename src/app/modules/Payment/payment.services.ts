import Stripe from "stripe";
import config from "../../config";
import { Order } from "../Order/order.model";

const stripe = new Stripe(config.stripe_secret_key as string);

const paymentIntent = async (amount: number) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
  });
  return paymentIntent.client_secret;
};

const saveOrder = async (id: string, payment: any) => {
  // const result = await PaymentCollection.insertOne(payment)
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { $set: { status: "paid", transactionId: payment.transactionId } },
    { new: true }
  );

  return updatedOrder;
};

export const PaymentServices = {
  paymentIntent,
  saveOrder,
};
