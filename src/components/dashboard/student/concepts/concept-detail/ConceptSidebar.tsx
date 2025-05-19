
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, CheckCircle, Star, Clock, Award } from 'lucide-react';

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
  examReady
}) => {
  // Learning stats - in a real app this would come from an API
  const learningStats = {
    timeSpent: "45 minutes",
    lastStudied: "Yesterday",
    reviewCount: "5 sessions",
    scheduledNext: "Tomorrow"
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      {/* Concept Mastery Card */}
      <motion.div variants={itemVariants}>
        <Card className="border shadow-md overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-purple-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Brain className="h-5 w-5 mr-2 text-purple-600" />
              Concept Mastery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Your mastery</span>
                <span className="font-medium text-blue-600">{masteryLevel}%</span>
              </div>
              
              <Progress value={masteryLevel} className="h-2" />
              
              <div className="pt-2 text-sm text-muted-foreground">
                {masteryLevel < 30 && "You're just getting started. Continue learning to improve mastery."}
                {masteryLevel >= 30 && masteryLevel < 50 && "You're making progress. Keep practicing to strengthen your understanding."}
                {masteryLevel >= 50 && masteryLevel < 80 && "Good understanding! Complete the practice quizzes to validate your knowledge."}
                {masteryLevel >= 80 && "Excellent mastery! You can now focus on related concepts."}
              </div>
              
              <Button className="w-full">
                Improve Mastery
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Exam Readiness Card */}
      <motion.div variants={itemVariants}>
        <Card className="border shadow-md overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-green-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2 text-green-600" />
              Exam Readiness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-24 relative">
                <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {examReady ? '85%' : '40%'}
                    </div>
                    <div className="text-xs text-gray-500">Readiness</div>
                  </div>
                </div>
                <svg className="w-24 h-24 absolute top-0 left-0 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50" cy="50" r="45" 
                    className="stroke-gray-200 dark:stroke-gray-700 fill-none"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50" cy="50" r="45" 
                    className={`${examReady ? 'stroke-green-500' : 'stroke-amber-500'} fill-none`}
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - (examReady ? 85 : 40) / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            
            <div className="flex items-center justify-center mb-4">
              <span className={`flex items-center ${examReady ? 'text-green-600' : 'text-amber-600'} font-medium`}>
                {examReady ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" /> Exam Ready
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 mr-1" /> Keep Practicing
                  </>
                )}
              </span>
            </div>
            
            <Button className="w-full">
              Take Practice Test
            </Button>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Related Concepts Card */}
      <motion.div variants={itemVariants}>
        <Card className="border shadow-md overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Related Concepts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {relatedConcepts.map((related) => (
                <div key={related.id} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">{related.title}</span>
                    <span className="text-sm text-gray-500">{related.masteryLevel}%</span>
                  </div>
                  <Progress value={related.masteryLevel} className="h-1.5" />
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-2">
                View All Related Concepts
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Learning Stats */}
      <motion.div variants={itemVariants}>
        <Card className="border shadow-md overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-amber-600"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-amber-600" />
              Learning Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Time spent</span>
                <span className="font-medium">{learningStats.timeSpent}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Last studied</span>
                <span className="font-medium">{learningStats.lastStudied}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Review count</span>
                <span className="font-medium">{learningStats.reviewCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Scheduled next</span>
                <span className="font-medium">{learningStats.scheduledNext}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default ConceptSidebar;
