import { useEffect, useState } from "react"


 const ProfilSideBar = () =>{


  const [quote , setQuote] = useState([])
//api for daily quotes
  let controller = new AbortController();
  const getQuote = async ()=>{
     await fetch("https://api.api-ninjas.com/v1/quotes?category=happiness",{
      headers: { 'X-Api-Key': process.env.QUOTE_API_KEY},
      signal: controller.signal,
    })
     .then((res)=> res.json())
     .then((data) => data[0] && data[0].quote.length < 100 ? setQuote([data[0].author , data[0].quote]) : getQuote())
     .catch((err)=>console.error(err))
  }
  
  const [currTime, setCurrTime] = useState(new Date())
   
  useEffect(()=>{
    var clock = setInterval(()=> setCurrTime(new Date()) , 1000)
    return () =>{clearInterval(clock)}
  },[])

  useEffect(()=>{
    controller = new AbortController();

    getQuote()
    return () => controller?.abort(); //arrêter de faire un requête à l'api
},[])


  return(
    <>

    <div className="basis-1/5 fixed  lg:relative lg:hidden  top-2 right-0 p-8">
          <p className="font-bold ">User Name</p>
          <p className="text-sm text-amber-600 hover:underline">Settings</p>
    </div>


     <div className="hidden lg:flex lg:fixed top-5 bottom-5 right-3 bg-amber-400 rounded-3xl w-1/5  flex-col items-end gap-10 ">

        {/*Name */}
        <div className="basis-1/5 text-end w-full h-full p-8">

          <p className="font-bold text-2xl">User Name</p>
          <p className="font-bold text-white hover:underline">Settings</p>

        </div>

        {/*current time */}

        <div className=" basis-1/5 self-center w-full px-2 ">
          <div className="flex flex-col gap-2 h-full bg-gray-100 rounded-2xl shadow-md py-10 px-4 ">
             <h1 className="text-amber-600">Current Time ⏰</h1>
             <p className="text-sm -mt-3 text-amber-500">(UTC+2)</p>
             <p className="font-bold text-5xl">{currTime.getHours()}:{currTime.getMinutes()}:{currTime.getSeconds()} </p>
          </div>
        </div>

        {/*Today quotes */}
        <div className="basis-2/5 self-center w-full px-2 ">
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