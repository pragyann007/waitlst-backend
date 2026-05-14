import mongoose, { mongo } from "mongoose";

const waitlistschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        
    }
},{timestamps:true})

export const Waitlist = mongoose.model("Waitlist",waitlistschema);
