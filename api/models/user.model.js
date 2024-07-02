import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
  
  firstname:{
    type: String,
    required: true
  },

  lastname:{
    type: String,
    required: true
  },

  username:{
    type: String,
    required: true,
    unique : true
  },

  password:{
    type: String,
    required: true
  }

},
{Timestamp: true}
)

const User = mongoose.model("User" , userSchema)
export default User