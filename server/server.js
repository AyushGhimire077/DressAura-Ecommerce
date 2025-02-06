import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

//files file
import connectDB from './config/connectDB.js';
import { authRouter } from './routes/authRoute.js';
import productRouter from './routes/productRoute.js';
import cloudinary from './config/cloudinary.js'

const app = express();


//connection of db
connectDB();

//config dotenv
dotenv.config();

//middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
}));
app.use(express.json());
app.use(cookieParser());


//endpoints
app.use('/api/auth',authRouter);
app.use('/api/admin',productRouter)

const port = process.env.PORT || 4000

app.listen(port,()=>{
    console.log('Server is listening on port :',port);  
})