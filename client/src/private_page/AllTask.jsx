import {  faCaretDown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateFailure } from "../redux/userSlice"
import { addTaskDefault, addTaskFailed, addTaskSuccess } from "../redux/taskSlice"
import { Link } from "react-router-dom"
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { faCircleCheck as faCircleCheckSolid } from "@fortawesome/free-solid-svg-icons"


const AllTask = () =>{

  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) =>state.user);
  const d = new Date()
  const currDate=`${d.getFullYear()}-${d.getMonth() < 10 ? `0${d.getMonth()+1}` : d.getMonth()+1}-${d.getMonth() < 10 ? `0${d.getDate()}` : d.getDate()}`

  const [form , setForm] = useState({
    title:'',
    content:'no content specified',
    date:currDate,
    userId: currentUser._id
  }) // add a new task
  
  const [task , setTask] = useState({
    completed:false
  })//set the current task
  const [showDetails , setShowDetails] = useState(null)//toggle the details for each entry
  const [taskList , setTaskList] = useState([])//the list of task

  //create a new task 
  const createTask = async (e) =>{
    e.preventDefault()
    try{
     const res = await fetch(`/api/task/post`, 
     {
       method : 'POST',
       body : JSON.stringify(form),
       headers: {
        'Authorization' : `Bearer ${currentUser.token}`,
        'Content-Type' : "application/json"
       }
     }
    )
  
      if (!res.ok){
        console.error('problem with the creation of the notes')
        dispatch(addTaskFailed())
      } else{
        dispatch(addTaskSuccess())
        getTask()
      } 
  
    } catch(err){
      console.error(err)
    } finally{
      dispatch(addTaskDefault())
    }
       
  }
  const controller = new AbortController();//abort the request

  //get all the task and filter them
  const getTask = async () =>{

    try{
     const res = await fetch(`/api/task/get`, 
     { signal : controller.signal}
     );
       
      if (!res.ok){
        console.error('problem with the creation of the notes')
      } 
     const data = await res.json()
     const filterData = data.filter((i)=> i.userId == currentUser._id)
     setTaskList(filterData)

    } catch(err){
      console.error(err);
    } 

  }
  //update a task 
  const updateTask = async (e) =>{
    e.preventDefault(); 
    if(!task){
      dispatch(updateFailure)
    }

    try{
      const res = await fetch(`/api/task/put/${task.taskId}`, 
       {method : "PUT",
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${currentUser.token}`
        },
         body : JSON.stringify(task)
        }
       );

       if (!res.ok){
        console.error('problem with updating the note')
       } else{
        getTask()
        setTask({})
       }
 
    } catch(err){
      console.error(err)
    }
  }

  //delete a task 
  const deleteTask = async (e) =>{
    e.preventDefault(); 
    const taskId = e.currentTarget.parentElement.parentElement.id
    try{
      const res = await fetch(`/api/task/delete/${taskId}`, 
       {method : "DELETE",
        headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${currentUser.token}`},
       });
       if (!res.ok){
        console.error('problem with delecting the note')
       }
        getTask()
    } catch(err){
      console.error(err)
    }

  }


  const handleTaskUpdate = (e)=>{
    const currentTaskId = e.currentTarget.closest('form').id;//prend l'id du form le plus "proche"
    setTask({...task , taskId :  currentTaskId ,[e.currentTarget.id] : e.currentTarget.value})
   console.log(task)
  }


  //update the form value on change
  const handleChangeForm = (e)=>{
    setForm({...form , [e.currentTarget.id] : e.currentTarget.value.trim()})
  }


  //update the task completed status
  const completedTask = async (taskId , completedStatus) =>{
    try{
      const res = await fetch(`/api/task/put/${taskId}`, 
       {method : "PUT",
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${currentUser.token}`
        },
         body : JSON.stringify({completed : !completedStatus})
        }
       );

       if (!res.ok){
        console.error('problem with updating the note')
       } else{
        getTask()

       }
 
    } catch(err){
      console.error(err)
    }
  }

  //pin the task
  const pinnedTask = async (taskId , pinnedStatus) =>{
    try{
      const res = await fetch(`/api/task/put/${taskId}`, 
       {method : "PUT",
        headers:{
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${currentUser.token}`
        },
         body : JSON.stringify({isPinned : !pinnedStatus})
        }
       );

       if (!res.ok){
        console.error('problem with updating the note')
       } else{
        getTask()

       }
 
    } catch(err){
      console.error(err)
    }
  }


  useEffect(()=>{
    getTask()
    return() =>{
      controller.abort()
    }
  }, [])


  return(
   <>
 {/*add task form */}
   <div className="flex flex-col gap-10 ">
    <p className=" text-5xl  capitalize">All your task 📝</p>
     <form onSubmit={createTask} className="grid gap-3 border-y py-5">

    <div className="flex flex-col justify-around ">

      <div className="flex flex-col gap-y-1">
        <label htmlFor="title" className="text-neutral-400 opacity-80">Title</label>
        <input maxLength={40} required onChange={handleChangeForm} id='title' name="title" type="text" className="rounded border border-neutral-400 py-1 ps-3" />
      </div>


      <div className="flex flex-col gap-y-1">
        <label htmlFor="content" className="text-neutral-400 opacity-80">Describe the task</label>
        <input maxLength={40}  onChange={handleChangeForm} id='content' name="content" type="text" className="rounded border border-neutral-400 py-1 ps-3" />
      </div>


      <div className="flex flex-col gap-y-1">
        <label htmlFor="date" className="text-neutral-400 opacity-80 ">For which day ?</label>
        <input onChange={handleChangeForm} id='date' name="date" type="date" className="rounded border border-neutral-400 py-1 px-3" />
      </div>

    </div>
   
      <div className="flex justify-end gap-2 ">
        <button type='submit' className="bg-amber-400 font-bold px-3  rounded w-fit hover:text-white hover:bg-black transition-all">Add task</button>
      </div>

     </form>

   </div>

{/*list of all the tasks */}
   <div className="grid gap-y-5">
   {taskList.length != 0 && taskList.map((task,index)=>(
   <form  key={index} id={task._id}  onSubmit={updateTask} className="flex justify-between rounder border py-3 px-4">

      <div className="flex  gap-3">
       <button id="completed" name="completed" type='button' onClick={() => {completedTask(task._id , task.completed)}}  >

        {!task.completed &&
        (<FontAwesomeIcon icon={faCircleCheck} style={{color: "#ffc800",}} />)}
           {task.completed &&
        (<FontAwesomeIcon icon={faCircleCheckSolid} style={{color: "#ffc800"}} />)}
        </button> 

      <div>

       {/*task title */}
         <input maxLength={40} onChange={handleTaskUpdate} type="text" name="title" id="title" defaultValue={task.title} className={`${task.completed && "line-through" } focus:outline-amber-200 ps-1 w-full text-lg font-bold capitalize`}  />
         {/*task date */}
           <input onChange={handleTaskUpdate} type="date" name="date" id="date" value={task.date} className={`${task.completed && "line-through" } focus:outline-amber-200 ps-1 w-fit text-[.7em] font-light -mt-12`}  />

       {/*task description/content */}
      <div className="flex">
            <FontAwesomeIcon icon={faCaretDown} style={{color: "#FFD43B"}} onClick={()=> setShowDetails(showDetails == index ? null : index)}  className={`${showDetails == index && "-rotate-90" } transition-all`}  />
            {showDetails == index 
            && (<input maxLength={40} onChange={handleTaskUpdate} type="text" name="content" id="content" defaultValue={task.content ?task.content : "No content" } className={`${task.completed && "line-through" } focus:outline-amber-200 ps-1 w-full text-sm`} />)}
          </div>


        </div>
      </div>

      <div className="flex  md:gap-2 justify-center items-center ">
      {/*pinned task */}   
      {!task.isPinned && <button type='button' className=" text-amber-400  md:text-black hover:text-amber-200  hover:md:border-amber-200 hover:md:border  hover:md:bg-transparent md:bg-amber-200 text-sm font-bold rounded-lg h-fit px-3 py-1 " onClick={() => {pinnedTask(task._id , task.isPinned)}}>
          <span  className=" block">pin </span>
      </button>  }

      {task.isPinned && <button type='button' className="text-amber-800  md:text-white hover:text-amber-800  hover:md:border-amber-800 hover:md:border  hover:md:bg-transparent md:bg-amber-800 text-sm font-bold rounded-lg h-fit px-3 py-1 " onClick={() => {pinnedTask(task._id , task.isPinned)}}>
          <span  className="block">unpin </span>
      </button> 
      }

       {/*update task */}    
        <button type='submit' className=" hover:text-amber-500  hover:md:border-amber-400 hover:md:border  hover:md:bg-transparent md:bg-amber-500 md:text-white text-sm font-bold rounded-lg h-fit px-2 py-1 " >
          <span  className="block" >update</span>
      </button>  

        {/*delete task */}    
        <button type='button' className=" hover:text-red-500  hover:md:border-red-400 hover:md:border  hover:md:bg-transparent md:bg-red-700 md:text-white text-sm font-bold rounded-lg h-fit px-2 py-1 " onClick={deleteTask}>
          <span  className="block" >delete</span>
        </button>       
      </div>

    </form>))
  }
   
  { taskList.length == 0  &&
     (<div className="w-full text-center">
      <p>There&apos;s no task at all 😪 <br /> <Link to="/dashboard?tab=addtask" className="underline text-amber-400 italic  text-center">add one</Link></p>
     </div>)
  }


   </div>
   
   </>
  )
 }

 export default AllTask