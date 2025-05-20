import { useState, useEffect } from 'react';
import { UserCircle, Calendar, MapPin, Ticket, Settings, Camera, LogOut } from 'lucide-react';
import NavBar from './NavBar/Navbar.js';
import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/EvenzaLogo.png';

const Dashboard = ({ onLogout, onNavLinkClick, onBackToHome }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: ''
  });

  // Fetch user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')) || {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '(555) 123-4567',
      profilePicture: '',
      id: '00000000-0000-0000-0000-000000000000' // Default ID for testing
    };
    
    setUser(userData);
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phoneNumber: userData.phoneNumber || '',
      profilePicture: userData.profilePicture || ''
    });
    
    // Immediately call fetchRegistrations with the user ID
    fetchRegistrations(userData.id);
  }, []);

  const fetchRegistrations = async (userId) => {
    setLoading(true);
    try {
      // Attempt to fetch from API first
      const apiUrl = `https://localhost:7169/api/Registrations/user/${userId}`;
      console.log('Fetching registrations from:', apiUrl);
      
      try {
        const response = await fetch(apiUrl);
        
        if (response.ok) {
          let data = await response.json();
          console.log('API returned registrations:', data);
          
          // If events are not embedded in the registration, fetch them
          if (Array.isArray(data) && data.length > 0 && !data[0].event) {
            const registrationsWithEvents = await Promise.all(
              data.map(async (registration) => {
                if (registration.eventId) {
                  try {
                    const eventResponse = await fetch(`https://localhost:7169/api/Events/${registration.eventId}`);
                    if (eventResponse.ok) {
                      const eventData = await eventResponse.json();
                      return { ...registration, event: eventData };
                    }
                  } catch (error) {
                    console.error(`Failed to fetch event for registration ${registration.id}:`, error);
                  }
                }
                return registration;
              })
            );
            data = registrationsWithEvents;
          }
          
          setRegistrations(data);
          setError(null);
          setLoading(false);
          return;
        } else {
          console.warn('API returned non-OK status:', response.status);
        }
      } catch (err) {
        console.warn('API fetch error:', err);
      }
      
      // Fall back to mock data if API fails
      console.log('Using mock registration data');
      const mockRegistrations = [
        {
          id: "1",
          registrationDate: new Date().toISOString(),
          eventId: "e1",
          firstName: user?.firstName || "John",
          lastName: user?.lastName || "Doe",
          event: {
            id: "e1",
            name: "Leadership Conference 2025",
            startTime: "2025-02-15T09:15:00",
            endTime: "2025-02-15T14:15:00",
            location: "135 W. 46rd Street, New York"
          }
        },
        {
          id: "2",
          registrationDate: new Date().toISOString(),
          eventId: "e2",
          firstName: user?.firstName || "John",
          lastName: user?.lastName || "Doe",
          event: {
            id: "e2",
            name: "Digital Marketing Summit",
            startTime: "2025-03-22T10:00:00",
            endTime: "2025-03-22T16:00:00",
            location: "135 W. 46rd Street, New York"
          }
        }
      ];
      setRegistrations(mockRegistrations);
      setError(null);
    } catch (err) {
      console.error('Error in fetchRegistrations:', err);
      setError('Failed to load your registrations. Please try again later.');
      
      // Set up fallback mock data as last resort
      const mockRegistrations = [
        {
          id: "1",
          registrationDate: new Date().toISOString(),
          eventId: "e1",
          firstName: user?.firstName || "John",
          lastName: user?.lastName || "Doe",
          event: {
            id: "e1",
            name: "Leadership Conference 2025",
            startTime: "2025-02-15T09:15:00",
            endTime: "2025-02-15T14:15:00",
            location: "135 W. 46rd Street, New York"
          }
        },
        {
          id: "2",
          registrationDate: new Date().toISOString(),
          eventId: "e2",
          firstName: user?.firstName || "John",
          lastName: user?.lastName || "Doe",
          event: {
            id: "e2",
            name: "Digital Marketing Summit",
            startTime: "2025-03-22T10:00:00",
            endTime: "2025-03-22T16:00:00",
            location: "135 W. 46rd Street, New York"
          }
        }
      ];
      setRegistrations(mockRegistrations);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Here you would typically send the data to your backend API
      const updatedUser = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update profile');
    }
  };

  // Format date and time for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Date unavailable';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date unavailable';
    }
  };

  const formatTime = (startTimeString, endTimeString) => {
    if (!startTimeString || !endTimeString) return 'Time unavailable';
    try {
      const startTime = new Date(startTimeString);
      const endTime = new Date(endTimeString);
      
      const formatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
      return `${startTime.toLocaleTimeString('en-US', formatOptions)} - ${endTime.toLocaleTimeString('en-US', formatOptions)}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return 'Time unavailable';
    }
  };

  // NavBar handlers
  const handleNavLinkClick = (section) => {
    if (section === "home") {
      onBackToHome(); // Go back to main page
    } else {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function from props
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.location.href = '/';
  };

  // Safely get event data with fallbacks
  const getEventData = (registration) => {
    if (!registration) return {
      name: 'Event name unavailable',
      startTime: null,
      endTime: null,
      location: 'No location specified'
    };
    
    const event = registration.event || {};
    
    return {
      name: event.name || 'Event name unavailable',
      startTime: event.startTime || null,
      endTime: event.endTime || null,
      location: event.location || 'No location specified'
    };
  };

  // Loading and error states for event listings
  const renderEventsList = () => {
    if (loading) {
      return <div className="text-center py-8">Loading your events...</div>;
    }
    
    if (error) {
      return <div className="text-center py-8 text-red-500">{error}</div>;
    }
    
    if (registrations.length === 0) {
      return (
        <div className="text-center py-8 text-gray-600">
          <p className="mb-4">You haven't registered for any events yet.</p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {registrations.map((registration) => {
          const eventData = getEventData(registration);
          
          return (
            <div key={registration.id} className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg text-purple-900">{eventData.name}</h3>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                    <Calendar size={16} />
                    <span>{formatDate(eventData.startTime)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                    <MapPin size={16} />
                    <span>{eventData.location}</span>
                  </div>
                  {eventData.startTime && eventData.endTime && (
                    <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                      <span className="font-medium">Time:</span>
                      <span>{formatTime(eventData.startTime, eventData.endTime)}</span>
                    </div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Header */}
      <div className="bg-[#23195A] p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div
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
            isAuthenticated={true}
            user={user}
            onNavLinkClick={handleNavLinkClick}
            onRegisterClick={() => {}}
            onLogout={handleLogout}
            onDashboardClick={() => {}}
          />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 flex flex-col items-center border-b border-gray-200">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-100 mb-4">
                {formData.profilePicture ? (
                  <img 
                    src={formData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                    <UserCircle className="h-16 w-16 text-white" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-semibold">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'profile' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'hover:bg-purple-100'}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <UserCircle size={20} />
                    <span>Profile</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'events' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'hover:bg-purple-100'}`}
                    onClick={() => setActiveTab('events')}
                  >
                    <Calendar size={20} />
                    <span>My Events</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'tickets' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'hover:bg-purple-100'}`}
                    onClick={() => setActiveTab('tickets')}
                  >
                    <Ticket size={20} />
                    <span>My Tickets</span>
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 ${activeTab === 'settings' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'hover:bg-purple-100'}`}
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings size={20} />
                    <span>Settings</span>
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left px-4 py-2 rounded-lg flex items-center gap-3 text-red-500 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-xl shadow-md p-6 md:p-8">
            {activeTab === 'profile' && (
              <div>
                <h1 className="text-2xl font-bold text-purple-900 mb-6">Profile Information</h1>
                
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm font-medium">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1 text-sm font-medium">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                        readOnly
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm font-medium">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1 text-sm font-medium">Profile Picture</label>
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-100">
                          {formData.profilePicture ? (
                            <img 
                              src={formData.profilePicture} 
                              alt="Profile" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                              <UserCircle className="h-8 w-8 text-white" />
                            </div>
                          )}
                        </div>
                        <label className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg cursor-pointer hover:bg-purple-200 flex items-center gap-2">
                          <Camera size={16} />
                          <span>Upload Photo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageChange} 
                          />
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-pink-500 text-sm font-medium">First Name</p>
                        <p className="font-medium text-gray-800">{user?.firstName}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-pink-500 text-sm font-medium">Last Name</p>
                        <p className="font-medium text-gray-800">{user?.lastName}</p>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-pink-500 text-sm font-medium">Email</p>
                      <p className="font-medium text-gray-800">{user?.email}</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-pink-500 text-sm font-medium">Phone Number</p>
                      <p className="font-medium text-gray-800">{user?.phoneNumber || 'Not provided'}</p>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 shadow-md"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'events' && (
              <div>
                <h1 className="text-2xl font-bold text-purple-900 mb-6">My Upcoming Events</h1>
                {renderEventsList()}
                
                <div className="mt-8 text-center p-8 border border-dashed border-gray-300 rounded-lg">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">Discover More Events</h3>
                  <p className="text-gray-600 mb-4">Find and register for upcoming events that match your interests</p>
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 shadow-md">
                    Browse Events
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'tickets' && (
              <div>
                <h1 className="text-2xl font-bold text-purple-900 mb-6">My Tickets</h1>
                
                {loading && <div className="text-center py-8">Loading your tickets...</div>}
                
                {error && <div className="text-center py-8 text-red-500">{error}</div>}
                
                {!loading && !error && registrations.length === 0 && (
                  <div className="text-center py-8 text-gray-600">
                    <p className="mb-4">You don't have any tickets yet.</p>
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 shadow-md">
                      Browse Events
                    </button>
                  </div>
                )}
                
                {!loading && !error && registrations.length > 0 && (
                  <div className="space-y-4">
                    {registrations.map(registration => {
                      const eventData = getEventData(registration);
                      
                      return (
                        <div key={registration.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <div className="text-sm font-medium text-pink-500 mb-1">E-TICKET</div>
                              <h3 className="font-semibold text-lg text-purple-900">{eventData.name}</h3>
                              <div className="mt-2 text-gray-600">
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar size={16} />
                                  <span>{formatDate(eventData.startTime)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm mt-1">
                                  <MapPin size={16} />
                                  <span>{eventData.location}</span>
                                </div>
                                {eventData.startTime && eventData.endTime && (
                                  <div className="flex items-center gap-2 text-sm mt-1">
                                    <span className="font-medium">Time:</span>
                                    <span>{formatTime(eventData.startTime, eventData.endTime)}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2 text-sm mt-1">
                                  <span className="font-medium">Registered on:</span>
                                  <span>{formatDate(registration.registrationDate)}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col justify-center items-end">
                              <div className="text-lg font-bold text-purple-800">ADMIT ONE</div>
                              <button className="mt-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 flex items-center gap-2">
                                <Ticket size={16} />
                                <span>View Ticket</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold text-purple-900 mb-6">Account Settings</h1>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Password</h2>
                    <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200">
                      Change Password
                    </button>
                  </div>
                  
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Delete Account</h2>
                    <p className="text-gray-600 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;