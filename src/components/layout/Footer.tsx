
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
            <h3 className="text-lg font-semibold text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-purple-200 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/features" className="text-purple-200 hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/about" className="text-purple-200 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-purple-200 hover:text-white transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/faq" className="text-purple-200 hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-purple-200 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-purple-200 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail size={18} className="flex-shrink-0 text-purple-300" />
                <a href="mailto:hello@sakhaai.com" className="text-purple-200 hover:text-white transition-colors">hello@sakhaai.com</a>
              </li>
              <li className="flex items-start space-x-3">
                <Phone size={18} className="flex-shrink-0 text-purple-300" />
                <a href="tel:+918007194747" className="text-purple-200 hover:text-white transition-colors">+91-8007194747</a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="flex-shrink-0 text-purple-300" />
                <span className="text-purple-200">Nasscom office Udyog Vihar, Gurgaon, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-purple-800/50 text-center">
          <p className="text-purple-200 text-sm">
            © {new Date().getFullYear()} Greatwisdom India Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
