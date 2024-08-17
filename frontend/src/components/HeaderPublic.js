import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/images/todo-logo.jpg';
export const HeaderPublic = () => {
   return (
      <div className="header">
         <Link to='/'>
            <img src={logo} alt='logo' />
         </Link>
         
         <nav>
            <ul>
               <li><NavLink to='/'>Home</NavLink></li>
               <li><NavLink to='/register'>Register</NavLink></li>
               <li><NavLink to='/login'>Login</NavLink></li>
            </ul>
         </nav>
      </div>
   )
}