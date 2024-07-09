import { useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import  {signInFailure, signInStart, signInSuccess } from "../redux/userSlice";



const Login = () => {
  
  const currentUser = useSelector(state => state.user)
  const [resErr, setResErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.currentTarget.id]: e.currentTarget.value.trim() });
  };

  const controller = new AbortController();


  const getUser = async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll("input")
    inputs.forEach(input=>{input.setAttribute("disabled", "")
  })    
  inputs.forEach(input=>{  
    input.classList.add("cursor-not-allowed")
})    
    setLoading(true);
    dispatch(signInStart())
    try {
      const res = await fetch("/api/auth/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        signal: controller.signal,
        credential : true
      });

      const data = await res.json();

      if (!res.ok) {
        setResErr(true);
        dispatch(signInFailure());
        console.error("Email or password incorrect or doesn't exist");
      } else {
        setResErr(false);
        navigate("/dashboard?tab=todaytask");
        dispatch(signInSuccess(data));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);

      inputs.forEach(input=>{input.removeAttribute("disabled", "")
    })    
        inputs.forEach(input=>{  
          input.classList.remove("cursor-not-allowed")
      })

    }
  };


  const handleDefaultAccount  = () => {
    const inputEmail = document.querySelector('input[name="email"]')
    const inputPassword = document.querySelector('input[name="password"]')
    inputEmail.value = process.env.VITE_EMAIL_EXAMPLE 
    inputPassword.value = process.env.VITE_PASSWORD_EXAMPLE
    setForm({email : process.env.VITE_EMAIL_EXAMPLE , password: process.env.VITE_PASSWORD_EXAMPLE })
  }

  useEffect(() => {
  
  }, []);

  return(
    <>
    <div className="cursor-fancy pt-48">
        <div className="flex flex-col justify-center  items-center w-full  gap-y-10">
            <h1 className="text-5xl">Log<span className=" text-white bg-amber-500 px-5 rounded-full">in</span></h1>
             <p className="text-center">You don&apos;t have an <span className="text-amber-400 italic">account</span> <br /> <Link to="/sign" className="italic hover:underline">Click here to create one <span className="bg-amber-300 px-1 font-bold">now</span> !</Link></p>

            <form method='POST' onSubmit={getUser} name='login-form' id='login-form' className="flex flex-col gap-y-6 w-full items-center md:px-0  px-16 ">
              <input required onChange={handleChange} id="email" name="email" type="email" className="border rounded-lg  w-full md:w-1/2 lg:w-1/3 py-3  ps-4"  placeholder="e-mail *" />
              <input required onChange={handleChange} id="password" name="password" type="password" className="border rounded-lg  w-full md:w-1/2 lg:w-1/3 py-3  ps-4"  placeholder="password *" />

              <div className="flex flex-col gap-y-3">
                <button  onClick={handleDefaultAccount} type='submit'  className="font-bold border border-amber-400 text-amber-400 rounded-lg py-2 px-3 hover:bg-black hover:border-0 hover:text-white transition-all">Connected with the example account</button>

                <button type="submit" className={`${loading ? "hidden" : "inline"}font-bold bg-amber-400 rounded-lg py-2 px-3 hover:bg-black hover:border-0 hover:text-white transition-all `}>
                <span className={`${loading ? "hidden" : "inline"} font-bold`}>Login </span>

                <div role="status">
                    <svg aria-hidden="true" className={`${loading ? "inline cursor-wait" : "hidden"} w-8 h-8 text-gray-100 animate-spin dark:text-gray-200 fill-amber-400`} viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
                  
                  </button>
              </div>

               
              {resErr && <div  className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span>
                  <strong className="font-bold">Something went wrong!</strong>
                   The password or email is incorrect or the account doesn&apos;t exist.</span>
               </div>}

               {  currentUser.accountCreated && <div  className=" bg-lime-100 border border-lime-400 text-lime-700 px-4 py-3 rounded relative" role="alert">
                <span>
                  <strong className="font-bold">Your account has been created ! </strong>
                  Connect with your account to start using whyNotes !</span>
               </div>}
                
            </form>
        </div>
    </div>
    </>
   )
}

export default Login