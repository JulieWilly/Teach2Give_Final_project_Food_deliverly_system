import { Router } from "express";
import {
  getAllCustomers,
  getOneCustomer,
  createCustomer,
  approveCustomer,
  deleteCustomer,
  loginCustomer,
} from "../controllers/users.controllers.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router
  .post("/login", loginCustomer)

  .get("/customers", verifyToken, getAllCustomers)
  .get("/:cust_id", verifyToken, getOneCustomer)
  .post("/create", createCustomer)
  .patch("/:cust_id", verifyToken, approveCustomer)
  .delete("/:cust_id", verifyToken, deleteCustomer);

export default router;
