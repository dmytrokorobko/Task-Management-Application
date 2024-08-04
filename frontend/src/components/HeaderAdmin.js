import { NavLink } from "react-router-dom"
import { HeaderPrivate } from "./HeaderPrivate"

export const HeaderAdmin = () => {
   return (
      <div className="header">
         <HeaderPrivate />         
         <nav>
            <ul>
               <li><NavLink to='/'>All Users</NavLink></li>
               <li><NavLink to='/'>Active Users</NavLink></li>
               <li><NavLink to='/'>Blocked Users</NavLink></li>
            </ul>
         </nav>
      </div>
   )
}