
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close menu when screen size changes from mobile to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  const menuItems = [
    { title: "What is Sakha 1.0?", link: "/about" },
    { title: "Features", link: "/features" },
    { title: "Pricing", link: "/pricing" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
      <div className="container mx-auto flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full relative overflow-hidden flex items-center justify-center">
            <img 
              src="/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png" 
              alt="Sakha AI Logo" 
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
          </div>
          <span className="text-xl sm:text-2xl font-display font-semibold gradient-text">Sakha AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <Link 
              key={item.link} 
              to={item.link} 
              className="text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-violet-500 text-violet-600 hover:bg-violet-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-violet-900/20" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button className="bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700" asChild>
              <Link to="/signup">
                <BookOpen className="mr-2 h-4 w-4" /> 
                Start Learning
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 dark:text-gray-200 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - Improved visibility and accessibility */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[57px] sm:top-[65px] z-40 bg-white dark:bg-slate-900 animate-fade-in">
          <nav className="flex flex-col gap-2 p-4">
            {menuItems.map((item) => (
              <Link 
                key={item.link}
                to={item.link} 
                className="py-3 px-4 text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-md transition-colors text-lg font-medium flex items-center justify-between"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.title}</span>
                <ChevronRight size={16} />
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-gray-100 dark:border-gray-800">
              <Button variant="outline" className="w-full border-violet-500 text-violet-600 dark:border-violet-400 dark:text-violet-400 h-12 text-lg" asChild>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              </Button>
              <Button className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white h-12 text-lg" asChild>
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <BookOpen className="mr-2 h-5 w-5" />
                  Start Learning
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
