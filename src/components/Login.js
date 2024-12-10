import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import justfound from '../images/justfound.png';
import culture from "../images/Culture.png";
import Navbar from './Navbar';
export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email: Email, password });
      // Handle the successful login response
      localStorage.setItem('user', JSON.stringify(response.data));
      const { auth_token } = response.data;
      localStorage.setItem('auth_token', auth_token);
      localStorage.setItem('user_email',Email);
      alert('Login successful');
      
      setEmail('');
      setPassword('');
      // Redirect to the profile page
      navigate('/cart'); // Change this to the route you want to redirect to after login
    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        // If the server responded with a status code outside the range of 2xx
        setError(error.response.data.message); // Use the error message from the server response
        alert(error.response.data.message); // Display server error message
      } else {
        // If there was an error with the request itself
        // console.error('Error during login:', error.message);
        setError('An unexpected error occurred.'); // Generic error message
        alert('An unexpected error occurred.'); // Display generic error message
      }
    }
  
  };

  return (
    <div className="container-fluid">
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="row w-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
            <div className="card">
              <form className="card-body p-4 p-lg-5" onSubmit={handleLoginSubmit}>
                <div className="text-center mb-4">
                  <img
                    src={culture}
                    className="img-fluid profile-image-pic img-thumbnail rounded-circle"
                    width="150"
                    alt="Just Found"
                  />
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email"
                      name="email"
                      aria-describedby="EmailHelp"
                      value={Email}
                      onChange={(e) => setEmail(e.target.value)} // Update email state
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={passwordVisible ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} // Update password state
                      required
                    />
                  </div>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
                    </button>
                </div>
                {error && <div className="text-danger">{error}</div>} {/* Display error message if any */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-5 mb-4 w-100">
                    Login
                  </button>
                </div>
                <div id="usernameHelp" className="text-center">
                  Not Registered? <Link to="/Signup" className="text-decoration-underline">Create an Account</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
