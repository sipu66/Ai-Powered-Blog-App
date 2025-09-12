import mongoose from "mongoose";
import 'dotenv/config'


export const connectDB = async()=>{
    try {
         await mongoose.connect(process.env.MONGO_URI,{
               useNewUrlParser: true,
      useUnifiedTopology: true,
         })
         console.log('mongoose connected sucessfullly')
    } catch (error) {
        console.error('connection error')
    }
}