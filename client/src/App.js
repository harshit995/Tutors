import "bootstrap/dist/css/bootstrap.min.css";

import Home from './pages/Home';

import Register from './pages/Register';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import ApplyTutor from "./pages/ApplyTutor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Tutors from "./pages/admin/Tutors";


function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/applytutor' element={<ApplyTutor />} />
        <Route path='/notification' element={<NotificationPage />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/admin/tutors' element={<Tutors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </>
  );
}

export default App;
