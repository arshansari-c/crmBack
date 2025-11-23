import mongoose from "mongoose";

export const DatabaseConnection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database connected succesfully")
    } catch (error) {
     console.log("Datbase connection failed",error)
    }
}