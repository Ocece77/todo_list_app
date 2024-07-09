import express from 'express'
import { login, sign } from '../controllers/auth.controller.js'

const authRoutes = express.Router()

authRoutes.post("/login" , login )
authRoutes.post("/sign"  , sign )

export default authRoutes