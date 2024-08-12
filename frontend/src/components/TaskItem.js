import { useState } from "react";

export const TaskItem = ({task}) => {
   const descrLen = 50;
   const [taskCompleted, setTaskCompleted] = useState(task.completed);
   
   const handleTaskComplete = () => {
      setTaskCompleted(taskCompleted === 0 ? 1 : 0);
   }

   const handleTaskEdit = () => {

   }

   const handleTaskDelete = () => {

   }
   return (
      <div key={task.id} className="task-item">
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
   )
}