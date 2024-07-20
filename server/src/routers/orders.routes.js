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

router
  .get("/all", verifyToken, getOrders)
  .get("/:order_id", verifyToken, getOrder)
  .post("/create", verifyToken, createOrder)
  .patch("/:order_id", verifyToken, updateOrder)
  .delete("/:order_id", verifyToken, deleteOrder);

export default router;
