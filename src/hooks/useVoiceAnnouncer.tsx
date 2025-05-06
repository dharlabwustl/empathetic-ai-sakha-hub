
import { useState, useCallback, useEffect, useRef } from 'react';

export interface VoiceSettings {
  enabled: boolean;
  muted: boolean;
  language: string;
  pitch: number;
  rate: number;
}

interface UseVoiceAnnouncerProps {
  userName?: string;
  initialSettings?: Partial<VoiceSettings>;
}

interface UseVoiceAnnouncerReturn {
  speakMessage: (message: string) => void;
  stopSpeaking: () => void;
  isPaused: boolean;
  isSpeaking: boolean;
  voiceSettings: VoiceSettings;
  updateSettings: (settings: Partial<VoiceSettings>) => void;
  toggleMute: () => void;
}

// Database of contextual study tips organized by subject and activity
const studyTipsDatabase = {
  general: [
    "Remember to take a 5-minute break every 25 minutes for optimal focus.",
    "Hydration improves cognitive function. Keep a water bottle nearby while studying.",
    "Explaining concepts out loud can improve retention by up to 70%.",
    "Try the Feynman Technique: explain the concept as if teaching it to someone else.",
    "Reviewing material before sleep improves memory consolidation.",
  ],
  physics: [
    "When solving physics problems, always start by identifying the known and unknown variables.",
    "Practice drawing free-body diagrams to visualize forces in mechanical problems.",
    "For circular motion problems, remember that centripetal acceleration points toward the center.",
    "In conservation of energy problems, identify all forms of energy at the beginning and end states.",
    "Maxwell's equations are easier to understand when you visualize the fields in three dimensions."
  ],
  chemistry: [
    "Draw out molecular structures to better understand chemical reactions.",
    "Use mnemonic devices for remembering the reactivity series of metals.",
    "Color-code your periodic table to highlight element groups and properties.",
    "For organic chemistry, focus on understanding reaction mechanisms rather than memorizing.",
    "Practice balancing chemical equations daily to master stoichiometry."
  ],
  biology: [
    "Create concept maps to visualize relationships between biological systems.",
    "Use anatomical models or 3D visualizations for complex structures.",
    "Relate biological concepts to everyday examples for better understanding.",
    "For genetics problems, always draw out the Punnett squares to track alleles.",
    "When studying cellular processes, imagine yourself as a molecule moving through the system."
  ],
  mathematics: [
    "Work through example problems step-by-step before attempting similar ones.",
    "Focus on understanding the 'why' behind mathematical rules rather than memorizing them.",
    "Practice daily with progressively difficult problems to build mathematical intuition.",
    "For calculus, visualize the graphs to understand derivatives and integrals.",
    "When stuck on a problem, try working backward from the solution."
  ],
  flashcards: [
    "Space out your flashcard reviews using spaced repetition for better long-term retention.",
    "Include visual elements in your flashcards to engage multiple learning pathways.",
    "Test yourself in both directions: term-to-definition and definition-to-term.",
    "Focus more time on cards you find difficult, but still review the ones you know well.",
    "Try explaining the answer before revealing it to strengthen active recall."
  ],
  exams: [
    "Simulate exam conditions during practice tests to build stamina and reduce anxiety.",
    "Read each question twice before answering to avoid careless mistakes.",
    "For multiple-choice questions, eliminate obviously wrong answers first.",
    "Plan your time based on the point value of each question.",
    "Review past exams to identify patterns in question types and formats."
  ],
  conceptCards: [
    "Connect new concepts to previously learned material to build a knowledge network.",
    "After reviewing a concept card, try to summarize it without looking.",
    "Creating your own examples for abstract concepts improves understanding.",
    "Challenge yourself to identify real-world applications of theoretical concepts.",
    "Try converting concept information into different formats—diagrams, lists, or narratives."
  ]
};

// Function to get contextual tips based on user activity and subject
const getContextualTips = (activity: string, subject?: string): string => {
  // Default to general tips if no specific context is available
  const relevantTips = subject && studyTipsDatabase[subject as keyof typeof studyTipsDatabase]
    ? studyTipsDatabase[subject as keyof typeof studyTipsDatabase]
    : studyTipsDatabase[activity as keyof typeof studyTipsDatabase] || studyTipsDatabase.general;
  
  // Return a random tip from the relevant category
  return relevantTips[Math.floor(Math.random() * relevantTips.length)];
};

// Properly pronounce PREPZR
const fixPronunciation = (text: string): string => {
  // Replace "Prepzr" with phonetic spelling to ensure correct pronunciation
  return text.replace(/\bPrepzr\b/gi, "Prépzer");
};

export const useVoiceAnnouncer = ({
  userName = "",
  initialSettings = {}
}: UseVoiceAnnouncerProps = {}): UseVoiceAnnouncerReturn => {
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: true,
    muted: false,
    language: 'en-US',
    pitch: 1.0,
    rate: 1.0,
    ...initialSettings
  });
  
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Update settings
  const updateSettings = useCallback((newSettings: Partial<VoiceSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);
  
  // Toggle mute
  const toggleMute = useCallback(() => {
    setSettings(prev => ({ ...prev, muted: !prev.muted }));
  }, []);
  
  // Stop speaking
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);
  
  // Speak a message with the current settings
  const speakMessage = useCallback((message: string) => {
    if (!settings.enabled || settings.muted || !window.speechSynthesis) {
      return;
    }
    
    // Fix pronunciation of "PREPZR"
    const processedMessage = fixPronunciation(message);
    
    // Cancel any ongoing speech
    stopSpeaking();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(processedMessage);
    utterance.lang = settings.language;
    utterance.pitch = settings.pitch;
    utterance.rate = settings.rate;
    
    // Set up events
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Store reference for cancellation
    speechSynthRef.current = utterance;
    
    // Speak
    window.speechSynthesis.speak(utterance);
  }, [settings, stopSpeaking]);
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  // Provide contextual study tips based on user activity
  const suggestStudyTip = useCallback((activity: string, subject?: string) => {
    const tip = getContextualTips(activity, subject);
    speakMessage(`Here's a tip for you${userName ? ', ' + userName : ''}: ${tip}`);
  }, [userName, speakMessage]);
  
  return {
    speakMessage,
    stopSpeaking,
    isPaused,
    isSpeaking,
    voiceSettings: settings,
    updateSettings,
    toggleMute,
    suggestStudyTip
  };
};
