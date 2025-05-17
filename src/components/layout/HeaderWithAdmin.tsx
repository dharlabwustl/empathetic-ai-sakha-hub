import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { useToast } from '@/hooks/use-toast';
import authService from '@/services/auth/authService';
import adminAuthService from '@/services/auth/adminAuthService';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { adminLogout } = useAdminAuth();
  
  // Use state to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  
  // Check auth status on mount and when auth events occur
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check if user is logged in
      const studentLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      
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
          const adminUser = localStorage.getItem('adminUser');
          if (adminUser) {
            const parsedData = JSON.parse(adminUser);
            setUserName(parsedData.name || "Admin");
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
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = async () => {
    try {
      // Determine if we're logging out admin or regular user
      if (isAdmin) {
        await adminLogout();
        navigate('/admin/login');
      } else {
        await authService.logout();
      }
      
      // Show toast
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      
      // Navigate to home page
      navigate('/');
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
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="flex space-x-2 items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Hi, {userName}
                </span>
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
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <ThemeToggle />
              {isLoggedIn ? (
                <>
                  <div className="py-2 px-1 text-sm text-gray-600 dark:text-gray-300">
                    Hi, {userName}
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
