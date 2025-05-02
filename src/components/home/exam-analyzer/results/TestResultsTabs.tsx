
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TestResults, UserAnswer } from '../types';
import { BarChart3, Lightbulb, Zap, FileText } from 'lucide-react';
import ResultsOverview from './ResultsOverview';
import DetailedAnalysis from './DetailedAnalysis';
import RecommendedActions from './RecommendedActions';

interface TestResultsTabsProps {
  results: TestResults;
  selectedExam: string;
  testType: string;
  userAnswers: UserAnswer[];
}

const TestResultsTabs: React.FC<TestResultsTabsProps> = ({ 
  results, 
  selectedExam,
  testType,
  userAnswers 
}) => {
  // Determine if we should show specific scoring info based on exam type
  const showScoringInfo = selectedExam === 'neet' || selectedExam === 'jee';
  
  const getScoringInfoByExam = () => {
    switch (selectedExam) {
      case 'neet':
        return (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4 text-xs">
            <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">NEET Scoring System:</h4>
            <ul className="text-blue-600 dark:text-blue-300 space-y-1">
              <li>• +4 marks for each correct answer</li>
              <li>• -1 mark for each incorrect answer</li>
              <li>• No marks for unattempted questions</li>
              <li>• Time: ~1.06 minutes per question (180 questions in 3 hours)</li>
            </ul>
          </div>
        );
      case 'jee':
        return (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4 text-xs">
            <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-1">JEE Scoring System:</h4>
            <ul className="text-blue-600 dark:text-blue-300 space-y-1">
              <li>• +4 marks for each correct MCQ</li>
              <li>• -1 mark for each incorrect MCQ</li>
              <li>• No negative marking for numerical value questions</li>
              <li>• Time: ~1.8 minutes per question (90 questions in 3 hours)</li>
            </ul>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-3 h-auto p-1">
        <TabsTrigger value="overview" className="py-1.5 text-xs sm:text-sm">
          <BarChart3 className="h-3.5 w-3.5 mr-1.5" />
          <span>Overview</span>
        </TabsTrigger>
        <TabsTrigger value="detailed" className="py-1.5 text-xs sm:text-sm">
          <Zap className="h-3.5 w-3.5 mr-1.5" />
          <span>Details</span>
        </TabsTrigger>
        <TabsTrigger value="recommendations" className="py-1.5 text-xs sm:text-sm">
          <Lightbulb className="h-3.5 w-3.5 mr-1.5" />
          <span>Recommendations</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="pt-4 mt-0">
        {showScoringInfo && getScoringInfoByExam()}
        <ResultsOverview 
          results={results} 
          selectedExam={selectedExam} 
          testType={testType} 
        />
      </TabsContent>
      
      <TabsContent value="detailed" className="pt-4 mt-0">
        <DetailedAnalysis 
          results={results} 
          selectedExam={selectedExam}
          testType={testType}
          userAnswers={userAnswers}
        />
      </TabsContent>
      
      <TabsContent value="recommendations" className="pt-4 mt-0">
        <RecommendedActions 
          results={results}
          selectedExam={selectedExam}
        />
      </TabsContent>
    </Tabs>
  );
};

export default TestResultsTabs;
