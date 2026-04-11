import express from "express"
import { Createcv } from "../controllers/createcvcontroller.js";
const cvmakerrouter=express.Router();
cvmakerrouter.post("/mak",Createcv);
export default cvmakerrouter;