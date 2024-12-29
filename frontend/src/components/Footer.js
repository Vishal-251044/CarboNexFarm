import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Gemini from "./Gemini"; 
import "./Footer.css";

const Footer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleQuestionChange = (e) => {
    setUserQuestion(e.target.value);  
  };

  const handleAskQuestion = (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) {
      alert("Please enter a question.");
    }
  };

  return (
    <footer className="footer">
      <div className="footer-logo">
        <Link to="/">
          <span className="logo-part CarboNex">CarboNex</span>
          <span className="logo-part Farm">Farm</span>
        </Link>
      </div>
      <div className="footer-text">
        <p>
          AI and ML-Based Carbon Credit Trading Platform leverages
          blockchain for transparent and secure carbon credit transactions while
          utilizing AI to predict carbon sequestration from agricultural
          practices. This innovative approach empowers businesses and farmers to
          trade credits with real-time insights, promoting sustainability
          through technology in the agriculture sector.
        </p>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        {!isLoggedIn ? (
          <>
            <Link to="/SignIn">Sign In</Link>
            <Link to="/SignUp">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/market">Market</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}
      </div>

      <div className="ask-question-section">
        <input
          type="text"
          placeholder="Ask a question..."
          value={userQuestion}
          onChange={handleQuestionChange}
          className="question-input"
        />
        <button onClick={handleAskQuestion} className="ask-button">Ask</button>
      </div>

      <div className="answer-section">
        {userQuestion && <Gemini question={userQuestion} />}
      </div>

      <div className="footer-copyright">
        <p>&copy; 2024 CarboNexFarm. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
