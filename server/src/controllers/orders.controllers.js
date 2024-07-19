import { PrismaClient } from "@prisma/client";
import { json } from "express";
const prisma = new PrismaClient()

export const getOrders =  async(req, res) => {
    try{

        const getOrders = await prisma.orders.findMany({
            select: {
            orderStatus: true, 
            totalAmount: true, 
            noOfItems: true,
            cust_id: true,
            order_id: true
            }
        })
        if (getOrder !== null) {
            res.status(200).json({ success: true, message: "Orders found successfully", data: getOrders})
        } else {
            res.status(500).json({success: false, message: "No orders have been found!!" })
        }

    } catch(error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const getOrder = async (req, res) => {
    try{
        const orderId = req.params.order_id
        console.log(orderId)
        const getOrder = await prisma.orders.findFirst({
            where: { order_id: orderId}
        })
        if( getOrder !== null) {
            res.status(200).json({success: true, message: "Product found successfully!", data: getOrder})
        } else {
            res.status(500).json({ success: false, message: "Product has not been found successfully."})
        }
    }catch(error){
        res.status(500).json({success:false, message: error.message})
    }
}

export const createOrder = async (req, res) => {
        const user = req.user;
        const cust_id = user.cust_id
    try{
         const {orderStatus, totalAmount, noOfItems } = req.body;
        const createOrder = await prisma.orders.create({
            data: {
                orderStatus,
                 totalAmount,
                  noOfItems,
                  cust_id: cust_id
            }
        })
        if (createOrder !== null) {
         res.status(200).json({success:true, message: "User has been created.!!"})

        } else {
        res.status(500).json({success:false, message: "Something went wrong.!!"})

        }
    }catch(error) {
        res.status(500).json({success: false, message: error.message})
    }

       
   

}

export const updateOrder =  async(req, res) => {
    res.send('update order')
}

export const deleteOrder = async (req, res) => {
    const customer = req.user;
    const custID = customer.cust_id;
   try{
    const orderId = req.params.order_id;
    const deleteOrder = await prisma.orders.delete({
        where: { order_id: orderId},
        include:custID
    })
    res.json('user deleted successfully.')

   } catch(error) {
    res.status(500).json({success: false, message: error.message})
   }
}