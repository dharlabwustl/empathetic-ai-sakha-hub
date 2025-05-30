
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Target, TrendingUp, Zap, BookOpen, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HighlightArrow from './dashboard-sections/HighlightArrow';

const NEETStrategyCard: React.FC = () => {
  const strategyData = {
    currentPhase: "Intensive Preparation",
    nextMilestone: "Mock Test Series",
    daysToNext: 15,
    focusAreas: [
      { subject: "Chemistry", focus: "Organic Reactions", priority: "High" },
      { subject: "Physics", focus: "Modern Physics", priority: "Medium" },
      { subject: "Biology", focus: "Genetics", priority: "Medium" }
    ],
    weeklyPlan: {
      conceptStudy: "40%",
      practiceTests: "35%", 
      revision: "25%"
    },
    adaptiveChanges: 3
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Low': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      {/* Highlight Arrow */}
      <HighlightArrow 
        message="Your dynamic plan based on your profile, it will keep changing based on your learning performance"
        position="top"
        variant="info"
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 overflow-hidden h-full">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 pb-3">
          <CardTitle className="flex items-center gap-2">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Brain className="h-5 w-5 text-purple-600" />
            </motion.div>
            <motion.span
              animate={{ 
                color: ["#7c3aed", "#ec4899", "#7c3aed"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-bold"
            >
              NEET Strategy
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 pb-4 space-y-4">
          {/* Current Phase */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-purple-700">{strategyData.currentPhase}</h3>
            <p className="text-sm text-gray-600">
              Next: {strategyData.nextMilestone} in {strategyData.daysToNext} days
            </p>
          </div>

          {/* Weekly Distribution */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-800">This Week's Focus</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  Concept Study
                </span>
                <span className="font-medium">{strategyData.weeklyPlan.conceptStudy}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1">
                  <Calculator className="h-3 w-3" />
                  Practice Tests
                </span>
                <span className="font-medium">{strategyData.weeklyPlan.practiceTests}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Revision
                </span>
                <span className="font-medium">{strategyData.weeklyPlan.revision}</span>
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-800">Priority Focus Areas</h4>
            {strategyData.focusAreas.map((area, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span className="text-gray-700">{area.subject}: {area.focus}</span>
                <Badge className={getPriorityColor(area.priority)}>
                  {area.priority}
                </Badge>
              </div>
            ))}
          </div>

          {/* Adaptive Changes */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-purple-600">
              <Zap className="h-3 w-3" />
              <span>{strategyData.adaptiveChanges} strategy updates this week</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center pt-2">
            <Link to="/dashboard/student/academic">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Target className="h-4 w-4 mr-2" />
                View Full Strategy
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NEETStrategyCard;
