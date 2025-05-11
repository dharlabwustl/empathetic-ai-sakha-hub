
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, Edit2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Subject {
  id: string;
  name: string;
  color: string;
  timeAllocation: number;
}

interface TimeAllocationEditorProps {
  onSave?: (allocations: Subject[]) => void;
}

const TimeAllocationEditor: React.FC<TimeAllocationEditorProps> = ({ onSave }) => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Physics', color: 'bg-blue-500', timeAllocation: 25 },
    { id: '2', name: 'Chemistry', color: 'bg-green-500', timeAllocation: 25 },
    { id: '3', name: 'Biology', color: 'bg-purple-500', timeAllocation: 25 },
    { id: '4', name: 'Mathematics', color: 'bg-red-500', timeAllocation: 25 },
  ]);
  
  const [editing, setEditing] = useState(false);
  const [totalAllocation, setTotalAllocation] = useState(100);
  const [savedAllocations, setSavedAllocations] = useState<Subject[]>([]);
  
  useEffect(() => {
    // Load saved allocations from localStorage if available
    const saved = localStorage.getItem('subjectTimeAllocations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSubjects(parsed);
        setSavedAllocations(parsed);
      } catch (e) {
        console.error('Error parsing saved time allocations:', e);
      }
    } else {
      // Save initial allocations to localStorage
      localStorage.setItem('subjectTimeAllocations', JSON.stringify(subjects));
      setSavedAllocations([...subjects]);
    }
  }, []);
  
  const handleChangeAllocation = (index: number, value: number[]) => {
    const newValue = value[0];
    const diff = newValue - subjects[index].timeAllocation;
    
    // Don't allow changes that would make total go over 100%
    if (totalAllocation + diff > 100) {
      toast({
        title: "Cannot exceed 100% allocation",
        description: "Please reduce allocation for other subjects first.",
        variant: "destructive"
      });
      return;
    }
    
    // Update the subject's allocation
    const newSubjects = [...subjects];
    newSubjects[index].timeAllocation = newValue;
    setSubjects(newSubjects);
    
    // Update total allocation
    setTotalAllocation(prev => prev + diff);
  };
  
  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('subjectTimeAllocations', JSON.stringify(subjects));
    setSavedAllocations([...subjects]);
    
    // Call the onSave callback if provided
    if (onSave) {
      onSave(subjects);
    }
    
    setEditing(false);
    toast({
      title: "Time allocations saved",
      description: "Your weekly study plan has been updated.",
    });
  };
  
  const handleCancel = () => {
    // Revert to saved allocations
    setSubjects([...savedAllocations]);
    setEditing(false);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Weekly Time Allocation</CardTitle>
          {!editing ? (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-8" 
              onClick={() => setEditing(true)}
            >
              <Edit2 className="mr-1 h-4 w-4" /> Edit Allocations
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8" 
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="h-8" 
                onClick={handleSave}
              >
                <Save className="mr-1 h-4 w-4" /> Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500">Subject</span>
            <span className="text-sm font-medium text-gray-500">Allocation</span>
          </div>
          
          {subjects.map((subject, index) => (
            <div key={subject.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${subject.color} mr-2`}></div>
                  <span>{subject.name}</span>
                </div>
                <Badge variant="outline" className={`${editing ? 'bg-blue-100 text-blue-800' : ''}`}>
                  <Clock className="mr-1 h-3 w-3" /> {subject.timeAllocation}%
                </Badge>
              </div>
              
              {editing && (
                <Slider
                  defaultValue={[subject.timeAllocation]}
                  value={[subject.timeAllocation]}
                  max={100}
                  min={5}
                  step={5}
                  onValueChange={(value) => handleChangeAllocation(index, value)}
                  className="py-2"
                />
              )}
            </div>
          ))}
          
          <div className="pt-2 mt-4 border-t">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">
                Total Allocated
              </div>
              <Badge className={totalAllocation === 100 ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'}>
                {totalAllocation === 100 && <Check className="mr-1 h-3 w-3" />}
                {totalAllocation}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeAllocationEditor;
