import { PrismaClient } from "@prisma/client";
import { json } from "express";
const prisma = new PrismaClient();

export const getOrders = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;
  try {
    const getOrders = await prisma.orders.findMany({
      where: { cust_id: custID },
      select: {
        orderStatus: true,
        totalAmount: true,
        noOfItems: true,
        cust_id: true,
        order_id: true,
      },
    });
    if (getOrder !== null) {
      res.status(200).json({
        success: true,
        message: "Orders found successfully",
        data: getOrders,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "No orders have been found!!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;
  try {
    const getOrders = await prisma.orders.findMany({
      select: {
        orderStatus: true,
        totalAmount: true,
        noOfItems: true,
        cust_id: true,
        order_id: true,
      },
    });
    if (getOrder !== null) {
      res.status(200).json({
        success: true,
        message: "Orders found successfully",
        data: getOrders,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "No orders have been found!!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrder = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;
  try {
    const orderID = req.params.order_id;

    // fatch the data to ensure the item is there.
    const order = await prisma.orders.findUnique({
      where: { order_id: orderID },
    });

    // authorization. Check if the customer id in the order id the same as that in the verified decoded body.
    if (order.cust_id !== custID) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized operation." });
    }

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order has not been found." });
    }

    const getOrder = await prisma.orders.findFirst({
      where: { order_id: orderID },
    });
    if (getOrder !== null) {
      res.status(200).json({
        success: true,
        message: "Product found successfully!",
        data: getOrder,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Customer has no orders" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const user = req.user;
  const cust_id = user.cust_id;
  try {
    const { totalAmount } = req.body;
    const createOrder = await prisma.orders.create({
      data: {
        totalAmount,
        cust_id: cust_id,
      },
    });
    if (createOrder !== null) {
      res
        .status(200)
        .json({ success: true, message: "User has been created.!!" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something went wrong.!!" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;

  const orderID = req.params.order_id;
  const { orderStatus } = req.body;

  try {
    // find the order first
    const updatedOrder = await prisma.orders.findUnique({
      where: { order_id: orderID },
      // data: { approved: true }
    });

    // retuen eerror if the order has not been found.
    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    //   // check if the order belongs to the authenticated user.
    if (updatedOrder.cust_id != custID) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action." });
    }

    await prisma.orders.update({
      where: { order_id: orderID },
      data: { orderStatus: orderStatus },
    });
    res.json({
      success: true,
      message: "Order approved successfully",
      data: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;
  try {
    const orderId = req.params.order_id;

    // chec if the order is present
    const order = await prisma.orders.findUnique({
      where: { order_id: orderId },
    });

    // retuen eerror if the order has not been found.
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found." });
    }

    // check if the order belongs to the authenticated user.
    if (order.cust_id != custID) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized action." });
    }

    await prisma.orders.delete({
      where: { order_id: orderId },
    });
    res.json("Order deleted successfully.");
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
