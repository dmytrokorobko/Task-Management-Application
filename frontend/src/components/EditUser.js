import { ErrorMessage, Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import { updateUserThunk } from "../store/slices/thunks/users/updateUserThunk";

export const EditUser = ({id, username, role, blocked}) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const usersError = useSelector(state => state.users.error);
   const success = useSelector(state => state.users.success);
   return (
      <div className="form task">
            <Formik
               initialValues={{
                  username,
                  role,
                  blocked: blocked === 0 ? false : true
               }}
               validationSchema={Yup.object().shape({                  
                  role: Yup.string().required('Role is required'),
                  blocked: Yup.boolean()
               })}
               onSubmit={(values, actions) => {
                  const newUser = {id, username, role: values.role, blocked: values.blocked === true ? 1 : 0};
                  dispatch(updateUserThunk({user: newUser, navigate}));
                  actions.setSubmitting(false);
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
                           <label htmlFor='username'>Username: </label>
                           <Field type='text' name='username' id='username' disabled />
                        </div>
                        <ErrorMessage className="error" name="username" component='div' />
                     </div>
                     <div>
                        <div className="user-role">
                           <label htmlFor='role'>Role: </label>
                           <Field as='select' name='role' id="role">
                              <option value='admin'>Admin</option>
                              <option value='user'>User</option>                              
                           </Field>
                        </div>
                        <ErrorMessage className="error" name="role" component='div' />
                     </div>
                     <div>
                        <div className="user-blocked">
                           <label htmlFor='blocked'>Blocked: </label>
                           <Field type='checkbox' name='blocked' id='blocked' />
                        </div>
                        <ErrorMessage className="error" name="blocked" component='div' />
                     </div>                     
                     {usersError && <p className="server-error">Server: {usersError}</p>}
                     {success && <p className="server-success">User updated successfully</p>}
                     <div className="button">
                        <button type="submit" disabled={isSubmitting}>Update user</button>
                     </div>
                  </form>
               )}
            </Formik>
         </div>
   )
}