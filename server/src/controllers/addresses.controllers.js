import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAddresses = async (req, res) => {
  try{
    const getAddresses = await prisma.address.findMany({
      select:{
        address_id: true,
        customerAddress: true,
        city: true,
        state: true,
        zipcode: true
      }
    })

    if(getAddresses !== null ) {
      res.status(200).json({success: true, message: 'Location details found successfully.', data:getAddresses})
    } else {
      res.status(500).json({success: false, message: 'Location details not found.'})
    }

  } catch(error){
    res.status(500).json({success:false, message: error.message})
  }
};
export const createAddress = async (req, res) => {
  const customer = req.user;
  const custID = customer.cust_id;

  try {
    const { customerAddress, city, state, zipcode } = req.body;

    const createAddress = await prisma.address.create({
      data: {
        customerAddress,
        city,
        state,
        zipcode,
        cust_id: custID
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
