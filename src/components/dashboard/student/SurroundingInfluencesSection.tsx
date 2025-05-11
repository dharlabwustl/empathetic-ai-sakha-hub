
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SurroundingInfluencesSectionProps {
  influenceMeterCollapsed: boolean;
  setInfluenceMeterCollapsed: (collapsed: boolean) => void;
}

const SurroundingInfluencesSection: React.FC<SurroundingInfluencesSectionProps> = ({
  influenceMeterCollapsed,
  setInfluenceMeterCollapsed
}) => {
  // Simple statistical model for influence distribution (for illustration purposes)
  // In a real app, this would be calculated from user data
  const [influenceData, setInfluenceData] = useState({
    positive: 68, // % of positive influence
    negative: 32, // % of negative influence
    totals: {
      mediaConsumption: 25, // in hours per week
      socialInfluence: 40, // % strength of social pressure
      academicWorkload: 65, // % of maximum workload
      mentalState: 75 // % positive mental state
    }
  });
  
  // Toggle expansion state
  const toggleExpansion = () => {
    setInfluenceMeterCollapsed(!influenceMeterCollapsed);
  };

  // Function to get color class based on value
  const getColorForValue = (value: number) => {
    if (value >= 80) return "bg-green-500";
    if (value >= 60) return "bg-emerald-500";
    if (value >= 40) return "bg-yellow-500";
    if (value >= 20) return "bg-orange-500";
    return "bg-red-500";
  };

  // Function to update influence parameters (simulate real data change)
  const updateInfluenceParameter = (parameter: keyof typeof influenceData.totals, change: number) => {
    const newValue = Math.min(Math.max(influenceData.totals[parameter] + change, 0), 100);
    
    const updatedTotals = {
      ...influenceData.totals,
      [parameter]: newValue
    };
    
    // Recalculate overall influence based on parameter changes
    // Simple weighted average for demonstration
    const positiveInfluence = (
      updatedTotals.mentalState * 0.4 + 
      (100 - updatedTotals.mediaConsumption) * 0.2 + 
      (100 - updatedTotals.socialInfluence) * 0.2 +
      (100 - updatedTotals.academicWorkload) * 0.2
    );
    
    setInfluenceData({
      positive: Math.round(positiveInfluence),
      negative: Math.round(100 - positiveInfluence),
      totals: updatedTotals
    });
  };

  return (
    <Card className="mb-6 overflow-hidden">
      <CardHeader className="py-3 px-4 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center">
            Surrounding Influences
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">About Surrounding Influences</h4>
                  <p className="text-xs text-muted-foreground">
                    Prepzr analyzes your environment and habits to identify factors affecting your studies.
                    Adjust these parameters to see how your environment impacts your learning potential.
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 px-1.5"
            onClick={toggleExpansion}
          >
            {influenceMeterCollapsed ? (
              <>
                <span className="text-xs mr-1">Show Details</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <span className="text-xs mr-1">Hide Details</span>
                <ChevronUp className="h-3.5 w-3.5" />
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      {/* Influence Meter - Always visible */}
      <CardContent className="p-4 space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1.5"></span>
              <span>Positive Influence</span>
            </div>
            <span className="font-medium">{influenceData.positive}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></span>
              <span>Negative Influence</span>
            </div>
            <span className="font-medium">{influenceData.negative}%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div 
              className={getColorForValue(influenceData.positive)} 
              style={{ width: `${influenceData.positive}%` }}
              className="h-full rounded-full"
            ></div>
          </div>
        </div>
        
        {/* Detailed influence factors - shown when expanded */}
        {!influenceMeterCollapsed && (
          <div className="pt-2 border-t space-y-4">
            {/* Media Consumption */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Media Consumption</span>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => updateInfluenceParameter('mediaConsumption', -5)}
                  >-</Button>
                  <span className="text-sm w-10 text-center">{influenceData.totals.mediaConsumption}h</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => updateInfluenceParameter('mediaConsumption', 5)}
                  >+</Button>
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={getColorForValue(100 - influenceData.totals.mediaConsumption)} 
                  style={{ width: `${influenceData.totals.mediaConsumption}%` }}
                  className="h-full rounded-full"
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {influenceData.totals.mediaConsumption > 30 
                  ? "Consider reducing screen time to improve focus and sleep quality."
                  : "Healthy balance of media consumption. Keep it up!"}
              </p>
            </div>
            
            {/* Social Influence */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Social Pressure</span>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => updateInfluenceParameter('socialInfluence', -5)}
                  >-</Button>
                  <span className="text-sm w-10 text-center">{influenceData.totals.socialInfluence}%</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => updateInfluenceParameter('socialInfluence', 5)}
                  >+</Button>
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={getColorForValue(100 - influenceData.totals.socialInfluence)} 
                  style={{ width: `${influenceData.totals.socialInfluence}%` }}
                  className="h-full rounded-full"
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {influenceData.totals.socialInfluence > 50 
                  ? "High social pressure can impact your study decisions. Stay focused on your goals."
                  : "You're balancing social influences well with your study goals."}
              </p>
            </div>
            
            {/* Academic Workload */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Academic Workload</span>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => updateInfluenceParameter('academicWorkload', -5)}
                  >-</Button>
                  <span className="text-sm w-10 text-center">{influenceData.totals.academicWorkload}%</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => updateInfluenceParameter('academicWorkload', 5)}
                  >+</Button>
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={getColorForValue(
                    influenceData.totals.academicWorkload > 80 ? 40 : 
                    influenceData.totals.academicWorkload > 60 ? 80 : 
                    influenceData.totals.academicWorkload < 30 ? 40 : 100
                  )} 
                  style={{ width: `${influenceData.totals.academicWorkload}%` }}
                  className="h-full rounded-full"
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {influenceData.totals.academicWorkload > 80 
                  ? "Your workload is very high. Consider better scheduling to prevent burnout."
                  : influenceData.totals.academicWorkload < 40 
                    ? "Your workload is light. Consider increasing study hours for better preparation."
                    : "Your academic workload is well-balanced."}
              </p>
            </div>
            
            {/* Mental State */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Mental Wellbeing</span>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => updateInfluenceParameter('mentalState', -5)}
                  >-</Button>
                  <span className="text-sm w-10 text-center">{influenceData.totals.mentalState}%</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 w-7 p-0" 
                    onClick={() => updateInfluenceParameter('mentalState', 5)}
                  >+</Button>
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className={getColorForValue(influenceData.totals.mentalState)} 
                  style={{ width: `${influenceData.totals.mentalState}%` }}
                  className="h-full rounded-full"
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">
                {influenceData.totals.mentalState < 50 
                  ? "Consider using the Feel Good Corner to improve your mental wellbeing."
                  : "Your mental wellbeing is good. Keep practicing self-care!"}
              </p>
            </div>
            
            <div className="pt-2 text-center">
              <p className="text-xs text-muted-foreground">
                Prepzr's AI analyzes how these factors affect your study performance. Adjust parameters to see potential impacts.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SurroundingInfluencesSection;
