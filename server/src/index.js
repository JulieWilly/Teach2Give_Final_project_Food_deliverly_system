import express from "express";
import usersRouter from "./routers/users.router.js";
import productsRouter from "./routers/products.router.js";
import orderRouter from "./routers/orders.routes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import order_itemsRouter from "./routers/order_item.router.js";
import reviewRouter from "./routers/customer.review.router.js";
import paymentRouter from "./routers/payments.router.js";
import addressRouter from './routers/addresses.router.js'
import categoriesRouter from "./routers/categories.router.js";
import bodyParser from "body-parser";

config();

const foodDelivery = express();
foodDelivery.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
  }),
);
foodDelivery.use(express.json());
foodDelivery.use(cookieParser());
foodDelivery.use(bodyParser({ limit: "50mb" }));
foodDelivery.use(express.urlencoded({ extended: true }));
foodDelivery.listen(process.env.PORT, () => {
  console.log(`Application running at port 3001`);
});

foodDelivery.use("/foodie.com/ke/api/v1", usersRouter);

foodDelivery.use("/foodie.com/ke/api/v1/products", productsRouter);
foodDelivery.use("/foodie.com/ke/api/v1/orders", orderRouter);
foodDelivery.use("/foodie.com/ke/api/v1/orders/items", order_itemsRouter);
foodDelivery.use("/foodie.com/ke/api/v1/customer/review", reviewRouter);

foodDelivery.use("/foodie.com/ke/api/v1/payments", paymentRouter);
foodDelivery.use("/foodie.com/ke/api/v1/cartegories", categoriesRouter);
foodDelivery.use('/foodie.com/ke/api/v1/address', addressRouter)
