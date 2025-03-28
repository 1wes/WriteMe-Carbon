import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { HashRouter, Routes, Route } from "react-router-dom";
import About from "./components/about";
import FAQ from "./components/faq";
import Blogpost from "./components/blogpost";
import NotFound from "./components/404";
import SignUp from "./components/signup";
import Login from "./components/login";
import Dashboard from "./components/dashboard";
import ForgotPassword from "./components/forgot-password";
import Admin from "./components/admin";
import ClientOrder from "./components/order";
import AuthContextProvider from "./context/Auth";
import StepsValidationProvider from "./context/stepValidation";
import ModalContextProvider from "./context/modal";

const rootElement = document?.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}
const root = ReactDOM.createRoot(rootElement);

root.render(
  <HashRouter future={{ v7_startTransition: true }}>
    <Routes>
      <Route path="/" element={<App />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/faq" element={<FAQ />} />
      <Route path="/blog/:slug" element={<Blogpost />}></Route>
      <Route
        path="/register"
        element={
          <ModalContextProvider>
            <StepsValidationProvider>
              <SignUp />
            </StepsValidationProvider>
          </ModalContextProvider>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <AuthContextProvider>
            <Login />
          </AuthContextProvider>
        }
      ></Route>
      <Route
        path="/user-dashboard"
        element={
          <AuthContextProvider>
            <StepsValidationProvider>
              <ModalContextProvider>
                <Dashboard />
              </ModalContextProvider>
            </StepsValidationProvider>
          </AuthContextProvider>
        }
      ></Route>
      <Route path="/forgot-password" element={<ForgotPassword />}></Route>
      <Route
        path="/admin-dashboard"
        element={
          <AuthContextProvider>
            <ModalContextProvider>
              <Admin />
            </ModalContextProvider>
          </AuthContextProvider>
        }
      ></Route>
      <Route
        path="/admin/:orderId"
        element={
          <AuthContextProvider>
            <ModalContextProvider>
              <ClientOrder />
            </ModalContextProvider>
          </AuthContextProvider>
        }
      ></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  </HashRouter>
);
