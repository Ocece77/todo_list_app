import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signoutSuccess } from "../redux/userSlice";
import avatar from "../../public/avatar10.png"
 const ProfilSideBar = () =>{

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) =>state.user);
  const [quote , setQuote] = useState([])
  const controller = new AbortController()


  //get a quote from ninja api
  const getQuote = async ()=>{
     await fetch("https://api.api-ninjas.com/v1/quotes?category=happiness",{
      headers: { 'X-Api-Key': process.env.VITE_QUOTE_API_KEY},
      signal : controller.signal,
    })
     .then((res)=> res.json())
     .then((data) => data[0] && data[0].quote.length < 100 ? setQuote([data[0].author , data[0].quote]) : getQuote())
     .catch((err)=>console.error(err))
  }


//triggered when the user logout
  const handleLogOut =()=>{
    navigate("/login")
    dispatch(signoutSuccess())
  }
  
  const [currTime, setCurrTime] = useState(new Date())

  useEffect(()=>{
  getQuote()
    var clock = setInterval(()=> setCurrTime(new Date()) , 1000)
    return () =>{
      clearInterval(clock)
      controller.abort()
    }
  },[])


  return(
    <>

    <div  className="basis-1/5 fixed  lg:relative lg:hidden  top-2 right-0 p-8 text-end">

            <div className="flex gap-2 items-end w-fit">

              <div>
                <p className="font-bold text-xl capitalize">{currentUser.username}</p>
                  <Link to='/dashboard?tab=settings' className="text-sm block  hover:underline">Settings</Link>
                  <button onClick={handleLogOut}  className="font-bold text-sm text-red-800 hover:underline">Log Out</button>
              </div>
              
              <div className="w-fit mb-5">
              <img className="w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar"/>
              </div>
                
          </div>
    </div>


     <div className="hidden lg:flex lg:fixed top-5 bottom-5 right-3 bg-amber-400 rounded-3xl w-1/5  flex-col items-end gap-10 ">

        {/*Name */}
          <div className="basis-1/5 text-end h-full py-8 pe-3">
          <div className="flex gap-2 items-end w-fit">

          <div>
            <p className="font-bold text-lg capitalize">{currentUser.username}</p>
              <div className="flex gap-3 justify-end">
              <Link to='/dashboard?tab=settings' className="text-sm block  hover:underline">Settings</Link>
              <button onClick={handleLogOut}  className="font-bold text-sm text-red-800 hover:underline">Log Out</button>
              </div>
          </div>

          <div className="w-fit">
          <img className="w-10 h-10 rounded-full" src={avatar} alt="Rounded avatar"/>
          </div>
            
          </div>

        </div>

        {/*current time */}

        <div className=" basis-1/5  w-full px-2 ">
          <div className="flex flex-col gap-2 h-full bg-gray-100 rounded-2xl shadow-md py-10 px-4">
             <p className="text-amber-600 text-2xl ">Current Time ⏰</p>
             <p className="text-sm text-amber-500">(UTC+2)</p>
             <p className="font-bold text-4xl">{currTime.getHours()}:{currTime.getMinutes()}:{currTime.getSeconds()} </p>
          </div>
        </div>

        {/*Today quotes */}
        <div className="basis-2/5 w-full px-2 ">
          <div className="flex flex-col gap-5 h-72 bg-amber-100 rounded-2xl shadow-md py-6 px-4 ">
             <h1 className="text-2xl font-bold">Quotes about Hapiness ✨ </h1>

              <blockquote className="flex flex-col gap-5">
                <em >&quot;{ quote[1] }&quot;</em>
                <p className="font-bold text-end" >-{ quote[0] }</p>
              </blockquote>

     
          </div>
        </div>



      </div>
    
    </>
     
  )
 }
export default ProfilSideBar