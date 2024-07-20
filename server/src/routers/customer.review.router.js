import { Prisma } from "@prisma/client";
import { Router } from "express";
import { getAllReviews, getSingleReview, createReview, deleteReview } from "../controllers/reviews.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router()


router.get('/all',verifyToken, getAllReviews )
router.get('/:review_id', verifyToken, getSingleReview)
router.post('/create',verifyToken,  createReview)
router.delete('/:review_id',verifyToken, deleteReview)





export default router;