import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";  
import "./Navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "#000000" : "#ffffff",
    };
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">
          <span className="logo-part CarboNex">CarboNex</span>
          <span className="logo-part Farm">Farm</span>
        </NavLink>
      </div>
      <div className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
        <NavLink style={navLinkStyles} to="/" onClick={toggleMobileMenu}>
          Home
        </NavLink>
        {isLoggedIn ? (
          <>
            <NavLink style={navLinkStyles} to="/market" onClick={toggleMobileMenu}>
              Market
            </NavLink>
            <NavLink style={navLinkStyles} to="/profile" onClick={toggleMobileMenu}>
              Profile
            </NavLink>
          </>
        ) : (
          <>
            <NavLink style={navLinkStyles} to="/SignIn" onClick={toggleMobileMenu}>
              Sign In
            </NavLink>
            <NavLink style={navLinkStyles} to="/SignUp" onClick={toggleMobileMenu}>
              Sign Up
            </NavLink>
          </>
        )}
      </div>
      <div className="hamburger" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <span className="close-icon">&times;</span>
        ) : (
          <span className="hamburger-icon">&#9776;</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
