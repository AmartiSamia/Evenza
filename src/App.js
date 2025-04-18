'use client';
import { useEffect, useState } from 'react';
import MobileMenu from './Components/NavBar/MobileMenu.js';
import NavBar from './Components/NavBar/Navbar.js'; // attention à la casse si tu utilises `Navbar` vs `NavBar`
import Accroche from './Components/Accroche.js';

export default function App({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const setMenuOpen = (isOpen) => {
    setIsMenuOpen(isOpen);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsNavbarVisible(false); // scroll down → hide
      } else {
        setIsNavbarVisible(true); // scroll up → show
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <html lang="en">
      <head>
        <title>Samia El Amarti</title>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap");
        </style>
      </head>
      <body className="bg-[#0a192f] text-white p-5 lg:px-11 sm:p-1 sm:pt-4">
        <header
          className={`flex justify-between items-center px-7 py-3 fixed top-0 left-0 w-full z-50 bg-[#0a192f] transition-all duration-300 ${
            !isNavbarVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex items-center">
            <div
              id="logo"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
              className="text-white text-4xl font-bold flex items-center m-0 pl-4 lg:static max-sm:ml-[-20px]"
            >
              <div className="text-gray-400">{'{'}</div>
              <div className="text-[#64ffda] mx-0">S</div>
              <div className="text-gray-400">{'}'}</div>
            </div>
          </div>
          <NavBar />
          <MobileMenu setOpacity={setMenuOpen} />
        </header>

        <main className="pt-24">{children}</main>
        <Accroche />
      </body>
    </html>
  );
}
