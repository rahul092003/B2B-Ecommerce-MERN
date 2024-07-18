import mongoose from "mongoose";

export const connectDB= async()=>{
    await mongoose.connect('mongodb+srv://rahul09_mongo:rahul09mongo@cluster0.oymeibd.mongodb.net/food-del').then(()=>console.log("DB connected"));

}