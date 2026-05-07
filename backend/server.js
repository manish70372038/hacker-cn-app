import dns from "dns"
dns.setServers(['8.8.8.8', '8.8.4.4']);
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import connectdb from "./config/db.js";
import authroutes from "./routes/authRoutes.js"
import scraproutes from "./routes/scraperRoutes.js"
import storyroutes from "./routes/storyRoutes.js"
 dotenv.config()
 connectdb()
 
 const app = express();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
  app.use("/api/auth",authroutes)
  app.use("/api/scrap" ,scraproutes)
app.use("/api/stories", storyroutes);
 app.listen(PORT,()=>{
  console.log(`server is running on http://localhost:${PORT}`)
 })