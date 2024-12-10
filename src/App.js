import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from "./components/Login";

import Trendingproducts from './components/Trendingproducts';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import ProductPage from './components/ProductPage';
import Preloader from './components/Preloader';
import Privacy from './components/Privacy';
import Termscondition from './components/Termscondition';
import Signup from './components/Signup';
import Cart from './components/Cart';
import ReturnPolicy from "./components/Returnpolicy";
import Shippingpolicy from './components/Shippingpolicy';
import Termsofservice from './components/Termsofservice';
import Admin from './components/Admin';
import Allproducts from './components/Allproducts'
import PrivateRoute from './components/Privateroute';
import Checkout from './components/Checkout';
import OrderSuccess from './components/Orderconfirmation';

function App() {

  return (
    <>
      <Preloader />
      <Router>
        <Navbar />
        <ScrollToTop />
        <Routes>

          <Route path="/" element={<Home />} />
          {/* <Route path="/product" element={<ProductPage />} />  */}
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/termscondition" element={<Termscondition />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/trend" element={<Trendingproducts />} />
          {/* <Route path="/product/:id" element={<ProductDetail/>} /> */}
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/return" element={<ReturnPolicy />} />
          <Route path="/shipping" element={<Shippingpolicy />} />
          <Route path="/terms" element={<Termsofservice />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderSuccess" element={<OrderSuccess/>}/>
          <Route element={<PrivateRoute/>}>
            <Route path="/admin" element={<Admin />} />
          </Route>


        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
