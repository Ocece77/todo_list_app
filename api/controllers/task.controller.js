import Task from '../models/task.model.js'


//get all the tasks
export const getTasks = async (req, res)=>{
  try{
    await Task.find()
     .then((tasks)=> res.status(200).json(tasks))
     .catch((err)=> res.status(400).json({err}))
  } catch (err){
    res.status(500).json('Network problems')
  }
}

//post a task
export const postTask = async (req, res)=>{
  try{
   const newTask = new Task({
      ...req.body,
      userId: req.user.userId
    })
    newTask.save()
    .then((task)=> res.status(201).json(task))
    .catch((err)=> res.status(401).json({err}))
  } catch (err){
    res.status(500).json('Network problems')
  }
}

//update a task
export const putTask = async (req, res)=>{
  const {id} = req.params
  try{
    await Task.findByIdAndUpdate(id , {$set:{...req.body} } ,{new: true})
    .then((task)=> res.status(200).json(task))
    .catch((err)=> res.status(400).json({err}))
  } catch (err){
    res.status(500).json('Network problems')
  }
}

//delete a task
export const deleteTask = async (req, res)=>{
  const {id} = req.params
  try{
    await Task.findByIdAndDelete(id)
    .then((task)=> res.status(200).json(task))
    .catch((err)=> res.status(400).json({err}))
  } catch (err){
    res.status(500).json('Network problems')
  }
}