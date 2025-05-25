
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2, VolumeX, Calculator } from 'lucide-react';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';
import { Badge } from '@/components/ui/badge';

interface FormulaPracticeVoiceAssistantProps {
  formulaName?: string;
  subject?: string;
  difficulty?: string;
  isEnabled?: boolean;
}

const FormulaPracticeVoiceAssistant: React.FC<FormulaPracticeVoiceAssistantProps> = ({
  formulaName = "Mathematical Formula",
  subject = "Mathematics",
  difficulty = "Medium",
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

  // Voice commands specific to formula practice
  const formulaCommands = {
    'explain formula': () => {
      const explanation = `Let me explain the ${formulaName} formula. This is a ${difficulty.toLowerCase()} level formula in ${subject}. The formula helps you calculate specific values by following a mathematical relationship between variables.`;
      speakText(explanation);
    },
    'break down formula': () => {
      const breakdown = `I'll break down ${formulaName} step by step. First, identify all the variables and their units. Second, understand what each variable represents. Third, see how they relate to each other. Fourth, practice substituting values.`;
      speakText(breakdown);
    },
    'memory tricks': () => {
      const tricks = `Here are memory tricks for ${formulaName}: Create a memorable phrase using the first letters of variables. Visualize the formula as a story. Connect it to real-world applications. Practice writing it multiple times. Use color coding for different parts.`;
      speakText(tricks);
    },
    'practice problems': () => {
      const response = `Let's practice with ${formulaName}. Start with simple values, then try more complex problems. Focus on understanding when and how to apply this formula. Would you like me to guide you through a sample problem?`;
      speakText(response);
    },
    'common mistakes': () => {
      const mistakes = `Common mistakes with ${formulaName}: Forgetting to check units, mixing up variable positions, calculation errors, not simplifying the final answer, and forgetting to apply the formula in the right context. Always double-check your work!`;
      speakText(mistakes);
    },
    'applications': () => {
      const applications = `${formulaName} is used in many real-world scenarios in ${subject}. Understanding these applications helps you remember when to use the formula and makes the concept more meaningful and easier to recall.`;
      speakText(applications);
    },
    'quick test': () => {
      const test = `Quick test time! Can you tell me what ${formulaName} is used for? What are the main variables? Think about it, then I'll give you feedback on your understanding.`;
      speakText(test);
    },
    'help': () => {
      const help = `I'm your formula practice assistant. I can explain formulas, break them down step-by-step, provide memory tricks, suggest practice problems, highlight common mistakes, show real-world applications, or give quick tests. What would you like to work on?`;
      speakText(help);
    }
  };

  // Process voice commands
  useEffect(() => {
    if (transcript && settings.enabled) {
      const commandProcessed = processCommand(formulaCommands, true);
      if (!commandProcessed) {
        // If no specific command matched, provide general help
        const response = `I heard "${transcript}". I can help you understand formulas, practice problems, or learn memory techniques. Try saying "explain formula", "memory tricks", "practice problems", or "common mistakes".`;
        speakText(response);
      }
    }
  }, [transcript]);

  // Welcome message when component loads
  useEffect(() => {
    if (settings.enabled && !settings.muted) {
      const welcomeMessage = `Hi! I'm your formula practice assistant. I'm here to help you master ${formulaName}. I can explain the formula, provide memory tricks, guide you through practice problems, and help you avoid common mistakes. Just speak to me when you need help!`;
      setTimeout(() => speakText(welcomeMessage), 1000);
    }
  }, [formulaName]);

  if (!settings.enabled) return null;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
            <Calculator className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          Formula Practice Assistant
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
          Practicing: <span className="font-medium text-green-600 dark:text-green-400">{formulaName}</span>
          <br />
          Subject: <span className="font-medium">{subject}</span>
          <br />
          Difficulty: <span className={`font-medium ${
            difficulty === 'Easy' ? 'text-green-600' :
            difficulty === 'Medium' ? 'text-yellow-600' :
            'text-red-600'
          }`}>{difficulty}</span>
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
          <p>• "Explain formula" - Get detailed explanation</p>
          <p>• "Break down formula" - Step-by-step breakdown</p>
          <p>• "Memory tricks" - Learn memorization techniques</p>
          <p>• "Practice problems" - Work through examples</p>
          <p>• "Common mistakes" - Avoid typical errors</p>
          <p>• "Applications" - See real-world uses</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FormulaPracticeVoiceAssistant;
