import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { tasksThunk } from "../../store/slices/thunks/tasks/tasksThunk";
import { useNavigate } from "react-router-dom";
import { TaskItem } from "../../components/TaskItem";

export const Tasks = () => {
   const tasks = useSelector(state => state.tasks.tasks);   
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const isFirstRender = useRef(true);
   useEffect(() => {
      if (isFirstRender.current) {
         dispatch(tasksThunk({navigate}));
         isFirstRender.current = false;
      }
   }, [navigate, dispatch]);
   return (
      <div>
         <h1>All Tasks</h1>
         <ul className="tasks-list">
            {tasks && tasks.length > 0 ? (
               tasks.map((task, index) => (
                  <li key={index}><TaskItem task={task} navigate={navigate} /></li>
               ))               
            ) : (
               <p>No tasks in your list...</p>
            )}
         </ul>
      </div>
   )
}