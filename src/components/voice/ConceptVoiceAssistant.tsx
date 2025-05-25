
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Settings } from 'lucide-react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { Badge } from '@/components/ui/badge';

interface ConceptVoiceAssistantProps {
  conceptName: string;
  conceptSubject?: string;
  conceptTopic?: string;
  isEnabled?: boolean;
}

const ConceptVoiceAssistant: React.FC<ConceptVoiceAssistantProps> = ({
  conceptName,
  conceptSubject,
  conceptTopic,
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
    userName: 'student',
    initialSettings: { enabled: isEnabled }
  });

  // Voice commands specific to concept learning
  const conceptCommands = {
    'explain concept': () => {
      const explanation = `Let me explain ${conceptName}. This concept is part of ${conceptSubject || 'your subject'} and focuses on ${conceptTopic || 'important fundamentals'}. Would you like me to break it down step by step?`;
      speakText(explanation);
    },
    'give example': () => {
      const example = `Here's a practical example for ${conceptName}. This concept is commonly applied in real-world scenarios. Let me walk you through a specific case.`;
      speakText(example);
    },
    'study tips': () => {
      const tips = `Here are some effective study tips for ${conceptName}: First, create visual diagrams to understand the concept better. Second, practice with related problems daily. Third, connect this concept to real-world applications. Fourth, teach it to someone else to reinforce your understanding.`;
      speakText(tips);
    },
    'memory techniques': () => {
      const techniques = `To memorize ${conceptName} effectively, try these techniques: Use acronyms or mnemonics, create mental associations, practice spaced repetition, and draw concept maps. Visual learners should create diagrams, while auditory learners should explain concepts aloud.`;
      speakText(techniques);
    },
    'practice problems': () => {
      const response = `I can help you find practice problems for ${conceptName}. Focus on problems that test your understanding of the core principles. Start with basic problems and gradually move to more complex applications.`;
      speakText(response);
    },
    'quick quiz': () => {
      const quiz = `Let's do a quick quiz on ${conceptName}. Think about the main principles and how they apply. What is the most important aspect of this concept that you should remember?`;
      speakText(quiz);
    },
    'help': () => {
      const help = `I'm your concept learning assistant. I can explain concepts, provide examples, give study tips, suggest memory techniques, recommend practice problems, or create quick quizzes. Just say what you need help with!`;
      speakText(help);
    }
  };

  // Process voice commands
  useEffect(() => {
    if (transcript && settings.enabled) {
      const commandProcessed = processCommand(conceptCommands, true);
      if (!commandProcessed) {
        // If no specific command matched, provide general help
        const response = `I heard "${transcript}". I can help you with explaining concepts, providing examples, study tips, memory techniques, practice problems, or quick quizzes. What would you like to explore?`;
        speakText(response);
      }
    }
  }, [transcript]);

  // Welcome message when component loads
  useEffect(() => {
    if (settings.enabled && !settings.muted) {
      const welcomeMessage = `Hi! I'm your concept learning assistant. I'm here to help you master ${conceptName}. I can explain concepts, provide examples, give study tips, and suggest memory techniques. Just speak to me when you need help!`;
      setTimeout(() => speakText(welcomeMessage), 1000);
    }
  }, [conceptName]);

  if (!settings.enabled) return null;

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
            <Mic className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          Concept Voice Assistant
          {(isListening || isSpeaking) && (
            <Badge variant="secondary" className={
              isListening ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            }>
              {isListening ? "Listening..." : "Speaking..."}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Learning: <span className="font-medium text-blue-600 dark:text-blue-400">{conceptName}</span>
          {conceptSubject && (
            <>
              <br />Subject: <span className="font-medium">{conceptSubject}</span>
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
          <p>• "Explain concept" - Get detailed explanation</p>
          <p>• "Give example" - See practical examples</p>
          <p>• "Study tips" - Get learning strategies</p>
          <p>• "Memory techniques" - Learn memorization tricks</p>
          <p>• "Practice problems" - Find practice exercises</p>
          <p>• "Quick quiz" - Test your knowledge</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptVoiceAssistant;
