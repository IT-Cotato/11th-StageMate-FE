import {Navigate, Outlet} from 'react-router-dom';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProtectedRouteProps {
  isLoggedIn: boolean;
  isLoading?: boolean;
  redirectPath?: string;
}

const ProtectedRoute = ({
  isLoggedIn,
  isLoading = false,
  redirectPath = '/login',
}: ProtectedRouteProps) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
