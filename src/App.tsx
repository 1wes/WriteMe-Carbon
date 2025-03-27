import React, { FunctionComponent } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Benefits from "./components/benefits";
import Disciplines from "./components/disciplines";
import Services from "./components/services";
import Contact from "./components/contact";
import Footer from "./components/footer";
import { MobileNavbar } from "./components/navbar";
import Bloglist from "./components/bloglist";
import HowItWorks from "./components/how-it-works";

const App: FunctionComponent = () => {
  return (
    <React.Fragment>
      <Navbar />
      <MobileNavbar />
      <Home />
      <Benefits />
      <Disciplines />
      <Services />
      <HowItWorks />
      <Contact />
      <Bloglist />
      <Footer />
    </React.Fragment>
  );
};
export default App;
