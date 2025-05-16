
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, User } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use state to track login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check auth status on mount and when auth events occur
  useEffect(() => {
    const checkAuthStatus = () => {
      const studentLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      
      setIsLoggedIn(studentLoggedIn || adminLoggedIn);
      setIsAdmin(adminLoggedIn);
    };
    
    // Check on component mount
    checkAuthStatus();
    
    // Add event listener for auth state changes
    window.addEventListener('auth-state-changed', checkAuthStatus);
    
    // Add event listener for storage changes (for multi-tab support)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('auth-state-changed', checkAuthStatus);
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_user');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Update state
    setIsLoggedIn(false);
    setIsAdmin(false);
    
    // Dispatch event to notify components
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Force a hard reload to reset all components
    window.location.href = '/';
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center -ml-4">
            <Link to="/" className="flex items-center">
              <PrepzrLogo width={160} height={50} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to={isAdmin ? "/admin/dashboard" : "/dashboard/student"}>
                    {isAdmin ? "Admin Dashboard" : "Student Dashboard"}
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
            <ThemeToggle />
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
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to={isAdmin ? "/admin/dashboard" : "/dashboard/student"}>
                      {isAdmin ? "Admin Dashboard" : "Student Dashboard"}
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
