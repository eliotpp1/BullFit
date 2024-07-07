import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import SignIn from "./components/signin";
import Login from "./components/login";
import Header from "./components/header";
import Footer from "./components/footer";
import Calculator from "./components/calculator";
import Dashboard from "./components/dashboard";
import Activities from "./components/activities";
import Workouts from "./components/workouts/workouts";
import WorkoutsCreate from "./components/workouts/workoutsCreate";
import WorkoutsFind from "./components/workouts/workoutsFind";
import WorkoutDetails from "./components/workouts/workoutDetail";
import { AuthProvider } from "./components/context/authcontext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/workouts/create" element={<WorkoutsCreate />} />
            <Route path="/workouts/find" element={<WorkoutsFind />} />
            <Route path="/workouts/:id" element={<WorkoutDetails />} />
          </Routes>
          <Footer />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
