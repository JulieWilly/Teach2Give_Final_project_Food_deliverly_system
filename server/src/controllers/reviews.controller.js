import { PrismaClient } from "@prisma/client";
import { warnEnvConflicts } from "@prisma/client/runtime/library";
import { getRounds } from "bcrypt";
const prisma = new PrismaClient();

export const getAllReviews = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;

  try {
    const getAllReviews = await prisma.reviews.findMany({
      where: { cust_id: custID },
      select: {
        review_id: true,
        reviewRating: true,
        reviewComment: true,
        customerName: true,
        cust_id: true,
      },
    });

    if (getAllReviews !== null) {
      return res.status(200).json({
        success: true,
        message: "Products have been found successfully.",
        data: getAllReviews,
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Products have not been found." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleReview = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;

  try {
    const reviewId = req.params.review_id;

    //check if the orderis there.
    const review = await prisma.reviews.findUnique({
      where: { review_id: reviewId },
    });

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review has not been found." });
    }

    // authorize
    if (review.cust_id !== custID) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized operation." });
    }
    const getReview = await prisma.reviews.findFirst({
      where: { review_id: reviewId },
    });

    if (getReview !== null) {
      return res.status(200).json({
        success: true,
        message: "Reviews found successfully.",
        data: getReview,
      });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Reviews not found ." });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;
  try {
    const { reviewRating, reviewComment, customerName } = req.body;
    const createReview = await prisma.reviews.create({
      data: {
        reviewRating,
        reviewComment,
        customerName,
        cust_id: custID,
      },
    });
    if (createReview !== null) {
      return res
        .status(200)
        .json({ success: true, message: "Review created successfully." });
    } else {
      return res.status(500).json({
        success: false,
        message: "Review not created. Soomething went wrong!!",
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;

  try {
    const reviewID = req.params.review_id;

    //verify that the review do exist
    const verifyReview = await prisma.reviews.findUnique({
      where: { review_id: reviewID },
    });

    // message if review does not exist
    if (!verifyReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review does not exist!" });
    }

    // authorize.
    if (verifyReview.cust_id !== custID) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized operation." });
    }

    // now delete the review
    await prisma.reviews.delete({
      where: { review_id: reviewID },
    });

    res.json("Review deleted successfully.");
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
