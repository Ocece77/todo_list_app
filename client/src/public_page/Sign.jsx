import { Link } from "react-router-dom"

const Sign =()=>{
  return(
    <>
    <div className="mt-28">
        <div className="flex flex-col justify-center  items-center w-full  gap-y-10">
            <h1 className="text-5xl">Sign<span className="text-white bg-black italic px-5 rounded-full font-bold">Up</span></h1>
             <p className="text-center ">You have an <span className="text-amber-500 italic underline">account</span> <br /> <Link to="/login" className="italic hover:underline">Click here to connect right <span className="bg-amber-300 px-1 font-bold">now</span> !</Link></p>
            <div className="flex flex-col gap-y-6 w-full items-center md:px-0  px-16 ">
              <input name="firstname" type="text" className="border rounded-lg w-full md:w-1/2 lg:w-1/3 py-3  ps-4"  placeholder="firstname *" />
              <input name="lastname" type="text" className="border rounded-lg w-full md:w-1/2 lg:w-1/3 py-3  ps-4"  placeholder="lastname *" />
              <input name="username" type="text" className="border rounded-lg w-full md:w-1/2 lg:w-1/3 py-3  ps-4"  placeholder="username *" />
              <input name="email" type="email" className="border rounded-lg  w-full md:w-1/2 lg:w-1/3 py-3  ps-4"  placeholder="e-mail *" />
              <input name="password" type="password" className="border rounded-lg  w-full md:w-1/2 lg:w-1/3 py-3  ps-4"  placeholder="password *" />
              <div className="flex flex-col gap-y-3">
                <button className="font-bold border border-amber-400 text-amber-400 rounded-lg py-2 px-3 hover:bg-black hover:border-0 hover:text-white transition-all">Connected with the example account</button>
                <button className="font-bold hover:bg-amber-400 hover:border-2 border-black rounded-lg py-2 px-3 bg-black  text-white transition-all">Sign In</button>
              </div>

            </div>
        </div>
    </div>
    </>
   )
}

export default Sign