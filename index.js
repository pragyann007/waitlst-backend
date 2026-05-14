import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import helmet from "helmet"
import { Waitlist } from "./waitlist.model.js"
import mongoose from "mongoose"

const app = express()
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI ; 

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(helmet())
app.use(express.json())


const connectDb = async()=>{
  try {
    mongoose.connect(MONGO_URI)
    console.log("mongo db connected ..")
    
  } catch (error) {
    console.log("mongodb connection error ")
    
  }
}

app.get("/", (req, res) => {
  res.send("Welcome to the Padantey Waitlist API!")
})


app.post("/waitlist",async(req,res)=>{
    try {
      const {name,email,message} = req.body;
      if(!name && !email){
          return res.status(401).json({message:"No email provided ... "})
      }

      const existwaitListUser = await Waitlist.findOne({email:email});
      if(existwaitListUser){
        return res.status(401).json({message:"The user already exists in waitlist..."})
      }

      

      const waitlistUser = await Waitlist.create({
        name,
        email,
        message
      })
  
  
      return res.status(200).json({
        message:"Created succesfully..",
        waitlistUser
      })
      
  
    } catch (error) {
      return res.status(500).json({message:"server error"})
    }
    

})
app.get("/admin/view/waitlist",async(req,res)=>{

  try {
    const waitListeduser = await Waitlist.find();
    if(waitListeduser.length<0){
      return res.status(200).json({message:"No user exists currently."})
    }
    return res.status(200).json({
      message:"Fetched waitlisted user sucessfully.",
      users:waitListeduser
    })
  } catch (error) {
    return res.status(500).json({message:"server error while fetching ..."})
    
  }


})

connectDb();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
