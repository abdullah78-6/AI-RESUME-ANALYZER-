import fs, { access } from "fs"
import {v2 as cloudinary} from "cloudinary"
import cvmodel from "../models/cv-store-model.js"
import axios from "axios"
import {GoogleGenerativeAI} from "@google/generative-ai"
import { createRequire } from "module";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import usermodel from "../models/usermodel.js"
const apikey2=process.env.gemniapikey;
cloudinary.config({
    cloud_name:process.env.cloudname,
    api_key:process.env.api_keycloud,
    api_secret:process.env.api_secretcloud

})
const extracttext=async(filepath)=>{
    const data=new Uint8Array(fs.readFileSync(filepath));
    const pdf=await pdfjsLib.getDocument({data}).promise;
    let text="";
    for(let i=1;i<=pdf.numPages;i++){
        const page=await pdf.getPage(i);
        const content=await page.getTextContent();
        const strings=content.items.map(item=>item.str);
        text+=strings.join(" ")+"\n";
    }
    return text;

}
const addcv=async(req,res)=>{
    // const {email}=req.body;
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
    // PDF PARSING 
    let resumetext=await extracttext(req.file.path);
    
    // AI INTENGARTION FOR ANALYZER 
    const genai=new GoogleGenerativeAI(apikey2);
    const model=genai.getGenerativeModel({model:"gemini-2.5-flash"})
    const prompt=` 
    You are an ATS system and career assistant.

Analyze the resume from the Content below and return a SHORT and CLEAR response.

Resume Content:
${resumetext}

Your output must follow this EXACT format:

1. FULL NAME
- Extract the candidate's full name from the resume.
- Highlight it clearly (use uppercase).

2. ATS SCORE
- Give a score out of 100.
- In 1 line, explain why.

3. SKILLS ANALYSIS (5-6 lines)
- Briefly analyze the candidate’s skills.
- Mention strengths and any weak areas.

4. JOB SUGGESTION (2-3 lines)
- Suggest suitable job role(s) based on the resume.
- Keep it very short and practical.
IMPORTANT RULES:
- Keep the answer concise.
- The name is usually in the first 2–3 lines of the resume.
- DO NOT guess any name.
- Do NOT exceed the given line limits.
- Do NOT add extra sections.
- Do NOT hallucinate missing data.
- If name is not found, say "NAME NOT FOUND".
- Use ONLY the given resume content.
Format example:

FULL NAME:
JOHN DOE

ATS SCORE:
78/100 - Good structure but missing keywords.

SKILLS ANALYSIS:
- Strong in frontend development.
- अच्छे knowledge of React and JavaScript.
- Lacking backend experience.
- Needs better project descriptions.
- Good problem-solving skills.

JOB SUGGESTION:
Frontend Developer or React Developer roles are suitable.
Can also apply for Junior Full Stack positions.
    `
    const response=await model.generateContent(prompt);
    const airesult=response.response.text();
    console.log("AI RESULT",airesult);
    // const user=await usermodel.findOne({email});
    
const cvstore=new cvmodel({
            filename:pdfUrl,
            public_id:result.public_id,
            resource_type:result.resource_type,
            localfile:req.file.filename,
            analysis:airesult,
            // email:email
        });
        await cvstore.save();
        return res.json({success:true,message:"Cv save sucessfully in database",url:pdfUrl,result:airesult});
        
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