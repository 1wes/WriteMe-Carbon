import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import About from './components/about';
import FAQ from './components/faq';
import Blogpost from './components/blogpost';
import NotFound from './components/404';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter future={{v7_startTransition:true}} >
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/faq' element={<FAQ/>}/>
      <Route path='/blog/:slug' element={<Blogpost/>}></Route>
      <Route path='*' element={<NotFound/>} ></Route>
    </Routes>
  </HashRouter>
);
