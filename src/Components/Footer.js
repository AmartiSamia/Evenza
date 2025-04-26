import React from 'react';
import Logo from "../Assets/EvenzaLogo.png";

const Footer = () => {
  return (
    <footer className="bg-[#F8F6FF] text-black font-sans py-8 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with logo and links */}
        <div className="grid grid-cols-2 sm:gap-x-2 sm:ml-[90px] gap-y-8 gap-x-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Logo Column */}
          <div className="col-span-2 sm:ml-[-160px] lg:ml-[-60px] sm:col-span-2 md:col-span-3 lg:col-span-1 mb-6 lg:mb-0">
            <div className="flex items-center justify-center lg:justify-start">
              <img src={Logo} alt="Evenza Logo" className="w-24 h-auto" />
            </div>
          </div>
          {/* About Column */}
          <div className="col-span-1 lg:ml-[-50px] ">
            <h3 className="text-lg font-semibold mb-4 text-purple-500">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400">Company</a></li>
              <li><a href="#" className="hover:text-purple-400">Careers</a></li>
              <li><a href="#" className="hover:text-purple-400">Blog</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="col-span-1 lg:ml-[-50px] ">
            <h3 className="text-lg font-semibold mb-4 text-purple-500">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400">Event Planning</a></li>
              <li><a href="#" className="hover:text-purple-400">Consulting</a></li>
              <li><a href="#" className="hover:text-purple-400">Partnerships</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-span-1 lg:ml-[-50px] ">
            <h3 className="text-lg font-semibold mb-4 text-purple-500">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
              <li><a href="#" className="hover:text-purple-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="col-span-1 lg:ml-[-50px] ">
            <h3 className="text-lg font-semibold mb-4 text-purple-500">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:contact@evenza.com" className="hover:text-purple-400">contact@evenza.com</a></li>
              <li><a href="#" className="hover:text-purple-400">+212 6 00 00 00 00</a></li>
              <li><a href="#" className="hover:text-purple-400">Casablanca, Morocco</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <span>© 2024 Evenza. All rights reserved. Built by Samia El Amarti.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;