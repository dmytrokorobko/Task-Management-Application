import { ErrorMessage, Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from 'yup';
import { newTaskThunk } from "../store/slices/thunks/tasks/newTaskThunk";
import { useNavigate } from "react-router-dom";
import { updateTaskThunk } from "../store/slices/thunks/tasks/updateTaskThunk";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
                  expiration: expiration ? new Date(expiration) : null,
                  completed: completed
               }}
               validationSchema={Yup.object().shape({
                  title: Yup.string().required('Required field'),
                  description: Yup.string(),
                  expiration: Yup.date().nullable(),
               })}
               onSubmit={async (values, actions) => {
                  if (values.title.length < 2) alert('Title must be assigned');
                  else {
                     try {
                        if (id) {
                           //update
                           const newTask = {id, title: values.title, description: values.description, expiration: values.expiration, completed: values.completed};
                           await dispatch(updateTaskThunk({task: newTask, navigate})).unwrap();
                        } else {
                           //create    
                           await dispatch(newTaskThunk({title: values.title, description: values.description, expiration: values.expiration, navigate})).unwrap();
                           //reset fields
                           values.title = '';
                           values.description = '';
                           values.expiration = '';
                        }
                     } catch(err) {}
                  }
                  actions.setSubmitting(false);
               }}
            >
               {({isSubmitting, handleSubmit, setFieldValue, values}) => (
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
                           <DatePicker
                              selected={values.expiration}
                              onChange={date => setFieldValue('expiration', date)}
                              dateFormat='yyyy/MM/dd h:mm aa'
                              showTimeSelect
                              timeFormat="h:mm aa"
                              timeIntervals={15}
                              timeCaption="Time"
                              isClearable
                              className="form-control"
                              showWeekNumbers={false}
                              todayButton={null}
                              dayClassName={date => date.getDay() === 0 || date.getDay() === 6 ? 'weekend-day' : undefined}
                           />
                        </div>
                        <ErrorMessage className="error" name="expiration" component='div' />
                     </div>                     
                     {tasksError && <p className="server-error">{tasksError}</p>}
                     {success && <p className="server-success">{id ? "Task updated successfully" : "Task created sucessfully"}</p>}
                     <div className="button">
                        <button type="submit" disabled={isSubmitting}>{id ? 'Update task' : 'Create new task'}</button>
                     </div>
                  </form>
               )}
            </Formik>
         </div>
   )
}