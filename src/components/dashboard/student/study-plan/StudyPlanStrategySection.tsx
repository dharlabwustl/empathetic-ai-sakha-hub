import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

type SubjectAllocation = {
  subject: string;
  percentage: number;
  color: string;
};

const StudyPlanStrategySection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [allocations, setAllocations] = useState<SubjectAllocation[]>([
    { subject: 'Mathematics', percentage: 30, color: 'bg-blue-500' },
    { subject: 'Physics', percentage: 25, color: 'bg-green-500' },
    { subject: 'Chemistry', percentage: 25, color: 'bg-purple-500' },
    { subject: 'Biology', percentage: 20, color: 'bg-amber-500' },
  ]);

  // Load saved time allocations from localStorage on component mount
  useEffect(() => {
    const savedAllocations = localStorage.getItem('study_time_allocations');
    if (savedAllocations) {
      try {
        const parsedAllocations = JSON.parse(savedAllocations);
        setAllocations(parsedAllocations);
      } catch (error) {
        console.error('Error parsing saved allocations:', error);
      }
    }
  }, []);

  // Copy of allocations for editing
  const [tempAllocations, setTempAllocations] = useState<SubjectAllocation[]>([...allocations]);

  // Reset temporary allocations when opening the dialog
  useEffect(() => {
    if (isEditingTime) {
      setTempAllocations([...allocations]);
    }
  }, [isEditingTime, allocations]);

  const handleSliderChange = (index: number, newValue: number[]) => {
    const updatedAllocations = [...tempAllocations];
    
    // Calculate the total percentage of all subjects except the one being changed
    const otherSubjectsTotal = tempAllocations.reduce((total, allocation, i) => 
      i !== index ? total + allocation.percentage : total, 0
    );
    
    const previousValue = tempAllocations[index].percentage;
    const newPercentage = newValue[0];
    const difference = newPercentage - previousValue;
    
    // Ensure total is always 100%
    if (otherSubjectsTotal + newPercentage !== 100) {
      // Adjust other subjects proportionally
      const remainingSubjects = tempAllocations.length - 1;
      const adjustmentPerSubject = -difference / remainingSubjects;
      
      updatedAllocations.forEach((allocation, i) => {
        if (i !== index) {
          allocation.percentage = Math.max(5, Math.round(allocation.percentage + adjustmentPerSubject));
        }
      });
    }
    
    updatedAllocations[index].percentage = newPercentage;
    
    // Ensure we total exactly 100%
    const total = updatedAllocations.reduce((sum, item) => sum + item.percentage, 0);
    if (total !== 100) {
      // Adjust the last subject that's not the current one
      const adjustIndex = index === updatedAllocations.length - 1 ? index - 1 : updatedAllocations.length - 1;
      updatedAllocations[adjustIndex].percentage += (100 - total);
    }
    
    setTempAllocations(updatedAllocations);
  };

  const saveTimeAllocations = () => {
    setAllocations(tempAllocations);
    localStorage.setItem('study_time_allocations', JSON.stringify(tempAllocations));
    setIsEditingTime(false);
    
    toast({
      title: "Time allocations updated",
      description: "Your weekly subject time allocations have been saved."
    });
  };

  const handleViewComplete = () => {
    navigate('/dashboard/student/study-plan/adaptive');
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">Study Plan Strategy</CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditingTime(true)}
          >
            Edit Time
          </Button>
          <Button 
            size="sm" 
            onClick={handleViewComplete}
          >
            View Complete Plan
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Weekly Subject Time Allocation</h4>
          <div className="h-8 rounded-full overflow-hidden flex">
            {allocations.map((allocation, index) => (
              <div 
                key={index} 
                className={`${allocation.color} flex items-center justify-center`}
                style={{ width: `${allocation.percentage}%` }}
              >
                <span className="text-xs text-white font-medium truncate px-1">
                  {allocation.percentage > 10 ? `${allocation.percentage}%` : ''}
                </span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {allocations.map((allocation, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-full ${allocation.color}`}></div>
                <span>{allocation.subject}: {allocation.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dialog for editing time allocations */}
        <Dialog open={isEditingTime} onOpenChange={setIsEditingTime}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Weekly Time Allocation</DialogTitle>
              <DialogDescription>
                Adjust the percentage of time you want to spend on each subject per week.
                The total must add up to 100%.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {tempAllocations.map((allocation, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium flex items-center gap-1.5">
                      <div className={`w-3 h-3 rounded-full ${allocation.color}`}></div>
                      {allocation.subject}
                    </label>
                    <span className="text-sm">{allocation.percentage}%</span>
                  </div>
                  <Slider
                    value={[allocation.percentage]}
                    min={5}
                    max={70}
                    step={5}
                    onValueChange={(value) => handleSliderChange(index, value)}
                    className={allocation.color.replace('bg-', 'bg-opacity-20 ')}
                  />
                </div>
              ))}
              <div className="flex justify-between text-sm font-medium">
                <span>Total:</span>
                <span>{tempAllocations.reduce((sum, item) => sum + item.percentage, 0)}%</span>
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditingTime(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                onClick={saveTimeAllocations}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default StudyPlanStrategySection;
