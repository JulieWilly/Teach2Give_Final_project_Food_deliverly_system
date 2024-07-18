import express from "express";
import usersRouter from "./routers/users.router.js";
import productsRouter from "./routers/products.router.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'

config();

const foodDelivery = express();
foodDelivery.use(cors({
  origin: 'http://localhost:5173'
}))
foodDelivery.use(express.json());
foodDelivery.use(cookieParser());
foodDelivery.listen(process.env.PORT, () => {
  console.log(`Application running at port 3001`);
});

foodDelivery.use("/foodie.com/ke/api/v1", usersRouter);

foodDelivery.use("/foodie.com/ke/api/v1/products", productsRouter);
