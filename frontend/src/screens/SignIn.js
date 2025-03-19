import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../screens_styles/SignIn.css";
import loginimg from "../assets/22.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("farmer");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://carbonexfarm-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", data.userType);
        localStorage.setItem("user", JSON.stringify(data.user));

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully logged in!',
          confirmButtonText: 'OK',
        });

        navigate("/Profile");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.message,
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Server Error',
        text: 'There was an error communicating with the server. Please try again later.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="signin-box">
          <div className="signin-image">
            <img src={loginimg} alt="Login" />
          </div>
          <div className="signin-form">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="userType">I am a:</label>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      value="farmer"
                      checked={userType === "farmer"}
                      onChange={() => setUserType("farmer")}
                    />
                    Farmer
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="company"
                      checked={userType === "company"}
                      onChange={() => setUserType("company")}
                    />
                    Company
                  </label>
                </div>
              </div>

              <button type="submit" className="signin-btn" disabled={loading}>
                {loading ? "Loading..." : "Sign In"}
              </button>
            </form>
            <p className="signup-link">
              New user? <Link to="/SignUp">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
