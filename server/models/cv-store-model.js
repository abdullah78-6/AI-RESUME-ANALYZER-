import mongoose from "mongoose"
const cvschema=mongoose.Schema({
    filename:{type:String,required:true},
     public_id:{type:String,required:true},
     resource_type:{type:String,required:true},
    localfile:{type:String,required:true},
    analysis:{type:String},
    // email:{type:String,required:true},

})
const cvmodel=mongoose.models.resume||mongoose.model("resume",cvschema);
export default cvmodel;