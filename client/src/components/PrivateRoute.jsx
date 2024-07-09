import { Navigate, Outlet } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useSelector } from "react-redux";

 const PrivateRoute = () =>{
  const currentUser = useSelector(state => state.user)
  return currentUser.currentUser ? <Outlet/>  : <Navigate to="/login"/>
}

PrivateRoute.propTypes={
  children : PropTypes.element
}

export default PrivateRoute;