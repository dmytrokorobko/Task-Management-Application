import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import { editTaskThunk } from "../../store/slices/thunks/tasks/editTaskThunk";
import { EditTask } from "../../components/EditTask";

export const Task = () => {
   const { id } = useParams();
   const [task, setTask] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [error, setError] = useState(null);
   useEffect(() => {
      const fetchTask = async () => {
         try {
            const result = await dispatch(editTaskThunk({id, navigate})).unwrap();            
            if (!result.error) {               
               setTask(result.task);
            }
         } catch (err) {
            setError(err);
         }
      }
      fetchTask();
   }, [dispatch, id, navigate])
   return (
      <div>
         <h1>Edit Task</h1>
         {!task ? (
            <p>{error}</p>
         ) : (
            <EditTask id={task.id} title={task.title} description={task.description} expiration={task.expiration} completed={task.completed} />
         )}
      </div>
   )
}