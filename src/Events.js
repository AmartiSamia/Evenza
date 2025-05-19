import React, { useState, useEffect } from 'react';

const EventCard = ({ event, onRegisterClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const formatTime = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const startTimeStr = start.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    const endTimeStr = end.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    return `${startTimeStr} - ${endTimeStr}`;
  };

  const { day, month, year } = formatDate(event.startTime);
  const timeRange = formatTime(event.startTime, event.endTime);

  return (
    <div className="flex max-sm:flex-col sm:flex-row sm:items-center sm:justify-between py-10 mx-[-30px] mt-[-25px] max-sm:flex max-sm:justify-center">
      <div className="flex items-start w-32 max-sm:mb-6">
        <div className="text-white text-5xl font-bold">{day}</div>
        <div className="text-white text-sm leading-tight mt-2">
          <p>{month}</p>
          <p>{year}</p>
        </div>
      </div>
      
      <div className="flex-1 lg:ml-[115px] sm:ml-[45px] max-sm:ml-0 max-sm:mb-6">
        <h2 className="text-white text-xl font-medium mb-3">{event.name}</h2>
        <div className="flex max-sm:flex-col max-sm:space-y-3 sm:items-center sm:space-x-6 text-sm text-gray-300">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span>{event.location || 'Location TBD'}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 text-pink-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{timeRange}</span>
          </div>
        </div>
      </div>
      
      <div className="sm:ml-4 max-sm:mt-2">
        <button 
          onClick={() => onRegisterClick(event)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full border border-white hover:opacity-90 transition"
        >
          Get Tickets
        </button>
      </div>
    </div>
  );
};

const Events = ({ isAuthenticated, user, onLoginClick, onSignupClick }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  // Pre-fill form data when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      }));
    }
  }, [isAuthenticated, user]);

  const handleRegister = (event) => {
    setSelectedEvent(event);
    setRegistrationSuccess(false);
    setRegistrationError('');
    
    if (isAuthenticated) {
      setShowRegistrationModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (registrationError) {
      setRegistrationError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      setRegistrationError('Please agree to the terms and conditions');
      return;
    }

    setIsSubmitting(true);
    setRegistrationError('');
    
    try {
      const token = localStorage.getItem('token');
      const registrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        eventId: selectedEvent.id,
        userId: user?.id || '3B4A4BDD-9CF4-440E-86C1-B83055AEC3E6' // Fallback to a default userId
      };

      const response = await fetch('https://localhost:7169/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `Registration failed (${response.status})`);
      }

      const result = await response.json();
      setRegistrationSuccess(true);
      
      // Auto-close modal after 3 seconds on success
      setTimeout(() => {
        closeRegistrationModal();
      }, 3000);
    } catch (err) {
      setRegistrationError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
    setSelectedEvent(null);
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
    setSelectedEvent(null);
    setRegistrationSuccess(false);
    setRegistrationError('');
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
      agreeToTerms: false
    });
  };

  const handleSignIn = () => {
    closeLoginModal();
    if (onLoginClick) onLoginClick();
  };

  const handleCreateAccount = () => {
    closeLoginModal();
    if (onSignupClick) onSignupClick();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://localhost:7169/api/Events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <div className="text-center text-white">Loading events...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <section id="events" className="max-w-[1100px] mx-auto px-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} onRegisterClick={handleRegister} />
      ))}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 px-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-700">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">Authentication Required</h2>
              <p className="text-gray-300 text-sm">Please log in or create an account to register for events</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleSignIn}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Sign In
              </button>
              <button
                onClick={handleCreateAccount}
                className="w-full bg-transparent border-2 border-purple-500 hover:bg-purple-500 text-purple-400 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                Create Account
              </button>
            </div>
            
            <button
              onClick={closeLoginModal}
              className="w-full mt-4 text-gray-400 hover:text-gray-300 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistrationModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 px-4 py-8">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-gray-700 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">Event Registration</h2>
              <p className="text-gray-300 text-lg font-medium">{selectedEvent.name}</p>
              <p className="text-gray-400 text-sm">
                {new Date(selectedEvent.startTime).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            {/* Success Message */}
            {registrationSuccess && (
              <div className="mb-6 p-4 bg-green-600 bg-opacity-20 border border-green-500 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-green-400 font-semibold text-lg">Registration Successful!</h3>
                <p className="text-green-300 text-sm mt-1">You're all set for {selectedEvent.name}</p>
                <p className="text-gray-400 text-xs mt-2">This window will close automatically...</p>
              </div>
            )}

            {/* Error Message */}
            {registrationError && (
              <div className="mb-6 p-4 bg-red-600 bg-opacity-20 border border-red-500 rounded-xl text-center">
                <div className="flex justify-center mb-2">
                  <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-red-400 font-medium">{registrationError}</p>
              </div>
            )}

            {/* Form */}
            {!registrationSuccess && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-300 text-sm font-medium mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-gray-300 text-sm font-medium mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-300 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="mt-1 w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500 focus:ring-2"
                    />
                    <label htmlFor="agreeToTerms" className="text-gray-300 text-sm leading-relaxed">
                      I agree to the{' '}
                      <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                        terms and conditions
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-purple-400 hover:text-purple-300 underline">
                        privacy policy
                      </a>
                    </label>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeRegistrationModal}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreeToTerms}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Registering...
                      </>
                    ) : (
                      'Register Now'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Close button for success state */}
            {registrationSuccess && (
              <div className="text-center">
                <button
                  onClick={closeRegistrationModal}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Events;