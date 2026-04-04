import express from "express";
import cors from "cors";
import "dotenv/config"
import { databaseconnection } from "./config/dbconection.js";
import Userrouter from "./routes/user-route.js";
const app=express();
databaseconnection();
app.use(cors());
app.use(express.json());
app.use("/api/auth",Userrouter);
app.get("/",(req,res)=>{
    res.send("SERVER IS READY TO DO WORK ");

})
const port =process.env.port;
app.listen(port,()=>{
    console.log(`server is listining on http://localhost:${port}`)

})