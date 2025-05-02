
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Clock, Brain, Target } from "lucide-react";
import { getExamDetailsForInstructions } from '../testDataService';

interface TestInstructionsProps {
  testType: string;
  selectedExam: string;
}

const TestInstructions: React.FC<TestInstructionsProps> = ({ testType, selectedExam }) => {
  const examDetails = getExamDetailsForInstructions(selectedExam);
  
  const getTestTypeSpecificInstructions = () => {
    switch (testType) {
      case 'readiness':
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is a self-assessment survey to gauge your current preparation level.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>Answer honestly to get the most accurate assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>There are no right or wrong answers</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>Consider your overall preparation journey so far</span>
              </li>
            </ul>
          </div>
        );
      
      case 'concept':
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This is a quick knowledge check on key concepts for your exam.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <Brain className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>Questions cover important concepts from your syllabus</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>Answer within the time limit for each question</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>After each question, you'll see explanations to help you learn</span>
              </li>
            </ul>
          </div>
        );
      
      case 'stress':
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              This test simulates exam conditions to assess your performance under pressure.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>Strict time limits simulate real exam pressure</span>
              </li>
              <li className="flex items-start gap-2">
                <Brain className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>Questions increase in difficulty and complexity</span>
              </li>
              <li className="flex items-start gap-2">
                <Target className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>Focus on accuracy while managing your time</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-blue-500" />
                <span>Some questions require quick recall without overthinking</span>
              </li>
            </ul>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-base font-medium">Instructions</h3>
        {getTestTypeSpecificInstructions()}
      </div>
      
      {examDetails && (
        <Card className="border-blue-100 dark:border-blue-900/50">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                {selectedExam.toUpperCase()} Exam Details
              </Badge>
            </h4>
            <div className="text-xs space-y-1 text-muted-foreground whitespace-pre-line">
              {examDetails}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TestInstructions;
