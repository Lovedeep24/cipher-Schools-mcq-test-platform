const mongoose=require("mongoose");


const SignupSchema=mongoose.Schema({
    name:{
        type:String,
        required:true["Please enter your Name"],
    },
    email:{
        type:String,
        required:true["Please add Email"],
    },
    password:{
        type:String,
        required:true["Please enter Password"],
    },
    role:{
        type:String,
        required:true["Please enter your Role"],
    }
}, {
    timestamps: true  
})

module.exports=new mongoose.model("Signup",SignupSchema)