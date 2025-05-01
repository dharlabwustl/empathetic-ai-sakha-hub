
import { Button } from "@/components/ui/button";
import { CheckCircle, Book, Brain, Download, Lightbulb, ArrowRight, GraduationCap } from "lucide-react";
import { ExamResults } from "./types";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { RadialProgress } from "@/components/ui/radial-progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface ReportSectionProps {
  results: ExamResults;
  selectedExam: string;
  onStartOver: () => void;
}

const ReportSection = ({ results, selectedExam, onStartOver }: ReportSectionProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  
  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-indigo-100 dark:border-indigo-800/40 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex flex-col items-center justify-center text-center">
            <GraduationCap size={isMobile ? 40 : 48} className="mb-3" />
            <h2 className="text-xl md:text-2xl font-bold mb-1">Your NEET Exam Readiness Analysis</h2>
            <p className="text-indigo-100 max-w-lg">
              Based on your readiness assessment and concept mastery test, here's your personalized analysis
            </p>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/50"
            >
              <h3 className="text-center text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Overall Readiness</h3>
              <div className="flex items-center justify-center">
                <RadialProgress 
                  value={results.overall.score} 
                  size={isMobile ? 120 : 140} 
                  thickness={10}
                  color={results.overall.score >= 70 ? 'bg-green-500' : results.overall.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}
                >
                  <span className="text-2xl md:text-3xl font-bold">
                    {results.overall.score}%
                  </span>
                </RadialProgress>
              </div>
              <p className="text-center text-xs md:text-sm mt-3 text-blue-700 dark:text-blue-400">
                {results.overall.level}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-violet-200 dark:border-violet-800/50"
            >
              <h3 className="text-center text-sm font-medium text-violet-800 dark:text-violet-300 mb-2">Preparation Level</h3>
              <div className="flex items-center justify-center">
                <RadialProgress 
                  value={results.readiness.score} 
                  size={isMobile ? 120 : 140} 
                  thickness={10}
                  color="bg-violet-500"
                >
                  <span className="text-2xl md:text-3xl font-bold text-violet-700 dark:text-violet-300">
                    {results.readiness.score}%
                  </span>
                </RadialProgress>
              </div>
              <p className="text-center text-xs md:text-sm mt-3 text-violet-700 dark:text-violet-400">
                {results.readiness.level}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-4 rounded-xl border border-pink-200 dark:border-pink-800/50"
            >
              <h3 className="text-center text-sm font-medium text-pink-800 dark:text-pink-300 mb-2">Concept Mastery</h3>
              <div className="flex items-center justify-center">
                <RadialProgress 
                  value={results.concept.score} 
                  size={isMobile ? 120 : 140} 
                  thickness={10}
                  color="bg-pink-500"
                >
                  <span className="text-2xl md:text-3xl font-bold text-pink-700 dark:text-pink-300">
                    {results.concept.score}%
                  </span>
                </RadialProgress>
              </div>
              <p className="text-center text-xs md:text-sm mt-3 text-pink-700 dark:text-pink-400">
                {results.concept.level}
              </p>
            </motion.div>
          </div>
          
          <Tabs defaultValue="summary">
            <TabsList className="w-full">
              <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
              <TabsTrigger value="strengths" className="flex-1">Strengths</TabsTrigger>
              <TabsTrigger value="improvements" className="flex-1">Improvements</TabsTrigger>
            </TabsList>
            
            <TabsContent value="summary" className="pt-4">
              <p className="text-sm mb-4">{results.overall.analysis}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800/40">
                  <h4 className="flex items-center text-sm font-medium text-green-800 dark:text-green-300 mb-2">
                    <CheckCircle size={16} className="mr-2" />
                    Your Strengths
                  </h4>
                  <ul className="list-disc list-inside text-xs space-y-1 text-green-800/80 dark:text-green-300/80">
                    {results.overall.strengths.slice(0, 3).map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/40">
                  <h4 className="flex items-center text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">
                    <Lightbulb size={16} className="mr-2" />
                    Areas to Improve
                  </h4>
                  <ul className="list-disc list-inside text-xs space-y-1 text-amber-800/80 dark:text-amber-300/80">
                    {results.overall.improvements.slice(0, 3).map((improvement, i) => (
                      <li key={i}>{improvement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="strengths" className="pt-4">
              <p className="text-sm mb-3">Your test results show these areas of strength:</p>
              <ul className="list-disc list-inside text-sm space-y-2">
                {results.overall.strengths.map((strength, i) => (
                  <li key={i}>{strength}</li>
                ))}
                {results.readiness.strengths.slice(0, 2).map((strength, i) => (
                  <li key={`r-${i}`}>{strength}</li>
                ))}
                {results.concept.strengths.slice(0, 2).map((strength, i) => (
                  <li key={`c-${i}`}>{strength}</li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="improvements" className="pt-4">
              <p className="text-sm mb-3">Focus on these areas to improve your NEET readiness:</p>
              <ul className="list-disc list-inside text-sm space-y-2">
                {results.overall.improvements.map((improvement, i) => (
                  <li key={i}>{improvement}</li>
                ))}
                {results.readiness.improvements.slice(0, 2).map((improvement, i) => (
                  <li key={`r-${i}`}>{improvement}</li>
                ))}
                {results.concept.improvements.slice(0, 2).map((improvement, i) => (
                  <li key={`c-${i}`}>{improvement}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              onClick={handleSignUp}
            >
              <span>Create Free Account to Get Full Plan</span>
              <ArrowRight size={16} />
            </Button>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={onStartOver}
            >
              <span>Start Over</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSection;
