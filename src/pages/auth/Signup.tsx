
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';
import { Volume2, VolumeX } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle voice announcement for new users
  const startWelcomeAnnouncement = () => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    setIsSpeaking(true);
    
    // Welcome message for new users
    const welcomeText = 
      "Congratulations on joining PREP-zer! I'm Sakha AI, your personalized learning companion. " +
      "I'm setting up your adaptive study environment based on proven learning methodologies. " +
      "In just a moment, we'll guide you through a quick tour of our platform to help you " +
      "get the most out of your preparation journey. I'll be with you every step of the way!";
    
    // Create speech synthesis utterance
    const speech = new SpeechSynthesisUtterance();
    speech.text = welcomeText;
    speech.rate = 0.95; // Slightly slower for clarity
    speech.pitch = 1.05; // Slightly higher pitch
    speech.volume = 0.9;
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a good voice
    const preferredVoiceNames = ['Google US English Female', 'Microsoft Zira', 'Samantha', 'en-US'];
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
    
    if (selectedVoice) {
      speech.voice = selectedVoice;
    }
    
    // Add event listeners
    speech.onend = () => {
      setIsSpeaking(false);
      // Signal that the greeting has completed
      document.dispatchEvent(new CustomEvent('voice-greeting-completed'));
    };
    
    speech.onerror = () => {
      setIsSpeaking(false);
    };
    
    // Speak the message
    window.speechSynthesis.speak(speech);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted && window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (isMuted && !isSpeaking) {
      startWelcomeAnnouncement();
    }
  };

  useEffect(() => {
    // Set the flag that this is a new user signup
    localStorage.setItem('new_user_signup', 'true');
    localStorage.setItem('isLoggedIn', 'true');
    
    // Flag to indicate we need to show the study plan creation dialog after tour
    localStorage.setItem('needs_study_plan_creation', 'true');
    
    // Reset voice greeting flags to ensure they play again
    sessionStorage.removeItem('voiceGreetingPlayed');
    
    // Create a minimal user data object to avoid errors
    const userData = {
      id: `user_${Date.now()}`,
      name: "New User",
      email: `user${Date.now()}@example.com`,
      role: 'student',
      isFirstTimeUser: true
    };
    
    // Store it in localStorage for downstream components
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Start welcome announcement
    setTimeout(() => {
      startWelcomeAnnouncement();
    }, 500);

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          
          // First navigate directly to welcome flow after progress completes
          setTimeout(() => {
            navigate('/welcome-flow', { replace: true });
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 30);
    
    // Cleanup
    return () => {
      clearInterval(progressInterval);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-100 flex flex-col items-center justify-center">
      <VoiceGreeting 
        isFirstTimeUser={true}
        userName="New User"
        language="en"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto px-4"
      >
        <motion.h1 
          className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Welcome to PREPZR!
        </motion.h1>
        
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
            <motion.div
              animate={{ scale: isSpeaking ? [1, 1.1, 1] : 1 }}
              transition={{ repeat: isSpeaking ? Infinity : 0, duration: 1.5 }}
            >
              {isMuted ? (
                <VolumeX className="h-10 w-10 text-white" />
              ) : (
                <Volume2 className="h-10 w-10 text-white" />
              )}
            </motion.div>
          </div>
          <p className="text-xl font-medium">Setting up your personalized learning experience...</p>
          <p className="text-sm text-gray-500 mt-2">Creating your adaptive study plan tailored to your needs</p>
          
          {/* Mute button */}
          <button 
            onClick={toggleMute}
            className="mt-4 text-sm text-gray-500 hover:text-gray-800 flex items-center mx-auto"
          >
            {isMuted ? "Unmute Voice" : "Mute Voice"}
          </button>
        </motion.div>
        
        <motion.div 
          className="space-y-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="h-2 w-full rounded bg-blue-200 overflow-hidden">
            <div 
              className="h-full bg-blue-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">{progress < 100 ? "Loading your personalized journey..." : "Ready to begin!"}</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
