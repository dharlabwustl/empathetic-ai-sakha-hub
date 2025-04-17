
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
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and branding */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
              <img 
                src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                alt="Sakha AI Logo" 
                className="relative w-8 h-8 transform group-hover:scale-105 transition duration-200"
              />
            </div>
            <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:from-violet-500 group-hover:to-indigo-500 transition-all duration-200">
              Sakha AI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400 transition-colors">
              About
            </Link>
            <Link to="/features" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400 transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400 transition-colors">
              Pricing
            </Link>
          </nav>
          
          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            {user ? (
              <>
                <Button variant="outline" className="border-violet-200 hover:border-violet-300 dark:border-violet-800 dark:hover:border-violet-700" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={() => logout()} className="hover:text-violet-600 dark:hover:text-violet-400">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="border-violet-200 hover:border-violet-300 dark:border-violet-800 dark:hover:border-violet-700" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  variant="default" 
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg transition-all duration-200" 
                  asChild
                >
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleMenu}
              className="hover:bg-violet-50 dark:hover:bg-violet-900/50"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-gray-700/50 animate-fade-in">
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
              
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700/50">
                <ThemeToggle />
              </div>
              
              <div className="flex flex-col space-y-3">
                {user ? (
                  <>
                    <Button variant="outline" className="border-violet-200 hover:border-violet-300 dark:border-violet-800 dark:hover:border-violet-700" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/dashboard">Dashboard</Link>
                    </Button>
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="hover:text-violet-600 dark:hover:text-violet-400"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" className="border-violet-200 hover:border-violet-300 dark:border-violet-800 dark:hover:border-violet-700" asChild onClick={() => setIsMenuOpen(false)}>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button 
                      variant="default" 
                      className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
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
