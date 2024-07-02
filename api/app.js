import express from "express";
import cors from "cors"
import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

dotenv.config({path:'../.env'})

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.MONGO)
.then(()=> console.log("db has been succesfuly connected"))

app.use(express.json())
app.use(cors())



app.listen(PORT , ()=>{
console.log("Listening on" , PORT)
})

export default app