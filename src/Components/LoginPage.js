import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function EvenzaLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted:', { email, password, rememberMe });
  };

  return (
    <div className="bg-[#221858] p-6 mt-[30px] min-h-screen flex items-center justify-center">
      <div className="flex flex-col sm:flex-row w-full max-w-5xl overflow-hidden rounded-3xl shadow-lg bg-white">
        {/* Left sidebar with logo and form */}
        <div className="sm:w-1/2 w-full flex flex-col justify-center px-8 sm:px-12 py-8 bg-[#F8F6FF] rounded-t-3xl sm:rounded-t-none sm:rounded-l-3xl">
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <img 
                src="https://storage.googleapis.com/a1aa/image/9be15209-a23b-4d82-38f4-8f37351479b2.jpg" 
                alt="Evenza logo, stylized purple and pink event planning icon with text Evenza" 
                className="h-10 w-10 mr-2"
              />
              <span className="text-2xl font-bold text-indigo-950">
                Evenza
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              Plan Today, Enjoy Tomorrow
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-2 text-indigo-950">
            Login
          </h2>
          <p className="text-gray-600 mb-8">
            Login to access your Evenza account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                autoComplete="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                  Password
                </label>
                <a className="text-pink-500 text-sm" href="#">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  autoComplete="current-password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  aria-label="Toggle password visibility"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  onClick={togglePasswordVisibility}
                  type="button"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <input
                className="h-4 w-4 text-pink-500 border-gray-300 rounded"
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="ml-2 block text-sm text-gray-700" htmlFor="remember-me">
                Remember me
              </label>
            </div>

            <button
              className="w-full bg-indigo-950 hover:bg-indigo-900 text-white font-medium py-2.5 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mb-4"
              type="submit"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a className="text-pink-500 font-medium" href="#">
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Right image and info section */}
        <div className="sm:w-1/2 w-full bg-gradient-to-br from-indigo-950 via-indigo-900 to-pink-500 flex items-center justify-center p-8 sm:p-12 rounded-b-3xl sm:rounded-b-none sm:rounded-r-3xl relative overflow-hidden">
          <div className="max-w-md w-full">
            {/* Dot grid patterns */}
            <div className="relative mb-8 hidden sm:block">
              <DotGrid position="top-left" />
              <DotGrid position="bottom-right" />
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-white mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-3 rounded-full inline-flex">
                  <EventIcon />
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">
                Secure Login
              </h3>
              <p className="text-white/80 text-center">
                Access your Evenza account securely to manage your event registrations and tickets.
              </p>
            </div>

            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-2">
                Plan Today,
              </h2>
              <h2 className="text-3xl font-bold mb-4">
                Enjoy Tomorrow
              </h2>
              <p className="text-white/80">
                Login to access your Evenza account and manage your upcoming events seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for the decorative dots
function DotGrid({ position }) {
  // Generate 36 dots for the grid
  const dots = Array(36).fill(0).map((_, i) => (
    <div key={i} className="w-2 h-2 rounded-full bg-white opacity-30"></div>
  ));

  const positionClasses = {
    'top-left': 'absolute -top-16 -left-16',
    'bottom-right': 'absolute -bottom-16 -right-16'
  };

  return (
    <div className={`${positionClasses[position]} grid grid-cols-6 gap-2`}>
      {dots}
    </div>
  );
}

// Event icon component
function EventIcon() {
  return (
    <svg 
      className="h-8 w-8 text-white" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path 
        d="M12 1v4m0 14v4m7-7h4M1 12h4m15.364-6.364l2.828 2.828M4.222 19.778l2.828-2.828M19.778 19.778l-2.828-2.828M4.222 4.222l2.828 2.828" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}