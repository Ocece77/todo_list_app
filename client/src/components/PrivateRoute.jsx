import { useState } from "react";
import { Navigate } from "react-router-dom";
import { PropTypes } from "prop-types";

 const PrivateRoute = ({children}) =>{
  const [isConnected , setIsConnected] = useState(false)
  return isConnected ? children : <Navigate to="/login"/>
}

PrivateRoute.propTypes={
  children : PropTypes.element
}

export default PrivateRoute