
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router-dom';

interface HomePageVoiceAssistantProps {
  language?: string;
}

const HomePageVoiceAssistant: React.FC<HomePageVoiceAssistantProps> = ({ 
  language = 'en-IN' // Setting English as default, with India accent
}) => {
  const [greetingPlayed, setGreetingPlayed] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const location = useLocation();
  const { user } = useAuth();
  
  // Only play greeting on specific pages, not on concept pages or dashboard pages
  const shouldPlayGreeting = location.pathname === '/' || 
                            location.pathname.includes('/signup') ||
                            location.pathname.includes('/welcome-back') ||
                            location.pathname.includes('/welcome-flow');
  
  // If this is the homepage, use a 4-second delay to allow for page load
  // If this is another page, use a shorter delay
  const delayTime = location.pathname === '/' ? 4000 : 2000;
  
  // Enhanced messages for the home page visitor experience
  const homePageMessages = [
    // Initial greeting and value proposition
    {
      en: "Welcome to PREPZR, your AI-powered exam preparation platform. Our premium subscription provides personalized guidance to maximize your exam performance. We allocate 5% of subscription revenue to provide access for underprivileged students.",
      hi: "प्रेप-ज़र में आपका स्वागत है। हमारा AI-संचालित परीक्षा तैयारी प्लेटफॉर्म आपकी परीक्षा तैयारी को आसान बनाता है। हमारी प्रीमियम सदस्यता से आपको व्यक्तिगत मार्गदर्शन मिलेगा।"
    },
    // Exam readiness focus
    {
      en: "Our Exam Readiness Score helps you track your progress with real-time performance analytics. Unlike traditional coaching, we adapt to your unique learning style and pace.",
      hi: "हमारा परीक्षा तैयारी स्कोर आपको वास्तविक समय में प्रदर्शन विश्लेषण के साथ अपनी प्रगति को ट्रैक करने में मदद करता है। पारंपरिक कोचिंग के विपरीत, हम आपकी अद्वितीय सीखने की शैली और गति के अनुकूल हैं।"
    },
    // Advantages over coaching institutes
    {
      en: "Unlike coaching institutes with fixed schedules, PREPZR offers 24/7 access to personalized study plans, adaptive learning, and AI tutoring that focuses on your weak areas. Study at your own pace, anywhere, anytime.",
      hi: "निश्चित समय सारिणी वाले कोचिंग संस्थानों के विपरीत, प्रेप-ज़र आपको व्यक्तिगत अध्ययन योजनाओं, अनुकूली शिक्षण, और AI ट्यूटरिंग तक 24/7 पहुंच प्रदान करता है जो आपके कमजोर क्षेत्रों पर ध्यान केंद्रित करता है।"
    },
    // Free trial
    {
      en: "Start with our 7-day free trial and experience how our AI tailors study materials to your specific needs. No credit card required to begin your journey to exam success.",
      hi: "हमारे 7-दिवसीय निःशुल्क परीक्षण के साथ शुरुआत करें और अनुभव करें कि हमारा AI कैसे आपकी विशिष्ट आवश्यकताओं के अनुसार अध्ययन सामग्री तैयार करता है।"
    },
    // Features overview
    {
      en: "PREPZR features include personalized study plans, interactive flashcards, practice tests with detailed analytics, concept maps, and a virtual AI tutor available 24/7 for doubt resolution.",
      hi: "प्रेप-ज़र की विशेषताओं में शामिल हैं व्यक्तिगत अध्ययन योजनाएं, इंटरैक्टिव फ्लैशकार्ड, विस्तृत विश्लेषण के साथ अभ्यास परीक्षण, कॉन्सेप्ट मैप्स, और संदेह समाधान के लिए 24/7 उपलब्ध वर्चुअल AI ट्यूटर।"
    },
    // Why PREPZR is better
    {
      en: "PREPZR outperforms other online platforms through our adaptive learning algorithms that identify and address your unique knowledge gaps. Our mood-based study recommendations help maintain optimal learning conditions.",
      hi: "प्रेप-ज़र अपने अनुकूली लर्निंग एल्गोरिदम के माध्यम से अन्य ऑनलाइन प्लेटफॉर्म से बेहतर प्रदर्शन करता है जो आपके अद्वितीय ज्ञान अंतराल की पहचान करता है और उन्हें संबोधित करता है।"
    },
    // Social impact
    {
      en: "By choosing PREPZR, you're not just investing in your education. We donate 5% of subscription revenue to help underprivileged students access quality exam preparation materials.",
      hi: "प्रेप-ज़र को चुनकर, आप केवल अपनी शिक्षा में निवेश नहीं कर रहे हैं। हम सदस्यता राजस्व का 5% वंचित छात्रों को गुणवत्तापूर्ण परीक्षा तैयारी सामग्री तक पहुंच प्रदान करने में मदद करने के लिए दान करते हैं।"
    }
  ];
  
  useEffect(() => {
    // Only play the greeting if speech synthesis is supported and we're on the right page
    if ('speechSynthesis' in window && !greetingPlayed && shouldPlayGreeting) {
      const timer = setTimeout(() => {
        let message = '';
        const isGoogleSignup = localStorage.getItem('google_signup') === 'true';
        const isWelcomeFlow = location.pathname.includes('/welcome-flow');
        
        // Determine appropriate welcome message based on page and user status
        if (location.pathname === '/') {
          // For home page, use the enhanced messaging sequence
          const messageObj = homePageMessages[currentMessageIndex];
          message = language.includes('hi') ? messageObj.hi : messageObj.en;
          
          // Set up the next message to play after this one finishes
          setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % homePageMessages.length);
        } else if (location.pathname.includes('/signup')) {
          if (language === 'hi-IN') {
            message = `प्रेप-ज़र के प्रीमियम परीक्षण साइनअप में आपका स्वागत है। हमारे AI-संचालित परीक्षा तैयारी उपकरणों तक पहुंच प्राप्त करें। मैं आपको शुरू करने में मदद करने के लिए यहां हूँ। हमारी प्रीमियम सदस्यता के साथ आप परीक्षा की पूरी तैयारी कर सकते हैं। हम आपकी सदस्यता राजस्व का 5% वंचित छात्रों को शिक्षा देने के लिए उपयोग करते हैं।`;
          } else {
            message = `Welcome to PREPZR's premium signup. Get access to our AI-powered exam preparation tools for personalized study plans, adaptive learning, and practice tests. 5% of your subscription helps provide access to underprivileged students. Our platform outperforms traditional coaching institutes by focusing on your unique learning needs and knowledge gaps.`;
          }
          
          // If this is a Google signup, store this information for later use in the onboarding flow
          if (isGoogleSignup) {
            localStorage.setItem('needs_study_plan_creation', 'true');
          }
        } else if (location.pathname.includes('/welcome-back')) {
          if (language === 'hi-IN') {
            message = `प्रेप-ज़र पर वापस स्वागत है। बस अपने ईमेल और पासवर्ड के साथ लॉगिन करें और हम आपके पढ़ाई के यात्रा को जारी रख सकते हैं। आपका व्यक्तिगत AI ट्यूटर आपके परीक्षा तैयारी स्कोर को बेहतर बनाने में आपकी मदद करने के लिए तैयार है।`;
          } else {
            message = `Welcome back to PREPZR. Simply log in with your email and password, and we can continue your study journey. Your personal AI tutor is ready to help you improve your exam readiness score. Our adaptive platform remembers your progress and will suggest the best study path forward.`;
          }
        } else if (isWelcomeFlow) {
          if (language === 'hi-IN') {
            message = `प्रेप-ज़र में आपका स्वागत है! हम आपको एक व्यक्तिगत अध्ययन योजना बनाने में मदद करेंगे जो आपकी सीखने की शैली और आपके लक्ष्यों के अनुकूल है। हमारा AI-संचालित प्लेटफॉर्म आपकी परीक्षा की तैयारी के लिए व्यक्तिगत अध्ययन योजनाओं, अनुकूली लर्निंग और प्रदर्शन विश्लेषण प्रदान करता है। हमारी प्रीमियम सुविधाओं के साथ, आप अपनी परीक्षाओं के लिए पूरी तरह तैयार होंगे। याद रखें, आपकी सदस्यता का 5% वंचित छात्रों का समर्थन करता है।`;
          } else {
            message = `Welcome to PREPZR! We'll help you create a personalized study plan tailored to your learning style and goals. Our AI-powered platform offers personalized study plans, adaptive learning, and performance analytics for your exam preparation. Unlike traditional coaching institutes, we adapt to your schedule and provide 24/7 support. With our premium features, you'll be fully prepared for your exams. Remember, 5% of your subscription supports underprivileged students.`;
          }
        }
        
        if (message) {
          speakMessage(message);
          setGreetingPlayed(true);
          
          // For homepage, set a timer to play the next message after this one finishes
          if (location.pathname === '/' && currentMessageIndex < homePageMessages.length - 1) {
            // Estimate speaking time based on message length (approx. 100 chars spoken per 5 seconds)
            const speakingTimeEstimate = Math.max(6000, message.length * 50);
            
            setTimeout(() => {
              setGreetingPlayed(false); // Reset so next message will play
            }, speakingTimeEstimate);
          }
        }
      }, delayTime);
      
      return () => clearTimeout(timer);
    }
    
    // Reset the played state when navigating to a different page
    return () => {
      if (location.pathname) {
        setGreetingPlayed(false);
      }
    };
  }, [location.pathname, user, greetingPlayed, delayTime, language, shouldPlayGreeting, currentMessageIndex]);

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create utterance with proper PREPZR pronunciation (Prep-zer) with a pause between syllables
      const correctedText = text.replace(/PREPZR/gi, 'Prep-zer').replace(/prepzr/gi, 'Prep-zer').replace(/Prepzr/g, 'Prep-zer');
      const utterance = new SpeechSynthesisUtterance(correctedText);
      
      // Use voices API to find an appropriate voice based on language
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;
      
      if (language === 'hi-IN') {
        // Try to find a Hindi female voice
        selectedVoice = voices.find(v => 
          v.lang === 'hi-IN' || v.lang.includes('hi') && 
          (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana'))
        );
      } else if (language === 'en-IN') {
        // Try to find an Indian English voice
        selectedVoice = voices.find(v => 
          (v.lang === 'en-IN' || v.name.includes('Indian')) && 
          (v.name.toLowerCase().includes('female') || v.name.includes('Kalpana') || v.name.includes('Kajal'))
        );
      }
      
      // If no specific voice found, try to find any voice matching the language
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang === language);
      }
      
      // If still no match, use default voice
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Set properties
      utterance.lang = language;
      utterance.rate = 1.0; // Normal speed for better comprehension
      utterance.pitch = 1.1; // Slightly higher pitch for female voice
      utterance.volume = 0.8;
      
      // Speak the message
      window.speechSynthesis.speak(utterance);
      
      // Dispatch event to notify other components
      document.dispatchEvent(new CustomEvent('voice-speaking-started', {
        detail: { message: correctedText }
      }));
      
      utterance.onend = () => {
        document.dispatchEvent(new Event('voice-speaking-ended'));
        
        // For home page, after utterance ends, trigger the next message if we haven't gone through all
        if (location.pathname === '/' && currentMessageIndex < homePageMessages.length - 1) {
          setTimeout(() => {
            setGreetingPlayed(false); // Reset to allow next message to play
          }, 2000); // Short pause between messages
        }
      };
    }
  };

  // This is an invisible component - it only provides voice functionality
  return null;
};

export default HomePageVoiceAssistant;
