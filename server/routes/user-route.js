import express from "express";
import { getProfile, login, Logout, register, Reset } from "../controllers/auth-controller.js";
const Userrouter=express.Router();
Userrouter.post("/reg",register)
Userrouter.post("/log",login);
Userrouter.post("/new",Reset);
Userrouter.post("/out",Logout);
Userrouter.get("/pr",getProfile);
export default Userrouter;