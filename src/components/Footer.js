import React from 'react';
import '../css/footer.css'; 
import justfound from "../images/justfound.png";
import culture from "../images/Culture.png";
import{Link} from 'react-router-dom'

const Footer = () => {
  return (
<footer className="site-footer">
  <div className="container">
  <hr/>
    <div className="row">
      <div className="col-sm-12 col-md-6 d-flex justify-content-center align-items-center text-center">
      <img src={culture} className="img-fluid" id='footerimg'alt="description" />

      </div>

      <div className="col-xs-6 col-md-3 text-center pt-3">
        <h6>Categories</h6>
        <ul className="footer-links">
          <li><Link to="/return"><a href="/">Returns/Exchange Policy</a></Link></li>
          <li><Link to='/privacy'><a href="/">Privacy Policy</a></Link></li>
          <li><Link to="/shipping"><a href="/">Shipping Policy</a></Link></li>
          <li><Link to="/terms"><a href="/">Terms of Service</a></Link></li>
        </ul>
      </div>

      <div className="col-xs-6 col-md-3 text-center pt-3">
        <h6>Quick Links</h6>
        <ul className="footer-links">
         
          <li>
          <Link to='/AboutUs'>About Us
          </Link></li>
         
          
          <li><Link to="/Contact">Contact Us</Link></li>
        </ul>
      </div>
    </div>
    <hr />
  </div>

  <div className="container">
    <div className="row">
      <div className="col-md-4 col-sm-6 col-xs-12 d-flex justify-content-center align-items-center text-center">
        <ul className="social-icons ">
          <li><a className="instagram" target='blank' href=""><i className='fab fa-instagram'></i></a></li>
        </ul>
      </div>
      <div className="col-md-8 col-sm-6 col-xs-12 text-center">
        <p className="copyright-text">Copyright &copy; 2024 All Rights Reserved by 
          <a href="/"> Shivam Tyagi</a>.
        </p>
      </div>
    </div>
  </div>
</footer>


  );
}

export default Footer;
