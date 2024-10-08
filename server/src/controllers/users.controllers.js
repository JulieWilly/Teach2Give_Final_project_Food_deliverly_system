import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { application } from "express";
import { config } from "dotenv";
import cloudinary from "../cloudinary/cloudinary.js";

config();

export const getAllCustomers = async (req, res) => {
  try {
    const getAllCustomers = await prisma.customers.findMany({
      select: {
        cust_id: true,
        custName: true,
        custEmail: true,
        custPhoneNumber: true,
        approvedCust: true,
        customerRole: true,
        custAvatar: true,
      },
    });

    if (getAllCustomers !== null) {
      res.status(200).json({
        success: true,
        message: "All users found successfully.",
        data: getAllCustomers,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "No user has been found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOneCustomer = async (req, res) => {
  try {
    const id = req.params.cust_id;

    const findCustomer = await prisma.customers.findFirst({
      where: { cust_id: id },
    });
    if (findCustomer !== null) {
      res.status(200).json({
        success: true,
        message: "Customer found successfully.",
        data: findCustomer,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "User has not been found." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { custName, custEmail, custPhoneNumber, password, custAvatar } =
      req.body;
      const passToString =''
    if(!password == null){
      passToString = password.toString();
      
    }
    const passwordHash = bcrypt.hashSync(passToString, 10);
    const createCust = await prisma.customers.create({
      data: {
        custName,
        custEmail,
        custPhoneNumber,
        password: passwordHash,
        custAvatar: custAvatar ? custAvatar:null
      },
    });
    res.status(200).json({
      success: true,
      message: "Customer created successfully.",
      data: createCust,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginCustomer = async (req, res) => {
  // extract email and password from the database.
  const { custEmail, password } = req.body;
  try {
    // login customer if the email password exists.
    const loginCustomer = await prisma.customers.findFirst({
      where: { custEmail: custEmail },
    });

    console.log(custEmail + "" + password);
    if (loginCustomer) {
      const matchPassword = bcrypt.compareSync(
        password,
        loginCustomer.password,
      );

      // if the password is true, generate a token for the user.
      console.log(matchPassword);
      if (matchPassword === true) {
        const payload = {
          cust_id: loginCustomer.cust_id,
          custName: loginCustomer.custName,
          custEmail: loginCustomer.custEmail,
          custPhoneNumber: loginCustomer.custPhoneNumber,
          approvedCust: loginCustomer.approvedCust,
          customerRole: loginCustomer.customerRole,
          custAvatar: loginCustomer.custAvatar,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: "3600m",
        });

        res.cookie("access_token", token);
        console.log("gen token - ", token);
        res.status(200).json({
          success: true,
          message: "Customer logged in successfully.",
          data: payload,
        });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Wrong user credentials." });
      }
    } else {
      res
        .status(404)
        .json({ success: false, message: "Customer has not been created" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveCustomer = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;

  const custId = req.params.cust_id;
  const { approvedCust, customerRole } = req.body;

  try {
    // find the order first
    const approveCustAccout = await prisma.customers.findUnique({
      where: { cust_id: custId },
      // data: { approved: true }
    });

    // retuen eerror if the order has not been found.
    if (!approveCustAccout) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    const updates = await prisma.customers.update({
      where: { cust_id: custId },
      data: {
        approvedCust: approvedCust,
        customerRole: customerRole,
      },
    });

    res.json({
      success: true,
      message: "Customer details updated successfully",
      data: updates,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCustomer = async (req, res) => {
  // get entries.
  const customerDetails = req.body;
  const customerFields = [
    "custName",
    "custEmail",
    "custPhoneNumber",
    "custAvatar",
  ];

  // upload customer image.
  const { custAvatar } = req.body;

  await cloudinary.uploader.upload(
    // the image to be uploaded to cloudinary
    custAvatar,

    {
      //presets infomation and also the image allowed formats.
      upload_preset: "food_delivery_app",
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
    },
    // handle errors in the upload process.
    async function (error, result) {
      try {
        if (error) {
          return res
            .status(500)
            .json({ success: false, message: "Avatar upload failed." });
        } else {
          try {
            // check if the user exists.
            const custID = req.params.cust_id;
            const checkCustomer = await prisma.customers.findUnique({
              where: { cust_id: custID },
            });
            //return if not successful.
            if (!checkCustomer) {
              res
                .status(404)
                .json({ success: false, message: "Customer not found." });
            }
            // object to hold data to be updated
            let updates = {};

            // loop to update the fields accordingly.
            for (let cust in customerDetails) {
              if (customerFields.includes(cust)) {
                updates[cust] = customerDetails[cust];
              }
            }

            const update = await prisma.customers.update({
              where: { cust_id: custID },
              data: {
                custName: updates.custName,
                custEmail: updates.custEmail,
                custPhoneNumber: updates.custPhoneNumber,
                custAvatar: result.url,
              },
            });
            res.status(200).json({
              success: true,
              message: "Customer updated successfully.",
              data: update,
            });
          } catch (error) {
            res.status(500).json({ success: false, message: error.message });
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
  );
};
export const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.cust_id;
    await prisma.customers.delete({
      where: { cust_id: id },
    });

    res
      .status(200)
      .json({ success: true, message: "Customer deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
