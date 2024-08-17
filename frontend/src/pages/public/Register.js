import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ErrorMessage, Field, Formik} from 'formik';
import * as Yup from 'yup';
import { registerThunk } from '../../store/slices/thunks/auth/registerThunk';
import { useNavigate } from 'react-router-dom';

const errPassword2 = 'Passwords must match each other';

export const Register = () => {
   const dispatch = useDispatch();   
   const navigate = useNavigate();
   const authError = useSelector(state => state.auth.error);

   const handleSubmit = (values, {setSubmitting}) => {
      if (values.password !== values.password2) return alert(errPassword2);      
      dispatch(registerThunk({username: values.username, password: values.password, navigate}));
      setSubmitting(false);
   }
   return (
      <div className='form'>
         <h1>Register</h1>         
         <Formik
            initialValues={{
               username: '',
               password: '',
               password2: ''
            }}
            validationSchema={Yup.object().shape({
               username: Yup.string().min(3, 'Too short').required('Required field'),
               password: Yup.string().min(5, 'Too short').required('Required field'),
               password2: Yup.string().oneOf([Yup.ref('password'), null], errPassword2).required('Required field'),
            })}
            onSubmit={(values, actions) => {
               handleSubmit(values, actions);
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
                  <div>
                     <div>
                        <label htmlFor='password2'>Re-enter Password:</label>
                        <Field type='password' name='password2' />
                     </div>
                     <ErrorMessage className='error' name='password2' component='div' />
                  </div>
                  {authError && <p className='server-error'>{authError}</p>}
                  <div className="button">
                     <button type="submit" disabled={isSubmitting}>Register</button>
                  </div>                  
               </form>
            )}
         </Formik>
      </div>
   )
}