
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';

interface DashboardVoiceAssistantProps {
  userName?: string;
  language?: string;
  userMood?: MoodType;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({ 
  userName = 'Student',
  language = 'en-US',
  userMood
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    // Check if this is a first-time login
    const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
    
    // Only play greeting for new users or when directly accessing the dashboard
    if (!greetingPlayed && isFirstTimeUser && 'speechSynthesis' in window) {
      // Use a timeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        try {
          // Create a personalized welcome message that mentions UN sustainability goals
          // instead of the free/donation message
          let welcomeMessage = `Congratulations ${userName}! Welcome to your personalized dashboard. I'm Sakha AI, your adaptive learning assistant. `;
          
          // Add UN sustainability goals message
          welcomeMessage += "PREPZR supports UN Sustainability goals with inclusive and equitable quality education by providing access to personalized learning for all students.";
          
          // Add mood-specific content if available
          if (userMood) {
            switch(userMood) {
              case MoodType.HAPPY:
                welcomeMessage += " I can see you're feeling positive today - that's a great mood for tackling challenging topics!";
                break;
              case MoodType.MOTIVATED:
                welcomeMessage += " You seem motivated today - let's take advantage of that energy to make significant progress.";
                break;
              case MoodType.STRESSED:
                welcomeMessage += " I notice you might be feeling stressed. Let's focus on smaller, achievable goals today to help you maintain momentum.";
                break;
              case MoodType.TIRED:
                welcomeMessage += " You appear to be tired today. I've adjusted your study plan to focus on review activities that require less mental energy.";
                break;
              default:
                welcomeMessage += " I'll adapt to your learning style and pace as you use the platform.";
            }
          }
          
          // Create speech synthesis utterance
          const speech = new SpeechSynthesisUtterance(welcomeMessage);
          speech.lang = language;
          speech.rate = 1.0; // Normal speed for clarity
          speech.pitch = 1.1; // Slightly higher pitch for a more vibrant tone
          speech.volume = 0.9;
          
          // Get available voices
          const voices = window.speechSynthesis.getVoices();
          
          // Try to find a vibrant, clear voice - preferring US English voices
          const preferredVoiceNames = [
            'Google US English Female', 'Microsoft Zira', 'Samantha', 
            'en-US', 'en-GB', 'English'
          ];
          
          // Find best matching voice
          let selectedVoice = null;
          for (const name of preferredVoiceNames) {
            const voice = voices.find(v => 
              v.name?.toLowerCase().includes(name.toLowerCase()) || 
              v.lang?.toLowerCase().includes(name.toLowerCase())
            );
            if (voice) {
              selectedVoice = voice;
              break;
            }
          }
          
          // If still no voice selected, use any available voice
          if (!selectedVoice && voices.length > 0) {
            selectedVoice = voices[0];
          }
          
          // Set the selected voice if found
          if (selectedVoice) {
            speech.voice = selectedVoice;
          }
          
          // Handle events
          speech.onstart = () => console.log("Voice greeting started");
          speech.onend = () => {
            setGreetingPlayed(true);
            console.log("Voice greeting completed");
          };
          speech.onerror = (e) => {
            console.error("Speech synthesis error", e);
            setGreetingPlayed(true);
          };
          
          // Speak the message
          window.speechSynthesis.speak(speech);
        } catch (error) {
          console.error("Error playing greeting:", error);
          setGreetingPlayed(true);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    
    // Cleanup function to cancel any ongoing speech when component unmounts
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [greetingPlayed, userName, language, userMood]);
  
  return null; // This component doesn't render any UI
};

export default DashboardVoiceAssistant;
