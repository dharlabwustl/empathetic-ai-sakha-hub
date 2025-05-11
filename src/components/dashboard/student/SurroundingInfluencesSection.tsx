
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, PencilLine, Brain, Globe, Heart, Zap, Users, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  // Define influence factors and their values
  const influenceFactors = [
    { 
      name: 'Learning Environment', 
      icon: <MapPin className="h-4 w-4 text-emerald-500" />,
      value: 85, 
      status: 'Excellent',
      color: 'bg-emerald-500' 
    },
    { 
      name: 'Mental State', 
      icon: <Brain className="h-4 w-4 text-violet-500" />, 
      value: 70, 
      status: 'Good',
      color: 'bg-violet-500' 
    },
    { 
      name: 'Physical Wellbeing', 
      icon: <Heart className="h-4 w-4 text-red-500" />, 
      value: 65, 
      status: 'Good',
      color: 'bg-red-500' 
    },
    { 
      name: 'Social Support', 
      icon: <Users className="h-4 w-4 text-blue-500" />, 
      value: 90, 
      status: 'Excellent',
      color: 'bg-blue-500' 
    },
    { 
      name: 'Motivation Level', 
      icon: <Zap className="h-4 w-4 text-amber-500" />, 
      value: 75, 
      status: 'Good',
      color: 'bg-amber-500' 
    },
    { 
      name: 'Global Events Impact', 
      icon: <Globe className="h-4 w-4 text-sky-500" />, 
      value: 40, 
      status: 'Needs Attention',
      color: 'bg-sky-500' 
    }
  ];

  // Handle user input for influences
  const handleUpdateInfluence = (index: number) => {
    console.log(`Update influence factor ${influenceFactors[index].name}`);
    // In a real app, this would open a dialog to update the influence factor
  };

  return (
    <Card className="mb-6 border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-2 cursor-pointer" onClick={() => setInfluenceMeterCollapsed(!influenceMeterCollapsed)}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <PencilLine className="h-4 w-4 text-violet-600" />
            Surrounding Influences
            <Badge variant="outline" className="ml-2 bg-violet-50 text-violet-700 border-violet-200">
              PREPZR Exclusive
            </Badge>
          </CardTitle>
          <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
            {influenceMeterCollapsed ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      
      {!influenceMeterCollapsed && (
        <CardContent>
          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              These factors affect your study effectiveness. Update them regularly for more personalized recommendations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {influenceFactors.map((factor, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-900 p-3 rounded-md border">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    {factor.icon}
                    <span className="font-medium text-sm">{factor.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => handleUpdateInfluence(index)}
                  >
                    <PencilLine className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Progress value={factor.value} className="h-2" indicatorClassName={factor.color} />
                  <span className="text-xs font-medium">{factor.value}%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className={`font-medium ${factor.value > 70 ? 'text-green-600' : factor.value > 50 ? 'text-amber-600' : 'text-red-600'}`}>
                    {factor.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" className="text-xs">
              Generate Study Recommendations
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SurroundingInfluencesSection;
