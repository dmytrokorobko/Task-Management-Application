import { useDispatch, useSelector } from "react-redux";
import { TaskItem } from "../../components/TaskItem"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { tasksThunk } from "../../store/slices/thunks/tasks/tasksThunk";

export function Pending() {
   const tasks = useSelector(state => state.tasks.tasks);   
   const [pendingTasks, setPendingTasks] = useState([]);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   useEffect(() => {
      dispatch(tasksThunk({navigate}));         
   }, [navigate, dispatch]);
   useEffect(() => {
      if (tasks && tasks.length > 0)
         setPendingTasks(tasks.filter(task => task.completed !== 1));
   }, [tasks]);
   return (
      <div>
         <h1>Pending Tasks</h1>
         <ul className="tasks-list">
            {pendingTasks && pendingTasks.length > 0 ? (
               pendingTasks.map((task, index) => (
                  <li key={index}><TaskItem task={task} navigate={navigate} /></li>
               ))               
            ) : (
               <p>No tasks in your list...</p>
            )}
         </ul>
      </div>
   )
}