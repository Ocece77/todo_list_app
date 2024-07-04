import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import horloge from '../../public/horloge.webp'
import { useEffect, useState } from "react";
import { faGrip, faXmark } from "@fortawesome/free-solid-svg-icons";

const NavDashboard =()=>{
  const [curr, setCurr] = useState(null)

  const openDetails = (e) =>{
    setCurr(e.currentTarget.id) //open task if the index is selected
  }

  const [openBar , isOpenBar] = useState(false) //open the sidebar
  
  const d = new Date()

  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

   const currDay = { day : day[d.getDay()] , month : month[d.getMonth()] , year :  d.getFullYear()}
   const yesterday = { day :  day[d.getDay() -1] , month : month[d.getMonth()] , year :  d.getFullYear()}
   const tomorrow = { day :  day[d.getDay() +1] , month : month[d.getMonth()], year :  d.getFullYear()}
   
   const calendar = [yesterday , currDay , tomorrow]

  {/*Call the API */}

  const [tasks , setTasks] = useState([])

  let controller = new AbortController();

  const getTasks = async () => {
   await fetch("http://localhost:3000/api/task/get" ,{ signal :controller.signal })
    .then((res)=> res.json())
    .then((data)=> setTasks(...tasks, data))
    .catch((err) => console.error(err))
  }

  useEffect(()=>{
    controller = new AbortController();
    getTasks()
    return () => controller?.abort()  
  },[])






  return(
    <>
      {/*open side navbar */}
      <div className="fixed top-10 left-10 z-10 ">
            <button onClick={()=> isOpenBar(!openBar)} className='w-fit flex items-center gap-2 rounded-l-3xl rounded-b-3xl px-4 py-2 bg-amber-300 hover:scale-110 transition-all'>
              <FontAwesomeIcon icon={faGrip} size="2xl" style={{color: "white"}} />
            </button>
      </div>

      <div className={`${openBar ? 'w-full' : "-translate-x-full"} lg:translate-x-0 fixed z-10 p-10 bg-gray-50 lg:w-1/3 xl:w-1/4 h-full transition-all overflow-scroll`}>

          <div className="flex flex-col h-full">

          {/*Logo -  why Notes */}
          <div className="basis-1/6 flex items-start justify-between">

            <div className=' w-fit flex items-center gap-2 h-fit rounded-l-3xl rounded-b-3xl px-4 py-2 bg-amber-300'>
              <FontAwesomeIcon icon={faPenToSquare} size="xl" style={{color: "white"}} />
              <p className="text-2xl font-bold text-white">Why Notes</p>
            </div>

            {/*close de side bar*/}
            <button  onClick={()=> isOpenBar(false)} className="lg:hidden hover:rotate-90 transition-all">
              <FontAwesomeIcon icon={faXmark} style={{color: "991B1B"}} size="2xl" />
              </button>

          </div>

                {/*Pinned -  pinned notes  */}
              <div className="flex flex-col gap-4 basis-1/2 mt-5 p-2 md:p-16 lg:p-1">

                  {/*link to see all task*/}
                <div className="flex items-center justify-between">
                  <p className="text-2xl">Weelky Pinned</p>
                  <Link className="text-amber-400 hover:underline">View All</Link>
                </div>

                  {/*generate each tasks */}
                  { 
                    tasks.filter((item) => item.isPinned == true).slice(0,2).map((task , index)=>(
                          
                          <button key={index} id={index} className="p-2" onClick={openDetails}>
                            <div className="bg-white gap-3 grid grid-cols-4 rounded-lg shadow-md h-fit px-4 py-6 ">
                    
                            <div className="col-span-1 bg-amber-300 w-fit h-fit p-2 rounded-lg">
                                <img className=" w-8" src={horloge} alt="horloge" />
                            </div>
                    
                            <div className="col-span-3 text-start">
                                <p className="font-bold text-xl lg:text-xl">{task.title.length > 40 ? `${task.title.slice(0, 40)}...` : task.title }</p>
                    
                                {/*when click the details is visible */}
                                <div className={`${curr == index ? "": "hidden" }`}>
                                <p className="text-sm"> {task.date}</p>
                                <p className="mt-3 font-light text-amber-800">{task.content.length > 40 ? `${task.content.slice(0, 40)}...` : task.content }</p>
                                </div>
                    
                            </div>
                            
                          </div>
                        </button>
                    ))
                  }

                    {/*add new task */}
                      <Link className="p-2" >
                            <div className="bg-white grid grid-cols-4 rounded-lg shadow-md h-fit px-4 py-6 ">

                            <div className="col-span-1 bg-amber-300 w-fit h-fit  py-2 px-3 rounded-full">
                                <FontAwesomeIcon className="rotate-45" icon={faXmark} style={{color: "#fff"}} size="xl" />
                            </div>
                    
                            <div className="col-span-3 text-start flex items-center">
                                <p className="font-bold text-lg lg:text-2xl">Add a new Pinned Task</p>
                            </div>
                            
                            </div>
                        </Link> 
              </div>


              {/*Calendar -  Calendar */}
              <div className="flex w-full basis-2/6 mt-3" >
                <div className="w-full p-2 md:p-16 lg:p-5 flex flex-col gap-8">

                  <div className="flex justify-between items-center ">
                    <p className="text-2xl font-light">{d.getFullYear()}</p>
                    <p className="text-amber-400 font-bold">3 days</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 w-full  h-full">
                    { calendar.map((date,index)=>(
                        <div key={index} className=" flex flex-col  gap-8 h-full w-full p-5 bg-white shadow-md">
                              <p className="rounded-lg font-bold p-1 text-white bg-amber-400 text-2xl">{date.day}</p>
                              <div className="flex">
                                <p className="text-gray-300 text-sm ">Nothing register</p>
                                <div className="w-3 h-2 rounded-3xl bg-amber-300"></div>
                              </div>
                              <p className="font-bold">{date.month} - {date.year}</p>
                        </div>
                        ))
                      }    
                  </div>

                </div>

              </div>

          </div>
            
            
        
      </div>

    </>
   )
}

export default NavDashboard;