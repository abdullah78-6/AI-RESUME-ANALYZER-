import express from "express";
import { login, register } from "../controllers/auth-controller.js";
const Userrouter=express.Router();
Userrouter.post("/reg",register)
Userrouter.post("/log",login);
export default Userrouter;