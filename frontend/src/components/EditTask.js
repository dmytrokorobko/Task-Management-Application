import { ErrorMessage, Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { newTaskThunk } from "../store/slices/thunks/tasks/newTaskThunk";
import { useNavigate } from "react-router-dom";

export const EditTask = ({id, title = '', description = '', expiration = '', completed = null}) => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const tasksError = useSelector(state => state.tasks.error);
   const success = useSelector(state => state.tasks.success);
   return (
      <div className="form task">
            <Formik
               initialValues={{
                  title: title,
                  description: description,
                  expiration: expiration,
                  completed: completed
               }}
               validationSchema={Yup.object().shape({
                  title: Yup.string().required('Required field'),
                  description: Yup.string(),
                  expiration: Yup.string(),
               })}
               onSubmit={(values, actions) => {
                  if (values.title.length < 2) alert('Title must be assigned');
                  else {
                     if (id) {
                        //update
                     } else {
                        //create    
                        console.log('dispatching');
                        dispatch(newTaskThunk({title: values.title, description: values.description, expiration: values.expiration, navigate}));
                     }
                  }
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
                           <label htmlFor='title'>Title: </label>
                           <Field type='text' name='title' id='title' />
                        </div>
                        <ErrorMessage className="error" name="title" component='div' />
                     </div>
                     <div>
                        <div>
                           <label htmlFor='description'>Description: </label>
                           <Field as='textarea' name='description' id="title" className='textarea' />   
                        </div>
                        <ErrorMessage className="error" name="description" component='div' />
                     </div>
                     <div>
                        <div>
                           <label htmlFor='expiration'>Expire at: </label>
                           <Field type='text' name='expiration' id='expiration' />
                        </div>
                        <ErrorMessage className="error" name="expiration" component='div' />
                     </div>
                     {completed && (
                        <div>
                           <div>
                              <label htmlFor='completed'>Completed: </label>
                              <Field type='checkbox' name='completed' id='completed' />
                           </div>
                           <ErrorMessage className="error" name="completed" component='div' />
                        </div>
                     )}
                     {tasksError && <p className="server-error">{tasksError}</p>}
                     {success && <p className="server-success">{id ? "Task updated successfully" : "Task created sucessfully"}</p>}
                     <div className="button">
                        <button type="submit" disabled={isSubmitting}>Create new task</button>
                     </div>
                  </form>
               )}
            </Formik>
         </div>
   )
}