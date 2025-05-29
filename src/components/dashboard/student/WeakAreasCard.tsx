
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, BookOpen, RotateCcw, Zap, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface WeakAreasCardProps {
  areas: { name: string; link: string }[];
}

const WeakAreasCard: React.FC<WeakAreasCardProps> = ({ areas }) => {
  // Define mock data for each weak area
  const weakAreasData = [
    { 
      name: areas[0]?.name || "Organic Chemistry", 
      link: areas[0]?.link || "/dashboard/student/concepts/organic-chemistry",
      progress: 42, 
      accuracy: 55,
      lastPractice: "2 days ago"
    },
    { 
      name: areas[1]?.name || "Thermodynamics", 
      link: areas[1]?.link || "/dashboard/student/concepts/thermodynamics",
      progress: 38, 
      accuracy: 48,
      lastPractice: "4 days ago"
    },
    { 
      name: areas[2]?.name || "Genetics", 
      link: areas[2]?.link || "/dashboard/student/concepts/genetics",
      progress: 45, 
      accuracy: 58,
      lastPractice: "1 day ago"
    }
  ];

  return (
    <Card className="shadow-md relative overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </motion.div>
          Weak Areas - Focus Required
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {weakAreasData.map((area, index) => (
            <motion.div
              key={index}
              className="p-3 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{area.name}</h4>
                  <Badge className="bg-orange-100 text-orange-800">
                    {area.accuracy}%
                  </Badge>
                </div>
                <span className="text-xs text-gray-500">{area.lastPractice}</span>
              </div>
              
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{area.progress}%</span>
                </div>
                <Progress value={area.progress} className="h-1.5" />
              </div>
              
              <div className="flex gap-2">
                <Link to={area.link} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Learn
                  </Button>
                </Link>
                <Link to="/dashboard/student/flashcards/1/interactive" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Recall
                  </Button>
                </Link>
                <Link to="/dashboard/student/practice-exam/2/start" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    <Zap className="h-3 w-3 mr-1" />
                    Test
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          
          <motion.div 
            className="text-center pt-2"
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/dashboard/student/academic">
              <Button size="sm" variant="link" className="text-orange-700 dark:text-orange-500">
                View Improvement Plan
                <TrendingUp className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </CardContent>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100 rounded-full -z-10 opacity-20 dark:bg-orange-700/20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-100 rounded-full -z-10 opacity-20 dark:bg-red-700/20"></div>
    </Card>
  );
};

export default WeakAreasCard;
