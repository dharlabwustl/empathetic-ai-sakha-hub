
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Link as LinkIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface RelatedConcept {
  id: string;
  title: string;
  masteryLevel: number;
}

interface ConceptSidebarProps {
  masteryLevel: number;
  relatedConcepts: RelatedConcept[];
  examReady: boolean;
}

const ConceptSidebar: React.FC<ConceptSidebarProps> = ({
  masteryLevel,
  relatedConcepts,
  examReady,
}) => {
  return (
    <>
      {/* Related concepts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 pb-3 pt-3">
            <CardTitle className="text-base flex items-center text-gray-900 dark:text-gray-100">
              <LinkIcon className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
              Related Concepts
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="space-y-4">
              {relatedConcepts.map((concept) => (
                <Link 
                  key={concept.id} 
                  to={`/dashboard/student/concepts/${concept.id}`}
                  className="block group"
                >
                  <div className="flex flex-col space-y-1 mb-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {concept.title}
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 text-indigo-600 dark:text-indigo-400 transition-opacity" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Mastery
                      </span>
                      <span className="text-xs font-medium">
                        {concept.masteryLevel}%
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={concept.masteryLevel} 
                    className="h-1 bg-gray-200 dark:bg-gray-700" 
                    indicatorClassName={`${
                      concept.masteryLevel > 80 ? 'bg-green-500 dark:bg-green-500' : 
                      concept.masteryLevel > 50 ? 'bg-blue-500 dark:bg-blue-500' : 
                      concept.masteryLevel > 30 ? 'bg-yellow-500 dark:bg-yellow-500' : 
                      'bg-red-500 dark:bg-red-500'
                    }`} 
                  />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Exam readiness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className={`overflow-hidden border ${examReady 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-900/50' 
          : 'bg-gradient-to-br from-red-50 to-amber-50 border-red-200 dark:from-red-950/30 dark:to-amber-950/30 dark:border-red-900/50'
        }`}>
          <CardContent className="p-4">
            <div className="flex items-start">
              <div className={`rounded-full p-2 mr-3 ${examReady 
                ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
                : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
              }`}>
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {examReady ? 'Exam Ready' : 'Needs More Practice'}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                  {examReady 
                    ? 'You have a good understanding of this concept for your exam.' 
                    : 'This concept needs more practice before your exam.'
                  }
                </p>
                <Button 
                  size="sm" 
                  className={examReady 
                    ? 'bg-green-600 hover:bg-green-700 text-white w-full' 
                    : 'bg-amber-600 hover:bg-amber-700 text-white w-full'
                  }
                >
                  {examReady ? 'Review Once More' : 'Practice Now'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default ConceptSidebar;
