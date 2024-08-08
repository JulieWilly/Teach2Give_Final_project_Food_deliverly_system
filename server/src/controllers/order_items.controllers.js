import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllOrderItems  = async (req, res) => {
  try{

    const getAllOrderItems = await prisma.order_items.findMany({
      select: {
        orderQuantity:true,
        itemPrice:true, 
        order_item_name: true,
        order_id:true,
        product_id:true
      },
      
    })

 if (getAllOrderItems !== null) {
      res.status(200).json({ success: true, message: 'Order items found successfully.', data: getAllOrderItems})
    } else {
      res.status(500).json({success: false, message: 'Order items not found.Something went wrong!!'})
    }


  }catch(error) {
    res.status(500).json({success: false, message: error.message})
  }
}


export const getsingleOrderItem = async(req, res) => {
  res.json("Get singlle items");
}


export const createorderItem =  async (req, res) => {
  try{
    const {orderQuantity, itemPrice, order_item_name, } = req.body;
    const createOrderItem = await prisma.order_items.create({
      data: {
        // orderQuantity,
        // itemPrice,
        // order_item_name,
        orderQuantity:7,
        itemPrice:"200",
        order_item_name:"Fried white meat with delicacies.", 
        orders: {
          connect: {
            order_id: 'f34f9158-6d83-4759-913b-ce3817469884'
          }
        },
        food_products:{
          connect:{
             product_id:'0f2e2f76-7a05-43f5-a920-d8d042f72728'
          }
        }
      }
    })

    if (createOrderItem !== null) {
      res.status(200).json({ success: true, message: 'Order item created successfully.', data: createorderItem})
    } else {
      res.status(500).json({success: false, message: 'Order not created.Something went wrong!!'})
    }

  }catch(error){
    res.status(500).json({success:false, message: error.message})
  }
}

export const deleteOrderItem = async (req, res) => {
  res.json("delete order item");
}
