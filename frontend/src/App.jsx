import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from './pages/Login';
import { Dean } from './pages/admin/Dean';
import { Home } from './pages/alumni/Home';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'; // for notification component
import { AuthContextProvider } from './contexts/authContext';
import { ProtectedRoute } from './components/ProtectedRoute';

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
        {/* Unauthorize routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (Needs to sign in to access) */}
        <Route element={<ProtectedRoute allowedRoles={['DEAN']} />}>
          <Route path='/admin' element={<Dean />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['DEAN', 'ALUMNI']} />}>
          <Route path='/home' element={<Home />} />
        </Route>

      </Routes>
    </AuthContextProvider>
  );
}

export default App;
