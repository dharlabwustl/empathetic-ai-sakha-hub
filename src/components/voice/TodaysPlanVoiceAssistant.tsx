
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Calendar } from 'lucide-react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { Badge } from '@/components/ui/badge';
import { TodaysPlanData } from '@/types/student/todaysPlan';

interface TodaysPlanVoiceAssistantProps {
  planData: TodaysPlanData | null;
  userName?: string;
  isEnabled?: boolean;
}

const TodaysPlanVoiceAssistant: React.FC<TodaysPlanVoiceAssistantProps> = ({
  planData,
  userName = 'Student',
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

  // Voice commands specific to today's plan
  const todaysPlanCommands = {
    'show progress': () => {
      if (!planData) {
        speakText("No plan data available right now.");
        return;
      }
      const percentage = Math.round((planData.completedTasks / planData.totalTasks) * 100);
      const response = `You've completed ${planData.completedTasks} out of ${planData.totalTasks} tasks today. That's ${percentage}% progress. ${planData.streak > 0 ? `Your study streak is ${planData.streak} days!` : ''}`;
      speakText(response);
    },
    'what tasks remaining': () => {
      if (!planData) {
        speakText("No plan data available right now.");
        return;
      }
      const remaining = planData.totalTasks - planData.completedTasks;
      let response = `You have ${remaining} tasks remaining today. `;
      
      const pendingConcepts = planData.concepts?.filter(c => c.status === 'pending').length || 0;
      const pendingFlashcards = planData.flashcards?.filter(f => f.status === 'pending').length || 0;
      const pendingExams = planData.practiceExams?.filter(p => p.status === 'pending').length || 0;
      
      if (pendingConcepts > 0) response += `${pendingConcepts} concept learning sessions. `;
      if (pendingFlashcards > 0) response += `${pendingFlashcards} flashcard reviews. `;
      if (pendingExams > 0) response += `${pendingExams} practice tests. `;
      
      speakText(response);
    },
    'check backlog': () => {
      if (!planData?.backlogTasks || planData.backlogTasks.length === 0) {
        speakText("Great news! You don't have any overdue tasks in your backlog.");
        return;
      }
      const response = `You have ${planData.backlogTasks.length} overdue tasks in your backlog. ${planData.backlogTasks[0] ? `The oldest one is ${planData.backlogTasks[0].title} from ${planData.backlogTasks[0].subject}, which is ${planData.backlogTasks[0].daysOverdue} days overdue.` : ''} I recommend clearing these first.`;
      speakText(response);
    },
    'time allocation': () => {
      if (!planData?.timeAllocation) {
        speakText("Time allocation information is not available.");
        return;
      }
      const allocation = planData.timeAllocation;
      const response = `Today's time allocation: ${allocation.concepts} minutes for concept learning, ${allocation.flashcards} minutes for flashcard review, ${allocation.practiceExams} minutes for practice tests, and ${allocation.revision} minutes for revision. Total planned study time is ${allocation.total} minutes.`;
      speakText(response);
    },
    'suggest next task': () => {
      if (!planData) {
        speakText("No plan data available for suggestions.");
        return;
      }
      
      // Check for overdue tasks first
      if (planData.backlogTasks && planData.backlogTasks.length > 0) {
        const oldestBacklog = planData.backlogTasks[0];
        speakText(`I suggest starting with your overdue task: ${oldestBacklog.title} from ${oldestBacklog.subject}. It's been pending for ${oldestBacklog.daysOverdue} days.`);
        return;
      }
      
      // Find next pending task
      const nextConcept = planData.concepts?.find(c => c.status === 'pending');
      const nextFlashcard = planData.flashcards?.find(f => f.status === 'pending');
      const nextExam = planData.practiceExams?.find(p => p.status === 'pending');
      
      if (nextConcept) {
        speakText(`I recommend starting with ${nextConcept.title} from ${nextConcept.subject}. It should take about ${nextConcept.duration} minutes.`);
      } else if (nextFlashcard) {
        speakText(`How about reviewing your ${nextFlashcard.title} flashcards? It has ${nextFlashcard.cardCount} cards and takes ${nextFlashcard.duration} minutes.`);
      } else if (nextExam) {
        speakText(`You could take the ${nextExam.title} practice test. It has ${nextExam.questionCount} questions and takes ${nextExam.duration} minutes.`);
      } else {
        speakText("Congratulations! You've completed all your tasks for today. Great job!");
      }
    },
    'motivate me': () => {
      const motivationalMessages = [
        `You're doing great, ${userName}! Keep up the excellent work.`,
        `Remember, every small step counts toward your goals. You've got this!`,
        `Your consistency is impressive. Stay focused and success will follow.`,
        `Education is the most powerful weapon you can use to change the world. Keep learning!`,
        `The expert in anything was once a beginner. You're making progress every day.`
      ];
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      speakText(randomMessage);
    },
    'help': () => {
      const help = `I'm your today's plan assistant. I can help you with: "show progress" to see your completion status, "what tasks remaining" to list pending tasks, "check backlog" for overdue items, "time allocation" for today's schedule, "suggest next task" for recommendations, or "motivate me" for encouragement. What would you like to know?`;
      speakText(help);
    }
  };

  // Process voice commands
  useEffect(() => {
    if (transcript && settings.enabled) {
      const commandProcessed = processCommand(todaysPlanCommands, true);
      if (!commandProcessed) {
        // If no specific command matched, provide general help
        const response = `I heard "${transcript}". I can help you with your today's plan. Try saying "show progress", "what tasks remaining", "check backlog", "suggest next task", or "help" for more options.`;
        speakText(response);
      }
    }
  }, [transcript]);

  // Welcome message when component loads
  useEffect(() => {
    if (settings.enabled && !settings.muted && planData) {
      const completionPercentage = Math.round((planData.completedTasks / planData.totalTasks) * 100);
      const welcomeMessage = `Hi ${userName}! I'm your today's plan assistant. You've completed ${completionPercentage}% of your tasks today. I'm here to help you stay on track with your study plan. Just speak to me when you need guidance!`;
      setTimeout(() => speakText(welcomeMessage), 1000);
    }
  }, [planData]);

  if (!settings.enabled) return null;

  return (
    <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
            <Calendar className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          Today's Plan Assistant
          {(isListening || isSpeaking) && (
            <Badge variant="secondary" className={
              isListening ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }>
              {isListening ? "Listening..." : "Speaking..."}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {planData && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Progress: <span className="font-medium text-yellow-600 dark:text-yellow-400">
              {planData.completedTasks}/{planData.totalTasks} tasks
            </span>
            <br />
            Study Streak: <span className="font-medium text-orange-600">{planData.streak} days</span>
          </div>
        )}

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
          <p>• "Show progress" - Check completion status</p>
          <p>• "What tasks remaining" - List pending tasks</p>
          <p>• "Check backlog" - Review overdue items</p>
          <p>• "Suggest next task" - Get recommendations</p>
          <p>• "Time allocation" - See today's schedule</p>
          <p>• "Motivate me" - Get encouragement</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TodaysPlanVoiceAssistant;
