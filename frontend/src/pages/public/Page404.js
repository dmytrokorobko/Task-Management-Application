import { Link } from 'react-router-dom';
import page404 from '../../assets/images/page404.jpg';

export const Page404 = () => {
   return (
      <div className='page404'>
         <h1>404 - page not found</h1>
         <p>Oops! The page you are looking for does not exist.</p>
         <img src={page404} alt='page 404' />
         <Link to="/">Return to Home</Link>
      </div>
   )
}