import { ErrorMessage, Field, Formik } from "formik"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { loginThunk } from "../../store/slices/thunks/auth/loginThunk";

const inputError = 'Username and password are required to enter';

export const Login = () => {
   const dispatch = useDispatch();
   const authError = useSelector(state => state.auth.error);
   const user = useSelector(state => state.auth.user);
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';

   useEffect(() => {
      if (user) navigate('/tasks');
   }, [navigate, user]);

   const handleOnSubmit = (values, {setSubmitting}) => {
      if (values.username.length === 0 || values.password.length === 0) return alert(inputError);  
      dispatch(loginThunk({username: values.username, password: values.password, navigate, from}));
      setSubmitting(false);
   }
   return (
      <div className='form'>
         <h1>Login</h1>
         <Formik
            initialValues={{
               username: '',
               password: '',
            }}
            validationSchema={Yup.object().shape({
               username: Yup.string().required('Required field'),
               password: Yup.string().required('Required field'),
            })}
            onSubmit={(values, actions) => {
               handleOnSubmit(values, actions);
            }}
         >
            {({isSubmitting, handleSubmit}) => (
               <form 
                  onSubmit={(e) => {
                     e.preventDefault();
                     handleSubmit(e);
                  }}
               >
                  <div>
                     <div>
                        <label htmlFor='username'>Username:</label>
                        <Field type='text' name='username' placeholder='bob' />
                     </div>                     
                     <ErrorMessage className='error' name='username' component='div' />
                  </div>
                  <div>
                     <div>
                        <label htmlFor='password'>Password:</label>
                        <Field type='password' name='password' />
                     </div>
                     <ErrorMessage className='error' name='password' component='div' />
                  </div>
                  {authError && <p className='server-error'>{authError}</p>}
                  <button type='submit' disabled={isSubmitting}>Login</button>
               </form>
            )}
         </Formik>
      </div>
   )
}