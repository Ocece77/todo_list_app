import Slider from 'react-infinite-logo-slider'
import { Link } from 'react-router-dom'
import Scene from './Scene'
import Footer from './Footer'



const Content =()=>{
  
  return(
    <>
      <div  id="content" className="pt-16 h-screen">
      {/*infinite scroller */}
            <div className='w-screen border-y-4 border-stone-950 h-fit py-10'>
            <Slider 
              duration={20}
              blurBoderColor={'#fff'}>

              <Slider.Slide>
              <p className='font-bold text-3xl inline'>Take some </p>
              </Slider.Slide>
              <Slider.Slide>
              <p className='font-bold text-3xl inline bg-amber-400 p-3'>notes</p>
              </Slider.Slide>
              <Slider.Slide>
              <p className='font-bold text-3xl inline'>Take some </p>
              </Slider.Slide>
              <Slider.Slide>
              <p className='font-bold text-3xl inline bg-amber-400 p-3'> notes</p>
              </Slider.Slide>
          
          </Slider>
              
            </div>
            
        {/*content */}
          <div className='mt-10 flex w-full items-center flex-col'>

            <div className='flex flex-col gap-y-4 items-center text-center  md:w-1/2'>
              <p className='font-light '>Start writting your note </p>
              <p className='text-3xl'>Discover the <span className='text-amber-400 italic'>ultimate</span> tool for organizing your tasks and <span className='text-amber-400 font-bold underline'>achieving your goals </span> with ease.</p>
              <Link to="/sign" className='bg-black text-white p-4 w-fit rounded-full font-light transition-all hover:border hover:border-black hover:bg-transparent hover:text-black'>Write your first notes</Link>
            </div>
            

          </div>

         {/* draggable object */}
         <div>
         {/*only visible on tablet or mobile screen */}
         <picture className=' md:hidden w-full flex justify-center py-14'>
            <source srcSet="https://fonts.gstatic.com/s/e/notoemoji/latest/270c_fe0f/512.webp" type="image/webp"/>
            <img src="https://fonts.gstatic.com/s/e/notoemoji/latest/270c_fe0f/512.gif" alt="✌" width={200} height={200}/>
        </picture>
        {/*only visible on laptop screen */}
           <Scene/>
         </div>

         <Footer/>



      </div>
    </>
   )
}

export default Content