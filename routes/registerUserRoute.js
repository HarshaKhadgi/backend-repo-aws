import express from "express";
import {
  addUser,
  getUser,
  loginUser,
  addProductInCart,
  deleteProductFromCart,
  addUserAddress,
  deleteUserAddress,
  updateUserAddress,
  addProductInWishlist,
} from "../controllers/registerUserController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", addUser);
router.post("/login", loginUser);
router.get("/get", authMiddleware, getUser);
router.post("/cart/add", authMiddleware, addProductInCart);
router.post("/cart/delete", authMiddleware, deleteProductFromCart);
router.post("/wishlist/add", authMiddleware, addProductInWishlist);
router.post("/address/add", authMiddleware, addUserAddress);
router.put("/address/delete", authMiddleware, deleteUserAddress);
router.put("/address/update", authMiddleware, updateUserAddress);

export default router;
