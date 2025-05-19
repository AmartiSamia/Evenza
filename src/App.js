'use client';
import { useState, useEffect } from 'react';
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
import { Toaster } from 'react-hot-toast';
import Dashboard from '../src/Components/Dashboard .js'; // Import your Dashboard component

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showAuthPage, setShowAuthPage] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);

  // Check auth status on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const setMenuOpen = (isOpen) => {
    setIsMenuOpen(isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  };

  const handleLogoClick = () => {
    setShowAuthPage(false);
    setShowDashboard(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleAuthPage = (showLogin = true) => {
    setShowAuthPage(true);
    setShowDashboard(false);
    setIsLoginView(showLogin);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuOpen) setMenuOpen(false);
  };

  const handleNavLinkClick = (id) => {
    console.log(`Nav link clicked for: ${id}`); // Debug logging
    setShowAuthPage(false);
    setShowDashboard(false);
    const element = document.getElementById(id);
    if (element) {
      console.log(`Found element with id ${id}, scrolling to it`); // Debug logging
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log(`Element with id ${id} not found`); // Debug logging
    }
    if (isMenuOpen) setMenuOpen(false);
  };

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowAuthPage(false);
    setShowDashboard(true); // Show dashboard after successful login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setShowAuthPage(false);
    setShowDashboard(false);
    window.location.href = '/';
  };

  const goToDashboard = () => {
    setShowAuthPage(false);
    setShowDashboard(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Get Tickets button click
  const handleGetTicketsClick = () => {
    console.log('Get Tickets clicked in App component!'); // Enhanced debug logging
    
    // Make sure we're on the main page (not auth or dashboard)
    setShowAuthPage(false);
    setShowDashboard(false);
    
    // Use setTimeout to ensure state updates have been processed
    setTimeout(() => {
      // Directly scroll to events section
      const eventsSection = document.getElementById('events');
      if (eventsSection) {
        console.log('Found events section, scrolling to it');
        eventsSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log('Events section not found by ID, trying alternate methods');
        // Use query selector as fallback
        const eventsSectionAlt = document.querySelector('section[id="events"]');
        if (eventsSectionAlt) {
          console.log('Found events section by querySelector, scrolling to it');
          eventsSectionAlt.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.log('Could not find events section');
        }
      }
    }, 100);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (!isMenuOpen) {
        setIsNavbarVisible(window.scrollY <= lastScrollY);
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMenuOpen]);

  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          integrity="sha512-bxj6yWgK9nhSmtUdowyoQIfOL8AbUuVn4jlXoU5N6Z7AlkZ+wvYimE2hrB3mJ7lpyOjA9MT8s3t6fsWvUDE2rQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <div className="app-container bg-[#23195A]">
        <Toaster position="top-right" />
        
        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)}></div>
        )}

        <MobileMenu
          isOpen={isMenuOpen}
          setOpen={setMenuOpen}
          onRegisterClick={() => toggleAuthPage(false)}
          onLoginClick={() => toggleAuthPage(true)}
          onNavLinkClick={handleNavLinkClick}
          isAuthenticated={isAuthenticated}
          user={user}
          onLogout={handleLogout}
          onDashboardClick={goToDashboard}
        />

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
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
            onDashboardClick={goToDashboard}
          />
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

        {showDashboard ? (
          <Dashboard 
            user={user} 
            onLogout={handleLogout}
            onNavLinkClick={handleNavLinkClick}
          />
        ) : showAuthPage ? (
          <section className="bg-[#221858] pt-16">
            <AuthFlipContainer 
              isFlipped={!isLoginView}
              onLoginClick={() => setIsLoginView(true)}
              onSignupClick={() => setIsLoginView(false)}
              onLoginSuccess={handleLoginSuccess}
            />
          </section>
        ) : (
          <>
            <main>
              <Accroche onGetTicketsClick={handleGetTicketsClick} />
            </main>
            <section id="about" className="bg-[#F8F6FF]">
              <About />
            </section>
            <section id="features" className="bg-[#FFFFFF]">
              <EventFeatures />
            </section>
            <section id="events" className="bg-[#221858]">
              <Events 
                isAuthenticated={isAuthenticated}
                user={user}
                onLoginClick={() => toggleAuthPage(true)}
                onSignupClick={() => toggleAuthPage(false)}
              />
            </section>
            <section className="bg-[#FFFFFF]">
              <StatsCards className="bg-[#FFFFFF]"/>
              <section className="bg-[#F8F6FF]">
                <Team />
              </section>
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
    </>
  );
}