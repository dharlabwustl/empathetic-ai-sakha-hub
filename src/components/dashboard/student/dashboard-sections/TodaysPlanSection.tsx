
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Play, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MoodType } from '@/types/user/base';
import AnimatedHighlight from './AnimatedHighlight';

interface TodaysPlanSectionProps {
  currentMood?: MoodType;
}

const TodaysPlanSection: React.FC<TodaysPlanSectionProps> = ({ currentMood }) => {
  const [showHighlight, setShowHighlight] = useState(false);

  useEffect(() => {
    const hasSeenHighlight = localStorage.getItem('hasSeenTodaysPlanHighlight') === 'true';
    if (!hasSeenHighlight) {
      setShowHighlight(true);
    }
  }, []);

  const handleCloseHighlight = () => {
    setShowHighlight(false);
    localStorage.setItem('hasSeenTodaysPlanHighlight', 'true');
  };

  const todaysPlan = [
    {
      time: "09:00 AM",
      subject: "Physics",
      topic: "Mechanics",
      duration: "60 min",
      status: "completed",
      type: "Concept Review"
    },
    {
      time: "11:00 AM", 
      subject: "Chemistry",
      topic: "Organic Chemistry",
      duration: "90 min",
      status: "in-progress",
      type: "Problem Solving"
    },
    {
      time: "02:00 PM",
      subject: "Biology",
      topic: "Cell Biology", 
      duration: "45 min",
      status: "pending",
      type: "Flashcard Review"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Play className="h-4 w-4 text-blue-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
    >
      <AnimatedHighlight
        message="Your personalized daily study schedule"
        position="top"
        isVisible={showHighlight}
        onClose={handleCloseHighlight}
      />

      <Card className="premium-card shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Calendar className="h-5 w-5" />
            Today's Live Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {todaysPlan.map((plan, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-3 bg-blue-50/50"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(plan.status)}
                  <div>
                    <h4 className="font-medium text-blue-900 text-sm">{plan.subject}: {plan.topic}</h4>
                    <p className="text-xs text-gray-600">{plan.time} • {plan.duration} • {plan.type}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(plan.status)}>
                  {plan.status}
                </Badge>
              </div>
              
              {plan.status === 'pending' && (
                <div className="flex gap-2 mt-2">
                  <Link to={`/dashboard/student/concepts/${plan.subject.toLowerCase()}`} className="flex-1">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Play className="h-3 w-3 mr-1" />
                      Start Now
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
          
          <div className="text-center pt-2">
            <Link to="/dashboard/student/study-plan">
              <Button size="sm" variant="outline" className="w-full">
                <Calendar className="h-3 w-3 mr-1" />
                View Full Schedule
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysPlanSection;
