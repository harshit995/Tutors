import "bootstrap/dist/css/bootstrap.min.css";

import Home from './pages/Home';

import Register from './pages/Register';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>

    </>
  );
}

export default App;
