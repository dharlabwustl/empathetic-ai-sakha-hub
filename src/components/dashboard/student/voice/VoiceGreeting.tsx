
import React, { useEffect, useRef } from 'react';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
  language?: string;
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  isReturningUser = false,
  lastActivity,
  pendingTasks = [],
  language = 'en-US'
}) => {
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    // Only speak once per mount and reset when page changes
    if (hasSpokenRef.current) return;
    
    const speakGreeting = () => {
      if (!('speechSynthesis' in window)) return;
      
      // Cancel any existing speech
      window.speechSynthesis.cancel();
      
      let greeting = '';
      
      if (isFirstTimeUser) {
        greeting = `Congratulations ${userName}! Welcome to PREPZR! I'm Sakha AI, your AI-powered learning companion. I'm thrilled that you've joined PREPZR to accelerate your exam preparation journey. We're here to help you achieve academic excellence with personalized study plans, interactive learning tools, and comprehensive exam preparation resources. Let's explore what PREPZR has to offer and create your path to success!`;
      } else if (isReturningUser) {
        greeting = `Welcome back to PREPZR, ${userName}! I'm Sakha AI, your learning companion. Great to see you again! `;
        
        if (lastActivity) {
          greeting += `Last time you were ${lastActivity}. `;
        }
        
        if (pendingTasks.length > 0) {
          greeting += `You have ${pendingTasks.length} pending activities waiting for you. `;
        }
        
        greeting += `I'm here to help you continue your study plan, daily activities, and answer any questions you have. Let's make today even more productive than yesterday!`;
      } else {
        greeting = `Hello ${userName}! I'm Sakha AI, ready to assist you with your studies today. How can I help you achieve your learning goals?`;
      }
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = greeting.replace(/PREPZR/gi, 'PREP-zer');
      speech.lang = language;
      speech.rate = 0.9;
      speech.pitch = 1.1;
      speech.volume = 0.8;
      
      // Get available voices and select a preferred female voice
      const voices = window.speechSynthesis.getVoices();
      const femaleVoices = voices.filter(voice => 
        voice.name.toLowerCase().includes('female') || 
        voice.name.toLowerCase().includes('zira') ||
        voice.name.toLowerCase().includes('samantha') ||
        (!voice.name.toLowerCase().includes('male') && voice.lang.includes('en'))
      );
      
      if (femaleVoices.length > 0) {
        speech.voice = femaleVoices[0];
      }
      
      // Add event listeners to track speech completion
      speech.onstart = () => {
        console.log('Voice greeting started');
      };
      
      speech.onend = () => {
        console.log('Voice greeting completed');
        hasSpokenRef.current = true;
      };
      
      speech.onerror = (event) => {
        console.error('Speech synthesis error:', event);
        hasSpokenRef.current = true;
      };
      
      // Small delay to ensure voices are loaded
      setTimeout(() => {
        window.speechSynthesis.speak(speech);
      }, 1000);
    };

    // Load voices if not already loaded
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speakGreeting, { once: true });
    } else {
      speakGreeting();
    }
    
    // Cleanup function to stop speech when component unmounts or page changes
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isFirstTimeUser, userName, isReturningUser, lastActivity, pendingTasks, language]);

  // Stop speech when page changes (component unmounts)
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default VoiceGreeting;
