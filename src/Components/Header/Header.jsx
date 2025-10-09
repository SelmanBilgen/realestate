import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7V21H22V7L12 2Z" fill="#A45DE9"/>
            <path d="M12 11L2 7" stroke="white" strokeWidth="1.5"/>
            <path d="M12 11L22 7" stroke="white" strokeWidth="1.5"/>
            <path d="M17 14H15V16H17V14Z" fill="white"/>
          </svg>
        </div>
        <div className="company-name">
          <strong>Rigel Premium Homes</strong>
          <small>Real Estate Projects</small>
        </div>
      </div>
      <nav className="header-center">
        <a href="#" className="nav-link active">All Projects</a>
        <a href="#" className="nav-link premium-access">Premium Access</a>
      </nav>
      <div className="header-right">
        <div className="user-profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#E0E0E0"/>
            <circle cx="12" cy="10" r="4" fill="white"/>
            <path d="M12 14C9.33 14 7 15.33 7 17V18H17V17C17 15.33 14.67 14 12 14Z" fill="white"/>
          </svg>
        </div>
        <a href="#" className="logout-link">Logout</a>
      </div>
    </header>
  );
};

export default Header;