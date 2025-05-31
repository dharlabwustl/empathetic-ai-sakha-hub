
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, BookOpen, RotateCcw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const WeakAreasCard: React.FC = () => {
  const weakAreas = [
    {
      subject: "Chemistry",
      topic: "Organic Chemistry",
      progress: 35,
      priority: "High",
      lastStudied: "2 days ago"
    },
    {
      subject: "Physics", 
      topic: "Thermodynamics",
      progress: 42,
      priority: "High",
      lastStudied: "3 days ago"
    },
    {
      subject: "Biology",
      topic: "Genetics",
      progress: 48,
      priority: "Medium", 
      lastStudied: "1 day ago"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
      transition={{ duration: 0.6 }}
    >
      <AnimatedHighlight
        text="Focus on these areas!"
        storageKey="weak_areas_focus"
        variant="warning"
      />
      
      <Card className="premium-card shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Weak Areas - Need Focus
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {weakAreas.map((area, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-4 bg-red-50/50"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-red-900">{area.subject}: {area.topic}</h4>
                  <p className="text-xs text-gray-600">Last studied: {area.lastStudied}</p>
                </div>
                <Badge className={getPriorityColor(area.priority)}>
                  {area.priority}
                </Badge>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{area.progress}%</span>
                </div>
                <Progress value={area.progress} className="h-2" />
              </div>

              <div className="flex gap-2">
                <Link to={`/dashboard/student/concepts/${area.subject.toLowerCase()}`} className="flex-1">
                  <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Study
                  </Button>
                </Link>
                <Link to="/dashboard/student/flashcards/1/interactive" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Practice
                  </Button>
                </Link>
                <Link to="/dashboard/student/concepts/Newton's%20Second%20Law/formula-lab" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    <Zap className="h-3 w-3 mr-1" />
                    Formula
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

export default WeakAreasCard;
