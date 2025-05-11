
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import VoiceAssistant from '@/components/dashboard/student/voice/VoiceAssistant';

interface FloatingVoiceAnnouncerProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({ 
  isOpen: initialOpen = false,
  onClose
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen);
  const [userName, setUserName] = useState<string>('Student');
  
  // Get user name from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        if (parsedData.name) {
          setUserName(parsedData.name);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);
  
  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };
  
  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };
  
  // Listen for custom event to open voice assistant
  useEffect(() => {
    const handleVoiceEvent = () => {
      setIsOpen(true);
    };
    
    document.addEventListener('open-voice-assistant', handleVoiceEvent as EventListener);
    
    return () => {
      document.removeEventListener('open-voice-assistant', handleVoiceEvent as EventListener);
    };
  }, []);
  
  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        <Button 
          onClick={handleToggle} 
          size="icon"
          className={`rounded-full h-12 w-12 ${isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {isOpen ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
      </div>
      
      <VoiceAssistant 
        isOpen={isOpen} 
        onClose={handleClose} 
        userName={userName}
      />
    </>
  );
};

export default FloatingVoiceAnnouncer;
