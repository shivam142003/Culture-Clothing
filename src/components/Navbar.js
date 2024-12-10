import React, { useState, useEffect } from 'react';
import justfound from "../images/justfound.png";
import culture from "../images/Culture.png";
import '../css/style.css';
import { Link } from "react-router-dom";
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';


import { useLocation } from 'react-router-dom';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth_token') ? true : false);
    const user_email=localStorage.getItem('user_email');
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
    console.log(adminEmail)

    const navigate = useNavigate();
    const location = useLocation();
    const toggleOffcanvas = () => {
        setIsOpen(!isOpen);
    };

    const closeOffcanvas = () => {
        setIsOpen(false);
    };


    const handleLogout = async () => {
        try {
            // Retrieve cart data from localStorage
            const cartData = JSON.parse(localStorage.getItem('cart')) || [];
            // console.log("Raw cart data from localStorage:", cartData);

            if (cartData.length === 0) {
                // console.log("No cart data found, proceeding to logout.");
            } else {
                const authToken = localStorage.getItem('auth_token');
                // console.log("Auth token:", authToken);

                // Fetch backend cart data to compare
                const backendResponse = await axios.get('http://localhost:5000/api/cart', {
                    headers: {
                        'auth-token': authToken,
                    },
                });
                const backendCartData = backendResponse.data.items || [];
                // console.log("Cart data from backend:", backendCartData);

                // Filter new or updated items by comparing with backend cart data
                const filteredCartData = cartData.filter(localItem =>
                    !backendCartData.some(backendItem =>
                        backendItem.productId === localItem.productId &&
                        backendItem.quantity === localItem.quantity &&
                        backendItem.size === localItem.size &&
                        backendItem.price === localItem.price
                    )
                ).map(({ productId, title, size, quantity, price }) => ({
                    productId,
                    title,
                    size,
                    quantity,
                    price
                }));

                // console.log("Filtered cart data to be sent:", filteredCartData);

                if (filteredCartData.length > 0) {
                    // Send only the new or updated items to the backend
                    const response1 = await axios.patch('http://localhost:5000/api/cart', filteredCartData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': authToken,
                        },
                    });

                    if (response1.status === 200) {
                        // console.log('Cart updated successfully:', response1.data);
                    } else {
                        // console.error('Failed to update cart:', response1);
                    }
                } else {
                    // console.log("No new or updated cart items to send.");
                }
            }

            // Proceed with the logout request to the backend
            const response = await axios.post('http://localhost:5000/api/auth/logout');
            if (response.status === 200) {
                // Clear local storage and update login state
                localStorage.removeItem('auth_token');
                localStorage.removeItem('user');
                localStorage.removeItem('cart');
                localStorage.removeItem('user_email');
                localStorage.removeItem('products');
                setIsLoggedIn(false);
                alert('You have logged out successfully');
                navigate('/'); // Redirect to home page or login page
            }
        } catch (error) {
            // console.error('Error during logout:', error);
        }
    };


    useEffect(() => {
        // Re-check the login state from localStorage
        setIsLoggedIn(localStorage.getItem('auth_token') ? true : false);
    }, [location]);
    // Empty dependency array means this runs once when the compon
    return (
        <>
            <nav className="navbar navbar-light bg-light fixed-top">
                <div className="moving-line"></div>

                <header className="d-flex justify-content-between align-items-center navbar-custom">
                    <button
                        className="navbar-toggler order-1"
                        type="button"
                        onClick={toggleOffcanvas}
                        aria-controls="offcanvasMenu"
                        aria-expanded={isOpen}
                        aria-label="Toggle navigation"
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            fontSize: '1.5rem',
                            color: '#fff',
                        }}
                    >
                        ☰
                    </button>

                    <h2 className='m-0 order-2 flex-grow-1 d-flex justify-content-center align-items-center'>
                        <Link to='/'>
                            <img src={culture} alt="Just Found Culture Logo" style={{ maxHeight: "90px", height: "auto", paddingLeft: "50px",maxWidth:"200px"}} />
                        </Link>
                    </h2>


                    <div className="d-flex order-3 align-items-center icon-group" style={{ gap: "10px" }}>
                        <Link to='/login' >
                            <a className="nav-link" href="/" style={{ color: "white", fontSize: "20px", paddingRight: "5px" }}>
                                <i className="fas fa-user"></i>
                            </a></Link>
                        <Link to="/cart" state={{ isLoggedIn }}>
                            <a className="nav-link" href="/" style={{ color: "white", fontSize: "20px", paddingLeft: "5px" }}>
                                <i className='fas fa-shopping-cart'></i>
                            </a></Link>

                    </div>
                </header>

                {/* Offcanvas for sidebar components */}
                <div className={`offcanvas offcanvas-start ${isOpen ? 'show' : ''}`} tabIndex="-1" id="offcanvasMenu" aria-hidden={!isOpen}>
                    <div className="offcanvas-header">
                        <button
                            type="button"
                            className="btn-close"
                            onClick={closeOffcanvas}
                            aria-label="Close"
                            style={{ backgroundColor: '#ffff', border: 'none' }}
                        ></button>
                    </div>

                    <div className="offcanvas-body">
                        <ul className="nav flex-column">
                            <li className="nav-item"><a className="nav-link" href="#shop" onClick={closeOffcanvas}><i className="fa fa-shopping-bag"></i> Shop</a></li>
                            <li className="nav-item">
                                <Link to='/contact' className="nav-link" onClick={closeOffcanvas}>
                                    <i className='fas fa-address-book'></i> Contact
                                </Link>
                            </li>
                            {/* If the user is logged in, show the logout button */}
                            <li className="nav-item">
                                {isLoggedIn ? (
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            closeOffcanvas();

                                        }}
                                        className="nav-link btn btn-link text-decoration-none"
                                    >
                                        <i className='fas fa-user'></i> Logout
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            navigate('/login');
                                            closeOffcanvas();
                                        }}
                                        className="nav-link btn btn-link text-decoration-none"
                                    >
                                        <i className='fas fa-user'></i> Login
                                    </button>
                                )}
                            </li>
                            <li className="nav-item">
                                <Link to='/cart'><a className="nav-link" href="#cart" onClick={closeOffcanvas}><i className='fas fa-shopping-cart'></i> Cart</a></Link>
                            </li>
                            {isLoggedIn && user_email === adminEmail && (
                                <li className="nav-item">
                                    <Link to='/admin'><a className="nav-link" onClick={closeOffcanvas}><i className='fas fa-user'></i> Admin</a></Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
