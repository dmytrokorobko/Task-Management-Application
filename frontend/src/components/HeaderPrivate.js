import { NavLink } from "react-router-dom"

export const HeaderPrivate = () => {
   return (
      <div className="header">
         <nav>
            <ul>
               <li><NavLink to='/newtask' className='new-task'>New Task</NavLink></li>
               <li><NavLink to='/tasks'>All Tasks</NavLink></li>
               <li><NavLink to='/pending'>Pending Tasks</NavLink></li>
               <li><NavLink to='/completed'>Completed Tasks</NavLink></li>
               <li><NavLink to='/logout'>Logout</NavLink></li>
            </ul>
         </nav>
      </div>
   )
}