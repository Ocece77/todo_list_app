import {Routes , Route , Outlet} from 'react-router-dom'
import  Home  from './public_page/Home'
import  Login  from './public_page/Login'
import  Sign  from './public_page/Sign'
import  Error  from './public_page/Error'
import  PrivateRoute  from './components/PrivateRoute'
import  Dashboard  from './private_page/Dashboard'
import  NavDashboard  from './components/NavDashboard'
import  Navbar  from './components/Navbar'


const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

const PrivateLayout = () => (
  <>
    <NavDashboard />
    <Outlet />
  </>
);


const App = () => {


  return (
    <>
    <Routes>

      {/*Public routes */}
      <Route element={<PublicLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign" element={<Sign/>}/>
          <Route path="*" element={<Error/>}/>
          <Route path="/dashboard"  element={<Dashboard />}/>

      </Route>

      {/*Privates routes */}
        <Route element={<PrivateRoute/>}>
          <Route element={<PrivateLayout />}>
          <Route path="/dashboard"  element={<Dashboard />}/>
          </Route>
        </Route>


    </Routes>
    </>
  )
}




export default App