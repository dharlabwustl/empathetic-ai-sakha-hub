
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          NEET Strategy Card
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <BookOpen className="h-4 w-4 mr-2" />
            Adaptive Plan
          </Button>
          <Badge className="w-full justify-center bg-blue-100 text-blue-800">
            Personalized Strategy
          </Badge>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Current Focus</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">{strategy}</p>
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
              <div key={index} className="flex items-center gap-2 text-xs">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NEETStrategyCard;
