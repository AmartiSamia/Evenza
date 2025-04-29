import { useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import image from "../Assets/EvenzaLogo.png";

export default function EvenzaLoginPage({ onSignupClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputStyles = {
    color: '#000',
    WebkitTextFillColor: '#000',
    caretColor: '#000',
  };

  return (
    <div className="flex max-sm:mt-[50px] justify-center items-center mt-[-40px] min-h-screen bg-[#221858] p-4 sm:p-10">
      <div className="flex w-full max-w-6xl overflow-hidden rounded-3xl shadow-lg flex-col sm:flex-row">
        {/* Login form section */}
        <div className="w-full sm:w-1/2 flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-8 bg-[#F8F6FF]">
         

          <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-indigo-950">Login</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6 sm:mb-8">Login to access your Evenza account</p>

          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyles}
                autoComplete="username"
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-pink-500 text-xs sm:text-sm">Forgot Password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={inputStyles}
                  autoComplete="current-password"
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

            <div className="flex items-center mb-4 sm:mb-6">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-pink-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mb-4"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-xs sm:text-sm">
              Don't have an account?{' '}
              <button 
                onClick={onSignupClick}
                className="text-pink-500 font-medium hover:underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Image section */}
        <div className="w-full sm:w-1/2 bg-gradient-to-br from-indigo-950 via-indigo-900 to-pink-500 flex items-center justify-center p-6 sm:p-12 rounded-b-3xl sm:rounded-r-3xl sm:rounded-bl-none">
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
              <h3 className="text-lg sm:text-xl font-bold text-center mb-1 sm:mb-2">Secure Login</h3>
              <p className="text-white/80 text-center text-xs sm:text-sm">
                Access your Evenza account securely to manage your event registrations and tickets.
              </p>
            </div>

            <div className="text-center text-white">
              <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Plan Today,</h2>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Enjoy Tomorrow</h2>
              <p className="text-white/80 text-xs sm:text-sm">
                Login to access your Evenza account and manage your upcoming events seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}