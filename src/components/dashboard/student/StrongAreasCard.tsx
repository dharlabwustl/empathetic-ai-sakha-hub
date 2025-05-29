
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Trophy, Star, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface StrongAreasCardProps {
  areas: { name: string; link: string }[];
}

const StrongAreasCard: React.FC<StrongAreasCardProps> = ({ areas }) => {
  // Define mock data for each strong area
  const strongAreasData = [
    { 
      name: areas[0]?.name || "Mechanics", 
      link: areas[0]?.link || "/dashboard/student/concepts/mechanics",
      progress: 92, 
      accuracy: 95,
      mastery: "Expert"
    },
    { 
      name: areas[1]?.name || "Cell Biology", 
      link: areas[1]?.link || "/dashboard/student/concepts/cell-biology",
      progress: 88, 
      accuracy: 91,
      mastery: "Advanced"
    },
    { 
      name: areas[2]?.name || "Algebra", 
      link: areas[2]?.link || "/dashboard/student/concepts/algebra",
      progress: 85, 
      accuracy: 89,
      mastery: "Advanced"
    }
  ];

  return (
    <Card className="shadow-md relative overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          >
            <CheckCircle className="h-5 w-5 text-green-600" />
          </motion.div>
          Strong Areas - Well Done!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {strongAreasData.map((area, index) => (
            <motion.div
              key={index}
              className="p-3 rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-sm">{area.name}</h4>
                  <Badge className="bg-green-100 text-green-800">
                    {area.accuracy}%
                  </Badge>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(Math.floor(area.accuracy / 20))].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400" />
                  ))}
                </div>
              </div>
              
              <div className="space-y-1 mb-3">
                <div className="flex justify-between text-xs">
                  <span>Mastery</span>
                  <span>{area.mastery}</span>
                </div>
                <Progress value={area.progress} className="h-1.5" />
              </div>
              
              <div className="flex gap-2">
                <Link to={area.link} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Review
                  </Button>
                </Link>
                <Link to="/dashboard/student/flashcards/1/interactive" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Advance
                  </Button>
                </Link>
                <Link to="/dashboard/student/practice-exam/2/start" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    <Trophy className="h-3 w-3 mr-1" />
                    Master
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
            <Link to="/dashboard/student/practice-exam/2/start">
              <Button size="sm" variant="link" className="text-green-700 dark:text-green-500">
                Challenge Yourself
                <Trophy className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </CardContent>
      
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-green-100 rounded-full -z-10 opacity-20 dark:bg-green-700/20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-100 rounded-full -z-10 opacity-20 dark:bg-emerald-700/20"></div>
    </Card>
  );
};

export default StrongAreasCard;
