
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, TrendingUp, Star, Brain, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HighlightArrow from './HighlightArrow';

const StrongAreasCard: React.FC = () => {
  const strongAreas = [
    {
      subject: "Biology",
      topic: "Cell Structure & Functions",
      score: 92,
      consistency: "Excellent",
      lastImprovement: "+8%",
      route: "/dashboard/student/concepts/biology"
    },
    {
      subject: "Chemistry",
      topic: "Inorganic Chemistry",
      score: 88,
      consistency: "Very Good",
      lastImprovement: "+5%",
      route: "/dashboard/student/concepts/chemistry"
    },
    {
      subject: "Physics",
      topic: "Thermodynamics",
      score: 85,
      consistency: "Good",
      lastImprovement: "+3%",
      route: "/dashboard/student/concepts/physics"
    }
  ];

  const getConsistencyColor = (consistency: string) => {
    switch (consistency) {
      case 'Excellent': return 'bg-green-100 text-green-800 border-green-300';
      case 'Very Good': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Good': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 85) return 'text-blue-600';
    return 'text-emerald-600';
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.3 }}
    >
      {/* Highlight Arrow */}
      <HighlightArrow 
        message="Keep up the great work in these areas!"
        position="top"
        variant="success"
      />

      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-green-200 to-emerald-200 dark:from-green-800 dark:to-emerald-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 pb-3">
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
              <CheckCircle className="h-5 w-5 text-green-600" />
            </motion.div>
            <motion.span
              animate={{ 
                color: ["#059669", "#10b981", "#059669"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="font-bold"
            >
              Strong Areas to Maintain
            </motion.span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {strongAreas.map((area, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-3 bg-gradient-to-r from-green-50/50 to-emerald-50/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="h-4 w-4 text-green-500" />
                    <h4 className="text-sm font-medium text-green-900 dark:text-green-100">
                      {area.subject} - {area.topic}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className={`font-medium ${getScoreColor(area.score)}`}>
                      {area.score}% accuracy
                    </span>
                    <span>•</span>
                    <span className="text-green-600">{area.lastImprovement}</span>
                  </div>
                </div>
                <Badge className={getConsistencyColor(area.consistency)}>
                  {area.consistency}
                </Badge>
              </div>
              
              <div className="flex justify-end">
                <Link to={area.route}>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Brain className="h-3 w-3 mr-1" />
                    Review
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          
          <div className="text-center pt-2">
            <Link to="/dashboard/student/analytics">
              <Button 
                size="sm" 
                variant="outline"
                className="hover:bg-green-50"
              >
                <Target className="h-4 w-4 mr-2" />
                View All Strengths
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default StrongAreasCard;
