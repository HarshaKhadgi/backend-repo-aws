import mongoose from "mongoose";

const ecommerceProductSchema = {
  name: String,
  description: String,
  price: Number,
  reviews: Array,
  rating: Number,
  imgURL: String,
};

const EcommerceProductModel = mongoose.model(
  "ecommerceProduct",
  ecommerceProductSchema
);

export default EcommerceProductModel;
