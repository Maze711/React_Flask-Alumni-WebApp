import './App.css'
import { Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import { Dean } from './pages/admin/Dean';
import { Home } from './pages/alumni/Home'
import axios from 'axios';
import { Toaster } from 'react-hot-toast'; // for notification component
import { AuthContextProvider } from './contexts/authContext';

function App() {

  axios.defaults.baseURL = 'http://127.0.0.1:5000'; // back-end/server URL
  axios.defaults.withCredentials = true;

  return (
    <AuthContextProvider>
      <Toaster position="top-center"
        toastOptions={{ 
          duration: 2000
        }} 
        reverseOrder={false}
      />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path='/admin' element={<Dean />}/>
        <Route path='/home' element={<Home />}/>
      </Routes>
    </AuthContextProvider>
  )
}

export default App
