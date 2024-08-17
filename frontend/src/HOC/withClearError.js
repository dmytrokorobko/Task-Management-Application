import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom";
import { clearError as clearErrorTasks } from "../store/slices/tasksSlice";
import { clearError as clearErrorAuth } from "../store/slices/authSlice";
import { clearError as clearErrorUsers } from "../store/slices/usersSlice";

const withClearError = (WrappedComponent) => {
   return (props) => {
      const dispatch = useDispatch();
      const location = useLocation();

      useEffect(() => {
         dispatch(clearErrorTasks());
         dispatch(clearErrorAuth());
         dispatch(clearErrorUsers());
      }, [location, dispatch]);

      return <WrappedComponent {...props} />;
   }
}

export default withClearError;