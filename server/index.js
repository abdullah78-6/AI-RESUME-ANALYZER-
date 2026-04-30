import express from "express";
import cors from "cors";
import "dotenv/config"
import { databaseconnection } from "./config/dbconection.js";
import Userrouter from "./routes/user-route.js";
import addcvrouter from "./routes/addcv-route.js";
import cvmakerrouter from "./routes/createcvroute.js";
import cookieParser from "cookie-parser";
const app=express();
databaseconnection();

app.use(cors({
    origin:"https://ai-resume-analyzer-6wpp.onrender.com",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",Userrouter);
app.use("/api/cv",addcvrouter);
app.use("/api/cv",cvmakerrouter);
app.use("/images",express.static("uploads"));
app.get("/",(req,res)=>{
    res.send("SERVER IS READY TO DO WORK ");

})
const port =process.env.port;
app.listen(port,()=>{
    console.log(`server is listining on http://localhost:${port}`)

})
