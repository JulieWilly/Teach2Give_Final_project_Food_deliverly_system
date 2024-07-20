import { Router } from "express";
const router = Router();
import {
  getAllPayments,
  getSinglePayment,
  makePayment,
  deletePayment,
} from "../controllers/payment.controller.js";
import verifyToken from "../middleware/verifyToken.js";

router
  .get("/all", verifyToken, getAllPayments)
  .get("/:payment_id", verifyToken, getSinglePayment)
  .post("/pay", verifyToken, makePayment)
  .delete("/:payment_id", verifyToken, deletePayment);

export default router;
