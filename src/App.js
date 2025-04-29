'use client';
import { useEffect, useState } from 'react';
import MobileMenu from './Components/NavBar/MobileMenu.js';
import NavBar from './Components/NavBar/Navbar.js';
import Logo from './Assets/EvenzaLogo.png';
import AuthFlipContainer from './Components/AuthFlipContainer.js';
import Accroche from './Components/Accroche.js';
import About from './About/About.js';
import EventFeatures from './EventFeatures.js';
import Events from './Events.js';
import StatsCards from './Components/StatsCards.js';
import Team from './Components/Team.js';
import Testimonials from './Components/Testimonials.js';
import Footer from './Components/Footer.js';
import FAQ from './Components/FAQ.js';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);

  const setMenuOpen = (isOpen) => {
    setIsMenuOpen(isOpen);
    // When mobile menu opens, we should prevent body scrolling
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const handleLogoClick = () => {
    setShowAuthPage(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAuthPage = (showLogin = true) => {
    setShowAuthPage(true);
    setIsLoginView(showLogin);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Close mobile menu if open
    if (isMenuOpen) {
      setMenuOpen(false);
    }
  };

  const handleNavLinkClick = (id) => {
    setShowAuthPage(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    // Close mobile menu if open
    if (isMenuOpen) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Don't hide navbar if mobile menu is open
          if (!isMenuOpen) {
            if (window.scrollY > lastScrollY) {
              setIsNavbarVisible(false);
            } else {
              setIsNavbarVisible(true);
            }
          }
          setLastScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  return (<>
    <head><link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
    integrity="sha512-bxj6yWgK9nhSmtUdowyoQIfOL8AbUuVn4jlXoU5N6Z7AlkZ+wvYimE2hrB3mJ7lpyOjA9MT8s3t6fsWvUDE2rQ=="
    crossorigin="anonymous"
    referrerpolicy="no-referrer"
  />
  </head>
    <div className="app-container bg-[#23195A]">
      <div className="text-whitesm:p-1 sm:pt-4">
        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
        )}

        {/* Mobile Menu */}
        <MobileMenu
  isOpen={isMenuOpen}
  setOpen={setMenuOpen}
  onRegisterClick={() => toggleAuthPage(false)}
  onLoginClick={() => toggleAuthPage(true)}
  onNavLinkClick={handleNavLinkClick}
/>

        {/* Navbar */}
        <header
          className={`flex justify-between items-center px-7 py-3 fixed top-0 left-0 w-full z-50 bg-[#23195A] transition-all duration-300 ${
            !isNavbarVisible && !isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <div className="flex items-center">
            <div
              id="logo"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
              className="text-white text-4xl font-bold flex items-center m-0 pl-4 lg:static max-sm:ml-[-20px]"
            >
              <img
                src={Logo}
                alt="Logo"
                className="pl-[20px] h-[38px] object-contain"
              />
            </div>
          </div>
          <NavBar 
            onRegisterClick={() => toggleAuthPage(false)} 
            onLoginClick={() => toggleAuthPage(true)}
            onNavLinkClick={handleNavLinkClick}
          />
          {/* Mobile Menu Button */}
          <button 
  onClick={() => setMenuOpen(!isMenuOpen)}
  id="hamburger"
  className="lg:hidden text-[#FF50A3]"
>
  {isMenuOpen ? (
    <i id="close-icon" className="fas fa-times text-3xl"></i>
  ) : (
    <i className="fa-sharp fa-solid fa-bars-staggered text-3xl"></i>
  )}
</button>
        </header>

        {/* Main Content */}
        {showAuthPage ? (
          <section className="bg-[#221858] pt-16">
            <AuthFlipContainer 
              isFlipped={!isLoginView}
              onLoginClick={() => setIsLoginView(true)}
              onSignupClick={() => setIsLoginView(false)}
            />
          </section>
        ) : (
          <>
            <main>
              <Accroche />
            </main>
            <section id="about" className="bg-[#F8F6FF]">
              <About />
            </section>
            <section id="features" className="bg-[#FFFFFF]">
              <EventFeatures />
            </section>
            <section id="events" className="bg-[#221858]">
              <Events />
            </section>
            <section className="bg-[#FFFFFF]">
              <StatsCards />
            </section>
            <section className="bg-[#F8F6FF]">
              <Team />
            </section>
            <section id="testimonials" className="bg-[#221858]">
              <Testimonials />
            </section>
            <section id="faq" className="bg-[#FFFFFF]">
              <FAQ />
            </section>
            <section id="contact" className="bg-[#F8F6FF]">
              <Footer />
            </section>
          </>
        )}
      </div>
    </div></>
  );
}