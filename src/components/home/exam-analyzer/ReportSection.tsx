
import React from 'react';
import { Button } from "@/components/ui/button";
import { RadialProgress } from "@/components/ui/radial-progress";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExamResults } from "./types";

interface ReportSectionProps {
  results: ExamResults;
  onClose: () => void;
}

const ReportSection: React.FC<ReportSectionProps> = ({ results, onClose }) => {
  const strengthsList = results.overall.strengths || [];
  const improvementsList = results.overall.improvements || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col max-w-3xl mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Your NEET Readiness Report</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Based on your responses, here's a personalized analysis of your exam preparation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Overall Readiness</h3>
          <RadialProgress 
            value={results.overall.score} 
            size="lg" 
            colorClassName={getScoreColorClass(results.overall.score)}
            label="Overall Score"
          />
          <p className="mt-2 font-medium">{results.overall.level}</p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Physics Concept Mastery</h3>
          <RadialProgress 
            value={results.concept.score} 
            size="lg" 
            colorClassName={getScoreColorClass(results.concept.score)}
            label="Physics Score"
          />
          <p className="mt-2 font-medium">{results.concept.level}</p>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Chemistry & Biology</h3>
          <RadialProgress 
            value={Math.round((results.readiness.score + results.stress.score) / 2)} 
            size="lg" 
            colorClassName={getScoreColorClass(Math.round((results.readiness.score + results.stress.score) / 2))}
            label="Other Subjects"
          />
          <p className="mt-2 font-medium">{results.readiness.level}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-green-50 dark:bg-green-950/30 p-6 rounded-xl border border-green-200 dark:border-green-900">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Your Strengths
          </h3>
          <ul className="space-y-2 text-green-800 dark:text-green-300">
            {strengthsList.map((strength, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-1">•</span>
                <span>{strength}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-xl border border-amber-200 dark:border-amber-900">
          <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            Areas for Improvement
          </h3>
          <ul className="space-y-2 text-amber-800 dark:text-amber-300">
            {improvementsList.map((improvement, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <span className="mr-2 mt-1">•</span>
                <span>{improvement}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-6 rounded-xl border border-blue-200 dark:border-blue-900 mb-8">
        <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-3">Analysis & Recommendations</h3>
        <p className="text-blue-800 dark:text-blue-300 whitespace-pre-line">
          {results.overall.analysis}
        </p>
      </div>

      <div className="text-center space-y-4">
        <p className="text-lg font-medium">Ready to improve your NEET preparation?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/signup">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Sign Up for PREPZR
            </Button>
          </Link>
          <Button variant="outline" onClick={onClose} size="lg">
            Close Report
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Helper function to get color class based on score
function getScoreColorClass(score: number): string {
  if (score >= 80) return "text-emerald-500";
  if (score >= 60) return "text-blue-500";
  if (score >= 40) return "text-amber-500";
  return "text-red-500";
}

export default ReportSection;
