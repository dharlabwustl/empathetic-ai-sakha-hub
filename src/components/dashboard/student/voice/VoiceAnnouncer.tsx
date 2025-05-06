
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';
import { MoodType } from '@/types/user/base';
import { Card } from '@/components/ui/card';

interface VoiceAnnouncerProps {
  userName?: string;
  isFirstTimeUser?: boolean;
  examGoal?: string;
  pendingTasks?: Array<{ title: string; due: string }>;
  mood?: MoodType;
  language?: string;
}

const VoiceAnnouncer: React.FC<VoiceAnnouncerProps> = ({
  userName = 'Student',
  isFirstTimeUser = false,
  examGoal = 'NEET',
  pendingTasks = [],
  mood,
  language = 'en'
}) => {
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);
  
  const {
    voiceSettings,
    toggleMute,
    speakMessage,
    testVoice,
    isSpeaking,
    updateVoiceSettings,
    supportedLanguages
  } = useVoiceAnnouncer({
    userName,
    initialSettings: { language: language || 'en', enabled: true, muted: false },
    isFirstTimeUser
  });

  // Auto-announce on page load with a shorter delay (3 seconds)
  useEffect(() => {
    if (!hasSpoken) {
      const timer = setTimeout(() => {
        const welcomeMessage = getWelcomeMessage();
        speakMessage(welcomeMessage);
        setHasSpoken(true);
      }, 3000); // Reduced delay to 3 seconds

      return () => clearTimeout(timer);
    }
  }, [hasSpoken, userName, speakMessage, isFirstTimeUser]);

  // Create welcome message based on user status
  const getWelcomeMessage = () => {
    // Fix PREPZR pronunciation to be /ˈprɛp.zər/
    const prepzrPronunciation = "Prepzər";
    
    if (isFirstTimeUser) {
      return `Welcome to ${prepzrPronunciation}, ${userName}! I'm your personal AI voice assistant. I'll help guide you through your ${examGoal} preparation journey. Feel free to explore the dashboard, and don't hesitate to ask if you need any help!`;
    }
    
    // Check for pending tasks
    const hasTasks = pendingTasks && pendingTasks.length > 0;
    
    // Context-aware greeting based on mood and pending tasks
    if (hasTasks) {
      return `Welcome back to ${prepzrPronunciation}, ${userName}. You have ${pendingTasks.length} pending ${pendingTasks.length === 1 ? 'task' : 'tasks'} for your ${examGoal} preparation. Would you like to start with "${pendingTasks[0].title}" due ${pendingTasks[0].due}?`;
    }
    
    return `Welcome back to ${prepzrPronunciation}, ${userName}. I'm here to help with your ${examGoal} preparation. Let me know if you need any assistance with your studies today.`;
  };

  // Smart contextual study tips based on user's exam goal
  const getStudyTip = () => {
    // Exam-specific tips
    const examTips = {
      "NEET": [
        "For NEET Biology, using diagrams while studying human physiology improves recall by 40%.",
        "NEET Chemistry questions often test multiple concepts simultaneously. Practice integration of topics like organic reactions with thermodynamics.",
        "NEET Physics requires formula memorization but also application. Try explaining concepts like waves or nuclear physics in your own words.",
        "Research shows that NEET toppers typically review each subject in 45-minute focused sessions with 15-minute breaks."
      ],
      "JEE": [
        "For JEE Mathematics, solving problems without looking at solutions first significantly improves your problem-solving skills.",
        "JEE Chemistry requires strong visualization. Try drawing electron configurations and molecular structures from memory.",
        "Most JEE Physics errors happen in unit conversion. Double-check your units before finalizing any numerical answer.",
        "Top JEE performers typically do 'error logging' - keeping a notebook of mistakes and reviewing it weekly."
      ],
      "UPSC": [
        "UPSC preparation benefits from mind mapping. Create visual connections between related current affairs topics.",
        "For UPSC history, use the timeline method - create a chronological framework and place events within it for better retention.",
        "UPSC economics questions often combine theoretical concepts with current policies. Practice connecting theory to current events.",
        "Successful UPSC candidates typically review newspaper articles within 24 hours of reading them to improve retention."
      ]
    };

    // Default to NEET if exam goal not found
    const tips = examTips[examGoal] || examTips["NEET"];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  // Speak a study tip
  const speakStudyTip = () => {
    const tip = getStudyTip();
    speakMessage(`Here's a study tip for your ${examGoal} preparation: ${tip}`);
  };

  // Toggle mute button handler
  const handleToggleMute = () => {
    toggleMute();
  };

  return (
    <div className={`voice-assistant ${isSpeaking ? 'voice-speaking' : ''}`}>
      <Card className="p-2 flex flex-col gap-2 shadow-md">
        {showVoiceSettings ? (
          <div className="p-2 space-y-2">
            <h3 className="font-medium">Voice Settings</h3>
            <div className="flex items-center gap-2">
              <label className="text-sm">Language:</label>
              <select
                value={voiceSettings.language}
                onChange={(e) => updateVoiceSettings({ language: e.target.value })}
                className="text-xs p-1 border rounded"
              >
                {supportedLanguages.map(lang => (
                  <option key={lang.value} value={lang.value}>{lang.label}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={testVoice} className="text-xs py-1 px-2 h-8">
                Test Voice
              </Button>
              <Button variant="default" size="sm" onClick={() => setShowVoiceSettings(false)} className="text-xs py-1 px-2 h-8">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleMute}
              title={voiceSettings.muted ? "Unmute voice" : "Mute voice"}
              className="h-8 w-8 rounded-full"
            >
              {voiceSettings.muted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
            <div className="flex-1">
              <Button 
                variant="link" 
                onClick={speakStudyTip} 
                className="text-xs p-0 h-auto font-normal text-blue-600 hover:text-blue-800"
              >
                Get a study tip
              </Button>
            </div>
            <Button variant="link" onClick={() => setShowVoiceSettings(true)} className="text-xs p-0 h-auto ml-auto">
              Settings
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default VoiceAnnouncer;
