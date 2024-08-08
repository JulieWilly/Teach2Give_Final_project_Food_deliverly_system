import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getAllOrderItems  = async (req, res) => {
  try{

    const getAllOrderItems = await prisma.order_items.findMany({
      select: {
        order_items_id: true,
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
  const {order_items_id} = req.params;
  try{
    // check if the order exists first.
    const checkOrder = await prisma.order_items.findUnique({
      where: {order_items_id: order_items_id}
    })

    if (!checkOrder){
      res.status(500).json({success:false, message: 'Order item not found.'})
    } 

  const getItem = await prisma.order_items.findUnique({
      where: {order_items_id: order_items_id},
  })

  if (getItem != null){
    res.status(200).json({success: true, message:'Order has been found successfully.', data: getItem})
  } else{
    res.status(500).json({success: true, message:'Order no found. Something  went wrong!!.'})

  }

  } catch(error) {
    res.status(500).json({success:false, message: error.message})
  }
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

  // get the order id
  const {order_items_id} = req.params
  try{
// check if the order exists in the database.
  const checkItem = await prisma.order_items.findUnique({
    where: {order_items_id: order_items_id}
  })
   
  if (!checkItem) {
    res.status(500).json({success: false, message: 'Order has not been found!!'})
  }

  const deleteItem = await prisma.order_items.delete({
    where: {order_items_id: order_items_id}
  })
  if (deleteItem !== null) {
    res.status(200).json({success:true, message: 'Order deleted successfully.'})
  } else {
    res.status(500).json({success:true, message: 'Order Not deleted.Something went wrong.'})

  }
  }catch(error){
    res.status(500).json({success: false, message: error.message})
  }
}
