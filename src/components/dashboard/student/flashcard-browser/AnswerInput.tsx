
import React from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Mic } from 'lucide-react';

interface AnswerInputProps {
  userAnswer: string;
  isRecording: boolean;
  onAnswerChange: (value: string) => void;
  onSpeechToText: () => void;
  onSubmit: () => void;
}

const AnswerInput = ({ 
  userAnswer, 
  isRecording, 
  onAnswerChange,
  onSpeechToText,
  onSubmit 
}: AnswerInputProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Your Answer</label>
        <Button
          variant={isRecording ? "destructive" : "outline"}
          size="sm"
          onClick={onSpeechToText}
          className="flex items-center gap-2"
        >
          <Mic className="h-4 w-4" />
          {isRecording ? "Recording..." : "Voice Input"}
        </Button>
      </div>
      <Textarea
        value={userAnswer}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type your answer here..."
        className="min-h-[100px]"
        disabled={isRecording}
      />
      <Button 
        className="w-full"
        onClick={onSubmit}
        disabled={!userAnswer.trim()}
      >
        <Check className="mr-2 h-4 w-4" />
        Submit Answer
      </Button>
    </div>
  );
};

export default AnswerInput;
