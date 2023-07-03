import React from 'react'
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Benefits from './components/benefits';

const App=()=>{

  return(
    <React.Fragment>
      <Navbar/>
      <Home/>
      <Benefits/>
    </React.Fragment>
  )
}
export default App;