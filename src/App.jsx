import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Home from './components/home';
import Benefits from './components/benefits';
import Disciplines from './components/disciplines';
import Services from './components/services';
import Contact from './components/contact';
import Footer from './components/footer';
import { MobileNavbar } from './components/navbar';
import Bloglist from './components/bloglist';
import HowItWorks from './components/how-it-works';

const App = () => {
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
          const usersResponse = await fetch('https://sil-ta-api.onrender.com/api/users');
          const jsonUsers = await usersResponse.json();

          // Process the fetched data as needed
          console.log(jsonUsers);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };

  // Fetch data initially
  fetchData();

  // Set up interval to fetch data every 14 minutes
  const intervalId = setInterval(fetchData, 14 * 60 * 1000);

  // Clean up the interval on component unmount
  return () => clearInterval(intervalId);
  },[])

  return(
    <React.Fragment>
      <Navbar/>
      <MobileNavbar/>
      <Home/>
      <Benefits/>
      <Disciplines/>
      <Services/>
      <HowItWorks/>
      <Contact/>
      <Bloglist/>
      <Footer/>
    </React.Fragment>
  )
}
export default App;