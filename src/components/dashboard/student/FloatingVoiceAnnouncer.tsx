
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from 'lucide-react';
import { MoodType } from '@/types/user/base';

interface FloatingVoiceAnnouncerProps {
  currentMood?: MoodType;
  studyStreak?: number;
  todayProgress?: number;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({
  currentMood,
  studyStreak = 0,
  todayProgress = 0
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState<string>('');

  const moodMessages: Record<MoodType, string[]> = {
    [MoodType.Happy]: ['You're doing great! Keep up the positive energy!'],
    [MoodType.Motivated]: ['Love the motivation! You're on fire today!'],
    [MoodType.Focused]: ['Excellent focus! You're in the zone!'],
    [MoodType.Tired]: ['Take a break when you need it. Rest is important too!'],
    [MoodType.Tired]: ['Remember to take breaks. Your wellbeing matters!'],
    [MoodType.Stressed]: ['Take a deep breath. You've got this!'],
    [MoodType.Anxious]: ['One step at a time. You're stronger than you think!'],
    [MoodType.Okay]: ['Steady progress is still progress. Keep going!'],
    [MoodType.Okay]: ['Every small step counts. You're doing well!'],
    [MoodType.Okay]: ['Consistency is key. You're on the right track!'],
    [MoodType.Overwhelmed]: ['Break it down into smaller tasks. You can do this!'],
    [MoodType.Overwhelmed]: ['Take it one task at a time. You've got this!'],
    [MoodType.Curious]: ['Great questions lead to great discoveries!'],
    [MoodType.Curious]: ['Your curiosity is your superpower!'],
    [MoodType.Confused]: ['Confusion is the beginning of understanding!'],
    [MoodType.Confused]: ['Ask questions! That\'s how we learn!'
  };

  const generalMessages = [
    'Remember to stay hydrated!',
    'Great job on maintaining your study streak!',
    'You\'re making excellent progress today!',
    'Keep up the fantastic work!',
    'Your dedication is inspiring!'
  ];

  const announceMessage = (message: string) => {
    if (isEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.7;
      speechSynthesis.speak(utterance);
      setCurrentAnnouncement(message);
    }
  };

  useEffect(() => {
    if (!isEnabled) return;

    const interval = setInterval(() => {
      let message = '';
      
      if (currentMood && moodMessages[currentMood]) {
        const moodMsgs = moodMessages[currentMood];
        message = moodMsgs[Math.floor(Math.random() * moodMsgs.length)];
      } else {
        message = generalMessages[Math.floor(Math.random() * generalMessages.length)];
      }

      announceMessage(message);
    }, 300000); // Announce every 5 minutes

    return () => clearInterval(interval);
  }, [isEnabled, currentMood]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm border">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-sm">Voice Announcer</h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEnabled(!isEnabled)}
          >
            {isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
        
        {isEnabled && currentAnnouncement && (
          <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
            "{currentAnnouncement}"
          </div>
        )}
        
        <div className="text-xs text-gray-500 mt-2">
          {isEnabled ? 'Voice announcements active' : 'Click to enable voice announcements'}
        </div>
      </div>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
