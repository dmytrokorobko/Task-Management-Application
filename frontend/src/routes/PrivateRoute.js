import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = ({allowedRoles}) => {
   const user = useSelector(state => state.auth.user);
   const role = useSelector(state => state.auth.role);
   const location = useLocation();

   const hasRequiredRole = allowedRoles.includes(role);

   return (
      user && hasRequiredRole ? (
         <Outlet />
      ) : user ? (
         <Navigate to='/page404' replace state={{from: location}} />
      ) : (
         <Navigate to='/login' replace state={{from: location}} />
      )
   )
}

export default PrivateRoute;