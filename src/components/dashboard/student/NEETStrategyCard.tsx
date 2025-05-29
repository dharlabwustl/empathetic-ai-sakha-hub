
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, Brain, CheckCircle, Zap, Sparkles, Clock, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NEETStrategyCard: React.FC = () => {
  const navigate = useNavigate();
  const urgencyLevel = "MODERATE";
  const strategy = "Foundation Building + Practice";
  
  const subjects = [
    { name: "Physics", progress: 75, status: "strong", color: "blue" },
    { name: "Chemistry", progress: 45, status: "weak", color: "red" },
    { name: "Biology", progress: 55, status: "weak", color: "orange" }
  ];

  const objectives = [
    "Complete syllabus",
    "Concept clarity", 
    "Regular practice"
  ];

  const getSubjectBadge = (subject: any) => {
    if (subject.status === "weak") {
      return (
        <div className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3 text-orange-600" />
          <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300 text-xs">
            Needs Focus
          </Badge>
        </div>
      );
    }
    return (
      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300 text-xs">
        Strong
      </Badge>
    );
  };

  return (
    <Card className="shadow-md relative overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Target className="h-5 w-5 text-blue-600" />
          </motion.div>
          <motion.span 
            animate={{ color: ['#1e40af', '#3b82f6', '#1e40af'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            NEET Strategy Card
          </motion.span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate('/dashboard/student/study-plan')}
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Adaptive Plan
            </Button>
          </motion.div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: ["0 0 0px rgba(37, 99, 235, 0.3)", "0 0 10px rgba(37, 99, 235, 0.5)", "0 0 0px rgba(37, 99, 235, 0.3)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Badge className="w-full justify-center bg-blue-100 text-blue-800 font-semibold">
              Personalized Strategy
            </Badge>
          </motion.div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Current Focus</h4>
            <motion.p 
              className="text-xs text-gray-600 dark:text-gray-400 font-semibold"
              animate={{ color: ['#4b5563', '#2563eb', '#4b5563'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {strategy}
            </motion.p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Subject Status</h4>
            {subjects.map((subject, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <span>{subject.name}</span>
                {getSubjectBadge(subject)}
              </div>
            ))}
          </div>
          
          <div className="space-y-1">
            {objectives.map((objective, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-2 text-xs"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="pt-2"
          >
            <Button 
              size="sm" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              onClick={() => navigate('/dashboard/student/academic')}
            >
              <Zap className="h-4 w-4 mr-2" />
              View Full Strategy
            </Button>
          </motion.div>
        </div>
      </CardContent>
      
      {/* Animated accent elements */}
      <motion.div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-100 dark:bg-blue-900/20 -z-10 opacity-50"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-purple-100 dark:bg-purple-900/20 -z-10 opacity-50"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </Card>
  );
};

export default NEETStrategyCard;
