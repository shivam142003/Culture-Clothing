import React, {useState} from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth_token') ? true : false);
    const user_email=localStorage.getItem('user_email');
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  if (!isLoggedIn || user_email !== adminEmail) {
    // Redirect to the home page (or login page) if the user is not an admin
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
