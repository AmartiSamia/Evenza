import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthService from './AuthService';
import { Loader2 } from 'lucide-react';

/**
 * ProtectedRoute component - Wraps protected pages and handles authentication
 * 
 * @param {Object} props
 * @param {ReactNode} props.children - Child components to render if authenticated
 * @param {Array<string>} [props.allowedRoles] - Optional roles that are allowed to access this route
 * @param {string} [props.redirectTo='/login'] - Where to redirect if not authenticated
 */
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login' 
}) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check authentication and role
    const checkAuth = () => {
      const isAuthenticated = AuthService.isAuthenticated();
      
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      // If no specific roles are required, just being authenticated is enough
      if (allowedRoles.length === 0) {
        setIsAuthorized(true);
        setIsChecking(false);
        return;
      }

      // Otherwise, check if user has one of the allowed roles
      const user = AuthService.getCurrentUser();
      const hasRequiredRole = user && allowedRoles.some(
        role => user.role.toLowerCase() === role.toLowerCase()
      );

      if (!hasRequiredRole) {
        // User doesn't have the required role
        router.push('/unauthorized');
      } else {
        setIsAuthorized(true);
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [router, redirectTo, allowedRoles]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  return isAuthorized ? children : null;
};

export default ProtectedRoute;