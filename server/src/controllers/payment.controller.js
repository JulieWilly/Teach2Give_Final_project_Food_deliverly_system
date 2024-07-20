import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllPayments = async (req, res) => {
  const customer = req.user;
  const customerID = customer.cust_id;

  try {
    const getAllPayments = await prisma.payment.findMany({
      where: { cust_id: customerID },
      select: {
        cust_id: true,
        payment_id: true,
        paymentMethod: true,
        amount: true,
        paymentStatus: true,
      },
    });

    if (getAllPayments !== null) {
      return res
        .status(200)
        .json({
          success: true,
          message: "Payment found successfully.",
          data: getAllPayments,
        });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Payments has not been found." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSinglePayment = async (req, res) => {
  const customer = req.user;
  const customerID = customer.cust_id;

  try {
    // verify that the payment is present.
    const paymentID = req.params.payment_id;
    const verifyPayment = await prisma.payment.findUnique({
      where: { payment_id: paymentID },
    });

    if (!verifyPayment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment does not exist!" });
    }
    if (verifyPayment.cust_id !== customerID) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized operation." });
    }

    const getPayment = await prisma.payment.findFirst({
      where: { payment_id: paymentID },
    });
    res
      .status(500)
      .json({
        success: true,
        message: "Payment details found successfully.",
        data: getPayment,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const makePayment = async (req, res) => {
  const customer = req.user;
  const customerID = customer.cust_id;

  try {
    const { paymentMethod, amount, paymentStatus } = req.body;

    const makePayment = await prisma.payment.create({
      data: {
        paymentMethod,
        amount,
        paymentStatus,
        cust_id: customerID,
      },
    });
    if (makePayment !== null) {
      return res
        .status(200)
        .json({ success: true, message: "Payment made successfully." });
    } else {
      return res
        .status(500)
        .json({
          success: false,
          message: "Payment not made.Something went wrong!!!",
        });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePayment = async (req, res) => {
  const customer = req.user;
  const customerID = customer.cust_id;

  try {
    // ensure the items is present
    const paymentID = req.params.payment_id;

    const verifyPayment = await prisma.payment.findUnique({
      where: { payment_id: paymentID },
    });
    if (!verifyPayment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment does not exist!" });
    }

    // verify user presence
    if (verifyPayment.cust_id !== customerID) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized operation." });
    }
    await prisma.payment.delete({
      where: { payment_id: paymentID },
    });

    res
      .status(200)
      .json({
        success: true,
        message: "Payment details deleted successfully.",
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
