import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Dean } from './pages/admin/Dean';
import { Home } from './pages/alumni/Home';
import axios from 'axios';
import { Toaster } from 'react-hot-toast'; // for notification component
import { AuthContextProvider } from './contexts/authContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Profile } from './pages/profile';
import { About } from './pages/about/About';
import { AdminDashboard } from './pages/registrar/Dashboard';
import { RegistrarDepartment } from './pages/registrar/Department'
import { Department } from './pages/department/Department';

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
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes (Needs to sign in to access) */}
        <Route element={<ProtectedRoute allowedRoles={['DEAN']} />}>
          <Route path='/admin' element={<Dean />} />
          <Route path='/registrar' element={<AdminDashboard />} />
          <Route path='/registrar/department' element={<RegistrarDepartment />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['DEAN', 'ALUMNI']} />}>\
          {/* Routes to Home Page */}
          <Route path='/home' element={<Home />} />
          {/* Routes to Profile Page */}
          <Route path='/profile' element={<Profile />} />
          {/* Routes to About Page */}
          <Route path='/about' element={<About />} />
          {/* Routes to Department Page */}
          <Route path='/department' element={<Department />} />
        </Route>

      </Routes>
    </AuthContextProvider>
  );
}

export default App;
