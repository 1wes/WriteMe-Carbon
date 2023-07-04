import React from 'react'
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Benefits from './components/benefits';
import Disciplines from './components/disciplines';
import Services from './components/services';
import Contact from './components/contact';

const App=()=>{

  return(
    <React.Fragment>
      <Navbar/>
      <Home/>
      <Benefits/>
      <Disciplines/>
      <Services/>
      <Contact/>
    </React.Fragment>
  )
}
export default App;