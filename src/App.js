import './App.css';
import { Route, Routes, Link } from 'react-router-dom'
import Login from './screen/Login';
import Home from './screen/Home';
import HomeUser from './screen/HomeUser';
import HomeAdmin from './screen/HomeAdmin';
import Register from './screen/Register';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/homeUser' element={<HomeUser />} />
        <Route path='/homeAdmin' element={<HomeAdmin />} />
      </Routes>
    </div>
  );
}

export default App;
