
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Wind, Clock, Users, Activity, Brain, Coffee } from 'lucide-react';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed,
}) => {
  const { toast } = useToast();
  
  const handleInfluenceClick = (influenceName: string) => {
    toast({
      title: `${influenceName} Analysis`,
      description: `See how ${influenceName.toLowerCase()} affects your study performance`,
    });
  };

  if (influenceMeterCollapsed) {
    return (
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => setInfluenceMeterCollapsed(false)}
          className="w-full justify-between"
        >
          <span>Show Surrounding Influences</span>
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
            Prepzr AI Analysis
          </span>
        </Button>
      </div>
    );
  }

  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Surrounding Influences</h2>
          <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
            Prepzr AI Analysis
          </span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setInfluenceMeterCollapsed(true)}
        >
          Hide
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Button 
          variant="outline" 
          className="h-auto py-3 flex flex-col items-center gap-2" 
          onClick={() => handleInfluenceClick('Environment')}
        >
          <Wind className="h-5 w-5 text-blue-600" />
          <div>
            <div className="text-sm font-medium">Environment</div>
            <div className="text-xs text-muted-foreground">70% Optimal</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex flex-col items-center gap-2" 
          onClick={() => handleInfluenceClick('Time Management')}
        >
          <Clock className="h-5 w-5 text-green-600" />
          <div>
            <div className="text-sm font-medium">Time</div>
            <div className="text-xs text-muted-foreground">60% Effective</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex flex-col items-center gap-2" 
          onClick={() => handleInfluenceClick('Social Circle')}
        >
          <Users className="h-5 w-5 text-purple-600" />
          <div>
            <div className="text-sm font-medium">Social</div>
            <div className="text-xs text-muted-foreground">85% Supportive</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex flex-col items-center gap-2" 
          onClick={() => handleInfluenceClick('Health')}
        >
          <Activity className="h-5 w-5 text-red-600" />
          <div>
            <div className="text-sm font-medium">Health</div>
            <div className="text-xs text-muted-foreground">75% Optimal</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex flex-col items-center gap-2" 
          onClick={() => handleInfluenceClick('Mental Focus')}
        >
          <Brain className="h-5 w-5 text-amber-600" />
          <div>
            <div className="text-sm font-medium">Focus</div>
            <div className="text-xs text-muted-foreground">65% Sharp</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-3 flex flex-col items-center gap-2" 
          onClick={() => handleInfluenceClick('Energy Levels')}
        >
          <Coffee className="h-5 w-5 text-cyan-600" />
          <div>
            <div className="text-sm font-medium">Energy</div>
            <div className="text-xs text-muted-foreground">70% High</div>
          </div>
        </Button>
      </div>
      
      <div className="text-sm text-muted-foreground bg-gray-50 dark:bg-gray-800 p-3 rounded">
        Prepzr analyzes these factors to help you create an optimal learning environment and improve your study efficiency.
      </div>
    </div>
  );
};

export default SurroundingInfluencesSection;
