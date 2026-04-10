import express from "express";
import { login, register, Reset } from "../controllers/auth-controller.js";
const Userrouter=express.Router();
Userrouter.post("/reg",register)
Userrouter.post("/log",login);
Userrouter.post("/new",Reset);
export default Userrouter;