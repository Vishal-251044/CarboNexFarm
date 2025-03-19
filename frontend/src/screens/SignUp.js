import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../screens_styles/SignUp.css';
import Registerrimg from '../assets/23.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let url = '';
      if (selectedForm === 'farmer') {
        url = 'https://carbonexfarm-backend.onrender.com/api/auth/register/farmer';
      } else if (selectedForm === 'company') {
        url = 'https://carbonexfarm-backend.onrender.com/api/auth/register/company';
      }

      await axios.post(url, formData);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully!',
        confirmButtonText: 'OK',
      });

      setTimeout(() => {
        navigate('/SignIn');
      }, 1000);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'There was a problem registering your account. Please try again.',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-image">
            <img src={Registerrimg} alt="Register" />
          </div>
          <div className="signup-form">
            {!selectedForm && (
              <div className="form-options">
                <h2>Select Registration Type</h2>
                <button onClick={() => setSelectedForm('farmer')} className="signup-btn">Farmer</button>
                <button onClick={() => setSelectedForm('company')} className="signup-btn">Company</button>
              </div>
            )}

            {selectedForm === 'farmer' && (
              <div className="farmer-form">
                <h2>Farmer Registration</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Farmer Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email ID</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Set Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="repassword">Re-enter Password</label>
                    <input
                      type="password"
                      id="repassword"
                      name="repassword"
                      placeholder="Re-enter password"
                      value={formData.repassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="register-btn" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                  </button>
                </form>
              </div>
            )}

            {selectedForm === 'company' && (
              <div className="company-form">
                <h2>Company Registration</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Company Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your company name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email ID</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Set Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="repassword">Re-enter Password</label>
                    <input
                      type="password"
                      id="repassword"
                      name="repassword"
                      placeholder="Re-enter password"
                      value={formData.repassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="register-btn" disabled={loading}>
                    {loading ? 'Loading...' : 'Register'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
