import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo1.png';

const Logo = ({ className = "", linkTo = "/" }) => {
  return (
    <Link to={linkTo} className={`flex items-center ${className}`}>
      <div className="flex-shrink-0">
        <div className="flex items-center">
          {/* Using your logo1.png image */}
          <img 
            src={logo} 
            alt="CyberTech Solutions Logo" 
            className="h-10 w-auto"
          />
        </div>
      </div>
    </Link>
  );
};

export default Logo;