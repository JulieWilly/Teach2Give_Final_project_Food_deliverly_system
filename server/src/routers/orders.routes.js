import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  getOrder,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orders.controllers.js";
const router = Router();

router.get("/all",verifyToken, getOrders);

router.get("/:order_id",verifyToken, getOrder);

router.post("/create", verifyToken, createOrder);

router.patch("/:order_id", verifyToken, updateOrder);

router.delete("/:order_id", verifyToken, deleteOrder);

export default router;
