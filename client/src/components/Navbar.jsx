import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";


 const Navbar =()=>{

  const [toggle , setToggle] = useState(false)

  return(
    <>
      <nav className="z-10 fixed top-0   w-full flex justify-between p-2 pt-10 md:p-10  ">
        {/*login and sign button */}
        <div className="flex">
          <Link className="border border-amber-400 p-2 pe-5 md:px-5 md:py-2 rounded-s-2xl text-amber-400  hover:border-0 hover:bg-black hover:text-white transition-all" to='/login'>Log in</Link>
          <Link className=" animate-slide-in-reverse bg-amber-400 p-2 md:px-5 md:py-2 rounded-2xl -ms-3 hover:bg-black hover:text-white transition-all" to="/sign">Sign Up</Link>
        </div>

     {/*Menu */}

        <div className="flex relative ">
          <button className="border border-amber-400 px-5 py-2 rounded-s-2xl text-amber-400 ">
            <FontAwesomeIcon icon={faBars} style={{color: "#fbbf24"}} />
            </button>
          <button onClick={()=>{ setToggle(!toggle)}}className=" bg-amber-400 px-5 py-2 rounded-2xl -ms-3 font-bold  hover:bg-black hover:text-white transition-all">Menu</button>

          <div className={`${toggle ? "" : 'hidden'} absolute  h-48 rounded-lg top-12 p-2 `}>
             <ul className="flex gap-x-4 lg:gap-x-10 h-fit w-28 flex-col gap-y-4 pt-3">
              <li><Link className="bg-amber-800 text-white rounded-full border border-white px-1 py-3 ps-2 pe-4 text-md lg:text-xl " to='/'>Home</Link></li>
              <li><Link className="bg-amber-200  rounded-full border border-white px-1 py-3 ps-2 pe-6 text-md lg:text-xl" to="sign">Sign In</Link></li>
              <li><Link className="bg-black text-white rounded-full border border-white px-1 py-3 ps-2 pe-2 text-md lg:text-xl" to="login">Login</Link></li>
              <li><Link className="font-light text-md lg:text-xl hover:underline" to="https://github.com/Ocece77">Github</Link></li>
             </ul>
          </div>
        </div>

      </nav>
    </>
   )
}
export default Navbar;