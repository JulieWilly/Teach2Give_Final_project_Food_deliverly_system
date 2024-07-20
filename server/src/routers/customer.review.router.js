import { Prisma } from "@prisma/client";
import { Router } from "express";
import {
  getAllReviews,
  getSingleReview,
  createReview,
  deleteReview,
} from "../controllers/reviews.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router
  .get("/all", verifyToken, getAllReviews)
  .get("/:review_id", verifyToken, getSingleReview)
  .post("/create", verifyToken, createReview)
  .delete("/:review_id", verifyToken, deleteReview);

export default router;
