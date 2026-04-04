import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import createtoken from "../utils/token.js";
const register=async(req,res)=>{
    const {name,email,password}=req.body;
    try {
        const exist=await usermodel.findOne({email});
        if(exist){
            return res.json({status:false,result:"USER IS ALREADY EXIST "});
        }
        if(!validator.isEmail(email)){
            return res.json({status:false,result:"PLEASE ENTER A VALID EMAIL "});
        }
        if(password.length<8){
            return res.json({status:false,result:"PLEASE ENTER A STRONG PASSWORD "});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser=new usermodel({
            name:name,
            email:email,
            password:hashedpassword
        })
        const user=await newuser.save();
        const token=createtoken(user._id);
        return res.json({status:true,token,result:"USER REGISTER SUCCESSFULLY"});


        
    } catch (error) {
        console.log(error);
        return res.json({status:false,result:"SIGN-UP ERROR"});
        
    }
}

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await usermodel.findOne({email});
        if(!user){
            return res.json({status:false,result:"USER DOES NOT EXIST "});
        }
        const ismatch=await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.json({status:false,result:"PASSWORD IS INCORRECT"});
        }
        const token=createtoken(user._id);
        return res.json({status:true,token,email:email,result:"LOGIN SUCCESSFULLY"});
        
    } catch (error) {
        console.log("ERROR");
        return res.json({status:false,result:"LOGIN ERROR"});
        
    }
    

}
export {register,login}
