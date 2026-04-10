import fs, { access } from "fs"
import {v2 as cloudinary} from "cloudinary"
import cvmodel from "../models/cv-store-model.js"
import axios from "axios"
// import {GoogleGenerativeAI} from "@google/generative-ai"
// const apikey2=process.env.gemniapikey;
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
            resource_type:"auto",
        })
    let pdfUrl=result.secure_url;
    console.log("final url ",pdfUrl);
    // AI INTENGARTION FOR ANALYZER 
    // const genai=new GoogleGenerativeAI(apikey2);
    // const model=genai.getGenerativeModel({model:"gemini-1.5-flash-latest"})
    // const prompt=`
    // fifa full form 
    // `
    // const response=await model.generateContent(prompt);
    // const airesult=response.response.text();
    // console.log("AI RESULT",airesult);
    
const cvstore=new cvmodel({
            filename:pdfUrl,
            public_id:result.public_id,
            resource_type:result.resource_type,
            localfile:req.file.filename,
            // analysis:airesult
        });
        await cvstore.save();
        return res.json({success:true,message:"Cv save sucessfully in database",url:pdfUrl});
        
    } catch (error) {
        console.log("add cv error ",error);
        return res.json({sucess:false,message:"Add cv error"});
        
    }

}
const getcv=async(req,res)=>{
    try {
        const resumes=await cvmodel.find({});
        return res.json({status:true,ans:resumes});
        
    } catch (error) {
        console.log("get resume error",error);
        return res.json({status:false,ans:"Get Resume Error"});
        
    }

}
const deletecv=async(req,res)=>{
     try {
        const cv=await cvmodel.findById(req.body.id);
      if(!cv){
    return  res.json({success:false,result:"PRODUCT NOT FOUND"});

        }
        if(cv){
            fs.unlink(`uploads/${cv.localfile}`,()=>{});

        }
         console.log("this is public id ",cv.public_id);
    if(cv.public_id){
           
            await cloudinary.uploader.destroy(cv.public_id,{
                resource_type:cv.resource_type,
                invalidate:true
            });

        }
        
        await cvmodel.findByIdAndDelete(req.body.id);
         res.json({success:true,result:"CV REMOVED SUCESSFULLY "});
        
    } catch (error) {
        console.log("delete error",error);
         res.json({success:false,result:"DATA DELETE ERROR"});
        
    }

}
export {addcv,deletecv,getcv}