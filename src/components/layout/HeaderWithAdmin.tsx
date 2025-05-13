
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/auth/AuthContext';
import PrepzrLogo from '@/components/common/PrepzrLogo';
import { toast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Display toast
      toast({
        title: "Logging out...",
        description: "Please wait while we log you out securely",
      });
      
      await logout();
      
      // The following code might not execute due to page redirect
      setIsLoggingOut(false);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
      
      // Show error toast
      toast({
        title: "Logout Failed",
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
              <PrepzrLogo width={320} height={90} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/dashboard/student">Dashboard</Link>
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout} 
                  disabled={isLoggingOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
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
              {user ? (
                <>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/dashboard/student">Dashboard</Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout} 
                    disabled={isLoggingOut}
                    className="justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
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
