import { Router } from "express";
import cloudinary from "../cloudinary/cloudinary.js";
import {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addedToCart,
  getProductByCustomer
} from "../controllers/products.contollers.js";
import { PrismaClient } from "@prisma/client";
import verifyToken from "../middleware/verifyToken.js";
const prisma = new PrismaClient();

const router = Router();

router
  .get("/products", getAllProducts)
  // get('product', getProductByCustomer)
  .get("/:product_id",verifyToken, getOneProduct)
  .post("/create", createProduct)
  .patch("/:product_id",verifyToken, updateProduct)
  .put('/:product_id', verifyToken, addedToCart)
  .delete("/:product_id", verifyToken, deleteProduct);

export default router;
