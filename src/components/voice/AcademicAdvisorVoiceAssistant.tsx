
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, GraduationCap } from 'lucide-react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { Badge } from '@/components/ui/badge';

interface AcademicAdvisorVoiceAssistantProps {
  userName?: string;
  currentGoal?: string;
  examDate?: string;
  isEnabled?: boolean;
}

const AcademicAdvisorVoiceAssistant: React.FC<AcademicAdvisorVoiceAssistantProps> = ({
  userName = "Student",
  currentGoal = "NEET",
  examDate,
  isEnabled = true
}) => {
  const {
    settings,
    isListening,
    isSpeaking,
    transcript,
    speakText,
    startListening,
    stopListening,
    processCommand,
    toggleMute,
    toggleEnabled
  } = useVoiceAssistant({
    userName,
    initialSettings: { enabled: isEnabled }
  });

  // Voice commands specific to academic advisory
  const advisorCommands = {
    'study plan': () => {
      const response = `Let's discuss your study plan for ${currentGoal}. I recommend creating a structured schedule with specific time blocks for each subject. Focus on your weaker areas while maintaining your strengths. Would you like me to help you create a personalized study timeline?`;
      speakText(response);
    },
    'time management': () => {
      const advice = `Effective time management is crucial for ${currentGoal} preparation. Use the Pomodoro technique: 25 minutes focused study, 5-minute break. Prioritize high-yield topics. Allocate more time to challenging subjects. Always include review sessions in your schedule.`;
      speakText(advice);
    },
    'exam strategy': () => {
      const strategy = `Here's your exam strategy for ${currentGoal}: First, understand the exam pattern and marking scheme. Practice previous year papers regularly. Focus on accuracy over speed initially. Develop elimination techniques for multiple choice questions. Create a revision schedule for the last month.`;
      speakText(strategy);
    },
    'stress management': () => {
      const stress = `Managing stress is important for peak performance. Practice deep breathing exercises, maintain a regular sleep schedule, take short breaks during study sessions, stay physically active, and remember that some stress is normal and can actually improve performance.`;
      speakText(stress);
    },
    'subject prioritization': () => {
      const prioritization = `For ${currentGoal}, prioritize subjects based on weightage and your current performance. Spend more time on high-weightage topics where you're weak. Don't neglect strong subjects completely - maintain them with regular practice. Balance is key to success.`;
      speakText(prioritization);
    },
    'motivation tips': () => {
      const motivation = `Stay motivated ${userName}! Remember your goals, visualize success, celebrate small wins, connect with other aspirants, remind yourself why you started this journey. Every study session brings you closer to your ${currentGoal} goal. You've got this!`;
      speakText(motivation);
    },
    'revision strategy': () => {
      const revision = `Effective revision strategy: Review notes daily, create summary sheets for quick reference, use active recall instead of just reading, practice mock tests regularly, focus on weak areas but don't ignore strong ones, and maintain a revision timetable.`;
      speakText(revision);
    },
    'exam day tips': () => {
      const examDay = `Exam day preparation: Get adequate sleep, eat a light healthy breakfast, reach the center early, carry all required items, read instructions carefully, manage time effectively, start with questions you're confident about, and stay calm throughout.`;
      speakText(examDay);
    },
    'help': () => {
      const help = `I'm your academic advisor assistant. I can help you with study plans, time management, exam strategies, stress management, subject prioritization, motivation, revision strategies, and exam day preparation. What aspect of your ${currentGoal} preparation would you like guidance on?`;
      speakText(help);
    }
  };

  // Process voice commands
  useEffect(() => {
    if (transcript && settings.enabled) {
      const commandProcessed = processCommand(advisorCommands, true);
      if (!commandProcessed) {
        // If no specific command matched, provide general help
        const response = `I heard "${transcript}". I can provide guidance on study planning, time management, exam strategies, stress management, and motivation. Try saying "study plan", "time management", "exam strategy", or "motivation tips".`;
        speakText(response);
      }
    }
  }, [transcript]);

  // Welcome message when component loads
  useEffect(() => {
    if (settings.enabled && !settings.muted) {
      const welcomeMessage = `Hello ${userName}! I'm your academic advisor assistant. I'm here to help you with your ${currentGoal} preparation. I can provide guidance on study planning, time management, exam strategies, and keeping you motivated. What would you like to discuss?`;
      setTimeout(() => speakText(welcomeMessage), 1000);
    }
  }, [userName, currentGoal]);

  if (!settings.enabled) return null;

  return (
    <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
            <GraduationCap className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          Academic Advisor Assistant
          {(isListening || isSpeaking) && (
            <Badge variant="secondary" className={
              isListening ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
            }>
              {isListening ? "Listening..." : "Speaking..."}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Student: <span className="font-medium text-amber-600 dark:text-amber-400">{userName}</span>
          <br />
          Goal: <span className="font-medium">{currentGoal}</span>
          {examDate && (
            <>
              <br />
              Exam Date: <span className="font-medium">{examDate}</span>
            </>
          )}
        </div>

        {transcript && (
          <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border">
            <p className="text-sm">
              <span className="font-medium">You said:</span> "{transcript}"
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            variant={isListening ? "default" : "outline"}
            size="sm"
            onClick={isListening ? stopListening : startListening}
            className="flex items-center gap-2"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isListening ? "Stop" : "Talk"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleMute}
            className="flex items-center gap-2"
          >
            {settings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {settings.muted ? "Unmute" : "Mute"}
          </Button>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p><strong>Try saying:</strong></p>
          <p>• "Study plan" - Get personalized study guidance</p>
          <p>• "Time management" - Learn effective scheduling</p>
          <p>• "Exam strategy" - Develop winning approaches</p>
          <p>• "Stress management" - Handle exam pressure</p>
          <p>• "Motivation tips" - Stay motivated and focused</p>
          <p>• "Revision strategy" - Optimize your reviews</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicAdvisorVoiceAssistant;
