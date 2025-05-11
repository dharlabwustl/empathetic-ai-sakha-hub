
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SubjectAllocation {
  name: string;
  percentage: number;
  color: string;
}

interface StudyTimeAllocationProps {
  initialAllocations?: SubjectAllocation[];
  totalHoursPerWeek?: number;
  onSave?: (allocations: SubjectAllocation[]) => void;
}

const StudyTimeAllocation: React.FC<StudyTimeAllocationProps> = ({ 
  initialAllocations,
  totalHoursPerWeek = 40,
  onSave
}) => {
  const { toast } = useToast();
  const [allocations, setAllocations] = useState<SubjectAllocation[]>([
    { name: 'Physics', percentage: 30, color: '#4338ca' },
    { name: 'Chemistry', percentage: 25, color: '#0891b2' },
    { name: 'Biology', percentage: 25, color: '#65a30d' },
    { name: 'Mathematics', percentage: 15, color: '#f59e0b' },
    { name: 'English', percentage: 5, color: '#db2777' }
  ]);
  
  // Load saved allocations from localStorage
  useEffect(() => {
    const savedAllocations = localStorage.getItem('study_time_allocations');
    if (savedAllocations) {
      try {
        const parsed = JSON.parse(savedAllocations);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAllocations(parsed);
        }
      } catch (err) {
        console.error("Error loading saved study time allocations:", err);
      }
    } else if (initialAllocations && initialAllocations.length > 0) {
      setAllocations(initialAllocations);
    }
  }, [initialAllocations]);

  const handleSliderChange = (index: number, value: number[]) => {
    const newPercentage = value[0];
    
    // Calculate adjustment needed for other subjects
    const oldPercentage = allocations[index].percentage;
    const adjustment = newPercentage - oldPercentage;
    
    // If no change, return
    if (adjustment === 0) return;
    
    // Create a copy of allocations for adjustment
    const newAllocations = [...allocations];
    
    // Apply the change to the subject being adjusted
    newAllocations[index] = {...newAllocations[index], percentage: newPercentage};
    
    // Calculate total of other subjects' percentages
    const otherSubjectsTotal = allocations.reduce((sum, subject, i) => 
      i === index ? sum : sum + subject.percentage, 0
    );
    
    // Distribute the adjustment proportionally among other subjects
    for (let i = 0; i < newAllocations.length; i++) {
      if (i !== index) {
        // Calculate proportional adjustment
        const proportionalAdjustment = (allocations[i].percentage / otherSubjectsTotal) * -adjustment;
        
        // Apply adjustment with a minimum check to prevent negative values
        newAllocations[i] = {
          ...newAllocations[i], 
          percentage: Math.max(1, allocations[i].percentage + proportionalAdjustment)
        };
      }
    }
    
    // Round percentages and ensure they sum to 100
    const roundedAllocations = normalizePercentages(newAllocations);
    setAllocations(roundedAllocations);
  };

  // Normalize percentages to ensure they sum to 100%
  const normalizePercentages = (allocations: SubjectAllocation[]): SubjectAllocation[] => {
    // Round percentages to integers
    const rounded = allocations.map(subject => ({
      ...subject,
      percentage: Math.round(subject.percentage)
    }));
    
    // Calculate sum after rounding
    const sum = rounded.reduce((total, subject) => total + subject.percentage, 0);
    
    // If sum is exactly 100, return as is
    if (sum === 100) return rounded;
    
    // Adjust to ensure sum is 100
    const difference = 100 - sum;
    if (difference !== 0) {
      // Find the subject with the highest percentage to adjust
      const highestIndex = rounded
        .map((subject, index) => ({ index, percentage: subject.percentage }))
        .sort((a, b) => b.percentage - a.percentage)[0].index;
      
      rounded[highestIndex].percentage += difference;
    }
    
    return rounded;
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('study_time_allocations', JSON.stringify(allocations));
    
    // Call onSave callback if provided
    if (onSave) {
      onSave(allocations);
    }
    
    // Show success toast
    toast({
      title: "Study time allocation saved",
      description: "Your weekly study time allocations have been updated."
    });
  };

  const calculateHoursPerWeek = (percentage: number): number => {
    return Math.round((percentage / 100) * totalHoursPerWeek * 10) / 10;
  };
  
  const calculateHoursPerDay = (percentage: number): number => {
    return Math.round((percentage / 100) * totalHoursPerWeek * 10) / 70; // Divide by 7 days
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Study Time Allocation</CardTitle>
        <CardDescription>
          Adjust how you distribute your {totalHoursPerWeek} study hours per week across subjects
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {allocations.map((subject, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{subject.name}</span>
                  <div className="text-sm text-muted-foreground">
                    {calculateHoursPerWeek(subject.percentage)} hrs/week 
                    ({calculateHoursPerDay(subject.percentage).toFixed(1)} hrs/day)
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-semibold">{subject.percentage}%</span>
                </div>
              </div>
              
              <Slider
                defaultValue={[subject.percentage]}
                max={60}
                min={5}
                step={1}
                value={[subject.percentage]}
                onValueChange={(value) => handleSliderChange(index, value)}
                className="w-full"
              />
              
              <div 
                className="h-2 w-full rounded-full" 
                style={{ backgroundColor: subject.color }}
              ></div>
            </div>
          ))}
          
          <div className="flex justify-between mt-6">
            <div>
              <span className="text-sm text-muted-foreground">Total</span>
              <div className="font-semibold">{totalHoursPerWeek} hours/week</div>
            </div>
            <Button onClick={handleSave}>Save Allocation</Button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 mt-4">
            <h4 className="font-medium mb-1">Study Time Distribution</h4>
            <div className="flex h-6 overflow-hidden rounded-full">
              {allocations.map((subject, index) => (
                <div
                  key={index}
                  style={{
                    width: `${subject.percentage}%`,
                    backgroundColor: subject.color
                  }}
                  className="h-full"
                  title={`${subject.name}: ${subject.percentage}%`}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
              {allocations.map((subject, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  ></div>
                  <span>{subject.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTimeAllocation;
