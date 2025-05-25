
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Home, 
  Smartphone, 
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const [influences] = useState([
    {
      category: "Family Support",
      icon: <Home className="h-4 w-4" />,
      score: 85,
      trend: "positive",
      description: "Strong family encouragement and study environment"
    },
    {
      category: "Peer Group",
      icon: <Users className="h-4 w-4" />,
      score: 72,
      trend: "neutral",
      description: "Mixed influence from study group and friends"
    },
    {
      category: "Digital Distractions",
      icon: <Smartphone className="h-4 w-4" />,
      score: 45,
      trend: "negative",
      description: "Social media and gaming affecting focus"
    },
    {
      category: "Study Environment",
      icon: <MapPin className="h-4 w-4" />,
      score: 78,
      trend: "positive",
      description: "Quiet space with good lighting and resources"
    }
  ]);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'positive': return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'negative': return <TrendingDown className="h-3 w-3 text-red-600" />;
      default: return <Minus className="h-3 w-3 text-gray-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const overallScore = Math.round(influences.reduce((acc, inf) => acc + inf.score, 0) / influences.length);

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700">
      <CardHeader 
        className="cursor-pointer" 
        onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
      >
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            Surrounding Influences Meter
            <Badge className={getScoreColor(overallScore)}>
              {overallScore}/100
            </Badge>
          </CardTitle>
          {influenceMeterCollapsed ? (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          )}
        </div>
      </CardHeader>
      
      {!influenceMeterCollapsed && (
        <CardContent>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground mb-4">
              Track how your environment affects your study performance
            </div>
            
            {influences.map((influence, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {influence.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{influence.category}</span>
                    {getTrendIcon(influence.trend)}
                  </div>
                  <Progress value={influence.score} className="h-2 mb-1" />
                  <p className="text-xs text-muted-foreground">{influence.description}</p>
                </div>
                <Badge className={getScoreColor(influence.score)}>
                  {influence.score}
                </Badge>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
              <h4 className="font-medium text-sm mb-2 text-blue-800 dark:text-blue-200">
                💡 Smart Recommendations
              </h4>
              <ul className="text-xs space-y-1 text-blue-700 dark:text-blue-300">
                <li>• Set specific study hours to reduce digital distractions</li>
                <li>• Create a dedicated study space away from family noise</li>
                <li>• Join study groups with more focused peers</li>
              </ul>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SurroundingInfluencesSection;
