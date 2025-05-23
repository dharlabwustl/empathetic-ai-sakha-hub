
import React from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="block mb-4">
              <PrepzrLogo width={160} height={50} />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your AI-powered exam preparation companion for academic excellence.
            </p>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="/features" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Features</Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Blog</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Help Center</Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">FAQs</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Contact Us</Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 dark:text-gray-400 hover:underline">Careers</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">UN Sustainability</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              PREPZR contributes to UN Sustainable Development Goal #4: Quality Education.
              We donate 5% of subscription revenue to support underprivileged students.
            </p>
            <Link 
              to="/sustainability" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Learn more about our initiative
            </Link>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} PREPZR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
