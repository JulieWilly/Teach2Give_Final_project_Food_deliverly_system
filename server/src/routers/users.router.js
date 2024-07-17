import { Router  } from "express";

import { getAllCustomers, getOneCustomer, createCustomer, updateCustomer, deleteCustomer } from "../controllers/users.controllers.js";


const router = Router()

router.get('/customers',getAllCustomers ).get('/:cust_id',getOneCustomer).post('/create',createCustomer ).patch('/:cust_id',updateCustomer ).delete('/:cust_id',deleteCustomer)

export default router