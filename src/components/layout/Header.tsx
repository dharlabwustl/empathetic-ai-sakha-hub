
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/auth/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and branding */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI Logo" 
              className="w-8 h-8"
            />
            <span className="font-medium text-gray-900 dark:text-white">Sakha AI HiFi</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400">
              About
            </Link>
            <Link to="/features" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400">
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400">
              Pricing
            </Link>
          </nav>
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" className="bg-violet-600 hover:bg-violet-700" asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/features" 
                className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/pricing" 
                className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <ThemeToggle />
              </div>
              
              <div className="flex flex-col space-y-3">
                {user ? (
                  <>
                    <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                    <Button variant="ghost" onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button 
                      variant="default" 
                      className="bg-violet-600 hover:bg-violet-700" 
                      asChild 
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to="/register">Sign up</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

