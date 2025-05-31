
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, BookOpen, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const TodaysTopPrioritySection: React.FC = () => {
  const [showHighlight, setShowHighlight] = useState(false);

  useEffect(() => {
    const hasSeenHighlight = localStorage.getItem('hasSeenTodaysPriorityHighlight') === 'true';
    if (!hasSeenHighlight) {
      setShowHighlight(true);
    }
  }, []);

  const handleCloseHighlight = () => {
    setShowHighlight(false);
    localStorage.setItem('hasSeenTodaysPriorityHighlight', 'true');
  };

  const priorities = [
    {
      subject: "Chemistry",
      topic: "Organic Chemistry",
      urgency: "High",
      timeEstimate: "45 min",
      action: "Study Concepts"
    },
    {
      subject: "Physics",
      topic: "Thermodynamics",
      urgency: "Medium",
      timeEstimate: "30 min", 
      action: "Practice Problems"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <AnimatedHighlight
        message="Start here! Focus on your most urgent topics"
        position="top"
        isVisible={showHighlight}
        onClose={handleCloseHighlight}
      />

      <Card className="premium-card shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Today's Top Priority
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {priorities.map((priority, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-4 bg-red-50/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-red-900">{priority.subject}: {priority.topic}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600">{priority.timeEstimate}</span>
                  </div>
                </div>
                <Badge className={getUrgencyColor(priority.urgency)}>
                  {priority.urgency}
                </Badge>
              </div>
              
              <div className="flex gap-2">
                <Link to={`/dashboard/student/concepts/${priority.subject.toLowerCase()}`} className="flex-1">
                  <Button size="sm" className="w-full bg-red-600 hover:bg-red-700 text-white">
                    <BookOpen className="h-3 w-3 mr-1" />
                    {priority.action}
                  </Button>
                </Link>
                <Link to="/dashboard/student/practice-exam/2/start" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    <Target className="h-3 w-3 mr-1" />
                    Take Test
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
