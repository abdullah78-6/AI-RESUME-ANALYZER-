import fs from "fs"
import {v2 as cloudinary} from "cloudinary"
import cvmodel from "../models/cv-store-model.js"
cloudinary.config({
    cloud_name:process.env.cloudname,
    api_key:process.env.api_keycloud,
    api_secret:process.env.api_secretcloud

})
const addcv=async(req,res)=>{
    try {
        if(!req.file){
           return  res.json({success:false,message:"Please upload cv "});
        }
       
        const result=await cloudinary.uploader.upload(req.file.path,{
            folder:"uploads",
        })
        const cvstore=new cvmodel({
            filename:result.secure_url,
            public_id:result.public_id,
            localfile:req.file.filename
        });
        await cvstore.save();
        return res.json({success:true,message:"Cv save sucessfully in database",url:result.secure_url});
        
    } catch (error) {
        console.log("add cv error ",error);
        return res.json({sucess:false,message:"Add cv error"});
        
    }

}
const deletecv=async(req,res)=>{

}
export {addcv,deletecv}