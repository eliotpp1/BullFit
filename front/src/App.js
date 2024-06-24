import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/signin";
import Test from "./components/test";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
};

export default App;
