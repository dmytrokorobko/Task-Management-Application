import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { PrivateLayout } from "../layouts/PrivateLayout";

const PrivateRoute = ({allowedRoles}) => {
   const user = useSelector(state => state.auth.user);
   const role = useSelector(state => state.auth.role);
   const location = useLocation();

   const hasRequiredRole = allowedRoles.includes(role);

   if (!user) return <Navigate to='/login' replace state={{from: location}} />;

   if (!hasRequiredRole) return <Navigate to='/page404' replace state={{from: location}} />;

   return (
      <>         
         {role === 'admin' ? <AdminLayout /> : <PrivateLayout />}         
      </>
   )
}

export default PrivateRoute;