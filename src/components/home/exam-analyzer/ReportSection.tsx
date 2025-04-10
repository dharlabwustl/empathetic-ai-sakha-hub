
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomProgress } from '@/components/ui/custom-progress';
import { Check, AlertTriangle, ArrowRight, Clock, Target, Brain, ChevronLeft } from 'lucide-react';
import { ExamResults, ExamType } from './types';

interface ReportSectionProps {
  results: ExamResults;
  selectedExam: string;
  examTypes: ExamType[];
  onStartOver: () => void;
}

const ReportSection: React.FC<ReportSectionProps> = ({
  results,
  selectedExam,
  examTypes,
  onStartOver
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Your Comprehensive Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Based on your performance across all three tests for {examTypes.find(e => e.value === selectedExam)?.label} preparation
        </p>
      </div>
      
      <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 p-4 rounded-lg border-2 border-blue-100 dark:border-violet-800">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Overall Readiness Score:</h4>
          <span className="text-lg font-bold">{results.overall.score}%</span>
        </div>
        <CustomProgress value={results.overall.score} className="h-3 my-3 bg-white/50 dark:bg-gray-700/50" indicatorClassName="bg-gradient-to-r from-sky-400 to-violet-600" />
        <p className="text-sm font-medium">{results.overall.analysis}</p>
      </div>
      
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="stress">Stress</TabsTrigger>
          <TabsTrigger value="readiness">Readiness</TabsTrigger>
          <TabsTrigger value="concept">Concept</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border-2 border-green-100 dark:border-green-800">
              <h5 className="font-medium flex items-center text-sm mb-2">
                <Check size={16} className="mr-1 text-green-500" />
                Key Strengths
              </h5>
              <ul className="space-y-1">
                {results.overall.strengths.map((strength, i) => (
                  <li key={i} className="text-sm flex items-start gap-1">
                    <span className="text-green-500 text-xs mt-0.5">●</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border-2 border-amber-100 dark:border-amber-800">
              <h5 className="font-medium flex items-center text-sm mb-2">
                <AlertTriangle size={16} className="mr-1 text-amber-500" />
                Areas to Improve
              </h5>
              <ul className="space-y-1">
                {results.overall.improvements.map((improvement, i) => (
                  <li key={i} className="text-sm flex items-start gap-1">
                    <span className="text-amber-500 text-xs mt-0.5">●</span>
                    <span>{improvement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-sky-500 to-violet-500 text-white p-4 rounded-lg shadow-lg">
            <h5 className="font-medium mb-2">Get Your Detailed Improvement Plan</h5>
            <p className="text-sm text-white/90 mb-4">Sign up to receive a personalized study schedule and resources tailored to your needs.</p>
            <Button 
              className="bg-white text-violet-700 hover:bg-white/90 hover:text-violet-800 w-full shadow-md hover:shadow-lg"
              onClick={() => navigate('/signup')}
            >
              Create Free Account <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="stress" className="pt-4">
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-2 border-blue-100 dark:border-blue-800">
              <h5 className="font-medium mb-2 flex items-center">
                <Clock size={18} className="mr-2 text-blue-500" />
                Stress Level Performance
              </h5>
              <div className="flex justify-between items-center mt-3">
                <span>Your Score:</span>
                <span className="font-bold">{results.stress.score}%</span>
              </div>
              <CustomProgress value={results.stress.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600" />
              <p className="text-sm mt-2">{results.stress.analysis}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <h5 className="font-medium flex items-center text-sm mb-2">
                  <Check size={16} className="mr-1 text-green-500" />
                  Strengths
                </h5>
                <ul className="space-y-1">
                  {results.stress.strengths.map((strength, i) => (
                    <li key={i} className="text-sm flex items-start gap-1">
                      <span className="text-green-500 text-xs mt-0.5">●</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                <h5 className="font-medium flex items-center text-sm mb-2">
                  <AlertTriangle size={16} className="mr-1 text-amber-500" />
                  To Improve
                </h5>
                <ul className="space-y-1">
                  {results.stress.improvements.map((improvement, i) => (
                    <li key={i} className="text-sm flex items-start gap-1">
                      <span className="text-amber-500 text-xs mt-0.5">●</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="readiness" className="pt-4">
          <div className="space-y-4">
            <div className="bg-violet-50 dark:bg-violet-900/20 p-4 rounded-lg border-2 border-violet-100 dark:border-violet-800">
              <h5 className="font-medium mb-2 flex items-center">
                <Target size={18} className="mr-2 text-violet-500" />
                Exam Readiness
              </h5>
              <div className="flex justify-between items-center mt-3">
                <span>Your Score:</span>
                <span className="font-bold">{results.readiness.score}%</span>
              </div>
              <CustomProgress value={results.readiness.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-violet-400 to-violet-600" />
              <p className="text-sm mt-2">{results.readiness.analysis}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <h5 className="font-medium flex items-center text-sm mb-2">
                  <Check size={16} className="mr-1 text-green-500" />
                  Strengths
                </h5>
                <ul className="space-y-1">
                  {results.readiness.strengths.map((strength, i) => (
                    <li key={i} className="text-sm flex items-start gap-1">
                      <span className="text-green-500 text-xs mt-0.5">●</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                <h5 className="font-medium flex items-center text-sm mb-2">
                  <AlertTriangle size={16} className="mr-1 text-amber-500" />
                  To Improve
                </h5>
                <ul className="space-y-1">
                  {results.readiness.improvements.map((improvement, i) => (
                    <li key={i} className="text-sm flex items-start gap-1">
                      <span className="text-amber-500 text-xs mt-0.5">●</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="concept" className="pt-4">
          <div className="space-y-4">
            <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border-2 border-pink-100 dark:border-pink-800">
              <h5 className="font-medium mb-2 flex items-center">
                <Brain size={18} className="mr-2 text-pink-500" />
                Concept Mastery
              </h5>
              <div className="flex justify-between items-center mt-3">
                <span>Your Score:</span>
                <span className="font-bold">{results.concept.score}%</span>
              </div>
              <CustomProgress value={results.concept.score} className="h-2 my-2" indicatorClassName="bg-gradient-to-r from-pink-400 to-pink-600" />
              <p className="text-sm mt-2">{results.concept.analysis}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-100 dark:border-green-800">
                <h5 className="font-medium flex items-center text-sm mb-2">
                  <Check size={16} className="mr-1 text-green-500" />
                  Strengths
                </h5>
                <ul className="space-y-1">
                  {results.concept.strengths.map((strength, i) => (
                    <li key={i} className="text-sm flex items-start gap-1">
                      <span className="text-green-500 text-xs mt-0.5">●</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-100 dark:border-amber-800">
                <h5 className="font-medium flex items-center text-sm mb-2">
                  <AlertTriangle size={16} className="mr-1 text-amber-500" />
                  To Improve
                </h5>
                <ul className="space-y-1">
                  {results.concept.improvements.map((improvement, i) => (
                    <li key={i} className="text-sm flex items-start gap-1">
                      <span className="text-amber-500 text-xs mt-0.5">●</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={onStartOver}
          className="flex items-center gap-2 border-2 border-gray-200 dark:border-gray-700"
        >
          <ChevronLeft size={16} />
          <span>Start Over</span>
        </Button>
        
        <Button 
          onClick={() => navigate('/signup')}
          className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Sign Up for Full Plan
        </Button>
      </div>
    </div>
  );
};

export default ReportSection;
