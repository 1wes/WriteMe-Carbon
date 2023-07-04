import React from 'react'
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Benefits from './components/benefits';
import Disciplines from './components/disciplines';
import Services from './components/services';
import Contact from './components/contact';
import Footer from './components/footer';

const App=()=>{

  return(
    <React.Fragment>
      <Navbar/>
      <Home/>
      <Benefits/>
      <Disciplines/>
      <Services/>
      <Contact/>
      <Footer/>
    </React.Fragment>
  )
}
export default App;