import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { 
  selectIsAuthenticated, 
  selectUserRole,
  selectAuthLoading // Added this import
} from '../features/auth/authSlice';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);
  const isLoading = useSelector(selectAuthLoading); // Now properly imported

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'admin') {
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;