import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import image from "../../public/imagehero.jpg"
import { faArrowDown, faPersonRays } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import circularText from "../../public/svgtext.svg"

const Hero =()=>{
  return(
   <>
    <div className="p-5 grid grid-cols-1 md:grid-cols-2 md:gap-y-10 h-screen">

    <div className="relative pt-40 flex flex-col gap-y-5 md:gap-y-20 lg:gap-y-7">

      <em className="font-light text-sm ">Your tools to keep <span className="font-bold not-italic">everything</span>  fine</em>
      
      <h1 className="capitalize tracking-[.03em] leading-tight  pe-10 lg:pe-0 text-5xl md:text-6xl lg:text-8xl animate-slide-in -z-30">
        taking <span className="font-bold bg-amber-400 px-3 italic">notes</span> for those who forget
       </h1>

          <div className="relative  grid grid-cols-2">

              <Link to="/sign" className="animate-pop-in relative text-start h-fit  w-fit border border-amber-400 px-5 py-2 rounded-s-2xl text-amber-400 hover:bg-neutral-800 hover:border-none hover:font-bold transition-all hover:text-amber-400">Get Started
                <FontAwesomeIcon className="absolute -right-4 bg-amber-400 rounded-full p-1.5  transition-all hover:translate-y-1 hover:-translate-x-1 " icon={faPersonRays}  size="xs" style={{color: "white"}} /> 
              </Link>

              <div className="relative col-span-1">
                  <img src={circularText} alt="free to use" className="animate-spin-slow  absolute -top-10 right-10  lg:w-60 md:w-40 w-28 " />
                </div>
          </div>

            </div>

    <div className="overflow-hidden flex items-center h-48 md:h-full object-center rounded-2xl">
      <img className="object-cover object-center  w-full rounded-2xl" src={image} alt="image hero " />
    </div>

    </div>

   <div className="w-full -mt-12 flex justify-center z-50 ">
   <a href="#content" className="mx-auto  animate-bounce bottom-0 rounded-full bg-amber-400 w-fit px-3 py-2  ">
      <FontAwesomeIcon icon={faArrowDown} size='xl' style={{color: "#ffffff",}} />
    </a>
   </div>
 
   </>
  )
 }
 
 export default Hero