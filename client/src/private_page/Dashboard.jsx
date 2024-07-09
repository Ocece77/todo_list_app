import NavDashboard  from "../components/NavDashboard"
import { useEffect, useState } from "react";
import ProfilSideBar from "../components/ProfilSideBar";
import TodayTask from "./TodayTask";
import { useLocation} from 'react-router-dom';
import NotFound from "../public_page/NotFound";
import AllTask from "./AllTask";
import AddTask from "./AddTask";
import Settings from "./Settings";

const Dashboard = () =>{


  const location = useLocation();

  const [tab, setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  },[location.search]);

  const renderContent = () => {
    switch (tab) {
      case 'todaytask':
        return  <TodayTask/>;
      case 'alltask':
        return  <AllTask />;
        case 'addtask':
          return  <AddTask />;
        case 'settings':
          return  <Settings />;
      default:
        return <NotFound/>; // Default content or home dashboard content
    }
  };




  return(

    <>
    <div className="grid grid-cols-4 cursor-default ">

    <nav className="lg:relative fixed col-span-1 h-full z-10">
      <NavDashboard/>
    </nav>

    <main className="col-span-full lg:col-span-3 grid grid-cols-3 relative ms-20 py-20 px-10" >

      <div className="col-span-full lg:col-span-2 flex flex-col gap-10 -ms-16 pt-10 md:pt-0  md:-ms-5 lg:-ms-20 lg:ps-20  ">
    
        {renderContent()}

      </div>

    </main>
   
    <div className="relative col-span-1 h-full ">
        <ProfilSideBar/>
      </div>

    </div>
   

 
    </>
   )
}

export default Dashboard
