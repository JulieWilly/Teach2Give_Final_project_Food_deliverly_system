import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export const getAllCustomers = async (req, res) => {
    try{
        const getAllCustomers = await prisma.customers.findMany({
            select: {
                cust_id: true,
                custName: true,
                custEmail: true,
                custPhoneNumber: true, 
                custLocation: true, 
                approvedCust:true
            }
        })

        res.status(200).json({ success: true, message: "Al users found successfully.", data: getAllCustomers})
    } catch(error) {
        res.status(500).json({ success: false, message: error.message})
    }
}

export const getOneCustomer =  async (req, res) => {
    try{
     const {id} = req.params;

    const findCustomer = await prisma.customers.findFirst({
        where: { cust_id: id},
        select:{
            custName: true,
            custEmail: true,
            custPhoneNumber: true,
            custLocation: true,
            approvedCust: true,
            cust_id: true
        }
     })
        res.status(200).json({ success: true, message: "Customer found successfully.", data: findCustomer})

    } catch(error) {
        res.status(500).json({success: false, message: error.message})
    }
}

export const createCustomer = async (req, res) => {
    try{
    const {custName,custEmail, custPhoneNumber, custLocation, approvedCust } = req.body
    const createCust = await prisma.customers.create({
        data: {
            custName, custEmail, custPhoneNumber, custLocation, approvedCust
        }
    })
    res.status(200).json({ success: true, message: "Customer created successfully.", data: createCust})
   } catch(error) {
    res.status(500).json({ success: false, message: error.message})
   }
}

export const updateCustomer = async (req, res) => {
   try{
    const {custName,custEmail, custPhoneNumber, custLocation, approvedCust } = req.body
    const createCust = await prisma.customers.create({
        data: {
            custName, custEmail, custPhoneNumber, custLocation, approvedCust
        }
    })
    res.status(201).json({ success: true, message: "Customer created successfully.", data: createCust})
   } catch(error) {
    res.status(500).json({ success: false, message: error.message})
   }
}

export const deleteCustomer = async (req, res) => {
    try{

        const { id }= req.params;
        console.log(cust_id)
       await prisma.customers.delete(
           {
             where:  {cust_id: id }
           }
        )

        res.status(200).json({success: true, message: "Customer deleted successfully."})
    }catch(error) {
        res.status(500).json({success: false, message: error.message})
    }
}