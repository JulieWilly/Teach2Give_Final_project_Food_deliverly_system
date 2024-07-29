import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAddresses = async (req, res) => {
  res.json("dkldklsdsd");
};
export const createAddress = async (req, res) => {
  try {
    const { customerAddress, city, state, zipcode } = req.body;

    const createAddress = await prisma.address.create({
      data: {
        customerAddress,
        city,
        state,
        zipcode,
      },
    });

    if (createAddress !== null) {
      res.status(200).json({
        success: true,
        message: "Address created successfully.",
        data: createAddress,
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Something wrong happened." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
