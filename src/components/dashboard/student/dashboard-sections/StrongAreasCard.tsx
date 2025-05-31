
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Trophy, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedHighlight from './AnimatedHighlight';

const StrongAreasCard: React.FC = () => {
  const strongAreas = [
    {
      subject: "Mathematics",
      topic: "Calculus",
      progress: 95,
      mastery: "Expert",
      lastStudied: "Today"
    },
    {
      subject: "Physics",
      topic: "Mechanics", 
      progress: 88,
      mastery: "Advanced",
      lastStudied: "Yesterday"
    },
    {
      subject: "Biology",
      topic: "Cell Biology",
      progress: 92,
      mastery: "Expert",
      lastStudied: "2 days ago"
    }
  ];

  const getMasteryColor = (mastery: string) => {
    switch (mastery) {
      case 'Expert': return 'bg-green-100 text-green-800 border-green-300';
      case 'Advanced': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <AnimatedHighlight
        text="Great job! Keep building on these strengths"
        storageKey="has_seen_strong_areas_highlight"
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Strong Areas - Keep Momentum
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {strongAreas.map((area, index) => (
              <motion.div
                key={index}
                className="border rounded-lg p-4 bg-green-50/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-medium text-green-900">{area.subject}: {area.topic}</h4>
                    <p className="text-xs text-gray-600">Last studied: {area.lastStudied}</p>
                  </div>
                  <Badge className={getMasteryColor(area.mastery)}>
                    {area.mastery}
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
                  <Link to="/dashboard/student/practice-exam/2/start" className="flex-1">
                    <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <Trophy className="h-3 w-3 mr-1" />
                      Take Exam
                    </Button>
                  </Link>
                  <Link to="/dashboard/student/concepts/Newton's%20Second%20Law/formula-lab" className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      <Zap className="h-3 w-3 mr-1" />
                      Advanced
                    </Button>
                  </Link>
                  <Link to="/dashboard/student/flashcards/1/interactive" className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      <Target className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </AnimatedHighlight>
    </motion.div>
  );
};

export default StrongAreasCard;
