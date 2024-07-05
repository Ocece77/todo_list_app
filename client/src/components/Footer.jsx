import { Link } from "react-router-dom";
import gif from "../../public/smileyheygif.gif"


const Footer =()=>{
  
  return(

      <div className="absolute grid md:grid-cols-3 w-screen  gap-y-10 p-10  bg-amber-600">
         <div className="col-span-2">
             <p className="text-5xl text-white font-bold mb-16">Navigation</p>
             <ul className="flex gap-x-4 lg:gap-x-10">
              <li><Link className="text-white rounded-full border border-white p-3 lg:px-7 lg:py-3  text-md lg:text-xl hover:underline transition-all " to='/'>Home</Link></li>
              <li><Link className="text-white rounded-full border border-white p-3 lg:px-7 lg:py-3  text-md lg:text-xl hover:underline transition-all " to="sign">Sign In</Link></li>
              <li><Link className="text-white rounded-full border border-white p-3 lg:px-7 lg:py-3  text-md lg:text-xl hover:underline transition-all" to="login">Login</Link></li>
              <li><Link className="bg-black text-white font-bold rounded-full border border-white p-3 lg:px-7 lg:py-3  text-md lg:text-xl hover:underline transition-all" to="https://github.com/Ocece77">Github</Link></li>
             </ul>
         </div>


         <div className="flex  md:justify-end pe-20">
            <img src={gif} alt="gif" className="object-contain w-1/2" />
         </div>

      </div>

   )
}

export default Footer;