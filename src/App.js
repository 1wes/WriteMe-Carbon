import React from 'react'
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';

const App=()=>{

  return(
    <React.Fragment>
      <Navbar/>
      <Home/>
    </React.Fragment>
  )
}
export default App;