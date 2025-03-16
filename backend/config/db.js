import mongoose from "mongoose";

 export const connectDB= async()=> {
    await mongoose.connect('mongodb+srv://priyam005:BOFmRsBdZHA7iPkq@cluster0.iqcmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB connected"))
}