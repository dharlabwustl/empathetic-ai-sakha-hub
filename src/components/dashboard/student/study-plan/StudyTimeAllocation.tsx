
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Clock, AlertTriangle, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Subject {
  id: string;
  name: string;
  color: string;
  hours: number;
  priority: 'high' | 'medium' | 'low';
}

interface StudyTimeAllocationProps {
  weeklyTotal: number;
  onSave: (allocations: Subject[]) => void;
}

const StudyTimeAllocation: React.FC<StudyTimeAllocationProps> = ({ weeklyTotal = 40, onSave }) => {
  const { toast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [allocatedHours, setAllocatedHours] = useState(0);
  const [draggedSubjectId, setDraggedSubjectId] = useState<string | null>(null);

  // Load saved allocations from localStorage
  useEffect(() => {
    const savedAllocations = localStorage.getItem('study_time_allocations');
    if (savedAllocations) {
      try {
        const parsedAllocations = JSON.parse(savedAllocations);
        setSubjects(parsedAllocations);
        calculateTotal(parsedAllocations);
      } catch (error) {
        console.error('Error loading saved allocations:', error);
        initializeDefaultSubjects();
      }
    } else {
      initializeDefaultSubjects();
    }
  }, []);

  // Initialize default subjects if none are saved
  const initializeDefaultSubjects = () => {
    const defaultSubjects: Subject[] = [
      { id: '1', name: 'Physics', color: '#3b82f6', hours: 10, priority: 'high' },
      { id: '2', name: 'Chemistry', color: '#10b981', hours: 8, priority: 'high' },
      { id: '3', name: 'Biology', color: '#ef4444', hours: 8, priority: 'medium' },
      { id: '4', name: 'Mathematics', color: '#8b5cf6', hours: 6, priority: 'medium' },
      { id: '5', name: 'English', color: '#f59e0b', hours: 4, priority: 'low' },
      { id: '6', name: 'Social Studies', color: '#ec4899', hours: 4, priority: 'low' },
    ];
    setSubjects(defaultSubjects);
    calculateTotal(defaultSubjects);
  };

  // Calculate total allocated hours
  const calculateTotal = (subjectsArray: Subject[]) => {
    const total = subjectsArray.reduce((sum, subject) => sum + subject.hours, 0);
    setAllocatedHours(total);
  };

  // Handle slider change for subject hours
  const handleHoursChange = (subjectId: string, newHours: number[]) => {
    const updatedSubjects = subjects.map(subject => 
      subject.id === subjectId ? { ...subject, hours: newHours[0] } : subject
    );
    setSubjects(updatedSubjects);
    calculateTotal(updatedSubjects);
  };

  // Handle direct input of hours
  const handleInputChange = (subjectId: string, value: string) => {
    const hours = parseInt(value);
    if (isNaN(hours) || hours < 0) return;
    
    const updatedSubjects = subjects.map(subject => 
      subject.id === subjectId ? { ...subject, hours } : subject
    );
    setSubjects(updatedSubjects);
    calculateTotal(updatedSubjects);
  };

  // Handle priority change
  const handlePriorityChange = (subjectId: string) => {
    const priorityOrder: { [key: string]: string } = {
      'low': 'medium',
      'medium': 'high',
      'high': 'low'
    };
    
    const updatedSubjects = subjects.map(subject => {
      if (subject.id === subjectId) {
        const newPriority = priorityOrder[subject.priority] as 'high' | 'medium' | 'low';
        return { ...subject, priority: newPriority };
      }
      return subject;
    });
    
    setSubjects(updatedSubjects);
  };

  // Function to add a new subject
  const handleAddSubject = () => {
    const newId = `${subjects.length + 1}-${Date.now()}`;
    const colors = ['#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b', '#ec4899', '#6366f1', '#14b8a6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newSubject: Subject = {
      id: newId,
      name: `Subject ${subjects.length + 1}`,
      color: randomColor,
      hours: 2,
      priority: 'medium'
    };
    
    const updatedSubjects = [...subjects, newSubject];
    setSubjects(updatedSubjects);
    calculateTotal(updatedSubjects);
  };

  // Function to remove a subject
  const handleRemoveSubject = (subjectId: string) => {
    const updatedSubjects = subjects.filter(subject => subject.id !== subjectId);
    setSubjects(updatedSubjects);
    calculateTotal(updatedSubjects);
  };

  // Function to rename a subject
  const handleRenameSubject = (subjectId: string, newName: string) => {
    const updatedSubjects = subjects.map(subject => 
      subject.id === subjectId ? { ...subject, name: newName } : subject
    );
    setSubjects(updatedSubjects);
  };

  // Save allocations
  const handleSave = () => {
    localStorage.setItem('study_time_allocations', JSON.stringify(subjects));
    onSave(subjects);
    
    toast({
      title: "Time allocation saved",
      description: `${subjects.length} subjects updated with a total of ${allocatedHours} hours per week`,
      variant: "default",
    });
  };

  // Reset to default allocations
  const handleReset = () => {
    initializeDefaultSubjects();
    toast({
      title: "Time allocation reset",
      description: "All subjects have been reset to default values",
      variant: "default",
    });
  };

  // Get percentage of weekly total
  const getPercentage = (hours: number) => {
    return (hours / weeklyTotal) * 100;
  };

  // Get color for over/under allocation warning
  const getAllocationStatus = () => {
    if (allocatedHours > weeklyTotal) {
      return { color: 'text-red-500', icon: <AlertTriangle className="h-4 w-4" />, message: 'Over-allocated' };
    } else if (allocatedHours < weeklyTotal) {
      return { color: 'text-amber-500', icon: <Info className="h-4 w-4" />, message: 'Under-allocated' };
    } else {
      return { color: 'text-green-500', icon: <Clock className="h-4 w-4" />, message: 'Perfectly allocated' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'medium': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'low': return 'bg-green-100 text-green-800 hover:bg-green-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, subjectId: string) => {
    setDraggedSubjectId(subjectId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedSubjectId || draggedSubjectId === targetId) return;
    
    const draggedIndex = subjects.findIndex(s => s.id === draggedSubjectId);
    const targetIndex = subjects.findIndex(s => s.id === targetId);
    
    const newSubjects = [...subjects];
    const draggedItem = newSubjects[draggedIndex];
    
    // Remove the dragged item
    newSubjects.splice(draggedIndex, 1);
    // Insert it at the target position
    newSubjects.splice(targetIndex, 0, draggedItem);
    
    setSubjects(newSubjects);
    setDraggedSubjectId(null);
  };

  const status = getAllocationStatus();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Weekly Study Time Allocation</CardTitle>
              <CardDescription>Adjust how many hours you spend on each subject per week</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 text-sm ${status.color}`}>
                {status.icon} {status.message}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Weekly Target: {weeklyTotal} hours</span>
            </div>
            <div>
              <span className={`font-medium ${allocatedHours > weeklyTotal ? 'text-red-500' : ''}`}>
                Allocated: {allocatedHours} hours
              </span>
            </div>
          </div>
          
          <div className="mb-4">
            <Progress 
              value={Math.min(getPercentage(allocatedHours), 100)} 
              className="h-2"
              indicatorClassName={allocatedHours > weeklyTotal ? 'bg-red-500' : ''}
            />
          </div>

          <div className="space-y-6 mt-4">
            {subjects.map((subject) => (
              <div 
                key={subject.id}
                className="p-4 rounded-lg border bg-card"
                draggable
                onDragStart={(e) => handleDragStart(e, subject.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, subject.id)}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: subject.color }}
                    ></div>
                    <Input 
                      value={subject.name}
                      onChange={(e) => handleRenameSubject(subject.id, e.target.value)}
                      className="h-8 text-sm font-medium border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      style={{ width: Math.max(80, subject.name.length * 10) + 'px' }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`h-7 px-2 ${getPriorityColor(subject.priority)}`}
                            onClick={() => handlePriorityChange(subject.id)}
                          >
                            {subject.priority.charAt(0).toUpperCase() + subject.priority.slice(1)} Priority
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Click to change priority</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveSubject(subject.id)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-8 sm:col-span-9">
                    <Slider
                      value={[subject.hours]}
                      min={0}
                      max={Math.max(weeklyTotal, 30)}
                      step={1}
                      onValueChange={(value) => handleHoursChange(subject.id, value)}
                      className="mt-2"
                    />
                  </div>
                  <div className="col-span-4 sm:col-span-3 flex items-center">
                    <Input
                      type="number"
                      value={subject.hours}
                      onChange={(e) => handleInputChange(subject.id, e.target.value)}
                      className="h-8 text-right"
                    />
                    <span className="ml-2 text-sm text-gray-500">hrs</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full" 
                      style={{ 
                        width: `${getPercentage(subject.hours)}%`,
                        backgroundColor: subject.color,
                        maxWidth: '100%'
                      }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-right text-gray-500">
                    {getPercentage(subject.hours).toFixed(1)}% of weekly target
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="outline" 
            className="w-full mt-4 border-dashed"
            onClick={handleAddSubject}
          >
            + Add Subject
          </Button>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleReset}>Reset to Default</Button>
          <Button onClick={handleSave}>Save Allocation</Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Study Time Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <h4 className="font-medium mb-1">Balance your workload</h4>
              <p className="text-sm text-muted-foreground">Allocate more hours to difficult subjects and those with higher priority.</p>
            </div>
            
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
              <h4 className="font-medium mb-1">Consistency is key</h4>
              <p className="text-sm text-muted-foreground">It's better to study a subject regularly in shorter sessions than cramming all hours into one day.</p>
            </div>
            
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
              <h4 className="font-medium mb-1">Consider your energy levels</h4>
              <p className="text-sm text-muted-foreground">Schedule challenging subjects when your energy and focus are naturally higher.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyTimeAllocation;
