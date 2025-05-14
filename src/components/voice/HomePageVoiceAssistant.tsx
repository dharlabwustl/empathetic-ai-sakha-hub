
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Volume2, Settings, Info } from 'lucide-react';
import HomepageVoiceAnnouncer from '@/components/home/HomepageVoiceAnnouncer';

/**
 * HomePageVoiceAssistant - Component that renders the voice assistant for the homepage
 */
const HomePageVoiceAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const navigate = useNavigate();
  
  // Check if the user has already seen the voice assistant intro
  useEffect(() => {
    const introSeen = localStorage.getItem('voiceAssistantIntroSeen');
    if (introSeen === 'true') {
      setHasSeenIntro(true);
    }
  }, []);
  
  // Open the voice assistant
  const openVoiceAssistant = () => {
    setIsOpen(true);
    // Dispatch an event that the voice assistant is being opened
    document.dispatchEvent(new CustomEvent('open-voice-assistant'));
  };
  
  // Mark the intro as seen
  const handleIntroComplete = () => {
    localStorage.setItem('voiceAssistantIntroSeen', 'true');
    setHasSeenIntro(true);
    openVoiceAssistant();
  };
  
  return (
    <>
      {/* Floating button to open voice assistant */}
      <button 
        onClick={openVoiceAssistant}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
        aria-label="Open Voice Assistant"
      >
        <Volume2 className="h-6 w-6" />
      </button>
      
      {/* Info button for first-time visitors */}
      {!hasSeenIntro && (
        <Sheet>
          <SheetTrigger asChild>
            <button 
              className="fixed bottom-20 right-6 z-40 bg-purple-500 text-white rounded-full p-3 shadow-lg animate-bounce"
              aria-label="Voice Assistant Info"
            >
              <Info className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>PREPZR Voice Assistant</SheetTitle>
              <SheetDescription>
                Your intelligent guide to PREPZR and exam preparation
              </SheetDescription>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div>
                <h3 className="font-medium mb-2">What can the voice assistant do?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                    <span>Guide you through PREPZR's features and exam preparation options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                    <span>Answer questions about our platform, pricing, and success stories</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                    <span>Help you sign up for a free trial or full subscription</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-purple-100 text-purple-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                    <span>Assist with the Exam Readiness Test and understanding your results</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Voice Commands</h3>
                <p className="text-sm mb-2">Try these voice commands to interact with the assistant:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-purple-50 p-2 rounded-lg">"Tell me about PREPZR"</div>
                  <div className="bg-purple-50 p-2 rounded-lg">"How do I sign up?"</div>
                  <div className="bg-purple-50 p-2 rounded-lg">"What's included in the free trial?"</div>
                  <div className="bg-purple-50 p-2 rounded-lg">"Tell me about exam preparation"</div>
                </div>
              </div>
              
              <Button onClick={handleIntroComplete} className="w-full">
                Got it! Try the Voice Assistant
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
      
      {/* HomepageVoiceAnnouncer component */}
      <HomepageVoiceAnnouncer autoPlay={false} delayStart={2000} />
    </>
  );
};

export default HomePageVoiceAssistant;
