
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface Subject {
  id: string;
  name: string;
  allocation: number;
  color: string;
}

interface StudyTimeAllocationProps {
  defaultSubjects?: Subject[];
  totalHours?: number;
  onSave?: (allocations: Subject[]) => void;
}

const StudyTimeAllocation: React.FC<StudyTimeAllocationProps> = ({
  defaultSubjects,
  totalHours = 40,
  onSave
}) => {
  const initialSubjects: Subject[] = defaultSubjects || [
    { id: '1', name: 'Physics', allocation: 30, color: 'bg-blue-500' },
    { id: '2', name: 'Chemistry', allocation: 25, color: 'bg-green-500' },
    { id: '3', name: 'Biology', allocation: 25, color: 'bg-purple-500' },
    { id: '4', name: 'Mathematics', allocation: 20, color: 'bg-yellow-500' }
  ];
  
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [unallocatedPercentage, setUnallocatedPercentage] = useState(0);
  
  // Load saved allocations from localStorage if available
  useEffect(() => {
    const savedAllocations = localStorage.getItem('study_time_allocations');
    if (savedAllocations) {
      try {
        const parsed = JSON.parse(savedAllocations);
        setSubjects(parsed);
        calculateUnallocated(parsed);
      } catch (error) {
        console.error("Error loading saved allocations:", error);
      }
    } else {
      calculateUnallocated(initialSubjects);
    }
  }, []);
  
  // Calculate unallocated percentage
  const calculateUnallocated = (currentSubjects: Subject[]) => {
    const total = currentSubjects.reduce((sum, subject) => sum + subject.allocation, 0);
    setUnallocatedPercentage(Math.max(0, 100 - total));
  };
  
  // Handle slider change
  const handleAllocationChange = (subjectId: string, newValue: number[]) => {
    const updatedSubjects = subjects.map(subject => 
      subject.id === subjectId ? { ...subject, allocation: newValue[0] } : subject
    );
    
    setSubjects(updatedSubjects);
    calculateUnallocated(updatedSubjects);
  };
  
  // Convert percentage to hours
  const percentageToHours = (percentage: number) => {
    return (percentage / 100 * totalHours).toFixed(1);
  };
  
  // Save allocations
  const saveAllocations = () => {
    localStorage.setItem('study_time_allocations', JSON.stringify(subjects));
    
    if (onSave) {
      onSave(subjects);
    }
    
    toast({
      title: "Study time allocations saved",
      description: "Your weekly study plan has been updated.",
    });
  };
  
  // Reset to default allocations
  const resetAllocations = () => {
    setSubjects(initialSubjects);
    calculateUnallocated(initialSubjects);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Weekly Study Time Allocation</span>
          <span className="text-sm font-normal text-muted-foreground">
            Total: {totalHours} hours/week
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress bar showing allocation */}
        <div className="mb-6">
          <div className="h-8 w-full rounded-lg flex overflow-hidden mb-2">
            {subjects.map((subject) => (
              <div 
                key={subject.id}
                className={`h-full ${subject.color}`}
                style={{ width: `${subject.allocation}%` }}
                title={`${subject.name}: ${subject.allocation}%`}
              />
            ))}
            {unallocatedPercentage > 0 && (
              <div 
                className="h-full bg-gray-200 dark:bg-gray-700"
                style={{ width: `${unallocatedPercentage}%` }}
                title={`Unallocated: ${unallocatedPercentage}%`}
              />
            )}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>
        
        {/* Table with sliders for each subject */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Allocation</TableHead>
              <TableHead className="text-right">Hours</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${subject.color}`} />
                    {subject.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="w-full max-w-[180px]">
                      <Slider
                        value={[subject.allocation]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => handleAllocationChange(subject.id, value)}
                      />
                    </div>
                    <div className="w-12 text-right">
                      {subject.allocation}%
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {percentageToHours(subject.allocation)}h
                </TableCell>
              </TableRow>
            ))}
            {unallocatedPercentage > 0 && (
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600" />
                    Unallocated
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="w-full max-w-[180px] h-4" />
                    <div className="w-12 text-right text-muted-foreground">
                      {unallocatedPercentage}%
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {percentageToHours(unallocatedPercentage)}h
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={resetAllocations}>
            Reset
          </Button>
          <Button onClick={saveAllocations}>
            Save Allocations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyTimeAllocation;
