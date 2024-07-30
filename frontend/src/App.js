import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { PublicLayout } from './layouts/PublicLayout';
import { Home } from './pages/public/Home';
import { Register } from './pages/public/Register';
import { Login } from './pages/public/Login';
import { Logout } from './pages/public/Logout';
import { Page404 } from './pages/public/Page404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
