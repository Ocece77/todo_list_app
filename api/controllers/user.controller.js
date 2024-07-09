
import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'

export const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 16);
    }
    const updatedUser = await User.findByIdAndUpdate(id, { $set: { ...req.body } }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password, ...rest } = updatedUser._doc;
   return  res.status(200).json(rest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err });
  }
};


  export const deleteUser =async (req, res)=>{
    const {id} =  req.params
    try{
       User.findByIdAndDelete(id)
        .then(() =>  res.status(200).json({message : "user has been deleted"}))
        .catch((err) =>  res.status(401).json({err}))
  
      } catch(err){
        res.status(500).json(err)
      }
    }
  