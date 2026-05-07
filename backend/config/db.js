import mongoose from "mongoose";
 const connectdb =async ()=>{
  try {
     await mongoose.connect(process.env.MONGO_URL);
      console.log("Mongodb is connected .")
  } catch (error) {
      console.error("mongodb is faild due to internal issue.." ,error)
  }
 }
 export default connectdb