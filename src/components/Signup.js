import React, { useState } from "react";
import "../css/login.css";
import axios from "../api/axios";
import justfound from "../images/justfound.png";
import culture from "../images/Culture.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function Signup() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        try {
            // console.log('Sending request with:', { Email, password });
            const response = await axios.post('http://localhost:5000/api/auth/signup', { email: Email, password });
            // console.log('Response:', response);
            if(response.status==200)
            {
            alert('User created successfully');
            }
            else if(response.status==400)
            {
                alert('User already exists');
            }
            setEmail('');
            setPassword('');
        } catch (error) {
            // console.error('Error during signup:', error.response ? error.response.data : error.message);
            if(error.response.status==400)
            {
                alert('User already exists');
            }
            else{
                alert("Error creating User");
            }
        }
    };


    return (
        <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="row w-100">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 mx-auto">
                        <div className="card">
                            <form className="card-body p-4 p-lg-5" onSubmit={handleSignUpSubmit}>
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
                                            name="email"
                                            placeholder="Email"
                                            value={Email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            className="form-control"
                                            id="password"
                                            placeholder="Password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
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
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary px-5 mb-4 w-100">
                                        {isLogin ? 'Login' : 'Signup'}
                                    </button>
                                </div>
                            </form>
                            {/* <div className="text-center mt-3">
                                <button onClick={} className="btn btn-link">
                                    {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
