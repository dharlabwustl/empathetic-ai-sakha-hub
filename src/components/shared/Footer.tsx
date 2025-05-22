
import React from 'react';
import { Link } from 'react-router-dom';
import PrepzrLogo from '../common/PrepzrLogo';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-blue-100 dark:border-blue-900/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <PrepzrLogo width={150} />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              World's first emotionally aware, hyper personalized, adaptive exam prep platform.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Products</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Pricing</Link></li>
              <li><Link to="/testimonials" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Testimonials</Link></li>
              <li><Link to="/guides" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Study Guides</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Blog</Link></li>
              <li><Link to="/help" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Help Center</Link></li>
              <li><Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About Us</Link></li>
              <li><Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Careers</Link></li>
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-100 dark:border-blue-900/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} PREPZR. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400">Terms of Use</Link>
            <Link to="/cookies" className="text-gray-600 dark:text-gray-400 text-sm hover:text-blue-600 dark:hover:text-blue-400">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
