import { NavLink } from "react-router-dom"
import { HeaderPrivate } from "./HeaderPrivate"

export const HeaderAdmin = () => {
   return (
      <div className="header admin">
         <HeaderPrivate />         
         <nav>
            <ul>
               <li><NavLink to='/users'>All Users</NavLink></li>
               <li><NavLink to='/users/active'>Active Users</NavLink></li>
               <li><NavLink to='/users/blocked'>Blocked Users</NavLink></li>
            </ul>
         </nav>
      </div>
   )
}