
import React, { useState } from 'react';
import { ExamType } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Calculator, CheckCircle, ArrowRight, Trophy, Gift } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Card, CardContent } from "@/components/ui/card";

interface IntroSectionProps {
  selectedExam: string;
  setSelectedExam: (exam: string) => void;
  examTypes: ExamType[];
  onStartTest: () => void;
}

const IntroSection: React.FC<IntroSectionProps> = ({ 
  selectedExam, 
  setSelectedExam, 
  examTypes,
  onStartTest 
}) => {
  const isMobile = useIsMobile();
  const [testType, setTestType] = useState<'readiness' | 'scholarship'>('readiness');
  
  // Default to NEET since it's the only option now
  React.useEffect(() => {
    if (examTypes.length > 0 && !selectedExam) {
      setSelectedExam(examTypes[0].value);
    }
  }, [examTypes, selectedExam, setSelectedExam]);

  const handleStartTest = () => {
    // Store test type in localStorage or pass it through props
    localStorage.setItem('testType', testType);
    onStartTest();
  };
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-full mb-3">
            <GraduationCap size={isMobile ? 24 : 30} className="text-violet-600 dark:text-violet-400" />
          </div>
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent`}>
            NEET Exam Readiness & Scholar Test
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-md mx-auto text-sm sm:text-base">
            Choose between a readiness assessment or take our scholarship test to earn 1 month free access!
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        {/* Readiness Test Option */}
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
            testType === 'readiness' 
              ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' 
              : 'border-gray-200 dark:border-gray-700'
          }`}
          onClick={() => setTestType('readiness')}
        >
          <CardContent className="p-4">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-violet-100 dark:bg-violet-800/40 rounded-lg mr-3">
                <BookOpen className="text-violet-600 dark:text-violet-400" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-violet-800 dark:text-violet-300">Exam Readiness Test</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Standard assessment of your NEET preparation</p>
              </div>
            </div>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Readiness assessment</li>
              <li>• Concept mastery evaluation</li>
              <li>• Personalized study plan</li>
              <li>• Performance insights</li>
            </ul>
          </CardContent>
        </Card>

        {/* Scholarship Test Option */}
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
            testType === 'scholarship' 
              ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' 
              : 'border-gray-200 dark:border-gray-700'
          }`}
          onClick={() => setTestType('scholarship')}
        >
          <CardContent className="p-4">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-orange-100 dark:bg-orange-800/40 rounded-lg mr-3">
                <Trophy className="text-orange-600 dark:text-orange-400" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-orange-800 dark:text-orange-300 flex items-center gap-2">
                  Scholarship Test
                  <Gift className="h-4 w-4" />
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Earn 1 month free with 90%+ score!</p>
              </div>
            </div>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Same comprehensive assessment</li>
              <li>• Score 90%+ = 1 month free access</li>
              <li>• All readiness test benefits</li>
              <li>• Scholarship eligibility certificate</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scholarship Test Instructions */}
      {testType === 'scholarship' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 p-4 rounded-xl border border-orange-200 dark:border-orange-800"
        >
          <div className="flex items-start mb-3">
            <Trophy className="text-orange-600 dark:text-orange-400 mr-2 mt-1" size={20} />
            <div>
              <h4 className="font-semibold text-orange-800 dark:text-orange-300">Scholarship Test Details</h4>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Take the same comprehensive assessment with a chance to earn free access!
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800/50 p-3 rounded-lg border border-orange-200 dark:border-orange-700">
            <h5 className="font-medium text-sm mb-2">Scholarship Benefits:</h5>
            <ul className="text-xs space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Score 90% or above across both sections to qualify</li>
              <li>• Receive 1 month of free premium access</li>
              <li>• Digital scholarship certificate</li>
              <li>• Priority support and mentorship</li>
              <li>• Access to exclusive study materials</li>
            </ul>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-lg rounded-xl p-4 sm:p-6"
      >
        <h4 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">NEET Examination</h4>
        
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          The National Eligibility cum Entrance Test (NEET) is the qualifying test for MBBS and BDS programs in Indian medical and dental colleges. Our analysis will help you assess your readiness across Physics, Chemistry, and Biology subjects.
        </p>
        
        <Button 
          className={`w-full mt-4 ${
            testType === 'scholarship' 
              ? 'bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700'
              : 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700'
          }`}
          onClick={handleStartTest}
        >
          {testType === 'scholarship' ? (
            <>
              Start Scholarship Test <Trophy size={16} className="ml-2" />
            </>
          ) : (
            <>
              Start Readiness Test <ArrowRight size={16} className="ml-2" />
            </>
          )}
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
          <div className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 p-3 sm:p-4 rounded-xl border border-violet-200 dark:border-violet-800/50 shadow-sm">
            <div className="flex items-start mb-2">
              <div className="p-2 bg-violet-100 dark:bg-violet-800/40 rounded-lg mr-2">
                <BookOpen className="text-violet-600 dark:text-violet-400" size={isMobile ? 16 : 20} />
              </div>
              <h5 className="font-medium text-violet-800 dark:text-violet-300 text-sm sm:text-base">Readiness Score</h5>
            </div>
            <p className="text-xs sm:text-sm text-violet-700/80 dark:text-violet-300/80">Evaluates your current preparation level by analyzing your study habits and comfort with the NEET syllabus.</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-3 sm:p-4 rounded-xl border border-pink-200 dark:border-pink-800/50 shadow-sm">
            <div className="flex items-start mb-2">
              <div className="p-2 bg-pink-100 dark:bg-pink-800/40 rounded-lg mr-2">
                <Calculator className="text-pink-600 dark:text-pink-400" size={isMobile ? 16 : 20} />
              </div>
              <h5 className="font-medium text-pink-800 dark:text-pink-300 text-sm sm:text-base">Concept Mastery</h5>
            </div>
            <p className="text-xs sm:text-sm text-pink-700/80 dark:text-pink-300/80">Tests your knowledge across Physics, Chemistry, and Biology to identify strengths and areas that need improvement.</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-3 sm:mt-4"
      >
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="flex items-center font-medium mb-2 text-sm sm:text-base">
            <CheckCircle size={isMobile ? 16 : 18} className="text-green-500 mr-2" />
            What you'll get:
          </h4>
          <ul className="space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <li>• Comprehensive readiness assessment</li>
            <li>• Subject-wise performance analysis</li>
            <li>• Personalized study recommendations</li>
            <li>• Strength and weakness identification</li>
            {testType === 'scholarship' && (
              <li className="text-orange-600 dark:text-orange-400 font-medium">• Chance to earn 1 month free access!</li>
            )}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroSection;
