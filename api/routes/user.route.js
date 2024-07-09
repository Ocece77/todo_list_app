import express from "express";
import  {authToken}  from "../middleware/auth.js";
import { deleteUser, updateUser } from "../controllers/user.controller.js";

const userRoutes = express.Router()


userRoutes.put("/put/:id" , authToken, updateUser)
userRoutes.delete("/delete/:id", authToken, deleteUser)

export default userRoutes; 