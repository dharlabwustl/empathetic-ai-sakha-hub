
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Calculator, Zap, BookOpen } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface FormulaPracticeVoiceAssistantProps {
  currentFormula?: string;
  subject?: string;
  userName?: string;
  isEnabled?: boolean;
}

const FormulaPracticeVoiceAssistant: React.FC<FormulaPracticeVoiceAssistantProps> = ({
  currentFormula = "Current Formula",
  subject = "Mathematics",
  userName = "Student",
  isEnabled = true
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const {
    voiceSettings,
    toggleMute,
    speakMessage,
    isVoiceSupported,
    isSpeaking,
    isListening,
    startListening,
    stopListening,
    transcript
  } = useVoiceAnnouncer({ userName });
  
  useEffect(() => {
    if (transcript) {
      processVoiceCommand(transcript);
    }
  }, [transcript]);
  
  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('explain formula') || lowerCommand.includes('what does it mean')) {
      speakMessage(`Let me explain ${currentFormula}: This formula represents the mathematical relationship between different variables. I'll break down each component and show you why it works this way.`);
      return;
    }
    
    if (lowerCommand.includes('memory trick') || lowerCommand.includes('how to remember')) {
      speakMessage(`Great memory techniques for ${currentFormula}: Create a memorable story, use acronyms, or visual associations. Think of real-world analogies that connect to this formula. Practice writing it from memory daily.`);
      return;
    }
    
    if (lowerCommand.includes('when to use') || lowerCommand.includes('application')) {
      speakMessage(`You'll use ${currentFormula} in problems involving specific scenarios. I'll help you recognize the key indicators in word problems that tell you this formula is needed. Look for these signal words and conditions.`);
      return;
    }
    
    if (lowerCommand.includes('practice') || lowerCommand.includes('example problem')) {
      speakMessage(`Let's practice with ${currentFormula}! I'll guide you through example problems step by step. Start by identifying what variables you know, then substitute values carefully into the formula.`);
      return;
    }
    
    if (lowerCommand.includes('derive') || lowerCommand.includes('where does it come from')) {
      speakMessage(`The derivation of ${currentFormula} comes from fundamental principles in ${subject}. Understanding how it's derived helps you remember it better and apply it correctly in different situations.`);
      return;
    }
    
    if (lowerCommand.includes('units') || lowerCommand.includes('dimensions')) {
      speakMessage(`Don't forget about units! Each variable in ${currentFormula} has specific units. Always check that your final answer has the correct units - it's a great way to verify your solution.`);
      return;
    }
    
    // Default response
    speakMessage(`I'm your formula practice assistant! I can help you understand ${currentFormula}, provide memory tricks, explain when to use it, and guide you through practice problems.`);
  };
  
  const suggestions = [
    "Explain this formula",
    "Memory tricks please",
    "When do I use this?",
    "Practice problems",
    "Help me remember"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-green-200 bg-green-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-green-800">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Formula Coach</span>
          </div>
          {expanded && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(false)}
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        {expanded ? (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Button 
                variant={isListening ? "default" : "outline"}
                size="sm" 
                onClick={isListening ? stopListening : startListening}
                className={`${isListening ? 'bg-green-500 hover:bg-green-600' : 'border-green-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="border-green-200"
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-green-100 p-2 rounded-md text-sm">
                <p className="font-semibold text-green-800">You said:</p>
                <p className="text-green-700">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-green-600 mb-2 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-green-700 hover:bg-green-100"
                    onClick={() => {
                      processVoiceCommand(suggestion);
                    }}
                  >
                    "{suggestion}"
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setExpanded(true)}
              className="w-full text-green-700 hover:bg-green-100"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Formula Helper
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormulaPracticeVoiceAssistant;
