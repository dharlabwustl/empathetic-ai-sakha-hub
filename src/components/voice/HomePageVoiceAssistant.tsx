
import React, { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' 
}) => {
  const { toast } = useToast();
  const location = useLocation();
  const welcomeMessagePlayed = useRef<boolean>(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState<boolean>(false);
  const [voiceVolume, setVoiceVolume] = useState<number>(0.8);
  const [voiceRate, setVoiceRate] = useState<number>(0.9);
  const [voicePitch, setVoicePitch] = useState<number>(1.1);
  
  // Load voices when component mounts
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setAvailableVoices(voices);
        console.log("Available voices loaded:", voices.length);
      }
    };
    
    // Load voices right away in case they're already available
    loadVoices();
    
    // Also set up event for when voices are loaded asynchronously
    window.speechSynthesis.onvoiceschanged = loadVoices;
    
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Play welcome message when component mounts
  useEffect(() => {
    // Only play welcome message on first visit to home page
    if (location.pathname === '/' && !welcomeMessagePlayed.current) {
      const isFirstTime = localStorage.getItem('first_visit') !== 'false';
      
      if (isFirstTime) {
        // Short delay to ensure voices are loaded
        const timer = setTimeout(() => {
          speakWelcomeMessage(isFirstTime);
          welcomeMessagePlayed.current = true;
          localStorage.setItem('first_visit', 'false');
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, availableVoices]);

  const speakWelcomeMessage = (isFirstTime: boolean) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create message based on whether it's the user's first visit
      const welcomeText = isFirstTime 
        ? "Namaste! Welcome to Prepzr. I'm your voice assistant with an Indian accent. I'm here to help you prepare for your exams. Click the voice assistant button in the bottom right to talk with me."
        : "Welcome back to Prepzr. I'm your voice assistant. How can I help you today?";
      
      // Create utterance
      const utterance = new SpeechSynthesisUtterance(welcomeText);
      
      // Find a suitable Indian voice
      const preferredVoiceNames = [
        'Google हिन्दी', 'Microsoft Kalpana', 'Microsoft Kajal', 'Google English India'
      ];
      
      // Look for preferred voices first
      let selectedVoice = null;
      for (const name of preferredVoiceNames) {
        const voice = availableVoices.find(v => v.name.includes(name));
        if (voice) {
          selectedVoice = voice;
          break;
        }
      }
      
      // If no preferred voice found, try to find any English (India) voice
      if (!selectedVoice) {
        selectedVoice = availableVoices.find(v => 
          v.lang === 'en-IN' || 
          v.lang === 'hi-IN' || 
          v.lang.includes('en') || 
          v.lang.includes('hi')
        );
      }
      
      // If still no voice found, use default voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log("Using voice:", selectedVoice.name);
      } else {
        console.log("No Indian voice found, using default voice");
      }
      
      // Set properties for Indian English accent
      utterance.lang = language;
      utterance.rate = voiceRate;  // Slightly slower for clearer pronunciation
      utterance.pitch = voicePitch; // Slightly higher pitch for female voice
      utterance.volume = voiceVolume;
      
      // Add event listeners to track when speaking starts and ends
      utterance.onstart = () => {
        document.dispatchEvent(new CustomEvent('voice-speaking-started', {
          detail: { message: welcomeText }
        }));
      };
      
      utterance.onend = () => {
        document.dispatchEvent(new Event('voice-speaking-ended'));
      };
      
      // Speak the welcome message
      window.speechSynthesis.speak(utterance);
      
      // Show a toast message
      toast({
        title: "Voice Assistant",
        description: isFirstTime ? 
          "Welcome! I'll be your guide on Prepzr." : 
          "Welcome back to Prepzr!",
        duration: 5000,
      });
    }
  };

  return null; // This is a non-visual component
};

export default HomePageVoiceAssistant;
