import express from "express";
import {
  addProduct,
  getProduct,
  getProductbyId,
} from "../controllers/ecommerceProductController.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/get", getProduct);
router.post("/getbyid", getProductbyId);

export default router;
