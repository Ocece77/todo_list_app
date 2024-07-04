import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavDashboard  from "../components/NavDashboard"
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import horloge from '../../public/horloge.webp'
import ProfilSideBar from "../components/ProfilSideBar";

const Dashboard =()=>{

  const d =new Date
  const day = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
   

  const [tasks , setTasks] = useState([])

  const getTasks = async () => {
    await fetch("http://localhost:3000/api/task/get")
    .then((res)=> res.json())
    .then((data)=> setTasks(...tasks, data))
    .catch((err) => console.error(err))
  }
  
  useEffect(()=>{
    getTasks()
  },[])



  return(
    <>
    <div className="grid grid-cols-4">

    <nav className="lg:relative fixed col-span-1 h-full z-10">
      <NavDashboard/>
    </nav>

    <main className="col-span-full lg:col-span-3 grid grid-cols-3 relative ms-20 py-20 px-10" >

      <div className="col-span-full lg:col-span-2 flex flex-col gap-10">

      {/* Header with the date and the add button*/}
        <div className=" w-full basis-1/5 grid grid-cols-4">

            {/* current date*/}
              <div className="col-span-3">
                <h1 className="text-5xl font-medium">Today&apos;s schedules</h1>
                <h1 className="text-5xl text-amber-400 mt-3">{day[d.getDay()]} {d.getDate()}</h1>
              </div>

            {/* add button*/}

            <div className=" mt-5 md:mt-0 col-span-full md:col-span-1">
            {/* screen > md only */}
              <button className="hidden md:block col-span-1 bg-amber-300 w-fit h-fit  p-4 lg:p-6  rounded-b-3xl rounded-se-3xl ">
                  <FontAwesomeIcon className="rotate-45" icon={faXmark} style={{color: "#fff"}} size="2xl" />
                </button>

                {/*sm only */}
                <button className="md:hidden visible col-span-1 text-white font-bold bg-amber-300 rounded-md  w-fit h-fit  p-2 lg:p-6  ">
                  add new tasks
                </button>
            </div>

          </div>

        {/* Content with all the task for the day*/}
        <div className=" basis-1/5">
            <div className="grid grid-cols-1 w-full overflow-scroll">
            {/*generate each tasks */}
              { 
                tasks.filter((item) => item.date.split("-")[2] == d.getDate() ).map((task , index)=>(
                      <button key={index} id={index} className="p-2" >
                        <div className="bg-white grid grid-cols-4 rounded-lg shadow-md h-fit px-4 py-6 ">
                
                        <div className="col-span-1 bg-amber-300 w-fit h-fit p-2 rounded-lg">
                            <img className=" w-8" src={horloge} alt="horloge" />
                        </div>
                
                        <div className="col-span-3 text-start">
                            <p className="font-bold text-xl lg:text-2xl">{task.title}</p>
                            <p className="text-sm"> {task.date}</p>
                            <p className="mt-3 font-light text-amber-800">{task.content.length > 40 ? `${task.content.slice(0, 40)}...` : task.content }</p>
    
                
                        </div>
                        
                      </div>
                    </button>
                ))
              }
              { 
                tasks.filter((item) => item.date.split("-")[2] == d.getDate() ).map((task , index)=>(
                      <button key={index} id={index} className="p-2" >
                        <div className="bg-white grid grid-cols-4 rounded-lg shadow-md h-fit px-4 py-6 ">
                
                        <div className="col-span-1 bg-amber-300 w-fit h-fit p-2 rounded-lg">
                            <img className=" w-8" src={horloge} alt="horloge" />
                        </div>
                
                        <div className="col-span-3 text-start">
                            <p className="font-bold text-xl lg:text-2xl">{task.title}</p>
                            <p className="text-sm"> {task.date}</p>
                            <p className="mt-3 font-light text-amber-800">{task.content.length > 40 ? `${task.content.slice(0, 40)}...` : task.content }</p>
    
                
                        </div>
                        
                      </div>
                    </button>
                ))
                
              }
            </div>
            

        </div>

      </div>

      <div className="relative col-span-1 h-full ">
        <ProfilSideBar/>
      </div>

    </main>
   
      
    </div>
   

 
    </>
   )
}

export default Dashboard
