import { useSelector } from "react-redux"

export const Tasks = () => {
   const user = useSelector(state => state.auth.user);
   const role = useSelector(state => state.auth.role);
   return (
      <div>
         <h1>All Tasks</h1>
         <p>User: {user}</p>
         <p>Role: {role}</p>
      </div>
   )
}