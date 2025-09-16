import mongoose from "mongoose";
import dotenv from "dotenv";

const orderSchema = mongoose.Schema({
  address: Array,
  cart: Array,
  price: Number,
  totalPrice: Number,
  orderDate: String,
  shippedDate: String,
  outforDelivery: String,
  deliveredDate: String,
  orderStatus: String,
  paymentMode: String,
  uid: String,
  sortingDate: {
    type: Date,
    default: Date.now(),
  },
  razorpay_payment_id: String,
  razorpay_order_id: String,
  razorpay_signature: String,
  order_id: String,
});

const OrderModel = mongoose.model("order", orderSchema);

export default OrderModel;
