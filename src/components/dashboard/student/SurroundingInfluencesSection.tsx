
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Home, Clock, Users, Heart, Brain, 
  TrendingUp, ChevronUp, ChevronDown 
} from 'lucide-react';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  const influences = [
    {
      category: "Study Environment",
      icon: Home,
      score: 85,
      color: "bg-blue-500",
      suggestions: ["Optimize lighting", "Reduce noise", "Organize workspace"]
    },
    {
      category: "Time Management",
      icon: Clock,
      score: 72,
      color: "bg-green-500",
      suggestions: ["Use Pomodoro technique", "Plan breaks", "Set realistic goals"]
    },
    {
      category: "Social Support",
      icon: Users,
      score: 90,
      color: "bg-purple-500",
      suggestions: ["Join study groups", "Seek mentor guidance", "Family support"]
    },
    {
      category: "Mental Wellness",
      icon: Heart,
      score: 68,
      color: "bg-red-500",
      suggestions: ["Practice meditation", "Regular exercise", "Adequate sleep"]
    },
    {
      category: "Learning Style",
      icon: Brain,
      score: 88,
      color: "bg-orange-500",
      suggestions: ["Visual aids", "Active recall", "Spaced repetition"]
    }
  ];

  const overallScore = Math.round(influences.reduce((sum, inf) => sum + inf.score, 0) / influences.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Surrounding Influences Meter
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {overallScore}%
              </span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}
            >
              {influenceMeterCollapsed ? 
                <ChevronDown className="h-4 w-4" /> : 
                <ChevronUp className="h-4 w-4" />
              }
            </Button>
          </div>
        </CardHeader>
        
        {!influenceMeterCollapsed && (
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {influences.map((influence, index) => {
                const IconComponent = influence.icon;
                return (
                  <motion.div
                    key={influence.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${influence.color} bg-opacity-10`}>
                        <IconComponent className={`h-5 w-5 text-gray-700`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{influence.category}</h4>
                        <p className="text-2xl font-bold">{influence.score}%</p>
                      </div>
                    </div>
                    
                    <Progress 
                      value={influence.score} 
                      className="mb-3 h-2"
                    />
                    
                    <div className="space-y-1">
                      {influence.suggestions.slice(0, 2).map((suggestion, idx) => (
                        <p key={idx} className="text-xs text-gray-600">
                          • {suggestion}
                        </p>
                      ))}
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-3 text-xs"
                    >
                      Optimize
                    </Button>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-800">Overall Environment Score</h4>
                  <p className="text-sm text-gray-600">
                    Your study environment is performing well. Focus on mental wellness for best results.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{overallScore}%</div>
                  <p className="text-sm text-gray-600">Excellent</p>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
};

export default SurroundingInfluencesSection;
