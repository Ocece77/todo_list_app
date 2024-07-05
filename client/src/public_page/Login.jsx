import { Link } from "react-router-dom"

const Login =()=>{



  return(
    <>
    <div className="mt-48">
        <div className="flex flex-col justify-center  items-center w-full  gap-y-10">
            <h1 className="text-5xl">Log<span className="text-white bg-amber-500 px-5 rounded-full">in</span></h1>
             <p className="text-center">You don&apos;t have an <span className="text-amber-400 italic">account</span> <br /> <Link to="/sign" className="italic hover:underline">Click here to create one <span className="bg-amber-300 px-1 font-bold">now</span> !</Link></p>
            <div className="flex flex-col gap-y-6 w-full items-center md:px-0  px-16 ">
            <input name="email" type="email" className="border rounded-lg  w-full md:w-1/2 lg:w-1/3 py-3  ps-4"  placeholder="e-mail *" />
              <input name="password" type="password" className="border rounded-lg  w-full md:w-1/2 lg:w-1/3 py-3  ps-4"  placeholder="password *" />
              <div className="flex flex-col gap-y-3">
                <button className="font-bold border border-amber-400 text-amber-400 rounded-lg py-2 px-3 hover:bg-black hover:border-0 hover:text-white transition-all">Connected with the example account</button>
                <button className="font-bold bg-amber-400 rounded-lg py-2 px-3 hover:bg-black hover:border-0 hover:text-white transition-all">Login</button>
              </div>
            </div>
        </div>
    </div>
    </>
   )
}

export default Login