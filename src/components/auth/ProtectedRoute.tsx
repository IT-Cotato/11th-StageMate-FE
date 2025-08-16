import {Navigate, Outlet} from 'react-router-dom';

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
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
