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

},
{Timestamp: true}
)

const Task = mongoose.model("Task" , taskSchema)
export default Task