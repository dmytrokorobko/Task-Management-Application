import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { editUserThunk } from "../../store/slices/thunks/users/editUserThunk";
import { EditUser } from "../../components/EditUser";

export const User = () => {
   const { id } = useParams();
   const [user, setUser] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [error, setError] = useState(null);
   useEffect(() => {
      const fetchTask = async () => {
         try {
            const result = await dispatch(editUserThunk({id, navigate})).unwrap();            
            if (!result.error) {               
               setUser(result.user);
            }
         } catch (err) {
            setError(err);
         }
      }
      fetchTask();
   }, [dispatch, id, navigate]);
   return (
      <div>
         <h1>Edit user</h1>
         {!user ? (
            <p>{error}</p>
         ) : (
            <EditUser id={user.id} username={user.username} role={user.role} blocked={user.blocked} />
         )}
      </div>
   )
}