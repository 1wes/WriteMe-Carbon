import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import About from './components/about';
import FAQ from './components/faq';
import Blogpost from './components/blogpost';
import NotFound from './components/404';
import CreateOrder from './components/create-order';
import SignUp from './components/signup';
import Login from './components/login';
import Dashboard from './components/dashboard';
import ForgotPassword from './components/forgot-password';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter future={{v7_startTransition:true}} >
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/faq' element={<FAQ/>}/>
      <Route path='/blog/:slug' element={<Blogpost/>}></Route>
      <Route path='/submit-assignment' element={<CreateOrder/>} ></Route>
      <Route path='register' element={<SignUp/>} ></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/user-dashboard' element={<Dashboard/>} ></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>} ></Route>
      <Route path='*' element={<NotFound/>} ></Route>
    </Routes>
  </HashRouter>
);
