
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from '@/types/user/base';
import { getCurrentMoodFromLocalStorage } from '@/components/dashboard/student/mood-tracking/moodUtils';
import { useMoodStudyIntegration } from '@/hooks/useMoodStudyIntegration';
import { BarChart, Clock, Save } from 'lucide-react';

interface StudyTimeAllocationProps {
  onUpdate?: (allocations: Record<string, number>) => void;
}

const StudyTimeAllocation: React.FC<StudyTimeAllocationProps> = ({ onUpdate }) => {
  const { toast } = useToast();
  const { 
    currentMood,
    timeAllocations: moodBasedAllocations,
    getTimeAllocations,
    updateTimeAllocation 
  } = useMoodStudyIntegration();
  
  // Initialize with saved allocations or mood-based defaults
  const [allocations, setAllocations] = useState<Record<string, number>>(getTimeAllocations());
  const [totalTime, setTotalTime] = useState(0);
  
  // Calculate total study time
  useEffect(() => {
    const total = Object.values(allocations).reduce((sum, minutes) => sum + minutes, 0);
    setTotalTime(total);
  }, [allocations]);
  
  // Core subjects for time allocation
  const subjects = [
    { key: "Physics", color: "bg-blue-500" },
    { key: "Chemistry", color: "bg-green-500" },
    { key: "Biology", color: "bg-purple-500" },
    { key: "Mathematics", color: "bg-amber-500" }
  ];
  
  // Handle slider change for a specific subject
  const handleSliderChange = (subject: string, value: number[]) => {
    const updatedAllocations = { ...allocations, [subject]: value[0] };
    setAllocations(updatedAllocations);
  };
  
  // Save all allocations
  const handleSaveAllocations = () => {
    // Save each subject allocation
    subjects.forEach(subject => {
      updateTimeAllocation(subject.key, allocations[subject.key]);
    });
    
    if (onUpdate) {
      onUpdate(allocations);
    }
    
    toast({
      title: "Study time allocations saved",
      description: `Total weekly study time: ${totalTime} minutes`,
    });
  };
  
  // Apply suggested allocations based on current mood
  const handleApplySuggestions = () => {
    setAllocations(moodBasedAllocations);
    
    toast({
      title: "Mood-based recommendations applied",
      description: `Study time adjusted based on your ${currentMood?.toLowerCase() || 'current'} mood`,
    });
  };
  
  // Get help message based on total time
  const getHelpMessage = () => {
    if (totalTime < 120) {
      return "Consider increasing your study time for better results";
    } else if (totalTime > 360) {
      return "Make sure to take breaks during longer study sessions";
    }
    return "Your study time allocation looks balanced";
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-primary" />
            <span>Weekly Study Time Allocation</span>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleApplySuggestions}
            className="ml-2"
          >
            Apply Mood Suggestions
          </Button>
        </CardTitle>
        <CardDescription>
          Adjust your weekly study time for each subject (in minutes)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Weekly allocation sliders */}
          {subjects.map((subject) => (
            <div key={subject.key} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.key}</span>
                <span className="text-muted-foreground">{allocations[subject.key]} min/week</span>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-3 h-8 rounded-full ${subject.color}`} />
                <Slider
                  onValueChange={(value) => handleSliderChange(subject.key, value)}
                  value={[allocations[subject.key]]}
                  min={15}
                  max={180}
                  step={15}
                  className="flex-1"
                />
              </div>
            </div>
          ))}
          
          {/* Summary and save button */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium">Total weekly study time</p>
                <p className="text-sm text-muted-foreground">{getHelpMessage()}</p>
              </div>
              <div className="text-xl font-bold">{totalTime} min</div>
            </div>
            
            {/* Visual representation of time distribution */}
            <div className="h-4 w-full flex rounded-full overflow-hidden mb-6">
              {subjects.map((subject) => {
                const percentage = (allocations[subject.key] / totalTime) * 100;
                return (
                  <div 
                    key={subject.key} 
                    className={`${subject.color}`} 
                    style={{ width: `${percentage}%` }}
                    title={`${subject.key}: ${Math.round(percentage)}%`}
                  />
                );
              })}
            </div>
            
            <Button 
              onClick={handleSaveAllocations} 
              className="w-full"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Allocations
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTimeAllocation;
