
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';
import { Volume2, VolumeX, ArrowLeft, Mic, User, Mail, Lock, Phone, Radio } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [activeField, setActiveField] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
    role: 'student'
  });

  // Handle voice announcement for new users
  const startWelcomeAnnouncement = () => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    setIsSpeaking(true);
    
    // Welcome message for new users
    const welcomeText = 
      "Congratulations on joining PREPZR! I'm Sakha AI, your personalized learning companion. " +
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
      
      // After welcome message, guide them through form filling
      setTimeout(() => {
        startFormFillingGuidance();
      }, 1000);
    };
    
    speech.onerror = () => {
      setIsSpeaking(false);
    };
    
    // Store speech object globally to be able to cancel it when navigating away
    window.currentSpeech = speech;
    
    // Speak the message
    window.speechSynthesis.speak(speech);
  };

  // Guidance for form filling
  const startFormFillingGuidance = () => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    setIsSpeaking(true);
    
    const guidanceText = 
      "Let's fill out your profile information. You can use your voice to input data. " +
      "Just click on the microphone icon next to each field, and speak clearly. " +
      "For example, click the name field microphone and say your name. " +
      "I'm here to help you complete this form efficiently.";
    
    const speech = new SpeechSynthesisUtterance();
    speech.text = guidanceText;
    speech.rate = 0.95;
    speech.pitch = 1.05;
    speech.volume = 0.9;
    
    const voices = window.speechSynthesis.getVoices();
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
    };
    
    speech.onerror = () => {
      setIsSpeaking(false);
    };
    
    // Store speech object globally
    window.currentSpeech = speech;
    
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

  // Enhanced back to home button
  const goToHomePage = () => {
    // Cancel any ongoing speech before navigating
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    navigate('/');
  };

  // Voice recognition for form filling with improved feedback
  const startVoiceInput = (fieldName: string) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support voice recognition");
      return;
    }
    
    setIsListening(true);
    setActiveField(fieldName);
    
    // Provide audio feedback that we're listening
    if (!isMuted) {
      const feedbackText = `Listening for your ${fieldName}. Please speak clearly.`;
      const feedback = new SpeechSynthesisUtterance(feedbackText);
      feedback.rate = 1.1;
      feedback.volume = 0.7;
      window.speechSynthesis.speak(feedback);
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
      console.log(`Listening for field: ${fieldName}`);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      
      // Update form data with recognized speech
      let processedValue = transcript;
      
      // Process input based on field type
      if (fieldName === 'email') {
        processedValue = transcript.replace(/\s+/g, '').toLowerCase();
        if (!processedValue.includes('@')) {
          processedValue += '@gmail.com';
        }
      } else if (fieldName === 'password') {
        processedValue = transcript.replace(/\s+/g, '');
      } else if (fieldName === 'mobile') {
        processedValue = transcript.replace(/\D/g, '');
      }
      
      // Update form data
      setFormData(prev => ({
        ...prev,
        [fieldName]: processedValue
      }));
      
      // Update displayed value in input fields
      const inputElement = document.getElementById(`${fieldName}-field`) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = processedValue;
        // Trigger an input event to ensure any listeners are updated
        const event = new Event('input', { bubbles: true });
        inputElement.dispatchEvent(event);
      }
      
      // For role selection
      if (fieldName === 'role') {
        const studentOption = document.querySelector('input[value="student"]') as HTMLInputElement;
        if (studentOption && processedValue.toLowerCase().includes('student')) {
          studentOption.checked = true;
          setFormData(prev => ({ ...prev, role: 'student' }));
          
          // Trigger any event handlers
          const event = new Event('change', { bubbles: true });
          studentOption.dispatchEvent(event);
        }
      }
      
      // Give voice feedback on successful capture
      if (!isMuted && window.speechSynthesis) {
        const successText = `${fieldName} captured as ${fieldName === 'password' ? 'secure password' : processedValue}`;
        const successFeedback = new SpeechSynthesisUtterance(successText);
        successFeedback.rate = 1.1;
        successFeedback.volume = 0.7;
        
        // Wait a bit for the recognition to fully finish
        setTimeout(() => {
          window.speechSynthesis.speak(successFeedback);
        }, 500);
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
      setActiveField('');
    };
    
    recognition.onerror = () => {
      setIsListening(false);
      setActiveField('');
      
      // Give voice feedback on error
      if (!isMuted && window.speechSynthesis) {
        const errorText = `I couldn't understand that. Please try again.`;
        const errorFeedback = new SpeechSynthesisUtterance(errorText);
        errorFeedback.rate = 1.1;
        errorFeedback.volume = 0.7;
        window.speechSynthesis.speak(errorFeedback);
      }
    };
    
    recognition.start();
  };

  useEffect(() => {
    // Set up NEET exam as the default exam choice
    localStorage.setItem('selected_exam', 'NEET');
    
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
      isFirstTimeUser: true,
      selectedExam: 'NEET' // Set NEET as default exam
    };
    
    // Store it in localStorage for downstream components
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Set free trial plan automatically
    localStorage.setItem('user_plan', 'FREE_TRIAL');
    localStorage.setItem('trial_start_date', Date.now().toString());
    localStorage.setItem('trial_days', '7');
    
    // Start welcome announcement with a slight delay
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
            // Cancel speech before navigating
            if (window.speechSynthesis) {
              window.speechSynthesis.cancel();
            }
            navigate('/welcome-flow', { replace: true });
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 30);
    
    // Setup speech cancellation on page navigation
    const handleBeforeUnload = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
    
    // Add event listener for page navigation
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Stop speech when navigating away
    const handleRouteChange = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    
    // Cleanup
    return () => {
      clearInterval(progressInterval);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleRouteChange);
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [navigate]);

  // Automatically select student option after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate selecting "student" option
      const studentOption = document.querySelector('input[value="student"]') as HTMLInputElement;
      if (studentOption && !studentOption.checked) {
        studentOption.checked = true;
        setFormData(prev => ({ ...prev, role: 'student' }));
        
        // Trigger any event handlers
        const event = new Event('change', { bubbles: true });
        studentOption.dispatchEvent(event);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-100 flex flex-col items-center justify-center">
      <VoiceGreeting 
        isFirstTimeUser={true}
        userName="New User"
        language="en"
      />
      
      {/* Enhanced Back to Home button with animation */}
      <motion.button
        onClick={goToHomePage}
        className="absolute top-4 left-4 text-sm flex items-center px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors border border-indigo-200 shadow-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        Back to Home
      </motion.button>
      
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
          <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg relative">
            <motion.div
              animate={{ 
                scale: isSpeaking ? [1, 1.1, 1] : 1,
              }}
              transition={{ repeat: isSpeaking ? Infinity : 0, duration: 1.5 }}
            >
              {isMuted ? (
                <VolumeX className="h-10 w-10 text-white" />
              ) : (
                <Volume2 className="h-10 w-10 text-white" />
              )}
            </motion.div>
            
            {/* Animated sound waves when speaking */}
            {isSpeaking && !isMuted && (
              <>
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-white/20"
                  animate={{ scale: [1, 1.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                />
              </>
            )}
          </div>
          <p className="text-xl font-medium">Setting up your personalized learning experience...</p>
          <p className="text-sm text-gray-500 mt-2">Creating your adaptive NEET study plan</p>
          
          {/* Enhanced voice command help text */}
          <motion.p 
            className="text-sm text-indigo-600 mt-4"
            animate={{ 
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            You can use voice commands! Click on a microphone icon and speak.
          </motion.p>
          
          {/* Enhanced form with voice input fields */}
          <div className="mt-6 bg-white/80 backdrop-blur-sm p-5 rounded-lg shadow-md border border-indigo-100 max-w-sm mx-auto">
            <div className="space-y-4">
              {/* Name field */}
              <div className="relative">
                <label htmlFor="name-field" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <User size={14} className="mr-1" /> Your Name
                </label>
                <div className="flex items-center">
                  <input
                    id="name-field"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => startVoiceInput('name')}
                    className={`px-3 py-2 border border-l-0 border-gray-300 rounded-r-md ${
                      activeField === 'name' ? 'bg-red-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    <Mic size={18} className={activeField === 'name' ? 'animate-pulse' : ''} />
                  </button>
                </div>
              </div>
              
              {/* Email field */}
              <div className="relative">
                <label htmlFor="email-field" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Mail size={14} className="mr-1" /> Email Address
                </label>
                <div className="flex items-center">
                  <input
                    id="email-field"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => startVoiceInput('email')}
                    className={`px-3 py-2 border border-l-0 border-gray-300 rounded-r-md ${
                      activeField === 'email' ? 'bg-red-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    <Mic size={18} className={activeField === 'email' ? 'animate-pulse' : ''} />
                  </button>
                </div>
              </div>
              
              {/* Password field */}
              <div className="relative">
                <label htmlFor="password-field" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Lock size={14} className="mr-1" /> Password
                </label>
                <div className="flex items-center">
                  <input
                    id="password-field"
                    type="password"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => startVoiceInput('password')}
                    className={`px-3 py-2 border border-l-0 border-gray-300 rounded-r-md ${
                      activeField === 'password' ? 'bg-red-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    <Mic size={18} className={activeField === 'password' ? 'animate-pulse' : ''} />
                  </button>
                </div>
              </div>
              
              {/* Mobile field */}
              <div className="relative">
                <label htmlFor="mobile-field" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Phone size={14} className="mr-1" /> Mobile Number
                </label>
                <div className="flex items-center">
                  <input
                    id="mobile-field"
                    type="tel"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => startVoiceInput('mobile')}
                    className={`px-3 py-2 border border-l-0 border-gray-300 rounded-r-md ${
                      activeField === 'mobile' ? 'bg-red-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    <Mic size={18} className={activeField === 'mobile' ? 'animate-pulse' : ''} />
                  </button>
                </div>
              </div>
              
              {/* Role selection */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Radio size={14} className="mr-1" /> I am a
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="role" 
                      value="student" 
                      checked={formData.role === 'student'}
                      onChange={() => setFormData(prev => ({ ...prev, role: 'student' }))}
                      className="mr-1" 
                    />
                    <span>Student</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="role" 
                      value="educator"
                      checked={formData.role === 'educator'}
                      onChange={() => setFormData(prev => ({ ...prev, role: 'educator' }))}
                      className="mr-1" 
                    />
                    <span>Educator</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => startVoiceInput('role')}
                    className={`ml-2 p-1.5 rounded-md ${
                      activeField === 'role' ? 'bg-red-500 text-white' : 'bg-gray-100'
                    }`}
                  >
                    <Mic size={16} className={activeField === 'role' ? 'animate-pulse' : ''} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Mute button */}
          <button 
            onClick={toggleMute}
            className="mt-4 text-sm text-gray-500 hover:text-gray-800 flex items-center mx-auto px-3 py-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isMuted ? "Unmute Voice" : "Mute Voice"}
          </button>
        </motion.div>
        
        <motion.div 
          className="space-y-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="h-2 w-full rounded-full bg-blue-200 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            {progress < 30 ? "Initializing your personalized journey..." : 
             progress < 60 ? "Setting up your learning profile..." : 
             progress < 90 ? "Preparing your study plan..." : 
             "Ready to begin!"}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
