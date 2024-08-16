import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from './pages/public/Home';
import { Register } from './pages/public/Register';
import { Login } from './pages/public/Login';
import { Logout } from './pages/public/Logout';
import { Page404 } from './pages/public/Page404';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Tasks } from './pages/private/Tasks';
import PrivateRoute from './routes/PrivateRoute';
import { Pending } from './pages/private/Pending';
import { Completed } from './pages/private/Completed';
import { NewTask } from './pages/private/NewTask';
import { Users } from './pages/admin/Users';
import { User } from './pages/admin/User';
import { Task } from './pages/private/Task';
import { ActiveUsers } from './pages/admin/ActiveUsers';
import { BlockedUsers } from './pages/admin/BlockedUsers';
import withClearError from './HOC/withClearError';

const RoutesWithClearError = withClearError(Routes);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <RoutesWithClearError>
          <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />  
              <Route path="/logout" element={<Logout />} />            
              <Route path="*" element={<Page404 />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={['user', 'admin']} />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/newtask" element={<NewTask />} />
            <Route path="/task/:id" element={<Task />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route path="/users" element={<Users />} />
            <Route path="/users/active" element={<ActiveUsers />} />
            <Route path="/users/blocked" element={<BlockedUsers />} />
            <Route path="/user/:id" element={<User />} />
          </Route>
          
        </RoutesWithClearError>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
