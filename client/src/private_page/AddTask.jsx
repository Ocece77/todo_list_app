import { faThumbsDown, faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { addTaskDefault, addTaskFailed, addTaskSuccess } from "../redux/taskSlice";
import DOMPurify from 'dompurify';

const AddTask = () =>{

  const {currentUser} = useSelector((state) => state.user);
  const currentTask = useSelector((state) => state.task);
  const d = new Date()
  const currDate=`${d.getFullYear()}-${d.getMonth() < 10 ? `0${d.getMonth()+1}` : d.getMonth()+1}-${d.getMonth() < 10 ? `0${d.getDate()}` : d.getDate()}`

  const dispatch = useDispatch()
  const [form , setForm] = useState({
    title:'',
    content:'no content',
    date:currDate,
    userId: currentUser._id
  })

  const handleChange = (e)=>{
    const sanitizedValue = DOMPurify.sanitize(e.currentTarget.value.trim());
    setForm({...form , [e.currentTarget.id] : sanitizedValue})
  }

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
    }

  } catch(err){
    console.error(err)

  } finally{
    setTimeout(()=>
      dispatch(addTaskDefault()), 8000)//reset the value to remove the message
  }
     
}

  return(
   
   <div className="flex flex-col gap-10 ">
    <p className=" text-5xl  capitalize">Add a new task ✨</p>
     <form onSubmit={createTask} className="grid  gap-8">

      <div className="flex flex-col gap-y-2">
        <label htmlFor="title" className="text-neutral-400 opacity-80">Title</label>
        <input onChange={handleChange} id='title' name="title" type="text" className="rounded border border-neutral-400 py-1 ps-2" />
      </div>


      <div className="flex flex-col gap-y-2">
        <label htmlFor="content" className="text-neutral-400 opacity-80">Content</label>
        <input onChange={handleChange} id='content' name="content" type="text" className="rounded border border-neutral-400 py-1 ps-2" />
      </div>


      <div className="flex flex-col gap-y-2">
        <label htmlFor="date" className="text-neutral-400 opacity-80">For which day ?</label>
        <input  onChange={handleChange}id='date' name="date" type="date" className="rounded border border-neutral-400 py-1 px-3 ps-2" />
      </div>

      <div className="flex justify-end gap-2 ">
      <Link to='/dashboard?tab=alltask' className="bg-neutral-100  px-4 py-2 rounded w-fit hover:font-bold hover:bg-amber-500 hover:text-white  transition-all">cancel</Link>
       <button type='submit' className="bg-amber-400 font-bold px-4 py-2 rounded w-fit hover:text-white hover:bg-black transition-all">Add task</button>
      </div>

      {(currentTask.added && currentTask.added != null) &&<div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
          <div className="py-1 pe-3">
            <FontAwesomeIcon icon={faThumbsUp} size="2xl"/>
            </div>
          <div>
            <p className="font-bold">Your task has been added</p>
            <p className="text-sm">You can see all your task <Link to='/dashboard?tab=alltask' className="underline">here</Link>.</p>
          </div>
        </div>
      </div>}

      {(!currentTask.added && currentTask.added != null) &&<div className="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
          <div className="py-1 pe-3">
            <FontAwesomeIcon icon={faThumbsDown} size="2xl"/>
            </div>
          <div>
            <p className="font-bold">Task creation has failed</p>
            <p className="text-sm">We either have a external problem or you didn&apos;t complete the form</p>
          </div>
        </div>
      </div>}

     </form>
   </div>
   
  )
 }

 export default AddTask