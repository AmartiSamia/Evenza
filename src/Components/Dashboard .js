import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import axios from 'axios';
import AuthService from '../services/authService';
import { UserCircle, LogOut, Settings, Camera, Edit } from 'lucide-react';
import ProtectedRoute from './ProtectedRoute';

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profilePicture: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Get user info on component mount
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setProfileData({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        email: currentUser.email || '',
        phoneNumber: currentUser.phoneNumber || '',
        profilePicture: currentUser.profilePicture || ''
      });
    }
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    router.push('/login');
  };
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProfileData({
          ...profileData,
          profilePicture: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      const API_BASE_URL = 'https://localhost:7169/api/User';
      const token = localStorage.getItem('token');
      
      const response = await axios.put(`${API_BASE_URL}/update-profile`, profileData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        // Update local storage with new user data
        const updatedUser = {...user, ...profileData};
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditingProfile(false);
        // Show success message (toast implementation would be needed)
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to render profile picture
  const renderProfilePicture = () => {
    const profileImage = imagePreview || profileData.profilePicture;
    
    if (profileImage) {
      return (
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-100">
          <img 
            src={profileImage} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
          {isEditingProfile && (
            <label htmlFor="profile-picture" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer">
              <Camera className="h-8 w-8 text-white" />
              <input 
                id="profile-picture" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange} 
              />
            </label>
          )}
        </div>
      );
    }
    
    return (
      <div className="relative w-32 h-32 rounded-full bg-indigo-100 flex items-center justify-center">
        <UserCircle className="h-20 w-20 text-indigo-600" />
        {isEditingProfile && (
          <label htmlFor="profile-picture" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer rounded-full">
            <Camera className="h-8 w-8 text-white" />
            <input 
              id="profile-picture" 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange} 
            />
          </label>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-900">Evenza Dashboard</h1>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {profileData.profilePicture ? (
                <div className="h-10 w-10 rounded-full overflow-hidden">
                  <img 
                    src={profileData.profilePicture} 
                    alt="Profile" 
                    className="h-full w-full object-cover" 
                  />
                </div>
              ) : (
                <UserCircle className="h-10 w-10 text-indigo-600" />
              )}
              <div className="ml-2">
                <p className="text-sm font-medium text-gray-700">
                  {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role || ''}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">Personal Profile</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Your account details and preferences.
              </p>
            </div>
            {!isEditingProfile ? (
              <button
                onClick={() => setIsEditingProfile(true)}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Edit className="h-4 w-4 mr-1" /> Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditingProfile(false)}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProfileUpdate}
                  disabled={isLoading}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <div className="flex flex-col sm:flex-row">
              {/* Profile Picture Column */}
              <div className="w-full sm:w-1/3 flex flex-col items-center justify-start mb-6 sm:mb-0">
                {renderProfilePicture()}
              </div>
              
              {/* Profile Details Column */}
              <div className="w-full sm:w-2/3">
                {isEditingProfile ? (
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div className="col-span-1">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="col-span-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        disabled
                      />
                      <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                    </div>
                    
                    <div className="col-span-1">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        id="phoneNumber"
                        value={profileData.phoneNumber}
                        onChange={handleProfileChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                ) : (
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user ? `${user.firstName} ${user.lastName}` : '-'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email address</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.email || '-'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.phoneNumber || 'Not provided'}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Account type</dt>
                      <dd className="mt-1 text-sm text-gray-900 capitalize">{user?.role || '-'}</dd>
                    </div>
                  </dl>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional content based on role */}
        {user?.role === 'admin' && (
          <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Admin Controls</h3>
              <button 
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Settings className="h-4 w-4 mr-1" /> Manage Users
              </button>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <p className="px-4 py-5 sm:px-6 text-sm text-gray-500">
                As an administrator, you have access to additional controls and settings.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// Wrap with ProtectedRoute
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}