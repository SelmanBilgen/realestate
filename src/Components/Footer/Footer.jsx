import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div className="footer-column">
          <h3 className="footer-heading">Rigel Premium Homes</h3>
          <p>Exclusive real estate opportunities in Athens, Greece. Golden Visa eligible properties.</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Contact Information</h3>
          <p>Location: Athens, Greece</p>
          <p>Email: <a href="mailto:rigelhospitalitygr@gmail.com">rigelhospitalitygr@gmail.com</a></p>
          <p>Phone: <a href="tel:+306972250118">+30 697 225 0118</a></p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Golden Visa Program</h3>
          <p>Eligible properties for Greece’s Golden Visa program. Invest €250,000 and gain European residency.</p>
        </div>
        <div className="footer-column">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="quick-links">
            <li><Link to="/">All Projects</Link></li>
            <li><Link to="/admin">Admin Panel</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Rigel Premium Homes Real Estate. All rights reserved.</p>
      </div>
      <button className="edit-with-base44-btn">Edit with Base44</button>
    </footer>
  );
};

export default Footer;