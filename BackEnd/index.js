import express from "express";
import { PORT, mongoDBURl } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js"
import userRoute from "./routes/userRoute.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { config } from 'dotenv';


config(); // Load environment variables
const app = express()

const corsOptions = {
    origin: process.env.BASE_URL,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
console.log(process.env.BASE_URL)
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())
app.use('/books', bookRoute)
app.use('/auth', userRoute)

app.get('/', (req, res) => {
    console.log('Welocomeeee')
    console.log(process.env.BASE_URL)
    return res.status(234).send('Welcome to MERN STACK')
})

mongoose.connect(mongoDBURl)
    .then(() => {
        console.log('App connected Succesfully')
        app.listen(PORT, () => { console.log('App is running ') })
    })
    .catch((error) => { console.log(error) })