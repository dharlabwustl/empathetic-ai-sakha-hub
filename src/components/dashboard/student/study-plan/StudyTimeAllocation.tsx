
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Save, Undo2, PieChart } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  currentHours: number;
  color: string;
}

interface StudyTimeAllocationProps {
  weeklyTotal?: number;
  onSave?: (allocations: Subject[]) => void;
}

const StudyTimeAllocation: React.FC<StudyTimeAllocationProps> = ({
  weeklyTotal = 40,
  onSave
}) => {
  const { toast } = useToast();
  const [totalAllocated, setTotalAllocated] = useState(0);
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "physics", name: "Physics", currentHours: 10, color: "bg-blue-500" },
    { id: "chemistry", name: "Chemistry", currentHours: 8, color: "bg-green-500" },
    { id: "biology", name: "Biology", currentHours: 10, color: "bg-purple-500" },
    { id: "mathematics", name: "Mathematics", currentHours: 12, color: "bg-amber-500" }
  ]);
  const [originalSubjects, setOriginalSubjects] = useState<Subject[]>([...subjects]);

  // Calculate total hours allocated when subjects change
  React.useEffect(() => {
    const total = subjects.reduce((sum, subject) => sum + subject.currentHours, 0);
    setTotalAllocated(total);
  }, [subjects]);

  const handleSliderChange = (id: string, values: number[]) => {
    setSubjects(prevSubjects =>
      prevSubjects.map(subject =>
        subject.id === id ? { ...subject, currentHours: values[0] } : subject
      )
    );
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('study_time_allocations', JSON.stringify(subjects));
    
    if (onSave) {
      onSave(subjects);
    }
    
    // Update original state to reflect current state
    setOriginalSubjects([...subjects]);
    
    toast({
      title: "Study time allocation saved!",
      description: "Your weekly study schedule has been updated.",
      variant: "default"
    });
  };

  const handleReset = () => {
    setSubjects([...originalSubjects]);
    toast({
      title: "Changes discarded",
      description: "Study time allocation reset to previous values.",
      variant: "destructive"
    });
  };

  // Load saved allocations from localStorage on component mount
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('study_time_allocations');
      if (saved) {
        const parsedData = JSON.parse(saved);
        setSubjects(parsedData);
        setOriginalSubjects(parsedData);
      }
    } catch (error) {
      console.error("Error loading saved study time allocations:", error);
    }
  }, []);

  const isOverAllocated = totalAllocated > weeklyTotal;
  const remainingHours = weeklyTotal - totalAllocated;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-purple-500" />
            <span>Weekly Study Time Allocation</span>
          </div>
          <div className="text-sm font-normal text-gray-500">
            Total: {weeklyTotal} hours/week
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className={`p-4 rounded-md ${
            isOverAllocated 
              ? "bg-red-50 text-red-800 border border-red-200" 
              : remainingHours <= 2 
                ? "bg-amber-50 text-amber-800 border border-amber-200" 
                : "bg-blue-50 text-blue-800 border border-blue-200"
          }`}>
            <div className="flex justify-between">
              <span>Hours allocated:</span>
              <span className="font-medium">{totalAllocated} / {weeklyTotal}</span>
            </div>
            <div className="mt-2 text-sm">
              {isOverAllocated ? (
                <span>You've allocated {totalAllocated - weeklyTotal} hours more than recommended.</span>
              ) : (
                <span>You have {remainingHours} hours remaining to allocate.</span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {subjects.map(subject => (
              <div key={subject.id} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{subject.name}</span>
                  <span>{subject.currentHours} hrs/week</span>
                </div>
                <Slider
                  value={[subject.currentHours]}
                  min={0}
                  max={24}
                  step={1}
                  onValueChange={(values) => handleSliderChange(subject.id, values)}
                  className={subject.color.replace("bg-", "slider-")}
                />
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div 
                    className={`h-full ${subject.color}`} 
                    style={{ width: `${(subject.currentHours / 24) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-1"
            >
              <Undo2 className="h-4 w-4" />
              Reset
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              disabled={isOverAllocated}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Allocation
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTimeAllocation;
