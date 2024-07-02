import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SignIn from "./components/signin";
import Test from "./components/test";
import Login from "./components/login";
import Header from "./components/header";
import Footer from "./components/footer";
import Calculator from "./components/calculator";
import Dashboard from "./components/dashboard";
import Activities from "./components/activities";
import { AuthProvider } from "./components/context/authcontext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
