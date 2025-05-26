
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Mic, MicOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVoiceAssistant } from '@/hooks/useVoiceAssistant';

interface ConceptVoiceAssistantProps {
  conceptName: string;
  onClose?: () => void;
}

const ConceptVoiceAssistant: React.FC<ConceptVoiceAssistantProps> = ({
  conceptName,
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    isListening,
    isSpeaking,
    transcript,
    confidence,
    speakText,
    startListening,
    stopListening,
    processCommand
  } = useVoiceAssistant({
    userName: 'Student'
  });

  const handleVoiceCommand = () => {
    if (transcript && confidence > 0.6) {
      const commands = {
        'explain': () => {
          speakText(`Let me explain ${conceptName}. This concept involves understanding the fundamental principles and their applications. Would you like me to break it down into simpler parts?`);
        },
        'example': () => {
          speakText(`Here's an example for ${conceptName}. Let me provide a practical scenario that demonstrates this concept clearly.`);
        },
        'quiz': () => {
          speakText(`Let's test your understanding of ${conceptName}. I'll ask you a few questions to check your comprehension.`);
        },
        'help': () => {
          speakText(`I can help you with ${conceptName} by explaining concepts, providing examples, creating quizzes, or clarifying doubts. What would you like to focus on?`);
        },
        'close': () => {
          setIsOpen(false);
          if (onClose) onClose();
        }
      };

      processCommand(commands);
    }
  };

  React.useEffect(() => {
    handleVoiceCommand();
  }, [transcript, confidence]);

  return (
    <>
      {/* Voice Assistant Toggle */}
      <div className="flex gap-2">
        <Button
          onClick={() => setIsOpen(true)}
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
        >
          <Volume2 className="h-4 w-4 mr-2" />
          Study Assistant
        </Button>
        
        <Button
          onClick={isListening ? stopListening : startListening}
          size="sm"
          variant="outline"
          className={`${
            isListening 
              ? 'bg-orange-500 text-white border-orange-500 animate-pulse' 
              : 'bg-orange-50 text-orange-600 border-orange-200'
          }`}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
      </div>

      {/* Voice Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-4 right-4 z-50"
          >
            <Card className="w-80 bg-white/95 backdrop-blur-sm border-purple-200 shadow-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="font-semibold text-purple-800">Study Assistant</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="text-sm text-gray-600">
                    Studying: <span className="font-medium text-gray-900">{conceptName}</span>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    {isSpeaking && (
                      <div className="text-blue-600 font-medium text-sm">🗣️ Explaining concept...</div>
                    )}
                    {isListening && (
                      <div className="text-green-600 font-medium text-sm">🎤 Listening to your question...</div>
                    )}
                    {!isSpeaking && !isListening && (
                      <div className="text-gray-600 text-sm">Ready to help with your studies!</div>
                    )}
                  </div>

                  {/* Transcript */}
                  {transcript && (
                    <div className="bg-gray-100 p-3 rounded text-sm">
                      <strong>You asked:</strong> {transcript}
                      {confidence > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Confidence: {Math.round(confidence * 100)}%
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <div className="text-xs text-gray-600 mb-2">Try saying:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => speakText(`Let me explain ${conceptName} in detail with examples and applications.`)}
                      >
                        "Explain this"
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => speakText(`Here's a practical example of ${conceptName} that you can relate to.`)}
                      >
                        "Give example"
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => speakText(`Let's test your knowledge of ${conceptName} with a quick quiz.`)}
                      >
                        "Quiz me"
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-xs"
                        onClick={() => speakText(`I'm here to help you understand ${conceptName}. Ask me anything!`)}
                      >
                        "Help"
                      </Button>
                    </div>
                  </div>

                  {/* Voice Control */}
                  <div className="flex justify-center">
                    <Button
                      onClick={isListening ? stopListening : startListening}
                      variant={isListening ? "destructive" : "default"}
                      size="sm"
                      className="w-full"
                    >
                      {isListening ? (
                        <>
                          <MicOff className="h-4 w-4 mr-2" />
                          Stop Listening
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4 mr-2" />
                          Start Listening
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConceptVoiceAssistant;
