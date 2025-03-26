import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../features/auth/authSlice';
import { authAPI } from '../api/User';

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // 1. First check with backend
        const { isAuthenticated, user, expiresAt } = await authAPI.checkAuth(); // Added expiresAt
        
        if (isAuthenticated) {
          // 2. If valid, update Redux store
          dispatch(loginSuccess({ 
            user,
            accessToken: localStorage.getItem('authToken'),
            refreshToken: localStorage.getItem('refreshToken'),
            expiresAt // Store expiration timestamp
          }));

          // Schedule token expiration check
          scheduleTokenExpiryCheck(expiresAt);
          return;
        }
        
        // 3. If not authenticated, try refreshing token
        try {
          const { accessToken, refreshToken, expiresAt: newExpiresAt } = await authAPI.refreshToken();
          const retryCheck = await authAPI.checkAuth();
          
          if (retryCheck.isAuthenticated) {
            dispatch(loginSuccess({
              user: retryCheck.user,
              accessToken,
              refreshToken,
              expiresAt: newExpiresAt
            }));

            // Schedule new expiration check
            scheduleTokenExpiryCheck(newExpiresAt);
          } else {
            throw new Error('Not authenticated');
          }
        // eslint-disable-next-line no-unused-vars
        } catch (refreshError) {
          // 4. If all fails, clear auth state
          handleLogout();
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        handleLogout();
      }
    };

    const handleLogout = () => {
      dispatch(logout());
      authAPI.forceLogout();
    };

    const scheduleTokenExpiryCheck = (expirationTime) => {
      if (!expirationTime) return;
      
      const expiresIn = new Date(expirationTime).getTime() - Date.now();
      
      // Only schedule if expiration is in the future
      if (expiresIn > 0) {
        const timer = setTimeout(() => {
          handleLogout();
          window.location.href = '/login?session=expired';
        }, expiresIn);

        return () => clearTimeout(timer);
      }
    };

    initializeAuth();

    // Set up periodic auth checks (every 5 minutes)
    const interval = setInterval(() => {
      authAPI.checkAuth().catch(handleLogout);
    }, 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  return children;
};

export default AuthInitializer;