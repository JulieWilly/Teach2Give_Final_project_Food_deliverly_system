import { Router } from "express";
import {getAllOrderItems, getsingleOrderItem, createorderItem, deleteOrderItem} from '../controllers/order_items.controllers.js'
const router = Router();

router.get("/all", getAllOrderItems );

router.get("/:order_items_id", getsingleOrderItem );

router.post("/create", createorderItem);

router.patch("/:order_items_id", async (req, res) => {
  res.json("update items");
});

router.delete("/:order_items_id",deleteOrderItem);

export default router;
