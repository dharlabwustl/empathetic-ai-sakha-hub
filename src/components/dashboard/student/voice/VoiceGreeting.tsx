
import React, { useEffect, useRef } from 'react';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName: string;
  isReturningUser?: boolean;
  lastActivity?: string;
  pendingTasks?: string[];
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName,
  isReturningUser = false,
  lastActivity,
  pendingTasks = []
}) => {
  const hasSpokenRef = useRef(false);

  useEffect(() => {
    // Only speak once per mount
    if (hasSpokenRef.current) return;
    
    const speakGreeting = () => {
      if (!('speechSynthesis' in window)) return;
      
      let greeting = '';
      
      // Check if user is returning (has logged in before)
      const loginCount = parseInt(localStorage.getItem('login_count') || '0', 10);
      const hasSeenWelcome = localStorage.getItem('sawWelcomeSlider') === 'true';
      
      if (loginCount > 1 || hasSeenWelcome || isReturningUser) {
        greeting = `Welcome back to PREPZR, ${userName}! I'm Sakha AI, your learning companion. `;
        
        if (lastActivity) {
          greeting += `Last time you were ${lastActivity}. `;
        }
        
        if (pendingTasks.length > 0) {
          greeting += `You have ${pendingTasks.length} pending activities waiting for you. `;
        }
        
        greeting += `I'm here to help you with your study plan, daily activities, and any questions you have. Let's make today productive!`;
      } else if (isFirstTimeUser) {
        greeting = `Welcome to PREPZR, ${userName}! I'm Sakha AI, your AI-powered learning companion. I'm excited to help you on your journey to exam success. Let's explore what PREPZR has to offer and create your personalized study plan.`;
      } else {
        greeting = `Hello ${userName}! I'm Sakha AI, ready to assist you with your studies today. How can I help you achieve your learning goals?`;
      }
      
      const speech = new SpeechSynthesisUtterance();
      speech.text = greeting.replace(/PREPZR/gi, 'PREP-zer');
      speech.lang = 'en-US';
      speech.rate = 0.95;
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
      
      // Small delay to ensure voices are loaded
      setTimeout(() => {
        window.speechSynthesis.speak(speech);
        hasSpokenRef.current = true;
      }, 1000);
    };

    // Load voices if not already loaded
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', speakGreeting, { once: true });
    } else {
      speakGreeting();
    }
    
    return () => {
      // Clean up speech synthesis
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isFirstTimeUser, userName, isReturningUser, lastActivity, pendingTasks]);

  // This component doesn't render anything visible
  return null;
};

export default VoiceGreeting;
