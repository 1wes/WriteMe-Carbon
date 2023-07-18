import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter, Routes, Route } from 'react-router-dom';
import About from './components/about';
import FAQ from './components/faq';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='/about' element={<About/>} ></Route>
      <Route path='/faq' element={<FAQ/>} />
    </Routes>
  </HashRouter>
);
