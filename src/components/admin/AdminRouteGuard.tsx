
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface AdminRouteGuardProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const AdminRouteGuard = ({ children, requiredPermission }: AdminRouteGuardProps) => {
  const { adminUser, isAuthenticated, loading } = useAdminAuth();
  const location = useLocation();

  // For debugging
  useEffect(() => {
    console.log("AdminRouteGuard - Auth state:", { isAuthenticated, loading, user: adminUser?.name });
  }, [isAuthenticated, loading, adminUser]);

  // Check if user is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Verifying admin access...</h2>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If permission check is required
  if (requiredPermission && (!adminUser?.permissions || !adminUser.permissions.includes(requiredPermission))) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 max-w-md">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">
            You don't have the required permissions to access this page.
          </p>
          <button 
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  console.log("Authorization successful, rendering admin content");
  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default AdminRouteGuard;
