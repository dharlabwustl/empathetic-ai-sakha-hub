
import React, { useState, useEffect } from 'react';
import { MoodType } from '@/types/user/base';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';

interface FloatingVoiceAnnouncerProps {
  currentMood?: MoodType;
}

const FloatingVoiceAnnouncer: React.FC<FloatingVoiceAnnouncerProps> = ({ currentMood }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const moodAnnouncements: Record<MoodType, string> = {
    [MoodType.Happy]: "You're radiating positive energy today! Perfect time for challenging topics.",
    [MoodType.Motivated]: "That motivation is amazing! Let's channel it into productive learning.",
    [MoodType.Focused]: "Your focus is sharp today. Ideal for deep learning sessions.",
    [MoodType.Tired]: "Feeling tired? Consider some light review or a refreshing break.",
    [MoodType.Tired]: "Rest is important too. Maybe try some easier topics today.",
    [MoodType.Stressed]: "Take a deep breath. Break your tasks into smaller, manageable pieces.",
    [MoodType.Anxious]: "Feeling anxious is normal. Try some breathing exercises before studying.",
    [MoodType.Okay]: "You're doing just fine. Steady progress is still progress.",
    [MoodType.Okay]: "A calm and steady approach works well today.",
    [MoodType.Okay]: "Regular study pace is perfect for consistent learning.",
    [MoodType.Overwhelmed]: "Feeling overwhelmed? Let's simplify and focus on one thing at a time.",
    [MoodType.Overwhelmed]: "Break it down into smaller steps. You've got this!",
    [MoodType.Curious]: "That curiosity is your superpower! Great time to explore new concepts.",
    [MoodType.Curious]: "Your curiosity will lead you to amazing discoveries today.",
    [MoodType.Confused]: "Confusion means you're learning! Great time to ask questions.",
    [MoodType.Confused]: "Questions lead to understanding. Don't hesitate to seek help.",
    [MoodType.Neutral]: "A balanced mood is perfect for steady, consistent learning.",
    [MoodType.Calm]: "Your calm energy is perfect for focused study sessions.",
    [MoodType.Sad]: "Be gentle with yourself today. Light review might be just right."
  };

  const announceMessage = (message: string) => {
    if (isEnabled && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.7;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (currentMood && isEnabled) {
      const message = moodAnnouncements[currentMood];
      if (message) {
        // Delay announcement slightly to avoid overlapping with other sounds
        setTimeout(() => announceMessage(message), 1000);
      }
    }
  }, [currentMood, isEnabled]);

  const toggleVoiceAnnouncements = () => {
    setIsEnabled(!isEnabled);
    
    if (!isEnabled) {
      announceMessage("Voice announcements enabled. I'll provide gentle audio guidance based on your mood.");
    } else {
      // Cancel any ongoing speech
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    }
  };

  // Don't render if speech synthesis is not supported
  if (!('speechSynthesis' in window)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant={isEnabled ? "default" : "outline"}
        size="sm"
        onClick={toggleVoiceAnnouncements}
        className="shadow-lg"
        title={isEnabled ? "Disable voice announcements" : "Enable voice announcements"}
      >
        {isEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default FloatingVoiceAnnouncer;
