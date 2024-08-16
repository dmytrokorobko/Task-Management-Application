import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersThunk } from "../../store/slices/thunks/users/usersThunk";
import { UserItem } from "../../components/UserItem";

export const Users = () => {
   const users = useSelector(state => state.users.users);   
   const error = useSelector(state => state.users.error);   
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const isFirstRender = useRef(true);
   useEffect(() => {
      if (isFirstRender.current) {
         dispatch(usersThunk({navigate}));
         isFirstRender.current = false;
      }
   }, [navigate, dispatch]);
   return (
      <div>
         <h1>Users</h1>
         <ul className="tasks-list">
            {users && users.length > 0 ? (
               users.map((user, index) => (
                  <li key={index}><UserItem user={user} navigate={navigate} /></li>
               ))               
            ) : (
               <p>No users in your list...</p>               
            )}
         </ul>
         {error && <p className="server-error">{error}</p>}
      </div>
   )
}