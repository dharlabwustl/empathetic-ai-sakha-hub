
import React from 'react';
import { ExamType } from './types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Calculator, Brain, CheckCircle } from 'lucide-react';

interface IntroSectionProps {
  selectedExam: string;
  setSelectedExam: (exam: string) => void;
  examTypes: ExamType[];
}

const IntroSection: React.FC<IntroSectionProps> = ({ 
  selectedExam, 
  setSelectedExam, 
  examTypes 
}) => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-full mb-4">
            <GraduationCap size={30} className="text-violet-600 dark:text-violet-400" />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            Exam Readiness Analysis
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-md mx-auto">
            Complete three quick assessments to discover your exam readiness level and get a personalized study plan.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 shadow-lg rounded-xl p-6"
      >
        <h4 className="text-lg font-medium mb-4">Select Your Exam</h4>
        
        <Select value={selectedExam} onValueChange={setSelectedExam}>
          <SelectTrigger className="w-full bg-white dark:bg-gray-800 border-2 border-violet-100 dark:border-violet-800 shadow-sm">
            <SelectValue placeholder="Select an exam" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-2 border-violet-100 dark:border-violet-800 shadow-lg">
            {examTypes.map((exam) => (
              <SelectItem key={exam.value} value={exam.value}>
                {exam.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800/50 shadow-sm">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-800/40 rounded-lg mr-3">
                <Brain className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <h5 className="font-medium text-blue-800 dark:text-blue-300">Stress Level Test</h5>
            </div>
            <p className="text-sm text-blue-700/80 dark:text-blue-300/80">Measures your ability to perform under pressure with pattern recognition and reaction tasks.</p>
          </div>

          <div className="bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 p-4 rounded-xl border border-violet-200 dark:border-violet-800/50 shadow-sm">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-violet-100 dark:bg-violet-800/40 rounded-lg mr-3">
                <BookOpen className="text-violet-600 dark:text-violet-400" size={20} />
              </div>
              <h5 className="font-medium text-violet-800 dark:text-violet-300">Readiness Score</h5>
            </div>
            <p className="text-sm text-violet-700/80 dark:text-violet-300/80">Evaluates your current preparation by analyzing content coverage and study habits.</p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-4 rounded-xl border border-pink-200 dark:border-pink-800/50 shadow-sm">
            <div className="flex items-start mb-3">
              <div className="p-2 bg-pink-100 dark:bg-pink-800/40 rounded-lg mr-3">
                <Calculator className="text-pink-600 dark:text-pink-400" size={20} />
              </div>
              <h5 className="font-medium text-pink-800 dark:text-pink-300">Concept Mastery</h5>
            </div>
            <p className="text-sm text-pink-700/80 dark:text-pink-300/80">Identifies gaps between your perceived knowledge and actual performance.</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-4"
      >
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-800/30 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <h4 className="flex items-center font-medium mb-2">
            <CheckCircle size={18} className="text-green-500 mr-2" />
            What you'll get:
          </h4>
          <ul className="space-y-2 text-sm pl-7 list-disc">
            <li>Personalized readiness score with detailed analysis</li>
            <li>Customized study plan based on your results</li>
            <li>Identification of your specific strength and improvement areas</li>
            <li>Evidence-based recommendations to maximize your study efficiency</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default IntroSection;
