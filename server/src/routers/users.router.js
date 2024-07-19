import { Router } from "express";

import {
  getAllCustomers,
  getOneCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  loginCustomer,
} from "../controllers/users.controllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router
  .get("/customers",verifyToken,  getAllCustomers)
  .get("/:cust_id",verifyToken,  getOneCustomer)
  .post("/create", createCustomer)
  .post("/login",verifyToken, loginCustomer)
  .patch("/:cust_id",verifyToken,  updateCustomer)
  .delete("/:cust_id",verifyToken,  deleteCustomer);

export default router;
