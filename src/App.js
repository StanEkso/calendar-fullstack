import { useState } from 'react';
import './App.css';
import Login from './LogModule/Login';
import Modal from './Modal/Modal';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import {Routes, Route} from 'react-router-dom'
import Header from './Header/Header';
import Home from './Home/Home';
import Admin from './AdminPanel/Admin';
import ViewScreen from './Views/VIewsScreen';
function App() {
  const {token, login, logout, userId} = useAuth();
  const isAuthenticated = !!token;
  const [modal, setModal] = useState({active: false})
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
    <Modal modal={modal}/>
    <Header/>
    <div className="app-wrapper">
    <Routes>
      <Route path="/" element={<Home/>}/> 
      <Route path="/login" element={<Login setModal={setModal}/>}/>
      <Route path="/admin" element={<Admin setModal={setModal}/>}/>
      <Route path="/views" element={<ViewScreen/>}/>
    </Routes>
    </div>
    </AuthContext.Provider>
  );
}

export default App;
