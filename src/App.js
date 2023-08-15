import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path ='/' element = {<LoginPage/>} />
          <Route path ='/admin-login' element={<AdminLogin/>} />
          <Route path ='/register' element = {<RegisterPage/>} />
          <Route path ='/home' element = {<HomePage/>} />

          <Route path ='/404-error' element={<ErrorPage/>} />
          <Route path ='/admin-dashboard' element={<AdminLogin/>} />
          <Route path ='*' element={<ErrorPage/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
