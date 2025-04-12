
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-900 to-violet-900 text-white py-16 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <img 
                src="/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png" 
                alt="Sakha AI Logo" 
                className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
              />
              <span className="text-xl font-display font-semibold text-white">Sakha AI</span>
            </Link>
            <p className="text-purple-100 leading-relaxed">
              The AI that listens, learns, and evolves with you across your learning journey, helping you ace your exams with personalized support.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-purple-200 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors hover:scale-110 transform duration-200">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Company
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-purple-400"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Resources
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-purple-400"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-purple-200 hover:text-white transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 bg-purple-400 rounded-full transition-all group-hover:w-2 group-hover:bg-white"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-purple-400"></span>
            </h3>
            <ul className="space-y-3">
              <li className="text-purple-200 flex items-center gap-2">
                <Mail size={16} className="text-purple-300" />
                <span>hello@sakhaai.com</span>
              </li>
              <li className="text-purple-200 flex items-center gap-2">
                <Phone size={16} className="text-purple-300" />
                <span>+91-8007194747</span>
              </li>
              <li className="text-purple-200 flex items-start gap-2">
                <MapPin size={16} className="text-purple-300 mt-1 flex-shrink-0" />
                <div>
                  <p className="mb-1">Gurgaon Office: Nasscom office Udyog Vihar, India</p>
                  <p>Patna Office: Boring Road, Patna, Bihar</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700/50 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-200 mb-4 md:mb-0">© 2025 Sakha AI. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-purple-200 hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="text-purple-200 hover:text-white transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-purple-200 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
