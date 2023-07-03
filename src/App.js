import React from 'react'
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Benefits from './components/benefits';
import Disciplines from './components/disciplines';

const App=()=>{

  return(
    <React.Fragment>
      <Navbar/>
      <Home/>
      <Benefits/>
      <Disciplines/>
    </React.Fragment>
  )
}
export default App;