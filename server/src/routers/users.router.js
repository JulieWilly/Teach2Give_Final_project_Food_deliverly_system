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
  .get("/customers", getAllCustomers)
  .get("/:cust_id", getOneCustomer)
  .post("/create", createCustomer)
  .post("/login", verifyToken, loginCustomer)
  .patch("/:cust_id", updateCustomer)
  .delete("/:cust_id", deleteCustomer);

export default router;
