import { Router } from "express";
import {getAllOrderItems, getsingleOrderItem, createorderItem, deleteOrderItem} from '../controllers/order_items.controllers.js'
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.get("/all",verifyToken, getAllOrderItems )
.get("/:order_items_id", verifyToken, getsingleOrderItem )
.post("/create", verifyToken,  createorderItem)
.patch("/:order_items_id", verifyToken,  async (req, res) => {
  res.json("update items");
})
.delete("/:order_items_id", verifyToken, deleteOrderItem);

export default router;
