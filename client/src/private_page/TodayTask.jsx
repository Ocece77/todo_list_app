import { faCaretDown, faPencil, faThumbTack, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFailure } from "../redux/userSlice";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck as faCircleCheckSolid } from "@fortawesome/free-solid-svg-icons"

const TodayTask = () =>{

  const d = new Date
  const day = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  const { currentUser } = useSelector((state) =>state.user);
  const [task , setTask] = useState({})//set the current task
  const [showDetails , setShowDetails] = useState(null)//toggle the details for each entry
  const [taskList , setTaskList] = useState([])//the list of task
  const [todayTask , setTodayTask] = useState([])
  const currDate=`${d.getFullYear()}-${d.getMonth() < 10 ? `0${d.getMonth()+1}` : d.getMonth()+1}-${d.getMonth() < 10 ? `0${d.getDate()}` : d.getDate()}`

  const controller = new AbortController()
  const dispatch = useDispatch()
  

  const handleTaskUpdate = (e)=>{
    const currentTaskId =e.currentTarget.closest('form').id;//prend l'id du form le plus "proche"
    setTask({...task , taskId :  currentTaskId ,[e.currentTarget.id] : e.currentTarget.id == 'completed' ?  e.target.checked : e.currentTarget.value})
  }


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
         }
         getTask()
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
    setTodayTask(taskList.filter(i => i.date == currDate ))
    return() =>{
      controller.abort()
    }
  
  },[taskList])

  return(
   <>
      
{/* Header with the date and the add button*/}
  <div className="w-full basis-1/5 grid grid-cols-4">

{/* current date*/}
  <div className="col-span-3 ">
    <p className="text-5xl font-medium">Today&apos;s schedules</p>
    <p className=" text-5xl text-amber-400 mt-3">{day[d.getDay()]} {d.getDate()}</p>

  </div>

{/* add button*/}

<div className="flex mt-5 md:mt-0 col-span-full md:col-span-1">
{/* screen > md only */}
  <Link to="/dashboard?tab=addtask" className="hidden md:block col-span-1 bg-amber-300 w-fit h-fit  p-4 lg:p-6  rounded-b-3xl rounded-se-3xl ">
      <FontAwesomeIcon className="rotate-45" icon={faXmark} style={{color: "#fff"}} size="2xl" />
    </Link>

    {/*sm only */}
    <Link to="/dashboard?tab=addtask" className=" md:hidden visible col-span-1 text-white font-bold bg-amber-300 rounded-md  w-fit h-fit  p-2 lg:p-6  ">
      add new tasks
    </Link>
</div>

</div>
{/* Content with all the task for the day*/}
<div className=" basis-1/5">
<div className="grid grid-cols-1 w-full overflow-scroll">
{/*generate each tasks */}
 {/*list of all the tasks */}
 <div className="grid gap-y-5">

{todayTask.length != 0 && todayTask.map((task,index)=>(
<form key={index} id={task._id}  onSubmit={updateTask} className="flex justify-between rounder border py-3 px-4">

   <div className="flex gap-3">
        <button id="completed" name="completed" type='button' onClick={() => {completedTask(task._id , task.completed)}}  >

      {!task.completed &&
      (<FontAwesomeIcon icon={faCircleCheck} style={{color: "#ffc800",}} />)}
        {task.completed &&
      (<FontAwesomeIcon icon={faCircleCheckSolid} style={{color: "#ffc800"}} />)}
      </button> 
    <div>
  

    {/*task title */}
      <input maxLength={40} onChange={handleTaskUpdate} type="text" name="title" id="title" defaultValue={task.title} className={`${task.completed && "line-through" } focus:outline-amber-200 ps-1 w-full text-lg font-bold`}  />
      {/*task date */}
        <input onChange={handleTaskUpdate} type="date" name="date" id="date" defaultValue={task.date} className={`${task.completed && "line-through" } focus:outline-amber-200 ps-1 w-fit text-[.7em] font-light -mt-12`}  />

    {/*task description/content */}
       <div className="flex">
         <FontAwesomeIcon icon={faCaretDown} style={{color: "#FFD43B"}} onClick={()=> setShowDetails(index)}  className={`${showDetails == index && "-rotate-90" } transition-all`}  />
         {showDetails == index && (<input maxLength={40} onChange={handleTaskUpdate} type="text" name="content" id="content" defaultValue={task.content} className={`${task.completed && "line-through" } focus:outline-amber-200 ps-1 w-full text-sm`} />)}
       </div>

     </div>
   </div>

   <div className="flex  md:gap-2 justify-center items-center ">
     
   {!task.isPinned && <button type='button' className=" hover:text-amber-200  hover:md:border-amber-200 hover:md:border  hover:md:bg-transparent md:bg-amber-200 text-sm font-bold rounded-lg h-fit px-3 py-1 " onClick={() => {pinnedTask(task._id , task.isPinned)}}>
          <span  className="hidden md:block">pin </span>
        <FontAwesomeIcon className="block md:hidden" icon={faThumbTack} />
      </button>  }

      {task.isPinned && <button type='button' className=" hover:text-amber-800  hover:md:border-amber-800 hover:md:border  hover:md:bg-transparent md:bg-amber-800 text-sm font-bold rounded-lg h-fit px-3 py-1 " onClick={() => {pinnedTask(task._id , task.isPinned)}}>
          <span  className="hidden md:block">unpin {task.isPinned} </span>
        <FontAwesomeIcon className="block md:hidden" icon={faThumbTack} />
      </button> 
      }
    {/*update task */}    
     <button type='submit' className=" hover:text-amber-500  hover:md:border-amber-400 hover:md:border  hover:md:bg-transparent md:bg-amber-500 md:text-white text-sm font-bold rounded-lg h-fit px-2 py-1 ">
       <span  className="hidden md:block" >update</span>
     <FontAwesomeIcon className="block md:hidden" icon={faPencil} />
   </button>  

     {/*delete task */}    
     <button type='button'className=" hover:text-red-500  hover:md:border-red-400 hover:md:border  hover:md:bg-transparent md:bg-red-700 md:text-white text-sm font-bold rounded-lg h-fit px-2 py-1 " onClick={deleteTask}>
     <span  className="hidden md:block" >delete</span>
       <FontAwesomeIcon className="block md:hidden" icon={faTrash} />
     </button>       

   </div>

 </form>))
}
</div>

{  todayTask.length  == 0 &&
     ( <div className="w-full text-center mt-20">
      <p>There&apos;s no task for today 😪  <br /> <Link to="/dashboard?tab=addtask" className="underline text-amber-400 italic  text-center">add one</Link></p>
     </div> )
  }
 
</div>


</div>
   </>
  )
 }

 export default TodayTask