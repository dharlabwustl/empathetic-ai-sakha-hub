
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  // Function to handle changes to the influence sliders
  const handleInfluenceChange = (influenceType: string, value: number[]) => {
    toast({
      title: `${influenceType} influence updated`,
      description: `${influenceType} influence set to ${value[0]}%`,
    });
  };

  // Toggle the collapsed state of the influence meter
  const toggleInfluenceMeter = () => {
    setInfluenceMeterCollapsed(!influenceMeterCollapsed);
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <div 
        className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-between cursor-pointer"
        onClick={toggleInfluenceMeter}
      >
        <h3 className="font-medium flex items-center">
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 p-1 rounded mr-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M19 12H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 19V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 9V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          Surrounding Influences
        </h3>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {influenceMeterCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>
      
      {!influenceMeterCollapsed && (
        <CardContent className="pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Log how different factors are affecting your ability to study today. This helps Prepzr optimize your study experience.
          </p>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Physical Environment</label>
                <span className="text-xs text-muted-foreground">65%</span>
              </div>
              <Slider
                defaultValue={[65]}
                max={100}
                step={1}
                className="mb-1"
                onValueChange={(value) => handleInfluenceChange("Physical Environment", value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Distracting</span>
                <span>Neutral</span>
                <span>Conducive</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Study Material Quality</label>
                <span className="text-xs text-muted-foreground">80%</span>
              </div>
              <Slider
                defaultValue={[80]}
                max={100}
                step={1}
                className="mb-1"
                onValueChange={(value) => handleInfluenceChange("Study Material Quality", value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Adequate</span>
                <span>Excellent</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Sleep Quality</label>
                <span className="text-xs text-muted-foreground">50%</span>
              </div>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="mb-1"
                onValueChange={(value) => handleInfluenceChange("Sleep Quality", value)}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Poor</span>
                <span>Adequate</span>
                <span>Well-rested</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Overall Study Effectiveness</label>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">72%</span>
              </div>
              <Progress value={72} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">Your overall study effectiveness based on all factors.</p>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => {
                toast({
                  title: "Influences saved",
                  description: "Your surrounding influences have been recorded. Prepzr will use this to personalize your study experience."
                });
              }}>
                Save Influences
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default SurroundingInfluencesSection;
