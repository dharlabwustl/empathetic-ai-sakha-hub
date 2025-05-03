
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu, X, HelpCircle, Volume2 } from 'lucide-react';
import { useAuth } from '@/contexts/auth/AuthContext';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Determine if we should show the voice helper button (only on landing/public pages)
  const showVoiceHelper = !user && (
    location.pathname === '/' || 
    location.pathname === '/about' || 
    location.pathname === '/features' ||
    location.pathname.includes('/pricing')
  );
  
  // State to track if the feature tour has been completed
  const [tourCompleted, setTourCompleted] = useState(false);
  
  useEffect(() => {
    // Check if the user has completed the feature tour
    const hasCompletedTour = localStorage.getItem('sawWelcomeTour') === 'true';
    setTourCompleted(hasCompletedTour);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleTriggerVoiceAssistant = () => {
    // Dispatch a custom event that the FloatingVoiceAnnouncer will listen for
    const event = new CustomEvent('trigger-voice-assistant');
    window.dispatchEvent(event);
  };
  
  const handleOpenTour = () => {
    // For logged-in users, dispatch event to open tour
    if (user) {
      const event = new CustomEvent('open-welcome-tour');
      window.dispatchEvent(event);
    } else {
      // For non-logged in users, open the exam analyzer
      const event = new CustomEvent('open-exam-analyzer');
      window.dispatchEvent(event);
    }
  };
  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center -ml-4">
            <Link to="/" className="flex items-center">
              <PrepzrLogo width={160} height={50} />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Tour Button */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleOpenTour}
              className="flex items-center gap-1 border-primary/30 text-primary"
            >
              <HelpCircle className="h-4 w-4" />
              {user ? "Take Tour" : "Try Demo"}
            </Button>
            
            {/* Voice Helper for non-logged in users */}
            {showVoiceHelper && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleTriggerVoiceAssistant}
                className="flex items-center gap-1 border-primary/30 text-primary"
              >
                <Volume2 className="h-4 w-4" />
                Voice Demo
              </Button>
            )}
            
            {user ? (
              <div className="flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/dashboard/student">Dashboard</Link>
                </Button>
                <Button variant="ghost" onClick={() => logout()}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button variant="default" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <ThemeToggle />
              
              {/* Tour Button */}
              <Button 
                variant="outline" 
                onClick={handleOpenTour}
                className="justify-start"
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                {user ? "Take Tour" : "Try Demo"}
              </Button>
              
              {/* Voice Helper for non-logged in users */}
              {showVoiceHelper && (
                <Button 
                  variant="outline" 
                  onClick={handleTriggerVoiceAssistant}
                  className="justify-start"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Voice Demo
                </Button>
              )}
              
              {user ? (
                <>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/dashboard/student">Dashboard</Link>
                  </Button>
                  <Button variant="ghost" onClick={() => logout()} className="justify-start">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" asChild className="justify-start">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button variant="default" asChild className="justify-start">
                    <Link to="/signup">Sign Up</Link>
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
