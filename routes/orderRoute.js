import { Router } from "express";
import {
  getplacedOrders,
  placeOrder,
  createOrder,
  verifyOrder,
} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.post("/add", authMiddleware, placeOrder);
router.get("/get", authMiddleware, getplacedOrders);
router.post("/create", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyOrder);

export default router;
