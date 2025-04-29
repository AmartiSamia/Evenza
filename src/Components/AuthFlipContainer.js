import { useState, useEffect } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';

export default function EnhancedAuthFlipContainer({ isFlipped: externalIsFlipped = false, onLoginClick, onSignupClick }) {
  const [isFlipped, setIsFlipped] = useState(externalIsFlipped);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  // Sync with external prop changes
  useEffect(() => {
    setIsFlipped(externalIsFlipped);
  }, [externalIsFlipped]);

  const toggleFlip = () => {
    const newFlipState = !isFlipped;
    setIsFlipped(newFlipState);
    
    if (newFlipState) {
      onSignupClick?.();
    } else {
      onLoginClick?.();
    }
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

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', loginData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', signupData);
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
      
      <div className="max-w-md w-full  relative z-10 ">
        <div className="relative mb-6 sm:mb-8 hidden sm:block max-sm:block ">
          {renderGridDots()}
        </div>

        <div className="bg-white/10  backdrop-blur-sm p-6 sm:p-8 rounded-2xl text-white mb-4 sm:mb-6 transform transition-all hover:scale-105 duration-300 max-sm:p-4">
        <div className="flex items-center justify-center mb-3 sm:mb-4">
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-2 sm:p-3 rounded-full shadow-lg">
            <Shield className="text-white w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-center mb-1 sm:mb-2">
          {isFlipped ? 'Secure Sign Up' : 'Secure Login'}
        </h3>
        <p className="text-white/80 text-center text-xs sm:text-sm ">
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
    <div className=" flex my-[30px]  max-sm:mt-[-32px] mt-[-38px] justify-center items-center min-h-screen py-16 px-4 bg-gradient-to-b from-[#1A1346] to-[#25195E] sm:p-10">
      <div className="w-full max-w-6xl h-[600px] max-sm:h-[1200px] sm:h-[650px] relative perspective-300">
        {/* Ambient background effects */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        
        {/* Card container */}
        <div className={`relative max-sm:h-full w-full h-[710px] min-h-[710px] transition-transform duration-700 ease-in-out transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front - Login */}
          <div className={`absolute max-sm:rounded-l-3xl max-sm:h-[750px] max-sm:min-h-[950px]  w-full h-full backface-hidden ${isFlipped ? 'z-0' : 'z-10'}`}>
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
                    className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mb-4 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                  >
                    Login
                  </button>
                </form>

                <div className="text-center mt-4 ">
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
          <div className={`absolute   w-full h-full backface-hidden transform-rotate-y-180 ${isFlipped ? 'z-10' : 'z-0'}`}>
          <div className="flex w-full h-full overflow-hidden rounded-3xl shadow-2xl flex-col sm:flex-row hover:shadow-indigo-900/20 transition-all duration-300 max-sm:rounded-l-3xl">
              {renderImageSection(false)}

         <div className="w-full sm:w-1/2  max-sm:min-h-[750px] flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-8 bg-[#F8F6FF]  max-sm:pt-[1px] rounded-b-3xl sm:rounded-r-3xl sm:rounded-bl-none max-h-full overflow-y-auto max-sm:rounded-l-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-pink-500 text-center ">Sign Up</h2>
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
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
                      placeholder="john.doe@example.com"
                      value={signupData.email}
                      onChange={handleSignupChange}
                      style={inputStyles}
                      required
                    />
                  </div>

                  <div className="mb-4 group">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
                      placeholder="+1 (123) 456-7890"
                      value={signupData.phone}
                      onChange={handleSignupChange}
                      style={inputStyles}
                    />
                  </div>

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
                        className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 group-hover:border-pink-300"
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
                    className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-medium py-2 px-4 sm:py-2.5 sm:px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mb-4 transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
                  >
                    Create Account
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
        .perspective-2000 {
          perspective: 2000px;
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