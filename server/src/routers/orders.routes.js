import {Router } from 'express'
import verifyToken from '../middleware/verifyToken.js'
import { getOrder, getOrders, createOrder, updateOrder, deleteOrder } from '../controllers/orders.controllers.js'
const router  = Router()

router.get('/all',getOrders)

router.get('/:order_id',getOrder)

router.post('/create',verifyToken, createOrder)

router.patch('/:order_id', updateOrder)

router.delete('/:order_id',verifyToken, deleteOrder)

export default router;



