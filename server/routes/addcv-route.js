import multer from "multer"
import express from "express"
import { addcv, deletecv, getcv } from "../controllers/addcv.js";
const addcvrouter=express.Router();
const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage});
addcvrouter.post("/add",upload.single("cv"),addcv);
addcvrouter.delete("/del",deletecv);
addcvrouter.get("/get",getcv);
export default addcvrouter;