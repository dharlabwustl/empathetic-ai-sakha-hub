
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStudentAuth } from "@/contexts/StudentAuthContext";

interface StudentRouteGuardProps {
  children: React.ReactNode;
}

const StudentRouteGuard = ({ children }: StudentRouteGuardProps) => {
  const { studentUser, isAuthenticated, loading } = useStudentAuth();
  const location = useLocation();

  // For debugging
  useEffect(() => {
    console.log("StudentRouteGuard - Auth state:", { isAuthenticated, loading, user: studentUser?.name });
  }, [isAuthenticated, loading, studentUser]);

  // Check if user is loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-t-pink-500 border-pink-200 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Verifying student access...</h2>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
};

export default StudentRouteGuard;
