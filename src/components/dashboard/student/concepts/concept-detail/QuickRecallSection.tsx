
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, RefreshCw, CheckCircle2, XCircle, Mic, Send, StopCircle, Volume2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface QuickRecallSectionProps {
  conceptId: string;
  title: string;
  content: string;
  onQuizComplete: (score: number) => void;
}

const QuickRecallSection: React.FC<QuickRecallSectionProps> = ({
  conceptId,
  title,
  content,
  onQuizComplete
}) => {
  const [activeTab, setActiveTab] = useState<'write' | 'speak'>('write');
  const [userResponse, setUserResponse] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{
    score: number;
    feedback: string;
    keyPoints: {text: string; correct: boolean}[];
  } | null>(null);
  
  const keyPoints = [
    "Force is equal to mass times acceleration (F = ma)",
    "The direction of the force is the same as the direction of acceleration",
    "The SI unit of force is Newton (N)",
    "The greater the mass, the less acceleration for the same applied force",
    "Newton's Second Law is a vector equation"
  ];

  const handleStartRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          setIsRecording(true);
          toast({
            title: "Recording started",
            description: "Speak your understanding of the concept clearly.",
          });
          
          const timer = setInterval(() => {
            setRecordingTime(prev => {
              if (prev >= 60) {
                clearInterval(timer);
                handleStopRecording();
                return prev;
              }
              return prev + 1;
            });
          }, 1000);
        })
        .catch(error => {
          toast({
            title: "Microphone access denied",
            description: "Please allow microphone access to use the voice recording feature.",
            variant: "destructive"
          });
        });
    } else {
      toast({
        title: "Not supported",
        description: "Voice recording is not supported in your browser.",
        variant: "destructive"
      });
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setRecordingTime(0);
    
    setTimeout(() => {
      const simulatedText = `${title} describes how a force applied to an object causes it to accelerate. The formula is F equals m times a, where F is force, m is mass, and a is acceleration. The greater the force, the greater the acceleration, while the greater the mass, the less the acceleration.`;
      setUserResponse(simulatedText);
      
      toast({
        title: "Recording processed",
        description: "Your voice has been converted to text. Please review and submit.",
      });
    }, 1500);
  };

  const handleSubmit = () => {
    if (!userResponse.trim()) {
      toast({
        title: "Empty response",
        description: "Please write or record your understanding before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitted(true);
    
    const userResponseLower = userResponse.toLowerCase();
    
    const analyzedKeyPoints = keyPoints.map(point => {
      const keywordsInPoint = point.toLowerCase().split(' ');
      const matches = keywordsInPoint.filter(word => 
        word.length > 3 && userResponseLower.includes(word)
      );
      
      const matchRatio = matches.length / keywordsInPoint.filter(w => w.length > 3).length;
      return {
        text: point,
        correct: matchRatio > 0.5
      };
    });
    
    const correctPoints = analyzedKeyPoints.filter(p => p.correct).length;
    const score = Math.round((correctPoints / keyPoints.length) * 100);
    
    const feedbackMessage = 
      score >= 90 ? "Excellent understanding!" :
      score >= 70 ? "Good understanding, with some room for improvement." :
      score >= 50 ? "Basic understanding demonstrated, but several key concepts are missing." :
      "You should review this concept more thoroughly.";
    
    setFeedback({
      score,
      feedback: feedbackMessage,
      keyPoints: analyzedKeyPoints
    });
    
    if (onQuizComplete) {
      onQuizComplete(score);
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Your score is ${score} percent. ${feedbackMessage}`);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleReset = () => {
    setUserResponse('');
    setIsSubmitted(false);
    setFeedback(null);
  };

  const playInstructions = () => {
    const instructions = `Welcome to the Quick Recall Test for ${title}. You can either write your understanding in the text box or record your voice explanation. Try to explain the concept as thoroughly as you can.`;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(instructions);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Quick Recall Test
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={playInstructions}
            className="flex items-center gap-2"
          >
            <Volume2 className="h-4 w-4" />
            Instructions
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Challenge:</strong> Explain everything you know about "{title}" in your own words. 
                The system will analyze your response and provide feedback on your understanding.
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'write' | 'speak')} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="write" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Write Response
                </TabsTrigger>
                <TabsTrigger value="speak" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Speak Response
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="write" className="space-y-4">
                <Textarea 
                  placeholder={`Write everything you know about ${title}...`}
                  className="min-h-[200px] text-base"
                  value={userResponse}
                  onChange={(e) => setUserResponse(e.target.value)}
                />
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>💡 <strong>Tip:</strong> Include formulas, definitions, applications, and examples if you know them.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="speak" className="space-y-4">
                <div className="flex flex-col items-center justify-center p-6 border rounded-lg bg-muted/20">
                  {isRecording ? (
                    <div className="space-y-4 w-full">
                      <div className="flex items-center justify-center">
                        <div className="relative w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                          <Mic className="h-10 w-10 text-red-600 animate-pulse" />
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" stroke="currentColor" 
                              className="text-red-600 dark:text-red-500" 
                              strokeWidth="4"
                              strokeDasharray="283"
                              strokeDashoffset={283 - ((recordingTime / 60) * 283)}
                              style={{ transition: "stroke-dashoffset 1s linear" }}
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Recording... {recordingTime}s</p>
                        <p className="text-xs text-muted-foreground">Max 60 seconds</p>
                      </div>
                      <Button 
                        variant="destructive" 
                        className="w-full" 
                        onClick={handleStopRecording}
                      >
                        <StopCircle className="mr-2 h-4 w-4" />
                        Stop Recording
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 w-full">
                      {userResponse ? (
                        <div className="space-y-4">
                          <div className="p-4 bg-card border rounded-lg">
                            <p className="text-sm">{userResponse}</p>
                          </div>
                          <div className="flex justify-between">
                            <Button 
                              variant="outline" 
                              onClick={() => setUserResponse('')}
                            >
                              Clear
                            </Button>
                            <Button 
                              variant="default" 
                              onClick={handleStartRecording}
                            >
                              <Mic className="mr-2 h-4 w-4" />
                              Record Again
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center space-y-4">
                          <Mic className="h-12 w-12 text-muted-foreground mx-auto" />
                          <div>
                            <h4 className="text-lg font-medium">Record Your Understanding</h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              Speak clearly about what you know about {title}
                            </p>
                            <Button onClick={handleStartRecording}>
                              <Mic className="mr-2 h-4 w-4" />
                              Start Recording
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end pt-4">
              <Button 
                disabled={!userResponse.trim()} 
                onClick={handleSubmit} 
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
                Submit & Get Feedback
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className={`text-3xl font-bold ${
                feedback?.score && feedback.score >= 70 
                  ? 'text-green-600 dark:text-green-400'
                  : feedback?.score && feedback.score >= 50
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-red-600 dark:text-red-400'
              }`}>
                {feedback?.score}%
              </div>
              <Progress 
                value={feedback?.score || 0} 
                className="h-3 w-full max-w-md"
              />
              <p className="text-sm font-medium mt-1 text-center">{feedback?.feedback}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Your Response:</h4>
              <div className="p-4 bg-muted/30 rounded-lg max-h-32 overflow-y-auto">
                <p className="text-sm">{userResponse}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Key Concepts Analysis:</h4>
              <div className="space-y-2">
                {feedback?.keyPoints.map((point, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg flex items-start gap-2 ${
                      point.correct 
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/50'
                        : 'bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50'
                    }`}
                  >
                    {point.correct ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm">{point.text}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                variant="outline" 
                onClick={handleReset}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                Continue Learning
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickRecallSection;
