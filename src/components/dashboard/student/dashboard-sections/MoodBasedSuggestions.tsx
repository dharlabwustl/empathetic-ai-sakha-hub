
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, Target, Moon, Frown, Brain } from 'lucide-react';
import { MoodType } from '@/types/user/base';
import { useNavigate } from 'react-router-dom';
import { getVoiceSettings, speakMessage } from '@/components/dashboard/student/voice/VoiceAnnouncer';

interface MoodBasedSuggestionsProps {
  currentMood?: MoodType;
  onMoodSelect: (mood: MoodType) => void;
}

const moodConfig = {
  motivated: {
    icon: <Smile className="w-5 h-5 text-amber-500" />,
    suggestion: "Perfect day to tackle a challenging concept! Add a bonus practice test today?",
    color: "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-700/50",
    planAdjustment: "Increased focus on new concepts",
    voiceMessage: "You're motivated! Let's tackle something challenging today. I've adjusted your plan to focus on new concepts."
  },
  focused: {
    icon: <Target className="w-5 h-5 text-emerald-500" />,
    suggestion: "Maximize this energy! Aim for 10% extra progress today.",
    color: "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-700/50",
    planAdjustment: "Added challenging practice tests",
    voiceMessage: "Great focus! I've added some challenging practice tests to maximize your productivity."
  },
  tired: {
    icon: <Moon className="w-5 h-5 text-blue-500" />,
    suggestion: "Let's lighten today's plan. Focus only on Flashcards or Quick Revision.",
    color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/50",
    planAdjustment: "Shorter study sessions with more breaks",
    voiceMessage: "I've adjusted your plan for today - shorter sessions with more breaks. Take it easy!"
  },
  stressed: {
    icon: <Frown className="w-5 h-5 text-purple-500" />,
    suggestion: "Breathe. Start with 1 simple concept you know well to build confidence.",
    color: "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700/50",
    planAdjustment: "Review of familiar content only",
    voiceMessage: "I notice you're stressed. Let's take a deep breath. I've adjusted your plan to focus on familiar content to build confidence."
  },
  distracted: {
    icon: <Brain className="w-5 h-5 text-red-500" />,
    suggestion: "Take it easy. 15 minutes of flashcards only. Tomorrow, we rebuild momentum.",
    color: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700/50",
    planAdjustment: "Quick, focused flashcard sessions",
    voiceMessage: "Finding it hard to concentrate? Let's do short flashcard sessions today and rebuild momentum tomorrow."
  },
  confident: {
    icon: <Smile className="w-5 h-5 text-blue-500" />,
    suggestion: "Great mindset! Let's tackle some challenging topics today.",
    color: "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700/50",
    planAdjustment: "Advanced topics and practice exams",
    voiceMessage: "You're confident! I've added advanced topics and practice exams to your plan today."
  }
};

export default function MoodBasedSuggestions({ currentMood, onMoodSelect }: MoodBasedSuggestionsProps) {
  const navigate = useNavigate();
  
  // Announce mood-specific suggestions when component mounts with an existing mood
  useEffect(() => {
    if (currentMood && moodConfig[currentMood as keyof typeof moodConfig]) {
      const settings = getVoiceSettings();
      if (settings.enabled && settings.announceReminders) {
        // Add a small delay to let other announcements finish
        setTimeout(() => {
          speakMessage(moodConfig[currentMood as keyof typeof moodConfig].voiceMessage);
        }, 2000);
      }
    }
  }, [currentMood]);
  
  const handleMoodSelect = (mood: MoodType) => {
    onMoodSelect(mood);
    
    // Voice announcement for the selected mood
    if (moodConfig[mood as keyof typeof moodConfig]) {
      const settings = getVoiceSettings();
      if (settings.enabled && settings.announceReminders) {
        speakMessage(moodConfig[mood as keyof typeof moodConfig].voiceMessage);
      }
    }
    
    // Save to local storage for persistence across the app
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      parsedData.mood = mood;
      localStorage.setItem("userData", JSON.stringify(parsedData));
    } else {
      localStorage.setItem("userData", JSON.stringify({ mood }));
    }
  };
  
  const viewStudyPlan = () => {
    navigate('/dashboard/student/today');
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          Daily Mood Check-in
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {Object.entries(moodConfig).map(([mood, config]) => (
              <Button
                key={mood}
                variant={currentMood === mood ? "default" : "outline"}
                size="sm"
                className={`flex items-center gap-1.5 ${currentMood === mood ? 'bg-primary' : ''}`}
                onClick={() => handleMoodSelect(mood as MoodType)}
              >
                {config.icon}
                <span className="capitalize">{mood}</span>
              </Button>
            ))}
          </div>
          
          {currentMood && moodConfig[currentMood as keyof typeof moodConfig] && (
            <div className={`p-4 rounded-lg ${moodConfig[currentMood as keyof typeof moodConfig].color} mt-4`}>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  {moodConfig[currentMood as keyof typeof moodConfig].icon}
                  <p className="text-sm">{moodConfig[currentMood as keyof typeof moodConfig].suggestion}</p>
                </div>
                
                <div className="mt-1">
                  <p className="text-xs mb-2">
                    <strong>Study plan adjusted:</strong> {moodConfig[currentMood as keyof typeof moodConfig].planAdjustment}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={viewStudyPlan}
                  >
                    View Your Study Plan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
