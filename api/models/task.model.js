import mongoose from "mongoose";

const taskSchema =  mongoose.Schema({
  
  title:{
    type: String,
    required: true
  },

  content:{
    type: String,
    required: true
  },

  date:{
    type: String,
    required: true
  },

  completed:{
    type:Boolean,
    default:false
  },
  
  isPinned:{
    type:Boolean,
    default:false
  },
  
  userId:{
    type:String, 
    required:true
  }

},
{ timestamps: true }
)

const Task = mongoose.model("Task" , taskSchema)
export default Task