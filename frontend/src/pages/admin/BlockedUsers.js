import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usersThunk } from "../../store/slices/thunks/users/usersThunk";
import { UserItem } from "../../components/UserItem";

export const BlockedUsers = () => {
   const users = useSelector(state => state.users.users);   
   const error = useSelector(state => state.users.error);   
   const [filteredUsers, setFilteredUsers] = useState([]);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const isFirstRender = useRef(true);
   useEffect(() => {
      if (isFirstRender.current) {
         dispatch(usersThunk({navigate}));
         isFirstRender.current = false;
      }
   }, [navigate, dispatch]);
   useEffect(() => {
      if (users && users.length > 0) setFilteredUsers(users.filter(user => user.blocked !== 0));
   }, [users]);
   return (
      <div>
         <h1>Blocked Users</h1>
         <ul className="tasks-list">
            {filteredUsers && filteredUsers.length > 0 ? (
               filteredUsers.map((user, index) => (
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