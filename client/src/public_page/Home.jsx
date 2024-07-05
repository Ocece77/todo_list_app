import AnimatedCursor from "react-animated-cursor"
import Content from "../components/Content"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const Home =()=>{
 return(
  <>  
   <AnimatedCursor  
     innerSize={20}
     outerSize={15}
      color='251, 191, 36'
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}/>

  <div className="relative w-full">
      <Navbar/>
      <Hero/>
      <Content/>

  </div>


  </>
 )
}

export default Home