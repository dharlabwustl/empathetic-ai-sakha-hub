
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Speaker, Calculator, Zap, FlaskConical } from "lucide-react";
import useVoiceAnnouncer from "@/hooks/useVoiceAnnouncer";

interface FormulaPracticeVoiceAssistantProps {
  formulaData?: any;
  userName?: string;
  isEnabled?: boolean;
}

const FormulaPracticeVoiceAssistant: React.FC<FormulaPracticeVoiceAssistantProps> = ({
  formulaData,
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
    
    if (lowerCommand.includes('explain formula') || lowerCommand.includes('what does this formula mean')) {
      speakMessage("This formula shows the mathematical relationship between different variables. Each symbol represents a specific quantity that can be measured or calculated.");
      return;
    }
    
    if (lowerCommand.includes('memory technique') || lowerCommand.includes('how to remember')) {
      speakMessage("Try creating a memorable phrase using the first letters of each variable, or associate the formula with a real-world scenario you can visualize.");
      return;
    }
    
    if (lowerCommand.includes('units') || lowerCommand.includes('measurement')) {
      speakMessage("Always pay attention to units when using formulas. Make sure all variables have compatible units, and the result will have the correct derived units.");
      return;
    }
    
    if (lowerCommand.includes('derive') || lowerCommand.includes('derivation')) {
      speakMessage("Understanding how a formula is derived helps you remember it better. Try to trace back the mathematical steps from fundamental principles.");
      return;
    }
    
    if (lowerCommand.includes('practice') || lowerCommand.includes('solve problem')) {
      speakMessage("Great! Practice with different values. Start with simple numbers, then try more complex scenarios. This builds your confidence and understanding.");
      return;
    }
    
    if (lowerCommand.includes('confused') || lowerCommand.includes('difficult')) {
      speakMessage("Break the formula into parts. Identify what each variable represents, then practice substituting values step by step. Don't rush the process.");
      return;
    }
    
    // Default response
    speakMessage("I can help you understand formulas, provide memory techniques, explain derivations, or guide you through practice problems.");
  };
  
  const suggestions = [
    "Explain this formula",
    "Memory techniques",
    "Help me practice",
    "Show derivation",
    "This is confusing"
  ];
  
  if (!isVoiceSupported || !isEnabled) {
    return null;
  }
  
  return (
    <Card className={`${expanded ? 'w-80' : 'w-auto'} transition-all duration-300 border-orange-200 bg-orange-50`}>
      <CardHeader className="p-3 pb-0">
        <CardTitle className="text-sm flex justify-between items-center text-orange-800">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            <span>Formula Assistant</span>
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
                className={`${isListening ? 'bg-orange-500 hover:bg-orange-600' : 'border-orange-200'}`}
              >
                {isListening ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                {isListening ? 'Stop' : 'Start'} Listening
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleMute()}
                disabled={isSpeaking}
                className="border-orange-200"
              >
                <Speaker className="h-4 w-4 mr-2" />
                {voiceSettings.muted ? 'Unmute' : 'Mute'}
              </Button>
            </div>
            
            {transcript && (
              <div className="bg-orange-100 p-2 rounded-md text-sm">
                <p className="font-semibold text-orange-800">You said:</p>
                <p className="text-orange-700">{transcript}</p>
              </div>
            )}
            
            <div>
              <p className="text-xs text-orange-600 mb-2 flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Try saying:
              </p>
              <div className="grid grid-cols-1 gap-1">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <Button 
                    key={index} 
                    variant="ghost" 
                    size="sm"
                    className="h-auto py-1 px-2 text-xs justify-start font-normal text-left text-orange-700 hover:bg-orange-100"
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
              className="w-full text-orange-700 hover:bg-orange-100"
            >
              <FlaskConical className="h-4 w-4 mr-2" />
              Formula Help
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormulaPracticeVoiceAssistant;
