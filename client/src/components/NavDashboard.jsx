import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import horloge from '../../public/horloge.webp'
import { useEffect, useState } from "react";
import { faGrip, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import happyFaceEmoji from '../../public/happy_emoji.webp'

const NavDashboard =()=>{
  const {currentUser} = useSelector(state => state.user)
  const [curr, setCurr] = useState(null)

  const openDetails = (e) =>{
    curr == e.currentTarget.closest("button").id ? setCurr(null) :  setCurr(e.currentTarget.closest("button").id)
  }
  const [openBar , isOpenBar] = useState(false) //open the sidebar
  const [taskList , setTaskList] = useState([])//the list of task

  {/*Call the API */}

  let controller = new AbortController();

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



useEffect(()=>{
  getTask()
}, [taskList])


  return(
    <>
      {/*open side navbar */}
      <div className="fixed top-10 left-10 z-10 cursor-default ">
          <button onClick={()=> isOpenBar(!openBar)} className='w-fit flex items-center gap-2 rounded-l-3xl rounded-b-3xl px-4 py-2 bg-amber-300 hover:scale-110 transition-all'>
              <FontAwesomeIcon icon={faGrip} size="2xl" style={{color: "white"}} />
          </button>
      </div>

      <div className={`${openBar ? 'w-full' : "-translate-x-full"} lg:translate-x-0 fixed z-10 px-2 py-10 bg-gray-50 lg:w-1/3 xl:w-1/4 h-full transition-all overflow-scroll`}>

          <div className="flex flex-col h-full">

          {/*Logo -  why Notes */}
          <div className="basis:1/2 md:basis-1/6 flex items-start justify-between">

            <div className=' w-fit flex items-center gap-2 h-fit rounded-l-3xl rounded-b-3xl px-4 py-2 bg-amber-300'>
              <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{color: "white"}} />
              <p className="text-2xl font-bold text-white">Why Notes</p>
            </div>

            {/*close de side bar*/}
            <button  onClick={()=> isOpenBar(false)} className="lg:hidden hover:rotate-90 transition-all">
              <FontAwesomeIcon icon={faXmark} style={{color: "991B1B"}} size="2xl" />
              </button>

          </div>
          
          <div className="flex flex-col gap-4 pt-10 lg:py-0">
          <p className="font-bold ps-10 md:ps-20 lg:ps-5">Actions</p>
          <div className=" flex flex-col md:flex-row gap-y-5 w-full justify-around ps-10 lg:ps-0 ">
              <Link onClick={()=> isOpenBar(false)} to="/dashboard?tab=todaytask" className="bg-black hover:border hover:border-black hover:bg-white hover:text-black px-10 py-3 lg:p-3 font-bold rounded-lg text-white transition-all w-fit">Today Task</Link>
              <Link onClick={()=> isOpenBar(false)} to="/dashboard?tab=alltask" className="bg-black hover:border hover:border-black hover:bg-white hover:text-black px-10 py-3 lg:p-3 font-bold rounded-lg text-white transition-all w-fit">All Task</Link>
              <Link onClick={()=> isOpenBar(false)} to="/dashboard?tab=addtask"  className="bg-black hover:border hover:border-black hover:bg-white hover:text-black px-10 py-3 lg:p-3 font-bold rounded-lg text-white transition-all w-fit">Add Task</Link>
            </div>
          </div>
        

           {/*Pinned -  pinned notes  */}
          <div className="flex flex-col gap-4 basis-1/2 mt-5 p-2 md:p-16 lg:p-1">

                  {/*link to see all task*/}
                <div className="flex items-center justify-between px-4">
                  <p className="text-2xl font-bold underline">Weelky Pinned</p>
                  <Link onClick={()=> isOpenBar(false)} to="/dashboard?tab=alltask" className="text-amber-400 hover:underline">View All</Link>
                </div>

                  {/*generate each tasks */}
                  { 
                    taskList.filter((item) => item.isPinned ).map((task , index)=>(
                          
                          <button key={index} id={index} className="p-2" >
                            <div className="bg-white gap-3 grid grid-cols-4 rounded-lg shadow-md h-fit px-4 py-6 ">
                    
                            <div className="col-span-1 bg-amber-300 w-fit h-fit p-2 rounded-lg">
                                <img className=" w-8" src={horloge} alt="horloge" />
                            </div>
                    
                            <div className="col-span-3 text-start">
                                <p className="font-bold text-2xl lg:text-xl">{task.title}</p>
                    
                                {/*when click the details is visible */}
                                <div>
                                 <p className="text-neutral-400 text-sm hover:text-amber-400" onClick={openDetails}>show details</p>
                                <div className={`${curr == index ? "": "hidden" }`}>
                                <p className="text-[.7rem]">For : {task.date}</p>
                                <p className="mt-1 font-light text-sm text-amber-800">{task.content}</p>
                                </div>

                                </div>
                    
                            </div>
                            
                          </div>
                        </button>
                    ))
                  }

                    {/*add new task */}
                      <Link className="p-2" >
                            <div className="bg-white grid grid-cols-4 rounded-lg shadow-md h-fit px-4 py-6">

                            <div className="col-span-1 bg-amber-300 w-fit h-fit  py-2 px-3 rounded-full">
                               <img className=" w-8" src={happyFaceEmoji} alt="horloge" />
                            </div>
                    
                            <div className="col-span-3 text-start flex items-center">
                                <p className="font-bold text-lg lg:text-2xl niceday-text capitalize">Have a nice day</p>
                            </div>
                            
                            </div>
                        </Link> 
           </div>


         
          </div>
                       
        
      </div>

    </>
   )
}

export default NavDashboard;