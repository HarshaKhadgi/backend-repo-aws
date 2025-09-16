import OrderModel from "../models/order.js";
import RegisterUserModel from "../models/resgisterUser.js";
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
import {
  validatePaymentVerification,
  validateWebhookSignature,
} from "razorpay/dist/utils/razorpay-utils.js";
export const placeOrder = async (req, res) => {
  const { userId } = req.decodedData;
  req.body.uid = userId;
  try {
    const addOrder = await OrderModel.create(req.body);
    const userCart = await RegisterUserModel.updateOne(
      { _id: userId },
      { $set: { cart: [] } }
    );
    res.status(200).send(addOrder);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const getplacedOrders = async (req, res) => {
  const { userId } = req.decodedData;
  try {
    const findingPlaceorder = await OrderModel.find({ uid: userId }).sort({
      _id: -1,
    });
    if (findingPlaceorder) {
      res.status(200).send(findingPlaceorder);
    } else {
      res.status(409).send("Order does not exist");
    }
  } catch (e) {
    res.status(400).send(e);
  }
};


var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAYKEY_SECRET,
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await instance.orders.create({
      amount,
      currency: "INR",
      // receipt: "receipt#1",
    });

    res.status(200).send(order);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const verifyOrder = async (req, res) => {
  // console.log(req.body);

  const { userId } = req.decodedData;
  req.body.uid = userId;
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    order_id,
  } = req.body;
  try {
    const result = validatePaymentVerification(
      { order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      process.env.RAZORPAYKEY_SECRET
    );

    if (result) {
      const addOrder = await OrderModel.create(req.body);
      const userCart = await RegisterUserModel.updateOne(
        { _id: userId },
        { $set: { cart: [] } }
      );
      res.status(200).send(addOrder);
      // res.status(200).send({ msg: "Payment Successful" });
    } else {
      res.status(400).send({ msg: "Payment Failed" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
