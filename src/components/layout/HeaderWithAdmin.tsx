
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import LanguageSelector from '@/components/common/LanguageSelector';
import { useToast } from '@/hooks/use-toast';
import authService from '@/services/auth/authService';
import adminAuthService from '@/services/auth/adminAuthService';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { adminUser, isAdminAuthenticated, adminLogout } = useAdminAuth();
  
  // Use state to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  
  // Check auth status on mount and when auth events occur
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check if user is logged in
      const studentLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true' || isAdminAuthenticated;
      
      setIsLoggedIn(studentLoggedIn || adminLoggedIn);
      setIsAdmin(adminLoggedIn);
      
      // Get user name if available
      if (studentLoggedIn) {
        try {
          const userData = localStorage.getItem('userData');
          if (userData) {
            const parsedData = JSON.parse(userData);
            setUserName(parsedData.name || "User");
          }
        } catch (e) {
          console.error("Error parsing user data", e);
        }
      } else if (adminLoggedIn) {
        try {
          // Use the admin user from context if available
          if (adminUser) {
            setUserName(adminUser.name || "Admin");
          } else {
            const adminUserData = localStorage.getItem('adminUser');
            if (adminUserData) {
              const parsedData = JSON.parse(adminUserData);
              setUserName(parsedData.name || "Admin");
            }
          }
        } catch (e) {
          console.error("Error parsing admin data", e);
        }
      }
    };
    
    // Check on component mount
    checkAuthStatus();
    
    // Add event listener for auth state changes
    window.addEventListener('auth-state-changed', checkAuthStatus);
    
    // Add event listener for storage changes (for multi-tab support)
    window.addEventListener('storage', (event) => {
      if (event.key === 'isLoggedIn' || event.key === 'admin_logged_in') {
        checkAuthStatus();
      }
    });
    
    return () => {
      window.removeEventListener('auth-state-changed', checkAuthStatus);
      window.removeEventListener('storage', checkAuthStatus as EventListener);
    };
  }, [isAdminAuthenticated, adminUser]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = async () => {
    try {
      // Determine if we're logging out admin or regular user
      if (isAdmin) {
        await adminLogout();
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your admin account.",
        });
        navigate('/admin/login');
      } else {
        await authService.logout();
        toast({
          title: "Logged out successfully",
          description: "You have been logged out of your account.",
        });
        navigate('/');
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Error",
        description: "There was an error logging you out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center -ml-2">
            <Link to="/" className="flex items-center">
              <PrepzrLogo width={280} height={90} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            {isLoggedIn ? (
              <div className="flex space-x-2 items-center">
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                  <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <User size={14} className="text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {userName}
                  </span>
                </div>
                <Button variant="ghost" asChild>
                  <Link to={isAdmin ? "/admin/dashboard" : "/dashboard/student"}>
                    {isAdmin ? "Admin Dashboard" : "Dashboard"}
                  </Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <div className="py-2 px-1 text-sm flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <User size={14} className="text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {userName}
                    </span>
                  </div>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to={isAdmin ? "/admin/dashboard" : "/dashboard/student"}>
                      {isAdmin ? "Admin Dashboard" : "Dashboard"}
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={handleLogout} className="justify-start">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="default" asChild className="justify-start">
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
