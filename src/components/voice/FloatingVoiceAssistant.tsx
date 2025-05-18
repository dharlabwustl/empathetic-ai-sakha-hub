
import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, Volume2, VolumeX, Globe, HelpCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  findBestVoice,
  fixPronunciation
} from '@/components/dashboard/student/voice/voiceUtils';

interface FloatingVoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigationCommand?: (route: string) => void;
  language?: string;
}

const FloatingVoiceAssistant: React.FC<FloatingVoiceAssistantProps> = ({
  isOpen,
  onClose,
  onNavigationCommand,
  language = 'en-IN'
}) => {
  const [response, setResponse] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [muted, setMuted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [showHelp, setShowHelp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Home page specific questions and answers
  const homePageQA = {
    'en-IN': [
      {
        keywords: ['exam', 'readiness', 'score'],
        response: "Our Exam Readiness Score is a dynamic measure of your preparation level. It uses AI to analyze your performance on practice tests, concept mastery, study consistency, and engagement with the platform. Unlike static scores, it adapts as you learn, helping you focus on improving weak areas."
      },
      {
        keywords: ['coaching', 'institute', 'better', 'advantage'],
        response: "PREPZR offers several advantages over traditional coaching institutes. We provide 24/7 access to personalized learning, adapt to your schedule and learning pace, offer instant doubt resolution through our AI tutor, and use data-driven insights to identify and address your specific knowledge gaps. All at a fraction of the cost of coaching institutes."
      },
      {
        keywords: ['feature', 'what', 'offer'],
        response: "PREPZR features include personalized AI-driven study plans, adaptive question banks that focus on your weak areas, interactive flashcards with spaced repetition, concept maps for visual learning, detailed performance analytics, mood-based study recommendations, and a 24/7 AI tutor for instant doubt resolution."
      },
      {
        keywords: ['free', 'trial', 'subscription'],
        response: "We offer a 7-day free trial that gives full access to all premium features. Our subscription plans are designed to be affordable while providing comprehensive exam preparation. And remember, 5% of all subscription revenue goes toward providing access for underprivileged students."
      },
      {
        keywords: ['donation', 'support', 'underprivileged'],
        response: "PREPZR allocates 5% of all subscription revenue to provide platform access for underprivileged students. This is our commitment to making quality education accessible to all, regardless of financial background."
      },
      {
        keywords: ['signup', 'register', 'join'],
        response: "Signing up for PREPZR takes just a minute! Click the 'Sign up' button at the top of the page. You can create an account with your email or use Google sign-in for quicker access. Start with our 7-day free trial to experience all premium features before deciding on a subscription."
      },
      {
        keywords: ['ai', 'artificial intelligence', 'machine learning'],
        response: "PREPZR leverages advanced AI in multiple ways. Our system analyzes your performance to identify knowledge gaps, creates personalized study plans, provides adaptive question difficulty, offers instant doubt resolution through our AI tutor, and even suggests optimal study times based on your learning patterns and mood."
      },
      {
        keywords: ['compare', 'other', 'platform', 'different'],
        response: "What sets PREPZR apart from other online platforms is our holistic approach to learning. We consider not just content knowledge, but also your learning style, mood, study environment, and exam-specific strategies. Our adaptive AI continuously personalizes your experience, unlike platforms with static content."
      }
    ],
    'hi-IN': [
      {
        keywords: ['परीक्षा', 'तैयारी', 'स्कोर'],
        response: "हमारा परीक्षा तैयारी स्कोर आपके तैयारी स्तर का एक गतिशील मापक है। यह अभ्यास परीक्षणों, अवधारणा मास्टरी, अध्ययन निरंतरता और प्लेटफ़ॉर्म के साथ जुड़ाव पर आपके प्रदर्शन का विश्लेषण करने के लिए AI का उपयोग करता है। स्थिर स्कोर के विपरीत, यह आपके सीखने के साथ अनुकूल होता है, जिससे आपको कमजोर क्षेत्रों को सुधारने पर ध्यान केंद्रित करने में मदद मिलती है।"
      },
      {
        keywords: ['कोचिंग', 'संस्थान', 'बेहतर', 'फायदा'],
        response: "प्रेप-ज़र पारंपरिक कोचिंग संस्थानों की तुलना में कई लाभ प्रदान करता है। हम व्यक्तिगत शिक्षा तक 24/7 पहुंच प्रदान करते हैं, आपके कार्यक्रम और सीखने की गति के अनुकूल होते हैं, हमारे AI ट्यूटर के माध्यम से त्वरित संदेह समाधान प्रदान करते हैं, और आपके विशिष्ट ज्ञान अंतराल की पहचान करने और संबोधित करने के लिए डेटा-संचालित अंतर्दृष्टि का उपयोग करते हैं।"
      },
      {
        keywords: ['फीचर', 'क्या', 'ऑफर'],
        response: "प्रेप-ज़र की विशेषताओं में शामिल हैं व्यक्तिगत AI-संचालित अध्ययन योजनाएं, अनुकूली प्रश्न बैंक जो आपके कमजोर क्षेत्रों पर ध्यान केंद्रित करते हैं, स्पेस्ड रिपिटिशन के साथ इंटरैक्टिव फ्लैशकार्ड, विजुअल लर्निंग के लिए कॉन्सेप्ट मैप्स, विस्तृत प्रदर्शन विश्लेषण, मूड-आधारित अध्ययन सिफारिशें, और त्वरित संदेह समाधान के लिए 24/7 AI ट्यूटर।"
      },
      {
        keywords: ['फ्री', 'ट्रायल', 'सब्सक्रिप्शन'],
        response: "हम 7-दिवसीय निःशुल्क परीक्षण प्रदान करते हैं जो सभी प्रीमियम सुविधाओं तक पूर्ण पहुंच देता है। हमारी सदस्यता योजनाएं व्यापक परीक्षा तैयारी प्रदान करते हुए किफायती होने के लिए डिज़ाइन की गई हैं। और याद रखें, सभी सदस्यता राजस्व का 5% वंचित छात्रों के लिए पहुंच प्रदान करने के लिए जाता है।"
      },
      {
        keywords: ['दान', 'समर्थन', 'वंचित'],
        response: "प्रेप-ज़र वंचित छात्रों के लिए प्लेटफॉर्म तक पहुंच प्रदान करने के लिए सभी सदस्यता राजस्व का 5% आवंटित करता है। यह वित्तीय पृष्ठभूमि की परवाह किए बिना सभी के लिए गुणवत्तापूर्ण शिक्षा को सुलभ बनाने के लिए हमारी प्रतिबद्धता है।"
      },
      {
        keywords: ['साइनअप', 'रजिस्टर', 'ज्वाइन'],
        response: "प्रेप-ज़र के लिए साइनअप करने में बस एक मिनट लगता है! पेज के शीर्ष पर 'Sign up' बटन पर क्लिक करें। आप अपने ईमेल के साथ एक खाता बना सकते हैं या त्वरित पहुंच के लिए Google साइन-इन का उपयोग कर सकते हैं। सदस्यता पर निर्णय लेने से पहले सभी प्रीमियम सुविधाओं का अनुभव करने के लिए हमारे 7-दिवसीय निःशुल्क परीक्षण के साथ शुरुआत करें।"
      }
    ]
  };
  
  // Example commands for help section
  const helpCommands = {
    'en-IN': [
      "Tell me about exam readiness score",
      "How is PREPZR better than coaching?",
      "What features do you offer?",
      "How do I sign up?",
      "Tell me about your free trial",
      "How does your AI work?",
      "How do you support underprivileged students?"
    ],
    'hi-IN': [
      "परीक्षा तैयारी स्कोर के बारे में बताएं",
      "प्रेप-ज़र कोचिंग से कैसे बेहतर है?",
      "आप कौन से फीचर्स प्रदान करते हैं?",
      "मैं कैसे साइन अप करूं?",
      "अपने फ्री ट्रायल के बारे में बताएं",
      "आपका AI कैसे काम करता है?",
      "आप वंचित छात्रों का समर्थन कैसे करते हैं?"
    ]
  };
  
  // Initialize Speech Recognition
  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }
    
    // Set initial welcome message
    const welcomeMsg = selectedLanguage === 'hi-IN' 
      ? "नमस्ते! मैं आपका प्रेप-ज़र वॉयस असिस्टेंट हूँ। मैं आपको हमारे प्लेटफॉर्म के बारे में जानकारी प्रदान कर सकता हूँ। आप मुझसे परीक्षा तैयारी, हमारी सुविधाओं, या साइनअप प्रक्रिया के बारे में पूछ सकते हैं।"
      : "Hello! I'm your PREPZR voice assistant. I can provide information about our platform. Feel free to ask me about exam preparation, our features, or how to sign up.";
    
    setResponse(welcomeMsg);
    if (!muted) speakText(welcomeMsg);
    
    // Set up click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [isOpen, selectedLanguage]);
  
  // Initialize speech recognition
  const initSpeechRecognition = () => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = selectedLanguage;
    
    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      processCommand(transcript);
    };
    
    recognitionRef.current.onend = () => {
      setIsListening(false);
    };
    
    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event);
      setIsListening(false);
    };
  };
  
  // Start listening
  const startListening = () => {
    if (!recognitionRef.current) {
      initSpeechRecognition();
    } else {
      // Update language in case it changed
      recognitionRef.current.lang = selectedLanguage;
    }
    
    try {
      recognitionRef.current?.start();
      setIsListening(true);
      setTranscript('');
    } catch (e) {
      console.error('Error starting speech recognition', e);
    }
  };
  
  // Stop listening
  const stopListening = () => {
    try {
      recognitionRef.current?.abort();
      setIsListening(false);
    } catch (e) {
      console.error('Error stopping speech recognition', e);
    }
  };
  
  // Process voice command
  const processCommand = (command: string) => {
    setIsProcessing(true);
    
    // Language change commands (always check these first)
    if (command.toLowerCase().includes('speak in hindi') || command.toLowerCase().includes('hindi में बात करो')) {
      setSelectedLanguage('hi-IN');
      const response = "अब मैं हिंदी में बात करूँगा।";
      setResponse(response);
      if (!muted) speakText(response);
      setIsProcessing(false);
      return;
    }
    
    if (command.toLowerCase().includes('speak in english') || command.toLowerCase().includes('अंग्रेजी में बात करो')) {
      setSelectedLanguage('en-IN');
      const response = "I'll now speak in English.";
      setResponse(response);
      if (!muted) speakText(response);
      setIsProcessing(false);
      return;
    }
    
    // Navigation commands
    if (command.toLowerCase().includes('sign up') || command.toLowerCase().includes('register') || 
        command.toLowerCase().includes('साइन अप') || command.toLowerCase().includes('रजिस्टर')) {
      if (onNavigationCommand) {
        const response = selectedLanguage === 'hi-IN'
          ? "मैं आपको साइन अप पेज पर ले जा रहा हूँ।"
          : "I'm taking you to the sign up page.";
        setResponse(response);
        if (!muted) speakText(response);
        
        setTimeout(() => {
          onNavigationCommand('/signup');
          onClose();
        }, 2000);
        setIsProcessing(false);
        return;
      }
    }
    
    if (command.toLowerCase().includes('log in') || command.toLowerCase().includes('login') ||
        command.toLowerCase().includes('लॉग इन') || command.toLowerCase().includes('साइन इन')) {
      if (onNavigationCommand) {
        const response = selectedLanguage === 'hi-IN'
          ? "मैं आपको लॉगिन पेज पर ले जा रहा हूँ।"
          : "I'm taking you to the login page.";
        setResponse(response);
        if (!muted) speakText(response);
        
        setTimeout(() => {
          onNavigationCommand('/login');
          onClose();
        }, 2000);
        setIsProcessing(false);
        return;
      }
    }
    
    // Process Q&A for home page
    const qaList = homePageQA[selectedLanguage as keyof typeof homePageQA] || homePageQA['en-IN'];
    const lowerCommand = command.toLowerCase();
    
    // Find matching QA pair based on keywords
    for (const qa of qaList) {
      if (qa.keywords.some(keyword => lowerCommand.includes(keyword.toLowerCase()))) {
        setResponse(qa.response);
        if (!muted) speakText(qa.response);
        setIsProcessing(false);
        return;
      }
    }
    
    // Default response if no match found
    const defaultResponse = selectedLanguage === 'hi-IN'
      ? "मुझे आपका प्रश्न समझने में कठिनाई हो रही है। आप परीक्षा तैयारी, हमारी सुविधाओं या साइनअप के बारे में पूछ सकते हैं।"
      : "I'm having trouble understanding your question. You can ask about exam preparation, our features, or how to sign up.";
    
    setResponse(defaultResponse);
    if (!muted) speakText(defaultResponse);
    setIsProcessing(false);
  };
  
  // Toggle mute
  const toggleMute = () => {
    setMuted(!muted);
    
    if (isSpeaking && !muted) {
      // Cancel speech if unmuting
      window.speechSynthesis?.cancel();
      setIsSpeaking(false);
    }
  };
  
  // Toggle language
  const toggleLanguage = () => {
    const newLanguage = selectedLanguage === 'en-IN' ? 'hi-IN' : 'en-IN';
    setSelectedLanguage(newLanguage);
    
    const message = newLanguage === 'hi-IN'
      ? "अब मैं हिंदी में बात करूँगा।"
      : "I'll now speak in English.";
    
    setResponse(message);
    if (!muted) speakText(message);
    
    // Update recognition language if active
    if (recognitionRef.current) {
      recognitionRef.current.lang = newLanguage;
    }
  };
  
  // Text to speech function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Fix pronunciation of "PREPZR"
      const processedText = fixPronunciation(text);
      
      const utterance = new SpeechSynthesisUtterance(processedText);
      
      // Get all available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Find an appropriate voice for the selected language
      const voice = findBestVoice(voices, selectedLanguage);
      if (voice) utterance.voice = voice;
      
      utterance.lang = selectedLanguage;
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // Slightly higher for female voice
      utterance.volume = 0.8;
      
      setIsSpeaking(true);
      
      window.speechSynthesis.speak(utterance);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
    }
  };
  
  // Show the help dialog
  const handleShowHelp = () => {
    setShowHelp(true);
    const helpMessage = selectedLanguage === 'hi-IN'
      ? "आप मुझसे निम्न प्रकार के प्रश्न पूछ सकते हैं:"
      : "You can ask me questions like:";
    
    setResponse(helpMessage);
    if (!muted) speakText(helpMessage);
  };
  
  // Try a sample command
  const trySampleCommand = (command: string) => {
    setTranscript(command);
    processCommand(command);
  };
  
  // Animation variants for the dialog
  const dialogVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden border border-gray-200 dark:border-gray-800"
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex justify-between items-center">
              <h3 className="font-semibold text-lg">PREPZR Voice Assistant</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-5">
              <div className={`chat-bubble ${isSpeaking ? 'speaking' : ''} max-h-64 overflow-auto bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4`}>
                {isProcessing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    <span className="text-gray-500 dark:text-gray-400">Processing...</span>
                  </div>
                ) : (
                  <p>{response}</p>
                )}
              </div>
              
              {transcript && (
                <div className="mb-4 p-2 bg-purple-50 dark:bg-purple-900/20 rounded border border-purple-100 dark:border-purple-800/30">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-semibold">You said:</span> {transcript}
                  </p>
                </div>
              )}
              
              {showHelp && (
                <div className="mb-4 space-y-2">
                  <h4 className="font-medium text-sm">Try asking:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {helpCommands[selectedLanguage as keyof typeof helpCommands]?.map((cmd, i) => (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className="justify-start text-xs h-auto py-1"
                        onClick={() => trySampleCommand(cmd)}
                      >
                        "{cmd}"
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between mt-4">
                <div className="space-x-2">
                  <Button
                    variant={isListening ? "default" : "outline"}
                    size="sm"
                    className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
                    onClick={isListening ? stopListening : startListening}
                  >
                    {isListening ? (
                      <MicOff className="h-4 w-4 mr-2" />
                    ) : (
                      <Mic className="h-4 w-4 mr-2" />
                    )}
                    {isListening ? "Stop" : "Speak"}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleMute}
                    className="h-9 w-9"
                  >
                    {muted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleLanguage}
                    className="h-9 w-9"
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleShowHelp}
                  className="h-9 w-9"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingVoiceAssistant;
