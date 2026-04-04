import mongoose from "mongoose";
export const databaseconnection=async()=>{
    try {
        await mongoose.connect(process.env.mongodburi);
        console.log("DATA BASE IS SUCESSFULLY CONNECTED ");
        
    } catch (error) {
        console.log("db connection error ",error);
        
    }

}