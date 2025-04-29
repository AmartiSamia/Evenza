import { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import image from "../Assets/EvenzaLogo.png";

export default function EvenzaSignupPage({ onLoginClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#221858] mt-[-40px] p-4 sm:p-10">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl shadow-lg flex-col sm:flex-row">
        {/* Image section */}
        <div className="w-full sm:w-1/2 bg-gradient-to-br from-indigo-950 via-indigo-900 to-pink-500 flex items-center justify-center p-6 sm:p-12 rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none">
          <div className="max-w-md w-full">
            <div className="relative mb-6 sm:mb-8 hidden sm:block">
              <div className="absolute -top-10 sm:-top-16 -left-10 sm:-left-16">
                <div className="grid grid-cols-6 gap-1 sm:gap-2">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-30"></div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-10 sm:-bottom-16 -right-10 sm:-right-16">
                <div className="grid grid-cols-6 gap-1 sm:gap-2">
                  {[...Array(36)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-30"></div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl text-white mb-4 sm:mb-6">
              <div className="flex items-center justify-center mb-3 sm:mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 sm:p-3 rounded-full">
                  <Shield className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-center mb-1 sm:mb-2">Secure Sign Up</h3>
              <p className="text-white/80 text-center text-xs sm:text-sm">
                Create your Evenza account securely to manage your event registrations and tickets.
              </p>
            </div>

            <div className="text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Plan Today,</h2>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Enjoy Tomorrow</h2>
              <p className="text-white/80 text-xs sm:text-sm">
                Sign up to access your Evenza account and manage your upcoming events seamlessly.
              </p>
            </div>
          </div>
        </div>

        {/* Signup form section */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-8 bg-[#F8F6FF] rounded-b-3xl sm:rounded-r-3xl sm:rounded-bl-none">
       

          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-indigo-950">Sign Up</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">
            Let's get you all set up so you can access your personal account.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="+1 (123) 456-7890"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                id="agreeTerms"
                name="agreeTerms"
                type="checkbox"
                className="h-4 w-4 text-pink-500 border-gray-300 rounded"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-xs sm:text-sm text-gray-700">
                Agree to all the Terms and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mb-4"
            >
              Create Account
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-xs sm:text-sm">
              Already have an account?{' '}
              <button 
                onClick={onLoginClick}
                className="text-pink-500 font-medium hover:underline"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}