import { NavLink } from "react-router-dom"

export const HeaderPrivate = () => {
   return (
      <div className="header">
         <nav>
            <ul>
               <li><NavLink to='/' className='new-task'>New Task</NavLink></li>
               <li><NavLink to='/'>All Tasks</NavLink></li>
               <li><NavLink to='/'>Pending Tasks</NavLink></li>
               <li><NavLink to='/'>Completed Tasks</NavLink></li>
               <li><NavLink to='/'>Logout</NavLink></li>
            </ul>
         </nav>
      </div>
   )
}