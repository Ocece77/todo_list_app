import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


 const Navbar =()=>{
  const currentUser = useSelector(state => state.user)
  const [toggle , setToggle] = useState(false)

  return(
    <>
      <nav className="z-10 fixed top-0  cursor-default  w-full flex justify-between p-2 pt-10 md:p-10  ">
        {/*login and sign button */}
        <div className="flex">
          <Link className="border border-amber-400 p-2 pe-5 md:px-5 md:py-2 rounded-s-2xl text-amber-400  hover:border-0 hover:bg-black hover:text-white transition-all" to='/login'>Log in</Link>
          <Link className=" animate-slide-in-reverse bg-amber-400 p-2 md:px-5 md:py-2 rounded-2xl -ms-3 hover:bg-black hover:text-white transition-all" to="/sign">Sign Up</Link>
        </div>

     {/*Menu */}

        <div className="flex relative  cursor-default">
          <button className="border border-amber-400 px-5 py-2 rounded-s-2xl text-amber-400 ">
            <FontAwesomeIcon icon={faBars} style={{color: "#fbbf24"}} />
            </button>
          <button onClick={()=>{ setToggle(!toggle)}}className=" bg-amber-400 px-5 py-2 rounded-2xl -ms-3 font-bold  hover:bg-black hover:text-white transition-all">Menu</button>

          <div className={`${toggle ? "" : 'hidden'} absolute  h-48 rounded-lg top-12 p-2 `}>
             <ul className="flex gap-x-4 lg:gap-x-10 h-fit w-28 flex-col gap-y-6 pt-3">
              {/*only when the user is logged in */}
             {currentUser.isLoggedIn 
           && <li  onClick={()=>{ setToggle(false)}}><Link className="bg-amber-300  rounded-full border-2 border-amber-200  p-2 pe-9 text-md lg:text-xl hover:bg-black hover:text-white hover:border-neutral-400 transition-all " to="/dashboard?tab=todaytask">Dashboard</Link></li> }

              <li  onClick={()=>{ setToggle(false)}}><Link className="bg-amber-300  rounded-full border-2 border-amber-200 p-2 pe-9 text-md lg:text-xl hover:bg-black hover:text-white hover:border-neutral-400 transition-all " to='/'>Home</Link></li>

              {!currentUser.isLoggedIn &&(
                <>
                  <li  onClick={()=>{ setToggle(false)}}><Link className="bg-amber-300  rounded-full border-2 border-amber-200  p-2 pe-9 text-md lg:text-xl hover:bg-black hover:text-white hover:border-neutral-400 transition-all " to="/sign">SignUp</Link></li>
                  <li  onClick={()=>{ setToggle(false)}}><Link className="bg-amber-300  rounded-full border-2 border-amber-200  p-2 pe-9 text-md lg:text-xl hover:bg-black hover:text-white hover:border-neutral-400 transition-all " to="/login">Login</Link></li>
                </>
              )}

              <li  onClick={()=>{ setToggle(false)}}><Link className="lg:text-xl niceday-text p-2 pe-2 text-md font-extrabold hover:text-opacity-20 transition-all " to="https://github.com/Ocece77">My Github</Link></li>
             </ul>
          </div>
        </div>

      </nav>
    </>
   )
}
export default Navbar;