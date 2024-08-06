import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { logoutThunk } from "../../store/slices/thunks/auth/logoutThunk";

export const Logout = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(logoutThunk({navigate}));
   }, [dispatch, navigate]);

   return null;
}