
import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface AdminRouteGuardProps {
  children?: React.ReactNode;
}

const AdminRouteGuard = ({ children }: AdminRouteGuardProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Simulate authentication check
  useEffect(() => {
    // In a real application, this would check for admin authentication
    // For now, let's simulate a check with localStorage or a mock
    const checkAuth = () => {
      const adminToken = localStorage.getItem('adminToken');
      setIsAuthenticated(!!adminToken);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Verifying admin access...</h2>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to admin login if not authenticated
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If authenticated, render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default AdminRouteGuard;
