import express from 'express'
import usersRouter from './routers/users.router.js'
import { config } from 'dotenv'

config()

const foodDelivery = express()
foodDelivery.use(express.json())
foodDelivery.listen(process.env.PORT, () => {
    console.log(`Application running at port 3001`)
})

foodDelivery.use('/foodie.com/ke/api/v1',usersRouter )