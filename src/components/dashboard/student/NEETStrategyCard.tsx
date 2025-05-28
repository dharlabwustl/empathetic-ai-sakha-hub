
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, Zap } from 'lucide-react';

interface NEETStrategyCardProps {
  studyPace: 'slow' | 'moderate' | 'fast';
  examProximity: number; // days to exam
}

const NEETStrategyCard: React.FC<NEETStrategyCardProps> = ({
  studyPace = 'moderate',
  examProximity = 185
}) => {
  const getStrategyContent = () => {
    if (examProximity > 300) {
      return {
        title: "Foundation Building",
        description: "Build strong conceptual foundation",
        points: ["Complete syllabus", "Concept clarity", "Regular practice"]
      };
    } else if (examProximity > 150) {
      return {
        title: "Foundation Building + Practice",
        description: "Strengthen concepts with focused practice",
        points: ["Complete syllabus", "Concept clarity", "Regular practice"]
      };
    } else if (examProximity > 60) {
      return {
        title: "Intensive Practice + Revision",
        description: "Focus on weak areas and mock tests",
        points: ["Mock tests daily", "Weak area focus", "Quick revision"]
      };
    } else {
      return {
        title: "Final Sprint",
        description: "Last-minute revision and stress management",
        points: ["Formula revision", "Previous papers", "Stay calm"]
      };
    }
  };

  const strategy = getStrategyContent();

  return (
    <Card className="relative overflow-hidden border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
      {/* Animated highlight indicator */}
      <div className="absolute top-2 right-2">
        <Zap className="h-4 w-4 text-orange-500 animate-pulse" />
      </div>
      
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-purple-600" />
          NEET 2026 Strategy - {studyPace.toUpperCase()}
        </CardTitle>
        <Badge variant="outline" className="w-fit bg-purple-100 text-purple-700 dark:bg-purple-900/30">
          {strategy.title}
        </Badge>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">
          {strategy.description}
        </p>
        
        <div className="space-y-2">
          {strategy.points.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-sm font-medium">{point}</span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <p className="text-xs text-purple-700 dark:text-purple-300 text-center">
            Strategy adapts based on exam proximity and study pace
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NEETStrategyCard;
