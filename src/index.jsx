import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import About from './components/about';
import FAQ from './components/faq';
import Blogpost from './components/blogpost';
import NotFound from './components/404';
import SignUp from './components/signup';
import Login from './components/login';
import Dashboard from './components/dashboard';
import ForgotPassword from './components/forgot-password';
import Admin from './components/admin';
import ClientOrder from './components/order';
import AuthContextProvider from './context/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter future={{v7_startTransition:true}} >
        <Routes>
          <Route path='/' element={<App/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/faq' element={<FAQ/>}/>
          <Route path='/blog/:slug' element={<Blogpost/>}></Route>
          <Route path='register' element={<SignUp/>} ></Route>
          <Route path='/login' element={<AuthContextProvider><Login/></AuthContextProvider>}></Route>
          <Route path='/user-dashboard' element={<AuthContextProvider><Dashboard/></AuthContextProvider>} ></Route>
          <Route path='/forgot-password' element={<ForgotPassword/>} ></Route>
          <Route path='/admin-dashboard' element={<AuthContextProvider><Admin/></AuthContextProvider>} ></Route>
          <Route path='/admin/:orderId' element={<AuthContextProvider><ClientOrder/></AuthContextProvider>} ></Route>
          <Route path='*' element={<NotFound />} ></Route>
        </Routes>
    </HashRouter>
);
