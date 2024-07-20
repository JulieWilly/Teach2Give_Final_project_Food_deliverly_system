import { Router } from "express";
const router = Router();

router.get("/all", (req, res) => {
  res.json("get all  items");
});

router.get("/:order_items_id", (req, res) => {
  res.json("Get singlle items");
});

router.post("/create", (req, res) => {});

router.patch("/:order_items_id", (req, res) => {
  res.json("update items");
});

router.delete("/:order_items_id", (req, res) => {
  res.json("delete order item");
});

export default router;
