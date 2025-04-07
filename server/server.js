import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

//files file
import connectDB from './config/connectDB.js';
import { authRouter } from './routes/authRoute.js';
import productRouter from './routes/productRoute.js';
import { orderRouter } from "./routes/orderRoute.js";
import showProduct from './routes/showProducts.js';
import PaymentRouter from './routes/payment.js';

const app = express();


//connection of db
connectDB();

//config dotenv
dotenv.config();

//middleware

app.use(
  cors({
    origin: "https://dress-aura-rust.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


//endpoints
app.use('/api/auth',authRouter);
app.use('/api/admin', productRouter);
app.use("/api", orderRouter);
app.use('/api', showProduct);
app.use('/api', PaymentRouter);

const port = process.env.PORT || 4000

app.get('/' ,(req, res)=> {
  res.send('YO bruh')
})

app.listen(port,()=>{
    console.log('Server is listening on port :',port);  
})
