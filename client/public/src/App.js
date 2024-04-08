import logo from './logo.svg';
import './App.css';
import HomePage from './components/pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/login';
import AdminPage from './components/pages/adminPage';
import Customer from './components/pages/customers';
import AppBar from './components/appBar';
import Events from './components/pages/events';




function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/customers' element={<Customer />}></Route> 
        <Route path='/adminPage' element={<AdminPage />} />
        <Route path='/customers' element={<Customer />}></Route>
        <Route path='/events' element={<Events/>}></Route>
      </Routes>

    </>
  );
}

export default App;
