import express from "express";
import cors from "cors"
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import taskRoutes from "./routes/task.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from 'cookie-parser';
import { authMiddleware } from "./middleware/auth.js";


dotenv.config();

dotenv.config({path:'../.env'})

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO)
.then(()=> console.log("db has been succesfuly connected"))

app.use(express.json())
app.use(cors())
app.use(cookieParser());

app.use("/api/task" , taskRoutes )
app.use("/api/auth" , authRoutes )

app.listen(PORT , ()=>{
console.log("Listening on" , PORT)
})

export default app