import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Market from './screens/Market';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp.js';
import Profile from './screens/Profile';
import Home from './screens/Home';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/market"
          element={
            <ProtectedRoute>
              <Market />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


