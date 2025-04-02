import express from "express";
import cors from "cors"
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import taskRoutes from "./routes/task.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/user.route.js";
import helmet from "helmet";
import { body, validationResult } from 'express-validator';
import path from 'path'
import { fileURLToPath } from "url";

dotenv.config();

dotenv.config({path:'../.env'})

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO)
.then(()=> console.log("db has been succesfuly connected"))

app.use(express.json())
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname,'../client/dist')))
app.use(cors())
app.use(helmet());
app.use(cookieParser());

app.get("*", (req , res)=>{
  res.sendFile(path.join(__dirname ,'../client/dist/index.html' ))
})

app.use("/api/task" , taskRoutes )
app.use("/api/auth" , authRoutes )
app.use("/api/user" , userRoutes )


app.listen(PORT , ()=>{
console.log("Listening on" , PORT , )

})

export default app