import { useState } from "react";
import { useDispatch } from "react-redux"
import { toggleTaskThunk } from "../store/slices/thunks/tasks/toggleTaskThunk";
import { deleteTaskThunk } from "../store/slices/thunks/tasks/deleteTaskThunk";

export const TaskItem = ({task, navigate}) => {
   const descrLen = 50;
   const [taskCompleted, setTaskCompleted] = useState(task.completed);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const dispatch = useDispatch();

   async function handleTaskComplete() {
      const updatedTaskCompleted = taskCompleted === 0 ? 1 : 0;     

      const newTask = {
         ...task,
         completed: updatedTaskCompleted
      }      

      try {
         setLoading(true);
         setError(null);
         const resultAction = await dispatch(toggleTaskThunk({task: newTask, navigate})).unwrap();
         if (!resultAction.error) setTaskCompleted(updatedTaskCompleted);
      } catch(err) {
         setError('Failed to complete the task: ' + err);
      } finally {
         setLoading(false);
      }
   }

   const handleTaskEdit = () => {

   }

   async function handleTaskDelete() {
      setLoading(true);
      setError(null);
      if (task.completed) {
         // eslint-disable-next-line no-restricted-globals
         const confirmDelete = confirm('Are you sure you want to delete this task?');
         if (confirmDelete) {
            try {
               await dispatch(deleteTaskThunk({task, navigate})).unwrap();
            } catch (err) {
               setError('Fail to complete this task: ' + err);
            }
         }
      } else {
         setError('Can not process this operation: task must be completed first');
      }
      setLoading(false);
   }

   return (
      <div key={task.id} className="task-item">
         <div>
            <p><strong>{task.title}</strong></p>
            <p>{task.description.length > descrLen ? task.description.substring(0, descrLen - 1) + "..." : task.description}</p>
            <p>{task.expiration}</p>
            <div className="task-completed">
               <label>Completed</label>
               <input type="checkbox" className="task-completed-checkbox" checked={taskCompleted} onChange={handleTaskComplete} />
            </div>
            <div className="task-buttons">
               <button className="task-button-edit" data-id={task.id} onClick={handleTaskEdit}>Edit</button>
               <button className="task-button-delete" data-id={task.id} onClick={handleTaskDelete}>Delete</button>
            </div>
         </div>
         {loading && (<p className="server-loading">Loading...</p>)}
         {error && (<p className="server-error">{error}</p>)}
      </div>
   )
}