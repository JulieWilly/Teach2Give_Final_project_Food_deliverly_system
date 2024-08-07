import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllOrderItems  = async (req, res) => {
  res.json("get all  items");
}


export const getsingleOrderItem = async(req, res) => {
  res.json("Get singlle items");
}


export const createorderItem =  async (req, res) => {
  try{
    const {orderQuantity, itemPrice, order_item_name} = req.body;
    // const createOrderItem = await 

  }catch(error){
    res.status(500).json({success:false, message: error.message})
  }
}

export const deleteOrderItem = async (req, res) => {
  res.json("delete order item");
}
