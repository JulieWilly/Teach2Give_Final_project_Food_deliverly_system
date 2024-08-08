import { Router } from "express";
import {
  createAddress,
  getAddresses,
} from "../controllers/addresses.controllers.js";
import verifyToken from "../middleware/verifyToken.js";
const router = Router();

router.get("/all", verifyToken, getAddresses);
router.post("/create", verifyToken, createAddress)

export default router;
