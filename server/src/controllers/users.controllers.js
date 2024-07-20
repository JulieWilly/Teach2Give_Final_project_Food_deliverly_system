import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { application } from "express";

export const getAllCustomers = async (req, res) => {
  try {
    const getAllCustomers = await prisma.customers.findMany({
      select: {
        cust_id: true,
        custName: true,
        custEmail: true,
        custPhoneNumber: true,
        custLocation: true,
        approvedCust: true,
        customerRole: true,
        customerAddress:true
      },
    });

    if (getAllCustomers !== null) {
      res
      .status(200)
      .json({
        success: true,
        message: "Al users found successfully.",
        data: getAllCustomers,
      });
    } else {
      res.status(404).json({ success: false, message: 'No user has been found'})
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
    if(findCustomer !== null) {
res
      .status(200)
      .json({
        success: true,
        message: "Customer found successfully.",
        data: findCustomer,
      });
    } else {
      res.status(404).json({ success: false, message: "User has not been found."})
    }
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const {
      custName,
      custEmail,
      custPhoneNumber,
      custLocation,
      password,
      customerAddress,
      customerRole
    } = req.body;
    const passToString = password.toString();
    const passwordHash = bcrypt.hashSync(passToString, 10);
    const createCust = await prisma.customers.create({
      data: {
        custName,
        custEmail,
        custPhoneNumber,
        custLocation,
        password: passwordHash,
        customerAddress,
        customerRole
      },
    });
    res
      .status(200)
      .json({
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

    if (loginCustomer) {
      const passToString = password.toString();
      const matchPassword = bcrypt.compareSync(
        passToString,
        loginCustomer.password,
      );

      // if the password is true, generate a token for the user.
      console.log(matchPassword)
      if (matchPassword === true) {
        const payload = {
          cust_id: loginCustomer.cust_id,
          custName: loginCustomer.custName,
          custEmail: loginCustomer.custEmail,
          custPhoneNumber: loginCustomer.custPhoneNumber,
          approvedCust: loginCustomer.approvedCust,
          customerRole: loginCustomer.customerRole,
          customerAddress:loginCustomer.customerAddress
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '2000m'});
        res.cookie("access_token", token);


        res.status(200).json({ success: true, message: "Customer logged in successfully.", data: payload})
      } else {
        res
          .status(400)
          .json({ success: false, message: "Wrong user credentials." });
      }
    } else {
        res.status(404).json({success: false, message: "User not found"})
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateCustomer = async (req, res) => {
  try {
    const { custName, custEmail, custPhoneNumber, custLocation, approvedCust, customerRole} =
      req.body;
    const createCust = await prisma.customers.create({
      data: {
        custName,
        custEmail,
        custPhoneNumber,
        custLocation,
        approvedCust,
        customerAddress,
        customerRole
      },
    });
    res
      .status(201)
      .json({
        success: true,
        message: "Customer created successfully.",
        data: createCust,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
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
