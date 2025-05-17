
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import FloatingVoiceAssistant from './FloatingVoiceAssistant';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';
import { getTimeBasedGreeting } from '@/components/dashboard/student/voice/voiceUtils';

interface DashboardVoiceAssistantProps {
  userName?: string;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const DashboardVoiceAssistant: React.FC<DashboardVoiceAssistantProps> = ({
  userName,
  currentMood,
  onMoodChange
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [recentStudyTopics, setRecentStudyTopics] = useState<string[]>([]);
  const [upcomingTopics, setUpcomingTopics] = useState<string[]>([]);
  
  const { 
    speakMessage, 
    isVoiceSupported,
    voiceSettings,
    toggleMute
  } = useVoiceAnnouncer({
    userName,
    mood: currentMood,
    isFirstTimeUser: isFirstLoad,
    initialSettings: { language: 'hi-IN' } // Setting Hindi as default
  });

  // Load recent study topics from localStorage if available
  useEffect(() => {
    try {
      const savedRecentTopics = localStorage.getItem('recentStudyTopics');
      const savedUpcomingTopics = localStorage.getItem('upcomingTopics');
      
      if (savedRecentTopics) {
        setRecentStudyTopics(JSON.parse(savedRecentTopics));
      } else {
        // Default topics if none saved
        setRecentStudyTopics(['Biology Chapter 5', 'Chemistry Organic Compounds', 'Physics Mechanics']);
      }
      
      if (savedUpcomingTopics) {
        setUpcomingTopics(JSON.parse(savedUpcomingTopics));
      } else {
        // Default upcoming topics if none saved
        setUpcomingTopics(['Thermodynamics', 'Cell Biology', 'Chemical Bonding']);
      }
    } catch (err) {
      console.error("Error loading study topics:", err);
    }
  }, []);

  useEffect(() => {
    // Check if this is the first time loading the page in this session
    const hasSeenVoiceGreeting = sessionStorage.getItem('hasSeenVoiceGreeting');
    if (!hasSeenVoiceGreeting && isVoiceSupported && voiceSettings.enabled && !voiceSettings.muted) {
      // Delay the welcome message to make sure the page is loaded
      const timer = setTimeout(() => {
        const isFirstTimeUser = localStorage.getItem('new_user_signup') === 'true';
        const currentPath = window.location.pathname;
        
        let greeting = '';
        
        // Hindi greetings
        if (voiceSettings.language === 'hi-IN') {
          if (currentPath.includes('/dashboard/student')) {
            greeting = isFirstTimeUser 
              ? `नमस्ते ${userName || 'विद्यार्थी'}! प्रेप ज़र के स्टूडेंट डैशबोर्ड में आपका स्वागत है। यहां आप अपनी पढ़ाई की प्रगति को ट्रैक कर सकते हैं, कॉन्सेप्ट कार्ड्स तक पहुंच सकते हैं, और अपने नीट परीक्षा के लिए तैयारी कर सकते हैं। मैं आपका वॉयस असिस्टेंट हूं और मैं आपको विभिन्न सेक्शन्स में नेविगेट करने में मदद कर सकता हूं।`
              : `${getTimeBasedGreeting('hi-IN')} ${userName || 'विद्यार्थी'}, आपके डैशबोर्ड पर वापस स्वागत है! क्या आप अपने स्टडी प्लान के साथ जारी रखना चाहते हैं या आज कॉन्सेप्ट कार्ड्स का अन्वेषण करना चाहते हैं? अगर आपको किसी भी मदद की आवश्यकता हो तो मुझसे पूछें।`;
          }
        } else {
          // English or other language greetings
          if (currentPath.includes('/dashboard/student')) {
            greeting = isFirstTimeUser 
              ? `Namaste ${userName || 'there'}! Welcome to your PREPZR student dashboard. Here you can track your study progress, access concept cards, and prepare for your NEET exams. I'm your voice assistant and I can help you navigate through different sections. Just click the microphone when you need assistance.`
              : `${getTimeBasedGreeting(voiceSettings.language)} ${userName || 'there'}! Welcome back to your dashboard. Would you like to continue with your study plan or explore concept cards today? Just ask me if you need any help.`;
          }
        }
        
        if (greeting) {
          speakMessage(greeting);
          sessionStorage.setItem('hasSeenVoiceGreeting', 'true');
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    setIsFirstLoad(false);
  }, [isVoiceSupported, userName, speakMessage, voiceSettings.enabled, voiceSettings.muted, voiceSettings.language]);

  const handleMoodCommand = (moodString: string) => {
    let newMood: MoodType | undefined;
    
    // Convert string to MoodType enum
    switch (moodString.toUpperCase()) {
      case 'HAPPY': newMood = MoodType.HAPPY; break;
      case 'MOTIVATED': newMood = MoodType.MOTIVATED; break;
      case 'FOCUSED': newMood = MoodType.FOCUSED; break;
      case 'TIRED': newMood = MoodType.TIRED; break;
      case 'STRESSED': newMood = MoodType.STRESSED; break;
      case 'ANXIOUS': newMood = MoodType.ANXIOUS; break;
      case 'OVERWHELMED': newMood = MoodType.OVERWHELMED; break;
      case 'CONFUSED': newMood = MoodType.CONFUSED; break;
      case 'CURIOUS': newMood = MoodType.CURIOUS; break;
      case 'CALM': newMood = MoodType.CALM; break;
      case 'NEUTRAL': newMood = MoodType.NEUTRAL; break;
      default: return; // Invalid mood
    }
    
    if (newMood && onMoodChange) {
      onMoodChange(newMood);
      toast({
        title: "Mood Updated",
        description: `Your mood has been updated to ${moodString}`,
      });
      
      // Provide context-aware response based on mood in selected language
      const currentPath = window.location.pathname;
      
      if (currentPath.includes('/dashboard/student')) {
        if (voiceSettings.language === 'hi-IN') {
          // Hindi mood responses
          if (newMood === MoodType.STRESSED || newMood === MoodType.ANXIOUS || newMood === MoodType.OVERWHELMED) {
            speakMessage("मैं देख रहा हूं कि आप तनावग्रस्त महसूस कर रहे हैं। क्या आप एक त्वरित माइंडफुलनेस एक्सरसाइज़ करना चाहेंगे या फील गुड कॉर्नर में कुछ रिलैक्सेशन कंटेंट देखना चाहेंगे?");
          } else if (newMood === MoodType.MOTIVATED || newMood === MoodType.FOCUSED) {
            speakMessage("यह देखकर अच्छा लगा कि आप प्रेरित महसूस कर रहे हैं! यह कुछ चुनौतीपूर्ण अवधारणाओं या अभ्यास प्रश्नों को हल करने का बिल्कुल सही समय है।");
          } else if (newMood === MoodType.TIRED) {
            speakMessage("मैं समझता हूं कि आप थके हुए महसूस कर रहे हैं। आज एक छोटा ब्रेक लेने या आसान विषयों का अन्वेषण करने पर विचार करें।");
          }
        } else {
          // English mood responses
          if (newMood === MoodType.STRESSED || newMood === MoodType.ANXIOUS || newMood === MoodType.OVERWHELMED) {
            speakMessage("I notice you're feeling stressed. Would you like to try a quick mindfulness exercise or view some relaxation content in the Feel Good Corner?");
          } else if (newMood === MoodType.MOTIVATED || newMood === MoodType.FOCUSED) {
            speakMessage("Great to see you're feeling motivated! This is the perfect time to tackle some challenging concepts or practice questions.");
          } else if (newMood === MoodType.TIRED) {
            speakMessage("I understand you're feeling tired. Consider taking a short break or exploring easier topics today.");
          }
        }
      }
    }
  };

  const handleNavigationCommand = (route: string) => {
    if (route) {
      // Context-aware navigation responses in selected language
      if (voiceSettings.language === 'hi-IN') {
        // Hindi navigation responses
        switch (route) {
          case '/dashboard/student':
            speakMessage("आपको आपके स्टूडेंट डैशबोर्ड पर ले जा रहा हूं जहां आप अपने अध्ययन का अवलोकन देख सकते हैं।");
            break;
          case '/dashboard/student/concepts':
            speakMessage("कॉन्सेप्ट कार्ड्स पर नेविगेट कर रहा हूं जहां आप विजुअल एड्स और फॉर्मूला के साथ महत्वपूर्ण नीट टॉपिक्स का अध्ययन कर सकते हैं।");
            break;
          case '/dashboard/student/flashcards':
            speakMessage("महत्वपूर्ण तथ्यों के त्वरित संशोधन के लिए आपके फ्लैशकार्ड्स सेक्शन को खोल रहा हूं।");
            break;
          case '/dashboard/student/practice':
            speakMessage("आपको प्रैक्टिस एग्जाम्स पर ले जा रहा हूं जहां आप नीट-स्टाइल प्रश्नों के साथ अपने ज्ञान का परीक्षण कर सकते हैं।");
            break;
          default:
            speakMessage(`आपको ${route} पर नेविगेट कर रहा हूं`);
        }
      } else {
        // English navigation responses
        switch (route) {
          case '/dashboard/student':
            speakMessage("Taking you to your student dashboard where you can see your study overview.");
            break;
          case '/dashboard/student/concepts':
            speakMessage("Navigating to concept cards where you can study key NEET topics with visual aids and formulas.");
            break;
          case '/dashboard/student/flashcards':
            speakMessage("Opening your flashcards section for quick revision of important facts.");
            break;
          case '/dashboard/student/practice':
            speakMessage("Taking you to practice exams where you can test your knowledge with NEET-style questions.");
            break;
          default:
            speakMessage(`Navigating to ${route}`);
        }
      }
      
      navigate(route);
      toast({
        title: "Navigating",
        description: `Taking you to ${route}`,
      });
    }
  };

  const handleStudyRecommendation = () => {
    // Provide personalized study recommendations based on recent activity and mood
    if (recentStudyTopics.length > 0 && upcomingTopics.length > 0) {
      const recentTopic = recentStudyTopics[0];
      const suggestedTopic = upcomingTopics[0];
      
      if (voiceSettings.language === 'hi-IN') {
        speakMessage(`आपने हाल ही में ${recentTopic} का अध्ययन किया है। आज आप ${suggestedTopic} पर काम कर सकते हैं, यह आपकी NEET परीक्षा की तैयारी में अगला अच्छा कदम होगा।`);
      } else {
        speakMessage(`You recently studied ${recentTopic}. Today you could work on ${suggestedTopic}, which would be a good next step in your NEET exam preparation.`);
      }
    } else {
      if (voiceSettings.language === 'hi-IN') {
        speakMessage("आज के लिए अध्ययन की सिफारिशें प्राप्त करने के लिए कृपया पहले अपनी रुचियों और लक्ष्यों को अपडेट करें।");
      } else {
        speakMessage("Please update your interests and goals first to get study recommendations for today.");
      }
    }
  };

  return (
    <FloatingVoiceAssistant
      isOpen={true}
      onClose={() => {}}
      userName={userName}
      currentMood={currentMood}
      onMoodCommand={handleMoodCommand}
      onNavigationCommand={handleNavigationCommand}
      onStudyRecommendation={handleStudyRecommendation}
      pronouncePrepzr={true}
      language="hi-IN" // Set Hindi as default
    />
  );
};

export default DashboardVoiceAssistant;
