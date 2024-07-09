import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const NotFound =()=>{
  const  currentUser  = useSelector((state) =>state.user);
  return(
   <>
   <section className="bg-white dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-amber-600 dark:text-amber-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-amber-900 md:text-4xl dark:text-white">Something&apos;s missing.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-amber-400">Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page. </p>
            <Link to={`${currentUser.loggedIn ? "/dashboard?tab=alltask": "/" }`} className="inline-flex text-white bg-amber-600 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-amber-900 my-4">Back to Homepage</Link>
        </div>   
    </div>
</section>
   </>
  )
 }

 export default NotFound