import './App.css';
import { Route, Routes, Link } from 'react-router-dom'
import Login from './screen/Login';
import Home from './screen/Home';
import HomeUser from './screen/HomeUser';
import Register from './screen/Register';
import RegisterVip from './screen/RegisterVip';
import UserInfo from './screen/UserInfo';
import Search from './screen/Search';
import Songs from './screen/Songs';
import Singer from './screen/Singer';
import Top100 from './screen/Top100';
import Albums from './screen/Albums';
import SingerInfo from './screen/SingerInfo';
import AlbumInfo from './screen/AlbumInfo';
import AdminSong from './screen/AdminSong';
import AdminSinger from './screen/AdminSinger';
import AdminAlbum from './screen/AdminAlbum';
import AdminUser from './screen/AdminUser';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/registerVip' element={<RegisterVip />} />
        <Route path='/' element={<Home />} />
        <Route path='/homeUser' element={<HomeUser />} />
        <Route path='/userInfo' element={<UserInfo />} />
        <Route path='/search' element={<Search />} />
        <Route path='/songs' element={<Songs />} />
        <Route path='/singer' element={<Singer />} />
        <Route path='/top100' element={<Top100 />} />
        <Route path='/albums' element={<Albums />} />
        <Route path='/singerinfo' element={<SingerInfo />} />
        <Route path='/albuminfo' element={<AlbumInfo />} />

        <Route path='/adminsongs' element={<AdminSong />} />
        <Route path='/adminsinger' element={<AdminSinger />} />
        <Route path='/adminalbum' element={<AdminAlbum />} />
        <Route path='/adminuser' element={<AdminUser />} />

      </Routes>
    </div>
  );
}

export default App;
