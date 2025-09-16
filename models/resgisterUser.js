import mongoose from "mongoose";

const registerUserSchema = {
  name: String,
  email: String,
  password: String,
  cart: Array,
  wishlist: Array,
  address: Array,
  orderHistory: Array,
};

const RegisterUserModel = mongoose.model("registerUser", registerUserSchema);

export default RegisterUserModel;
