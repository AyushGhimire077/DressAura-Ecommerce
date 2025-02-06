import mongoose from "mongoose";
import 'dotenv/config'

const connectDB =async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
       .then(console.log('Connect to DB')
        )
    } catch (error) {
        console.log('error while connecting to db')
    }
}

export default connectDB;