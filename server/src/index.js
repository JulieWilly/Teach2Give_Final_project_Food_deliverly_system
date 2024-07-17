import express from 'express'
import usersRouter from './routers/users.router.js'
import productsRouter from './routers/products.router.js'
import { config } from 'dotenv'
import verifyUserDetails from './middleware/verifyUsers.js'

config()

const foodDelivery = express()
foodDelivery.use(express.json())
foodDelivery.listen(process.env.PORT, () => {
    console.log(`Application running at port 3001`)
})

foodDelivery.use('/foodie.com/ke/api/v1',verifyUserDetails, usersRouter )
foodDelivery.use('/foodie.com/ke/api/v1/products',productsRouter )
