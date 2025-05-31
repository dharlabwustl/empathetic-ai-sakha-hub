
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, TrendingUp, Brain, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './dashboard-sections/AnimatedHighlight';

const NEETStrategyCard: React.FC = () => {
  const strategies = [
    {
      title: "Quick Wins",
      description: "Focus on high-yield topics first",
      topics: ["Chemical Bonding", "Human Physiology", "Mechanics"],
      priority: "High",
      estimatedGain: "+15 marks"
    },
    {
      title: "Weakness Improvement",
      description: "Target your lowest scoring areas",
      topics: ["Organic Chemistry", "Plant Biology"],
      priority: "Critical",
      estimatedGain: "+25 marks"
    },
    {
      title: "Revision Strategy",
      description: "Smart revision for better retention",
      topics: ["Previous Year Analysis", "Mock Tests"],
      priority: "Medium",
      estimatedGain: "+10 marks"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'Medium': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      {/* Animated Highlight */}
      <AnimatedHighlight
        text="Your dynamic plan based on your profile, it will keep changing based on your learning performance"
        storageKey="neet-strategy-highlight-closed"
        className="top-[-60px] left-1/2 transform -translate-x-1/2 w-80"
        arrowPosition="bottom"
        delay={3000}
      />

      <Card className="premium-card h-full shadow-lg border-2 border-gradient-to-r from-purple-200 to-indigo-200 dark:from-purple-800 dark:to-indigo-800">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 pb-3">
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
                color: ["#7c3aed", "#4338ca", "#7c3aed"]
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
        <CardContent className="space-y-4">
          {strategies.map((strategy, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-3 bg-gradient-to-r from-purple-50/50 to-indigo-50/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-purple-900 dark:text-purple-100">
                    {strategy.title}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {strategy.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Badge className={getPriorityColor(strategy.priority)}>
                    {strategy.priority}
                  </Badge>
                  <span className="text-xs font-bold text-green-600">
                    {strategy.estimatedGain}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-2">
                {strategy.topics.slice(0, 2).map((topic, topicIndex) => (
                  <Badge key={topicIndex} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {strategy.topics.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{strategy.topics.length - 2} more
                  </Badge>
                )}
              </div>
              
              <div className="flex justify-end">
                <Link to="/dashboard/student/academic">
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Target className="h-3 w-3 mr-1" />
                    Apply
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          
          <div className="text-center pt-2">
            <Link to="/dashboard/student/academic">
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Get Full Strategy
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NEETStrategyCard;
