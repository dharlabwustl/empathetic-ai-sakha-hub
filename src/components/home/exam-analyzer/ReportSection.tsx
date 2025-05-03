
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExamResults } from './types';
import { Card } from "@/components/ui/card";
import { CheckCircle, FileText, BookOpen, Download, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ReportSectionProps {
  results: ExamResults;
  onClose: () => void;
  selectedExam: string;
  examDetails?: {
    scoringPattern: string;
    timePerQuestion: string;
    totalTime: string;
    totalQuestions: string;
  };
}

const ReportSection: React.FC<ReportSectionProps> = ({
  results,
  onClose,
  selectedExam,
  examDetails
}) => {
  const navigate = useNavigate();
  
  const { readiness, concept, overall } = results;
  
  const handleSignUp = () => {
    // Close the dialog first
    onClose();
    // Navigate to signup
    navigate('/signup');
  };
  
  if (!overall) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Not all tests have been completed yet.</p>
        <Button onClick={onClose} className="mt-4">Return to beginning</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold mb-2">Your {selectedExam} Readiness Report</h2>
        <p className="text-muted-foreground">
          Based on your performance, we've created a comprehensive analysis
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl shadow-inner">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
              Overall Readiness Score
            </h3>
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-1">
              {overall.score}%
            </div>
            <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
              {overall.level} Level
            </p>
          </div>
          
          <div className="flex-1">
            <h3 className="text-md font-medium mb-2">Assessment Results</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center">
                  <BookOpen className="h-4 w-4 mr-1 text-violet-500" />
                  Readiness Assessment
                </span>
                <span className="font-medium">{readiness?.score || 0}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center">
                  <FileText className="h-4 w-4 mr-1 text-pink-500" />
                  Concept Mastery
                </span>
                <span className="font-medium">{concept?.score || 0}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Analysis</h3>
          <p className="text-sm bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
            {overall.analysis}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 bg-white dark:bg-gray-800 shadow-sm">
            <h4 className="text-sm font-medium mb-2 text-green-600 dark:text-green-500">Your Strengths</h4>
            <ul className="space-y-2">
              {overall.strengths.map((strength, index) => (
                <li key={`strength-${index}`} className="text-sm flex">
                  <span className="text-green-600 dark:text-green-500 mr-2">✓</span>
                  {strength}
                </li>
              ))}
            </ul>
          </Card>
          
          <Card className="p-4 bg-white dark:bg-gray-800 shadow-sm">
            <h4 className="text-sm font-medium mb-2 text-amber-600 dark:text-amber-500">Areas for Improvement</h4>
            <ul className="space-y-2">
              {overall.improvements.map((improvement, index) => (
                <li key={`improvement-${index}`} className="text-sm flex">
                  <span className="text-amber-600 dark:text-amber-500 mr-2">→</span>
                  {improvement}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-3">Recommended Next Steps</h3>
        <p className="mb-4 text-sm">
          Based on your assessment, we recommend creating a personalized study plan to improve your {selectedExam} preparation
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-violet-300 dark:border-violet-800"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          
          <Button
            onClick={handleSignUp}
            size="lg"
            className="bg-gradient-to-r from-violet-600 to-purple-600 shadow-md flex items-center gap-2"
          >
            <span>Create Your Personalized Study Plan</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportSection;
