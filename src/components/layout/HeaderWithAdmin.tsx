
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
    <header className="bg-white/80 dark:bg-gray-900/80 shadow-sm sticky top-0 z-50 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-200"></div>
                <img 
                  src="/lovable-uploads/f588ff63-eeb4-48db-9fb4-197fae5ce5c5.png" 
                  alt="Sakha AI Logo" 
                  className="relative w-10 h-10 transform group-hover:scale-105 transition duration-200"
                />
              </div>
              <span className="font-bold text-xl sm:text-2xl font-display text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 group-hover:from-violet-500 group-hover:to-indigo-500 transition-all duration-200">
                Sakha AI
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <nav className="flex items-center space-x-4 mr-4">
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
            
            <ThemeToggle />
            {user ? (
              <div className="flex space-x-2">
                <Button variant="outline" className="border-violet-200 hover:border-violet-300 dark:border-violet-800 dark:hover:border-violet-700" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={() => logout()} className="hover:text-violet-600 dark:hover:text-violet-400">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
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
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400 transition-colors py-2">
                Home
              </Link>
              <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400 transition-colors py-2">
                About
              </Link>
              <Link to="/features" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400 transition-colors py-2">
                Features
              </Link>
              <Link to="/pricing" className="text-sm font-medium text-gray-700 hover:text-violet-600 dark:text-gray-200 dark:hover:text-violet-400 transition-colors py-2">
                Pricing
              </Link>
              
              <ThemeToggle />
              {user ? (
                <>
                  <Button variant="outline" asChild className="justify-start border-violet-200 hover:border-violet-300 dark:border-violet-800 dark:hover:border-violet-700">
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" onClick={() => logout()} className="justify-start hover:text-violet-600 dark:hover:text-violet-400">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild className="justify-start border-violet-200 hover:border-violet-300 dark:border-violet-800 dark:hover:border-violet-700">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button 
                    variant="default" 
                    asChild 
                    className="justify-start bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Link to="/register">Sign up</Link>
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
