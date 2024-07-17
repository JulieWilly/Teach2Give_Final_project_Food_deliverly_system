import { Router  } from "express";
import { getAllProducts, getOneProduct, createProduct, updateProduct, deleteProduct } from "../controllers/products.contollers.js";
import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

const router = Router()

router.get('/products',getAllProducts).get('/:product_id',getOneProduct ).post('/create', createProduct).patch('/:product_id',updateProduct).delete('/:product_id',deleteProduct)


export default router;