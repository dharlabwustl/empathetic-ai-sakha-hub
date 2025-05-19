
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';

interface VoiceGreetingProps {
  userName?: string;
  language?: string;
  userMood?: MoodType;
  isFirstTimeUser?: boolean;
}

// UN sustainability message to replace donation message
const UN_SUSTAINABILITY_MESSAGE = "PREP-zer is committed to UN Sustainability Goal 4 - Quality Education. We believe in providing inclusive and equitable quality education for all students, regardless of their background or circumstances.";

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({
  userName = 'Student',
  language = 'en-US',
  userMood,
  isFirstTimeUser = false
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Check if greeting has already been played in this session
    const hasBeenPlayed = sessionStorage.getItem('welcomeGreetingPlayed') === 'true';
    
    // Only play greeting if this is a first-time user and greeting hasn't been played yet
    if (!greetingPlayed && !hasBeenPlayed && isFirstTimeUser && 'speechSynthesis' in window) {
      // Set session storage flag to prevent repeated playback
      sessionStorage.setItem('welcomeGreetingPlayed', 'true');
      
      // Use a timeout to ensure the component is fully mounted
      const timer = setTimeout(() => {
        try {
          // Create a personalized welcome message
          let welcomeMessage = `Congratulations ${userName}! Welcome to your personalized dashboard. I'm Sakha AI, your adaptive learning assistant. `;
          
          // Add UN sustainability goal message (replacing donation message)
          welcomeMessage += UN_SUSTAINABILITY_MESSAGE;
          
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
          const speech = new SpeechSynthesisUtterance();
          
          // Correct PREPZR pronunciation for better clarity
          speech.text = welcomeMessage.replace(/PREPZR/gi, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
          speech.lang = language;
          speech.rate = 1.0; // Normal speed for clarity
          speech.pitch = 1.1; // Slightly higher pitch for a more vibrant tone
          speech.volume = 0.9;
          
          // Get available voices
          const voices = window.speechSynthesis.getVoices();
          
          // Try to find a vibrant, clear voice
          const preferredVoiceNames = language === 'en-IN' 
            ? ['Google India', 'Microsoft Kajal', 'en-IN', 'English India', 'India'] 
            : ['Google US English Female', 'Microsoft Zira', 'Samantha', 'Alex', 'en-US', 'en-GB'];
          
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
          
          // Show UN sustainability message as toast as well
          toast({
            title: "Supporting UN Sustainability Goal 4",
            description: "Quality education for all through personalized learning",
            duration: 5000,
          });
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
  }, [greetingPlayed, userName, language, userMood, isFirstTimeUser, toast]);
  
  return null; // This component doesn't render any UI
};

export default VoiceGreeting;
