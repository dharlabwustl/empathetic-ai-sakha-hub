
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full relative overflow-hidden flex items-center justify-center">
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI Logo" 
              className="w-10 h-10 object-contain"
            />
          </div>
          <span className="text-2xl font-display font-semibold gradient-text">Sakha AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/about" className="text-gray-600 hover:text-violet-600 transition-colors">
            What is Sakha 1.0?
          </Link>
          <Link to="/features" className="text-gray-600 hover:text-violet-600 transition-colors">
            Features
          </Link>
          <Link to="/pricing" className="text-gray-600 hover:text-violet-600 transition-colors">
            Pricing
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-violet-500 text-violet-600 hover:bg-violet-50" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 text-white" asChild>
              <Link to="/signup">
                <BookOpen className="mr-2 h-4 w-4" /> 
                Start Learning
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 py-4 px-6 animate-fade-in">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/about" 
              className="py-2 text-gray-600 hover:text-violet-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              What is Sakha 1.0?
            </Link>
            <Link 
              to="/features" 
              className="py-2 text-gray-600 hover:text-violet-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="py-2 text-gray-600 hover:text-violet-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-3 pt-2">
              <Button variant="outline" className="w-full border-violet-500 text-violet-600" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white" asChild>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Start Learning</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
