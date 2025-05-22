
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PrepzrLogo from '../common/PrepzrLogo';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4 px-6 sticky top-0 z-50 border-b border-blue-100 dark:border-blue-900/30 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <PrepzrLogo width={120} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            <li>
              <Link 
                to="/features" 
                className="text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                to="/pricing" 
                className="text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-blue-700 dark:text-blue-300"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-blue-100 dark:border-blue-900/30"
        >
          <nav className="container mx-auto py-4 px-6">
            <ul className="flex flex-col gap-4">
              <li>
                <Link 
                  to="/features" 
                  className="text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium text-lg block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium text-lg block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium text-lg block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-blue-700 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium text-lg block py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>

            <div className="flex flex-col gap-3 mt-6">
              <Button 
                variant="outline" 
                className="w-full border-blue-500 text-blue-700 dark:text-blue-300"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/login');
                }}
              >
                Login
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
                onClick={() => {
                  setIsOpen(false);
                  navigate('/signup');
                }}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default NavBar;
