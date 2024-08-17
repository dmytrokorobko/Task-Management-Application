import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tasksThunk } from "../../store/slices/thunks/tasks/tasksThunk";
import { TaskItem } from "../../components/TaskItem";

export const Completed = () => {
   const tasks = useSelector(state => state.tasks.tasks);   
   const [completedTasks, setCompletedTasks] = useState([]);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      dispatch(tasksThunk({navigate}));         
   }, [navigate, dispatch]);
   useEffect(() => {
      if (tasks && tasks.length > 0)
         setCompletedTasks(tasks.filter(task => task.completed !== 0));
   }, [tasks])
   return (
      <div>
         <h1>Completed Tasks</h1>
         <ul className="tasks-list">
            {completedTasks && completedTasks.length > 0 ? (
               completedTasks.map((task, index) => (
                  <li key={index}><TaskItem task={task} navigate={navigate} /></li>
               ))               
            ) : (
               <p>No tasks in your list...</p>
            )}
         </ul>
      </div>
   )
}