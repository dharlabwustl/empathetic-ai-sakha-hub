
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, Volume2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { logout, isAuthenticated } = useAuth();
  const { adminLogout, isAdminAuthenticated } = useAdminAuth();
  
  // Local state to force re-render when auth state changes
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check auth status on mount and when it changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const adminLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
      
      setIsLoggedIn(userLoggedIn || adminLoggedIn);
      setIsAdmin(adminLoggedIn);
    };
    
    // Initial check
    checkAuthStatus();
    
    // Listen for storage changes (logout/login in other tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, [isAuthenticated, isAdminAuthenticated]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleVoiceAssistant = () => {
    // Dispatch an event for the floating voice announcer to handle
    document.dispatchEvent(new CustomEvent('open-voice-assistant'));
  };

  const handleLogout = () => {
    if (isAdmin) {
      adminLogout();
    } else {
      logout();
    }
    
    // Force immediate UI update
    setIsLoggedIn(false);
    setIsAdmin(false);
    
    // Dispatch custom event for auth state change
    window.dispatchEvent(new Event('auth-state-changed'));
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleVoiceAssistant}
                    className="relative"
                  >
                    <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-200/30 dark:bg-indigo-700/20" />
                    <Volume2 className="h-[1.2rem] w-[1.2rem] text-indigo-600 dark:text-indigo-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Talk with PREPZR assistant</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <ThemeToggle />
            {isLoggedIn ? (
              <div className="flex space-x-2">
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleVoiceAssistant}
                    className="relative"
                  >
                    <div className="absolute inset-0 rounded-full animate-pulse bg-indigo-200/30 dark:bg-indigo-700/20" />
                    <Volume2 className="h-[1.2rem] w-[1.2rem] text-indigo-600 dark:text-indigo-400" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Talk with PREPZR assistant</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
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
