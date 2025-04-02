import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { accountCreatedFailed, accountCreatedSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import DOMPurify from 'dompurify';

const Sign = () => {

  const [resErr, setResErr] = useState(null)
  const [loading , isLoading] = useState(null)
  const [passwordError , setPasswordError] = useState(null)
  const [form , setForm] = useState({
    firstname:"",
    lastname:"",
    username :"",
    email:'',
    password:''
  })

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const sanitizedValue = DOMPurify.sanitize(e.currentTarget.value.trim());
    setForm({ ...form, [e.currentTarget.id] : sanitizedValue })
  }

  const createUser = async (e) => {
    e.preventDefault();
    if(form.password.length < 4 ){
      setPasswordError(true)
      return;
    }
    isLoading(true)
    try{
      const res = await fetch("/api/auth/sign",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
       })

       if (!res.ok){
        console.error("The account already exist")
        setResErr(true)
        dispatch(accountCreatedFailed())

       } else{
        setResErr(false)
        navigate("/login")
        dispatch(accountCreatedSuccess())
       }

    } catch (e){
      console.error(e)
    }finally {
      isLoading(false);
    }
  }



  return(
    <>
    <div className="pt-10 cursor-fancy ">
        <div className="flex flex-col justify-center  items-center w-full  gap-y-10">
            <h1 className="text-5xl">Sign<span className="text-white bg-black italic px-5 rounded-full font-bold">Up</span></h1>
             <p className="text-center ">You have an <span className="text-amber-500 italic underline">account</span> <br /> <Link to="/login" className="italic hover:underline">Click here to connect right <span className="bg-amber-300 px-1 font-bold">now</span> !</Link></p>
            <form method='POST' onSubmit={createUser} className="flex flex-col gap-y-6 w-full items-center md:px-0  px-16 ">
              <input required onChange={handleChange} id='firstname' name="firstname" type="text" className="border rounded-lg w-full md:w-1/2 lg:w-1/3 py-3  ps-4" maxLength={30} placeholder="firstname *" />
              <input required onChange={handleChange} id='lastname'  name="lastname" type="text" className="border rounded-lg w-full md:w-1/2 lg:w-1/3 py-3  ps-4" maxLength={30} placeholder="lastname *" />
              <input required onChange={handleChange} id='username'  name="username" type="text" className="border rounded-lg w-full md:w-1/2 lg:w-1/3 py-3  ps-4" maxLength={30} placeholder="username *" />
              <input required onChange={handleChange} id='email'  name="email" type="email" className="border rounded-lg  w-full md:w-1/2 lg:w-1/3 py-3  ps-4" maxLength={50} placeholder="e-mail *" />
              <input required onChange={handleChange} id='password'  name="password" type="password" className="border rounded-lg  w-full md:w-1/2 lg:w-1/3 py-3  ps-4" minLength={5}  placeholder="password *" />
             
             { passwordError && <div className="mt-2 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
                <span className="font-bold">Password</span> The pasword should have at least 8 characters
              </div>}

              <div className="flex flex-col gap-y-3">
                <button type="submit" className="font-bold hover:bg-amber-400 hover:border-2 border-black rounded-lg py-2 px-3 bg-black  text-white transition-all">
                  <span className={`${loading ? "hidden" : "inline"} niceday-text text-lg`}>Sign Up </span>
                 
                <div role="status">
                    <svg aria-hidden="true" className={`${loading ? "inline" : "hidden"} w-8 h-8 text-gray-100 animate-spin dark:text-gray-200 fill-amber-400`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                
                </button>
              </div>

              
              <div  className={`${resErr ? "block" :  "hidden"} bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative `}role="alert">
                <span>
                  <strong className="font-bold">Something went wrong! </strong>
                   The account already exist.</span>
               </div>
                
            </form>
        </div>
    </div>
    </>
   )
}

export default Sign