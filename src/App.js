import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { checkAuth } from './redux/slice';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AdminLogin from './pages/AdminLogin';
import ErrorPage from './pages/ErrorPage';
import AdminDashboard from './pages/AdminDashboard';
import UsersList from './pages/UsersList';
import ProfilePage from './pages/ProfilePage';
import ExplorePage from './pages/ExplorePage';
import PostsLists from './pages/PostsLists';
import ReportedPostsList from './pages/ReportedPostsList';
import BlockedPostsList from './pages/BlockedPostsList';

function App() {

  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path ='/' element = {<LoginPage/>} />
          <Route path ='/admin-login' element={<AdminLogin/>} />
          <Route path ='/register' element = {<RegisterPage/>} />
          <Route path ='/home' element = {<HomePage/>} />
          <Route path ='/profile/:email' element={< ProfilePage/>} />
          <Route path ='/explore' element={<ExplorePage/>} />

          <Route path ='/404-error' element={<ErrorPage/>} />
          <Route path ='/admin-dashboard' element={<AdminDashboard/>} />
          <Route path ='/users' element={<UsersList/>} />
          <Route path ='/posts-lists' element={<PostsLists/>} />
          <Route path ='/blocked-posts' element={<BlockedPostsList/>} />
          <Route path ='/reported-posts' element={<ReportedPostsList/>} />

          <Route path ='*' element={<ErrorPage/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
