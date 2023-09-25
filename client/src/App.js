import "bootstrap/dist/css/bootstrap.min.css";

import Home from './pages/Home';

import Register from './pages/Register';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';
import ApplyTutor from "./pages/ApplyTutor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Tutors from "./pages/admin/Tutors";
import Profile from "./pages/tutor/Profile";
import BookingPage from "./pages/BookingPage";
import { getRefreshToken } from "./services/Apis";
import { useContext, useEffect } from "react";
import { authContext } from "./components/context/ContextProvider";



function App() {
  const { user, setUser } = useContext(authContext);
  useEffect(() => {
    async function getData() {
      const response = await getRefreshToken();
      if (response.status == 200) {
        setUser({ ...response.data, token: response.data.token, isAuthenticated: true });
      }
      // console.log("theU serIs")
      // console.log({ user })
    }
    getData();

  }, [])
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/applytutor' element={<ApplyTutor />} />
        <Route path='/notification' element={<NotificationPage />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/tutor/profile/:id' element={<Profile />} />
        <Route path='/tutor/book-appointment/:id' element={<BookingPage />} />
        <Route path='/admin/tutors' element={<Tutors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </>
  )
}

export default App;
