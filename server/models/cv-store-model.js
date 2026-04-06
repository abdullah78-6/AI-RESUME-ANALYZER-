import mongoose from "mongoose"
const cvschema=mongoose.Schema({
    filename:{type:String,required:true},
     public_id:{type:String,required:true},
    localfile:{type:String,required:true},

})
const cvmodel=mongoose.model.cv||mongoose.model("resume",cvschema);
export default cvmodel;