
import React, { useEffect, useState } from 'react';
import { Volume, Volume2, VolumeX } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface VoiceGreetingProps {
  isFirstTimeUser: boolean;
  userName?: string;
  language?: 'en' | 'hi';
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  isFirstTimeUser, 
  userName = 'Student',
  language = 'en'
}) => {
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioPlayed, setAudioPlayed] = useState(false);
  const [audioMuted, setAudioMuted] = useState(false);
  const [userEngagement, setUserEngagement] = useState<'new'|'returning'|'active'>('new');
  const location = useLocation();
  const navigate = useNavigate();
  
  // Detect user engagement level based on localStorage history
  useEffect(() => {
    const loginCount = parseInt(localStorage.getItem('login_count') || '0', 10);
    const lastLoginDate = localStorage.getItem('last_login_date');
    const today = new Date().toISOString().split('T')[0];
    
    // Update login metrics
    localStorage.setItem('last_login_date', today);
    localStorage.setItem('login_count', (loginCount + 1).toString());
    
    // Determine engagement level
    if (loginCount === 0) {
      setUserEngagement('new');
    } else if (lastLoginDate === today) {
      setUserEngagement('active');
    } else {
      setUserEngagement('returning');
    }
  }, []);
  
  // Listen for route changes to cancel speech
  useEffect(() => {
    const cancelSpeech = () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setAudioPlaying(false);
        setAudioPlayed(true);
      }
    };
    
    // Cancel speech when route changes
    cancelSpeech();
    
    return () => {
      // Cancel speech when component unmounts
      cancelSpeech();
    };
  }, [location.pathname]);
  
  useEffect(() => {
    // Check if the greeting has been played already in this session
    const hasPlayed = sessionStorage.getItem('voiceGreetingPlayed') === 'true';
    const currentPath = location.pathname;
    
    // Only play for first time users who haven't heard the greeting yet
    if (isFirstTimeUser && !hasPlayed && !audioPlayed && !audioMuted) {
      const playGreeting = async () => {
        try {
          // Use a timeout to ensure the component is fully mounted
          setTimeout(() => {
            setAudioPlaying(true);
            
            // Context-aware greeting based on the current page and user engagement
            let welcomeText = getContextAwareGreeting(currentPath, userName, language, userEngagement);
            
            // Create speech synthesis utterance
            const speech = createSpeechUtterance(welcomeText, language);
            
            // Add event listeners for speech events
            configureSpeechEvents(speech);
            
            // Store the speech object to be able to cancel it when needed
            window.currentSpeech = speech;
            
            // Play the speech
            window.speechSynthesis.speak(speech);
          }, 1500);
        } catch (error) {
          console.error("Error playing greeting:", error);
          setAudioPlayed(true);
        }
      };
      
      // Force voices to load first, then play greeting
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.onvoiceschanged = null; // Prevent multiple calls
          playGreeting();
        };
        
        // Trigger voice loading
        window.speechSynthesis.getVoices();
        
        // Fallback in case onvoiceschanged doesn't fire
        setTimeout(playGreeting, 1000);
      }
    }
    
    // Add voice command capabilities
    const setupVoiceRecognition = () => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase();
          console.log("Voice command detected:", transcript);
          
          // Handle voice commands based on page context
          if (currentPath.includes('/signup') || currentPath.includes('/login')) {
            if (transcript.includes('select student')) {
              // Select student option
              const studentOption = document.querySelector('input[value="student"]');
              if (studentOption instanceof HTMLInputElement && !studentOption.checked) {
                studentOption.checked = true;
                studentOption.dispatchEvent(new Event('change', { bubbles: true }));
              }
            } else if (transcript.includes('next') || transcript.includes('continue')) {
              // Find and click next/continue button
              const nextButton = Array.from(document.querySelectorAll('button')).find(
                btn => btn.textContent?.toLowerCase().includes('next') || 
                       btn.textContent?.toLowerCase().includes('continue')
              );
              if (nextButton) nextButton.click();
            } else if (transcript.includes('back') || transcript.includes('home')) {
              // Go back to home
              navigate('/');
            }
          }
        };
        
        recognition.onend = () => {
          // Restart recognition after it ends
          setTimeout(() => {
            if (document.visibilityState === 'visible' && !audioPlayed) {
              recognition.start();
            }
          }, 1000);
        };
        
        recognition.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          // Restart on error
          setTimeout(() => {
            if (document.visibilityState === 'visible' && !audioPlayed) {
              recognition.start();
            }
          }, 3000);
        };
        
        // Start recognition
        recognition.start();
        
        return recognition;
      }
      return null;
    };
    
    // Setup voice recognition for commands
    const recognition = setupVoiceRecognition();
    
    // Cleanup on unmount
    return () => {
      if (audioPlaying && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      
      // Stop recognition on unmount
      if (recognition) {
        recognition.abort();
      }
    };
  }, [isFirstTimeUser, userName, language, audioPlayed, audioMuted, location.pathname, userEngagement, navigate]);
  
  // Generate context-aware greeting based on current page, user engagement level
  const getContextAwareGreeting = (
    path: string, 
    name: string, 
    lang: string,
    engagement: string
  ): string => {
    // Determine time of day for more personalized greeting
    const hour = new Date().getHours();
    let timeGreeting = 'Hello';
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 17) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';
    
    // Add engagement-specific greeting with congratulations
    let engagementGreeting = '';
    if (engagement === 'new') {
      engagementGreeting = `Congratulations ${name}! You've made an excellent choice selecting PREP-zer for your exam preparation. `;
    } else if (engagement === 'returning') {
      engagementGreeting = `Welcome back ${name}! It's great to see you again. Your commitment to exam preparation is commendable. `;
    } else if (engagement === 'active') {
      engagementGreeting = `Great to see you again today ${name}! Your consistent study habits are impressive. `;
    }
    
    // UN sustainability goals message
    const sustainabilityMessage = "PREP-zer supports UN Sustainability Goal 4 with inclusive and equitable quality education. We're committed to providing equal access to personalized learning for all students. ";
    
    if (lang === 'en') {
      if (path.includes('/dashboard/student/today')) {
        return `${timeGreeting} ${name}! ${engagementGreeting}Welcome to your daily study plan. ${sustainabilityMessage} I've personalized today's tasks based on your learning patterns and upcoming exams. Focus on completing these to stay on track with your exam preparation.`;
      } else if (path.includes('/dashboard/student/concepts')) {
        return `${timeGreeting} ${name}! ${engagementGreeting}Welcome to the concepts section. ${sustainabilityMessage} I've highlighted concepts that need your attention today based on your performance data and exam proximity.`;
      } else if (path.includes('/dashboard/student/flashcards')) {
        return `${timeGreeting} ${name}! ${engagementGreeting}Welcome to your personalized flashcards. ${sustainabilityMessage} I've prioritized these cards based on your memory patterns and upcoming exams.`;
      } else if (path.includes('/dashboard/student/practice-exam')) {
        return `${timeGreeting} ${name}! ${engagementGreeting}Welcome to practice exams. ${sustainabilityMessage} I've prepared adaptive tests that focus on your weak areas while building confidence in your strong topics.`;
      } else if (path.includes('/dashboard/student/analytics')) {
        return `${timeGreeting} ${name}! ${engagementGreeting}Welcome to your analytics dashboard. ${sustainabilityMessage} I'm constantly analyzing your learning patterns and progress to identify key areas for improvement.`;
      } else {
        // Default dashboard greeting with engagement awareness and UN sustainability message
        return `${timeGreeting} ${name}! ${engagementGreeting}Welcome to your emotionally intelligent dashboard. ${sustainabilityMessage} I'm your AI learning companion, and I adapt to your mood, learning style, and surroundings. Today's recommendations are personalized to help you achieve optimal study results.`;
      }
    } else if (lang === 'hi') {
      // Hindi greetings with UN sustainability message (simplified)
      const hindiTimeGreeting = hour < 12 ? 'सुप्रभात' : (hour < 17 ? 'शुभ दोपहर' : 'शुभ संध्या');
      return `${hindiTimeGreeting} ${name}! प्रेप-ज़र में आपका स्वागत है। हम संयुक्त राष्ट्र के सतत विकास लक्ष्यों का समर्थन करते हैं और सभी छात्रों के लिए समावेशी और गुणवत्तापूर्ण शिक्षा प्रदान करते हैं। मैं आपका भावनात्मक रूप से बुद्धिमान AI ट्यूटर हूँ और आपकी परीक्षा तैयारी में मदद करूँगा।`;
    }
    
    // Add voice command instruction to greetings
    if (path.includes('/signup') || path.includes('/login')) {
      return `${timeGreeting} ${name}! ${engagementGreeting}Welcome to PREP-zer! You can use voice commands like "Select Student", "Continue", or "Back to Home" to navigate. I'll guide you through the sign-up process. ${sustainabilityMessage}`;
    }
    
    return `${timeGreeting} ${name}! Welcome to PREP-zer!`;
  };
  
  // Create a properly configured speech utterance with vibrant tone
  const createSpeechUtterance = (text: string, lang: string) => {
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Create speech synthesis utterance
    const speech = new SpeechSynthesisUtterance();
    
    // Correct PREPZR pronunciation by using proper syllable break
    speech.text = text.replace(/PREPZR/gi, 'PREP-zer').replace(/Prepzr/g, 'PREP-zer');
    speech.lang = lang === 'en' ? 'en-US' : 'hi-IN';
    speech.rate = 0.98; // Slightly slower for clarity
    speech.volume = 0.9;
    speech.pitch = 1.05; // Slightly higher for a more vibrant tone
    
    // Find a vibrant voice based on comprehensive list of possible voices
    const preferredVoiceNames = [
      'Google US English Female', 'Microsoft Zira', 'Samantha', 'Alex',
      'Karen', 'Victoria', 'Moira', 'Tessa', 'en-US', 'en-GB'
    ];
    
    // Try to find a preferred voice with better matching
    let selectedVoice = null;
    for (const name of preferredVoiceNames) {
      const voice = voices.find(v => 
        v.name?.toLowerCase().includes(name.toLowerCase()) || 
        v.lang?.toLowerCase().includes(name.toLowerCase())
      );
      if (voice) {
        console.log("Selected voice:", voice.name);
        selectedVoice = voice;
        break;
      }
    }
    
    // If still no voice selected, try to find any female voice
    if (!selectedVoice) {
      selectedVoice = voices.find(v => 
        v.name?.toLowerCase().includes('female') || 
        !v.name?.toLowerCase().includes('male')
      );
    }
    
    // If still nothing, use any available voice
    if (!selectedVoice && voices.length > 0) {
      selectedVoice = voices[0];
    }
    
    // Set the selected voice if found
    if (selectedVoice) {
      speech.voice = selectedVoice;
    }
    
    return speech;
  };
  
  // Configure speech event handlers
  const configureSpeechEvents = (speech: SpeechSynthesisUtterance) => {
    speech.onstart = () => setAudioPlaying(true);
    speech.onend = () => {
      setAudioPlaying(false);
      setAudioPlayed(true);
      sessionStorage.setItem('voiceGreetingPlayed', 'true');
    };
    speech.onerror = (e) => {
      console.error("Speech synthesis error", e);
      setAudioPlaying(false);
      setAudioPlayed(true);
    };
  };
  
  const handleToggleMute = () => {
    setAudioMuted(!audioMuted);
    
    if (!audioMuted) {
      // If currently not muted and about to be muted, stop any speech
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setAudioPlaying(false);
      setAudioPlayed(true);
      sessionStorage.setItem('voiceGreetingPlayed', 'true');
    }
  };
  
  // Don't render anything if already played or not a first-time user
  if (!isFirstTimeUser || audioPlayed) return null;
  
  return (
    <div 
      className={`fixed bottom-20 right-5 z-50 p-3 rounded-full shadow-md
        ${audioPlaying ? 'bg-primary text-white' : 'bg-white text-gray-600'} 
        cursor-pointer transition-all duration-300 hover:scale-105 animate-bounce-slow`}
      onClick={handleToggleMute}
    >
      {audioMuted ? (
        <VolumeX className="h-6 w-6" />
      ) : audioPlaying ? (
        <Volume2 className="h-6 w-6 animate-pulse" />
      ) : (
        <Volume className="h-6 w-6" />
      )}
      
      <style>
        {`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}
      </style>
    </div>
  );
};

export default VoiceGreeting;
