import { Router } from "express";
import {
  getAllCategories,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.controllers.js";
import verifyToken from "../middleware/verifyToken.js";
const router = Router();

router.get("/all", verifyToken, getAllCategories).get("/:category_id", verifyToken, getSingleCategory).post("/create", verifyToken, createCategory).patch("/:category_id", verifyToken, updateCategory).delete("/:category_id", verifyToken, deleteCategory);

export default router;
