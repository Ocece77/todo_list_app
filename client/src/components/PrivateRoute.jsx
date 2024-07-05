import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PropTypes } from "prop-types";

 const PrivateRoute = () =>{
  const [isConnected , setIsConnected] = useState(true)
  return isConnected ? <Outlet/>  : <Navigate to="/login"/>
}

PrivateRoute.propTypes={
  children : PropTypes.element
}

export default PrivateRoute;