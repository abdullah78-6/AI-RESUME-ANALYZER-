import jwt from "jsonwebtoken"
const createtoken=(id)=>{
    return jwt.sign({id},process.env.jwtsecret,{expiresIn:"7d"});
}
export default createtoken;