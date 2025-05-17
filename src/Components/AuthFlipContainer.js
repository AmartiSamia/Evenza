'use client';
import { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function EnhancedAuthFlipContainer({ isFlipped: externalIsFlipped = false, onLoginClick, onSignupClick }) {
  const [isFlipped, setIsFlipped] = useState(externalIsFlipped);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    role: 'user'
  });
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7169/api/Auth';

  const ADMIN_SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY;
  console.log("Admin key:", ADMIN_SECRET_KEY);
  
  useEffect(() => {
    setIsFlipped(externalIsFlipped);
  }, [externalIsFlipped]);

  const toggleFlip = () => {
    const newFlipState = !isFlipped;
    setIsFlipped(newFlipState);
    newFlipState ? onSignupClick?.() : onLoginClick?.();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAdminKeyChange = (e) => {
    setAdminKey(e.target.value);
  };

  const validatePassword = (password) => {
    const errors = [];
    
    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("one number");
    if (!/[!@#$%^&*]/.test(password)) errors.push("one special character");
    
    return errors;
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
        
    try {
      // Updated endpoint to match ASP.NET controller
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: loginData.email,
        password: loginData.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Login response:', response);
      
      if (response.data.success) {
        toast.success("Login successful! Redirecting...");
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/dashboard';
      } else {
        // Handle success: false scenario
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error('Login error details:', error.response?.data || error.message);
      let errorMessage = "Invalid credentials";
      
      if (error.response) {
        errorMessage = error.response.data?.message || 
                     (typeof error.response.data === 'string' ? error.response.data : errorMessage);
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
   // Trim all inputs
   const trimmedData = {
    ...signupData,
    firstName: signupData.firstName.trim(),
    lastName: signupData.lastName.trim(),
    email: signupData.email.trim(),
    password: signupData.password.trim(),
    confirmPassword: signupData.confirmPassword.trim()
  };


  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedData.email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // Validate password strength
  const passwordErrors = validatePassword(trimmedData.password);
  if (passwordErrors.length > 0) {
    toast.error(`Password must include ${passwordErrors.join(', ')}`);
    return;
  }

  // Validate admin key if needed
  if (trimmedData.role === 'admin' && adminKey !== ADMIN_SECRET_KEY) {
    toast.error("Invalid admin secret key");
    return;
  }

  // Check if passwords match
  if (trimmedData.password !== trimmedData.confirmPassword) {
    toast.error("Passwords don't match");
    return;
  }

  // Check terms agreement
  if (!trimmedData.agreeTerms) {
    toast.error("You must agree to the terms");
    return;
  }
  setIsLoading(true);
  
  try {
    // Updated endpoint to match ASP.NET controller
    const response = await axios.post(`${API_BASE_URL}/register`, {
      firstName: trimmedData.firstName,
      lastName: trimmedData.lastName,
      email: trimmedData.email,
      phoneNumber: trimmedData.phoneNumber || null,
      password: trimmedData.password,
      confirmPassword: trimmedData.confirmPassword,
      role: trimmedData.role,
      agreedToTerms: trimmedData.agreeTerms,
      adminKey: trimmedData.role === 'admin' ? adminKey : null
    });
    
    console.log('Signup response:', response);
    
    if (response.data.success) {
      toast.success("Account created successfully!");
      toggleFlip();
      setLoginData({ email: trimmedData.email, password: '' });
    } else {
      // Handle success: false scenario
      toast.error(response.data.message || "Registration failed");
    }
  } catch (error) {
    console.error('Signup error:', error);
    let errorMessage = "Signup failed. Please try again.";
    
    if (error.response) {
      errorMessage = typeof error.response.data === 'string'
        ? error.response.data
        : error.response.data?.message || error.response.data?.error || errorMessage;
    }
    
    toast.error(errorMessage);
  } finally {
    setIsLoading(false);
  }
};


  const inputStyles = {
    color: '#000',
    WebkitTextFillColor: '#000',
    caretColor: '#000',
  };

  const renderGridDots = () => (
    <>
      <div className="absolute max-sm:h-full -top-10 sm:-top-16 -left-10 sm:-left-16">
        <div className="grid grid-cols-6 gap-1 sm:gap-2">
          {[...Array(36)].map((_, i) => (
            <div 
              key={`top-${i}`} 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-30"
              style={{
                animation: `pulse 3s infinite ${i * 0.05}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="absolute -bottom-10 max-sm:h-full sm:-bottom-16 -right-10 sm:-right-16">
        <div className="grid grid-cols-6 gap-1 sm:gap-2">
          {[...Array(36)].map((_, i) => (
            <div 
              key={`bottom-${i}`} 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white opacity-30"
              style={{
                animation: `pulse 3s infinite ${i * 0.05}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );

  const renderImageSection = (isFront) => (
    <div className="w-full max-sm:rounded-l-3xl sm:w-1/2 bg-gradient-to-br from-indigo-950 via-indigo-900 to-pink-500 flex items-center justify-center p-6 sm:p-12 rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none relative overflow-hidden max-sm:order-2 max-sm:min-h-[500px]">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-pink-500"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient-animation 8s ease infinite',
        }}
      ></div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-md w-full relative z-10">
        <div className="relative mb-6 sm:mb-8 hidden sm:block max-sm:block">
          {renderGridDots()}
        </div>

        <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl text-white mb-4 sm:mb-6 transform transition-all hover:scale-105 duration-300 max-sm:p-4">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 sm:p-3 rounded-full shadow-lg">
              <Shield className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-center mb-1 sm:mb-2">
            {isFlipped ? 'Secure Sign Up' : 'Secure Login'}
          </h3>
          <p className="text-white/80 text-center text-xs sm:text-sm">
            {isFlipped 
              ? 'Create your Evenza account securely to manage your event registrations and tickets.'
              : 'Access your Evenza account securely to manage your event registrations and tickets.'}
          </p>
        </div>

        <div className="text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">Plan Today,</h2>
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">Enjoy Tomorrow</h2>
          <p className="text-white/80 text-xs sm:text-sm">
            {isFlipped 
              ? 'Sign up to access your Evenza account and manage your upcoming events seamlessly.'
              : 'Login to access your Evenza account and manage your upcoming events seamlessly.'}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex my-[30px] max-sm:mt-[-32px] mt-[-38px] justify-center items-center min-h-screen py-16 px-4 bg-gradient-to-b from-[#1A1346] to-[#25195E] sm:p-10">
      <div className="w-full max-w-6xl h-[600px] max-sm:h-[1200px] sm:h-[650px] relative perspective-300">
        {/* Ambient background effects */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        
        {/* Card container */}
        <div className={`relative max-sm:h-full w-full h-[790px] min-h-[790px] transition-transform duration-700 ease-in-out transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front - Login */}
          <div className={`absolute max-sm:rounded-l-3xl max-sm:h-[750px] max-sm:min-h-[950px] w-full h-full backface-hidden ${isFlipped ? 'z-0' : 'z-10'}`}>
            <div className="flex w-full h-full overflow-hidden rounded-3xl shadow-2xl flex-col sm:flex-row hover:shadow-indigo-900/20 transition-all duration-300">
              <div className="w-full max-sm:h-[1000px] sm:w-1/2 flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-8 bg-[#F8F6FF] max-h-full overflow-y-auto">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-pink-500 text-center">Login</h2>
                <p className="text-[#802BC9] text-center text-sm sm:text-base mb-6 sm:mb-8">Login to access your Evenza account</p>

                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-4 group">
                    <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="login-email"
                      name="email"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
                      placeholder="your.email@example.com"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      style={inputStyles}
                      autoComplete="username"
                      required
                    />
                  </div>

                  <div className="mb-4 sm:mb-6 group">
                    <div className="flex justify-between items-center mb-1">
                      <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
                      <button type="button" className="text-pink-500 text-xs sm:text-sm hover:text-pink-700 transition-colors">Forgot Password?</button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="login-password"
                        name="password"
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        style={inputStyles}
                        autoComplete="current-password"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 hover:text-gray-600 transition-colors" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center mb-4 sm:mb-6">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500 transition-all"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-xs sm:text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mb-4 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                    ) : (
                      'Login'
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Don't have an account?{' '}
                    <button 
                      onClick={toggleFlip}
                      className="text-pink-500 font-medium hover:text-pink-700 hover:underline transition-all duration-300"
                    >
                      Sign up
                    </button>
                  </p>
                </div>
              </div>

              {renderImageSection(true)}
            </div>
          </div>

          {/* Back - Signup */}
          <div className={`absolute w-full h-full backface-hidden transform-rotate-y-180 ${isFlipped ? 'z-10' : 'z-0'}`}>
            <div className="flex w-full h-full overflow-hidden rounded-3xl shadow-2xl flex-col sm:flex-row hover:shadow-indigo-900/20 transition-all duration-300 max-sm:rounded-l-3xl">
              {renderImageSection(false)}

              <div className="w-full sm:w-1/2 max-sm:min-h-[750px] flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-8 bg-[#F8F6FF] max-sm:pt-[1px] rounded-b-3xl sm:rounded-r-3xl sm:rounded-bl-none max-h-full overflow-y-auto max-sm:rounded-l-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-pink-500 text-center">Sign Up</h2>
                <p className="text-[#802BC9] text-center text-sm sm:text-base mb-6 sm:mb-8">Sign Up to access your Evenza account</p>
                <form onSubmit={handleSignupSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="group">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
                        placeholder="John"
                        value={signupData.firstName}
                        onChange={handleSignupChange}
                        style={inputStyles}
                        required
                      />
                    </div>
                    <div className="group">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
                        placeholder="Doe"
                        value={signupData.lastName}
                        onChange={handleSignupChange}
                        style={inputStyles}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4 group">
                    <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="signup-email"
                      name="email"
                      className={`w-full px-3 py-2 text-sm sm:text-base border ${
                        signupData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email) 
                          ? 'border-red-500' 
                          : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300`}
                      placeholder="john.doe@example.com"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      style={inputStyles}
                      required
                    />
                    {signupData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupData.email) && (
                      <p className="mt-1 text-xs text-red-500">Please enter a valid email address</p>
                    )}
                  </div>

                  <div className="mb-4 group">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phoneNumber"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
                      placeholder="+1 (123) 456-7890"
                      value={signupData.phoneNumber}
                      onChange={handleSignupChange}
                      style={inputStyles}
                    />
                  </div>

                  <div className="mb-4 group">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                    <div className="relative">
                      <select
                        id="role"
                        name="role"
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiAjdjE3Mjc3IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iNiA5IDEyIDE1IDE4IDkiPjwvcG9seWxpbmU+PC9zdmc+')] bg-no-repeat bg-[right_0.5rem_center] bg-[length:1.5em]"
                        value={signupData.role}
                        onChange={handleSignupChange}
                        style={inputStyles}
                        required
                      >
                        <option value="user">Standard User</option>
                        <option value="admin">Administrator</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {signupData.role === 'admin' && (
                    <div className="mb-4 group">
                      <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-1">Admin Secret Key</label>
                      <input
                        type="password"
                        id="adminKey"
                        name="adminKey"
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
                        placeholder="Enter admin secret key"
                        value={adminKey}
                        onChange={handleAdminKeyChange}
                        style={inputStyles}
                        required={signupData.role === 'admin'}
                      />
                    </div>
                  )}

                  <div className="mb-4 group">
                    <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="signup-password"
                        name="password"
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
                        placeholder="••••••••"
                        value={signupData.password}
                        onChange={handleSignupChange}
                        style={inputStyles}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 hover:text-gray-600 transition-colors" />
                        )}
                      </button>

                    </div>
                  </div>

                  <div className="mb-4 group">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        className={`w-full px-3 py-2 text-sm sm:text-base border ${
                          signupData.password && 
                          signupData.password !== signupData.confirmPassword 
                            ? 'border-red-500' 
                            : 'border-gray-300'
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300`}
                        placeholder="••••••••"
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        style={inputStyles}
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="text-gray-400 w-4 h-4 sm:w-5 sm:h-5 hover:text-gray-600 transition-colors" />
                        )}
                      </button>
                      {signupData.password && signupData.password !== signupData.confirmPassword && (
                        <p className="mt-1 text-xs text-red-500">Passwords don't match</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      className="h-4 w-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500 transition-all"
                      checked={signupData.agreeTerms}
                      onChange={handleSignupChange}
                      required
                    />
                    <label htmlFor="agreeTerms" className="ml-2 block text-xs sm:text-sm text-gray-700">
                      Agree to all the Terms and Privacy Policy
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mb-4 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg disabled:opacity-70"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 mx-auto animate-spin" />
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Already have an account?{' '}
                    <button 
                      onClick={toggleFlip}
                      className="text-pink-500 font-medium hover:text-pink-700 hover:underline transition-all duration-300"
                    >
                      Login
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global CSS */}
      <style jsx global>{`
        .perspective-300 {
          perspective: 3000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .transform-rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes pulse-slow {
          0% { opacity: 0.1; }
          50% { opacity: 0.2; }
          100% { opacity: 0.1; }
        }
        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.2; }
          90% { opacity: 0.2; }
          100% { transform: translateY(-700px) translateX(300px); opacity: 0; }
        }
        @keyframes pulse {
          0% { opacity: 0.2; transform: scale(0.95); }
          50% { opacity: 0.4; transform: scale(1.05); }
          100% { opacity: 0.2; transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
}