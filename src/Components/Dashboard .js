import { useState, useEffect } from 'react';
import { UserCircle, Calendar, MapPin, Ticket, Settings, Camera, LogOut } from 'lucide-react';
import NavBar from './NavBar/Navbar.js'; // Importing your NavBar component
import { useNavigate } from 'react-router-dom';
import Logo from '../Assets/EvenzaLogo.png'; // Import the logo

const Dashboard = ({ onLogout, onBackToHome }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: ''
  });
  
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      name: "Leadership Conference 2025",
      date: "February 15, 2025",
      location: "135 W. 46rd Street, New York",
      time: "9:15am - 2:15pm"
    },
    {
      id: 2,
      name: "Digital Marketing Summit",
      date: "March 22, 2025",
      location: "135 W. 46rd Street, New York",
      time: "10:00am - 4:00pm"
    }
  ]);

  useEffect(() => {
    // Load user data from localStorage or API
    const userData = JSON.parse(localStorage.getItem('user')) || {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '(555) 123-4567',
      profilePicture: ''
    };
    
    setUser(userData);
    setFormData({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phoneNumber: userData.phoneNumber || '',
      profilePicture: userData.profilePicture || ''
    });
  }, []);

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

  return (
    <div className="min-h-screen bg-purple-50">
      {/* Updated header to match App.js style */}
      <div className="bg-[#23195A] p-4">
      {/* <div className="bg-gradient-to-r from-purple-900 to-purple-800 p-4"> */}

        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div
              onClick={onBackToHome}
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
                
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="border border-gray-200 rounded-lg p-4 hover:border-pink-300 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg text-purple-900">{event.name}</h3>
                          <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
                            <Calendar size={16} />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                            <MapPin size={16} />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                            <span className="font-medium">Time:</span>
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200">
                            View Details
                          </button>
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700">
                            Get Tickets
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
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
                
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="text-sm font-medium text-pink-500 mb-1">E-TICKET</div>
                          <h3 className="font-semibold text-lg text-purple-900">{event.name}</h3>
                          <div className="mt-2 text-gray-600">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar size={16} />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm mt-1">
                              <MapPin size={16} />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm mt-1">
                              <span className="font-medium">Time:</span>
                              <span>{event.time}</span>
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
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold text-purple-900 mb-6">Account Settings</h1>
                
                <div className="space-y-6">
                  <div className="border-b border-gray-200 pb-6">
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Notification Preferences</h2>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="h-5 w-5 rounded text-purple-600" defaultChecked />
                          <span>Email notifications for event updates</span>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="h-5 w-5 rounded text-purple-600" defaultChecked />
                          <span>Promotional emails and discounts</span>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="h-5 w-5 rounded text-purple-600" />
                          <span>SMS notifications and reminders</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
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