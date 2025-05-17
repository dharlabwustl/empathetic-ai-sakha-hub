
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import FloatingVoiceAssistant from './FloatingVoiceAssistant';
import { MoodType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

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
  const [needsStudyPlan, setNeedsStudyPlan] = useState(false);
  
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

  // Check if user needs to create a study plan (for Google signup users)
  useEffect(() => {
    const needsStudyPlanCreation = localStorage.getItem('needs_study_plan_creation') === 'true';
    
    if (needsStudyPlanCreation) {
      setNeedsStudyPlan(true);
      // Clear the flag so we don't show it again
      localStorage.removeItem('needs_study_plan_creation');
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
        
        // Context-aware greetings based on current page
        if (currentPath.includes('/dashboard/student')) {
          if (voiceSettings.language === 'hi-IN') {
            greeting = isFirstTimeUser 
              ? `नमस्ते ${userName || 'वहाँ'}! आपके Prep-zer स्टूडेंट डैशबोर्ड में आपका स्वागत है। यहां आप अपनी पढ़ाई की प्रगति पर नज़र रख सकते हैं, कॉन्सेप्ट कार्ड्स तक पहुंच सकते हैं, और अपनी NEET परीक्षा की तैयारी कर सकते हैं। मैं आपका आवाज सहायक हूं और मैं आपको विभिन्न अनुभागों में नेविगेट करने में मदद कर सकता हूं। सहायता के लिए बस माइक्रोफोन पर क्लिक करें।`
              : `आपके डैशबोर्ड पर वापस स्वागत है, ${userName || 'वहाँ'}! क्या आप अपनी अध्ययन योजना के साथ जारी रखना चाहते हैं या आज कॉन्सेप्ट कार्ड्स का अन्वेषण करना चाहते हैं? यदि आपको कोई सहायता चाहिए तो बस पूछें।`;
          } else {
            greeting = isFirstTimeUser 
              ? `Namaste ${userName || 'there'}! Welcome to your Prep-zer student dashboard. Here you can track your study progress, access concept cards, and prepare for your NEET exams. I'm your voice assistant and I can help you navigate through different sections. Just click the microphone when you need assistance.`
              : `Welcome back to your dashboard, ${userName || 'there'}! Would you like to continue with your study plan or explore concept cards today? Just ask me if you need any help.`;
          }
          
          // If the user needs to create a study plan (Google signup flow)
          if (needsStudyPlan) {
            if (voiceSettings.language === 'hi-IN') {
              greeting += ` मैं देख रहा हूँ कि आपको अभी तक अपनी अध्ययन योजना नहीं बनाई है। अपनी शिक्षा यात्रा शुरू करने के लिए, मैं अभी आपको नई अध्ययन योजना बनाने के प्रवाह में ले जाऊंगा।`;
            } else {
              greeting += ` I see that you haven't created your study plan yet. To start your learning journey, I'll take you to the create new study plan flow now.`;
            }
            
            // Navigate to study plan creation after a brief delay
            setTimeout(() => {
              navigate('/dashboard/student/study-plan/create');
              toast({
                title: "Create Your Study Plan",
                description: "Let's set up your personalized learning journey",
              });
            }, 6000);
          }
        } else if (currentPath.includes('/signup')) {
          if (voiceSettings.language === 'hi-IN') {
            greeting = `साइनअप पेज में आपका स्वागत है। कृपया अपना Prep-zer खाता बनाने के लिए अपने विवरण भरें। अपने अनुभव को अधिक व्यक्तिगत बनाने के लिए अपने स्कूल या संस्थान के विवरण शामिल करना न भूलें।`;
          } else {
            greeting = `Welcome to the signup page. Please fill in your details to create your Prep-zer account. Don't forget to include your school or institute details for a more personalized experience.`;
          }
        } else if (currentPath.includes('/login')) {
          if (voiceSettings.language === 'hi-IN') {
            greeting = `लॉगिन पेज में आपका स्वागत है। अपने Prep-zer खाते तक पहुंचने के लिए कृपया अपने क्रेडेंशियल्स दर्ज करें।`;
          } else {
            greeting = `Welcome to the login page. Please enter your credentials to access your Prep-zer account.`;
          }
        } else {
          if (voiceSettings.language === 'hi-IN') {
            greeting = isFirstTimeUser 
              ? `Prep-zer में आपका स्वागत है, ${userName || 'वहाँ'}! मैं आपका भारतीय उच्चारण के साथ आवाज सहायक हूं। मैं आपको प्लेटफॉर्म में नेविगेट करने और आपकी NEET तैयारी के लिए अध्ययन सुझाव प्रदान करने में मदद कर सकता हूं। जब आपको मेरी आवश्यकता हो तो बस माइक्रोफोन आइकन पर क्लिक करें।`
              : `वापस आने पर स्वागत है, ${userName || 'वहाँ'}! मैं आज आपकी NEET अध्ययन में मदद करने के लिए यहां हूं। यदि आपको सहायता की आवश्यकता है तो माइक्रोफोन पर क्लिक करें।`;
          } else {
            greeting = isFirstTimeUser 
              ? `Welcome to Prep-zer, ${userName || 'there'}! I'm your voice assistant with an Indian accent. I can help you navigate the platform and provide study suggestions for your NEET preparation. Just click the microphone icon when you need me.`
              : `Welcome back, ${userName || 'there'}! I'm here to help with your NEET studies today. Click the microphone if you need assistance.`;
          }
        }
        
        speakMessage(greeting);
        sessionStorage.setItem('hasSeenVoiceGreeting', 'true');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
    setIsFirstLoad(false);
  }, [isVoiceSupported, userName, speakMessage, voiceSettings.enabled, voiceSettings.muted, voiceSettings.language, navigate, toast, needsStudyPlan]);

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
      
      // Provide context-aware response based on mood in the selected language
      const currentPath = window.location.pathname;
      
      if (currentPath.includes('/dashboard/student')) {
        if (voiceSettings.language === 'hi-IN') {
          if (newMood === MoodType.STRESSED || newMood === MoodType.ANXIOUS || newMood === MoodType.OVERWHELMED) {
            speakMessage("मुझे लगता है कि आप तनावग्रस्त महसूस कर रहे हैं। क्या आप एक त्वरित माइंडफुलनेस अभ्यास या फील गुड कॉर्नर में कुछ आराम देने वाली सामग्री देखना चाहेंगे?");
          } else if (newMood === MoodType.MOTIVATED || newMood === MoodType.FOCUSED) {
            speakMessage("आपको प्रेरित महसूस होते देख अच्छा लगा! यह कुछ चुनौतीपूर्ण अवधारणाओं या अभ्यास प्रश्नों को संभालने के लिए एकदम सही समय है।");
          } else if (newMood === MoodType.TIRED) {
            speakMessage("मैं समझता हूं कि आप थके हुए महसूस कर रहे हैं। एक छोटा ब्रेक लेने या आज आसान विषयों का अन्वेषण करने पर विचार करें।");
          }
        } else {
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
      // Context-aware navigation responses in the selected language
      if (voiceSettings.language === 'hi-IN') {
        switch (route) {
          case '/dashboard/student':
            speakMessage("आपको आपके स्टूडेंट डैशबोर्ड पर ले जा रहा हूँ जहां आप अपना अध्ययन ओवरव्यू देख सकते हैं।");
            break;
          case '/dashboard/student/concepts':
            speakMessage("आपको कॉन्सेप्ट कार्ड्स पर ले जा रहा हूँ जहां आप विज़ुअल एड्स और फॉर्मूलों के साथ महत्वपूर्ण NEET विषयों का अध्ययन कर सकते हैं।");
            break;
          case '/dashboard/student/flashcards':
            speakMessage("महत्वपूर्ण तथ्यों के त्वरित संशोधन के लिए आपके फ्लैशकार्ड्स सेक्शन को खोल रहा हूँ।");
            break;
          case '/dashboard/student/practice':
            speakMessage("आपको अभ्यास परीक्षाओं पर ले जा रहा हूँ जहां आप NEET-शैली के प्रश्नों के साथ अपने ज्ञान का परीक्षण कर सकते हैं।");
            break;
          default:
            speakMessage(`आपको ${route} पर ले जा रहा हूँ`);
        }
      } else {
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

  return (
    <FloatingVoiceAssistant
      userName={userName}
      currentMood={currentMood ? currentMood.toString() : undefined}
      onMoodCommand={handleMoodCommand}
      onNavigationCommand={handleNavigationCommand}
      pronouncePrepzr={true}
      language="hi-IN" // Set Hindi as default
    />
  );
};

export default DashboardVoiceAssistant;
