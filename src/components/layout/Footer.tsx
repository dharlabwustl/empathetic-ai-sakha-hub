
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sakha-dark-blue text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png" 
                alt="Sakha AI Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-display font-semibold text-white">Sakha AI</span>
            </Link>
            <p className="text-gray-300 mb-4">
              The AI that listens, learns, and evolves with you across your learning, career, and well-being journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-sakha-light-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-sakha-light-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-sakha-light-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-sakha-light-blue transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to="/careers" className="text-gray-300 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white transition-colors">Support</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">hello@sakhaai.com</li>
              <li className="text-gray-300">+91 123-456-7890</li>
              <li className="text-gray-300">Bengaluru, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">© 2025 Sakha AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
