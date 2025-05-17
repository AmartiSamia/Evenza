import React from 'react';
import { UserCircle, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ onRegisterClick, onNavLinkClick, isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default link behavior
    onRegisterClick(); // Call your original register handler
  };

  return (
    <div id="NavBar_principal" className="hidden lg:block font-montreal">
      <nav className="flex items-center space-x-10 text-[#FF50A3] text-sm">
        <button 
          onClick={() => onNavLinkClick("home")}
          className="hover:text-[#FF50A3]"
        >
          <span className="text-white font-semibold hover:text-[#FF50A3]">Home</span>
        </button>
        <button 
          onClick={() => onNavLinkClick("about")}
          className="hover:text-[#FF50A3]"
        >
          <span className="text-white font-semibold hover:text-[#FF50A3]">About us</span>
        </button>
        <button 
          onClick={() => onNavLinkClick("events")}
          className="hover:text-[#FF50A3]"
        >
          <span className="text-white font-semibold hover:text-[#FF50A3]">Events</span>
        </button>
        <button 
          onClick={() => onNavLinkClick("contact")}
          className="hover:text-[#FF50A3]"
        >
          <span className="text-white font-semibold hover:text-[#FF50A3]">Contact</span>
        </button>
        
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <Link 
              to="/dashboard"
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              {user?.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full object-cover mr-2"
                />
              ) : (
                <UserCircle className="h-8 w-8 text-white mr-2" />
              )}
              <span className="text-white font-semibold">
                {user?.firstName || 'User'}
              </span>
            </Link>
            <button 
              onClick={handleLogout}
              className="bg-transparent font-semibold text-white border-2 border-[#FF50A3] rounded-full px-6 py-2 hover:bg-[#FF50A3] hover:text-[#0a192f] hover:font-bold transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={onRegisterClick} // Keep using the original handler
            className="bg-transparent font-semibold text-white border-2 border-[#FF50A3] rounded-full px-6 py-2 hover:bg-[#FF50A3] hover:text-[#0a192f] hover:font-bold transition-colors duration-300"
          >
            Register
          </button>
        )}
      </nav>
    </div>
  );
};

export default NavBar;