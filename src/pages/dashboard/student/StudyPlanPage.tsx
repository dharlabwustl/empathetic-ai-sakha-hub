
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, BookOpen, Clock, Calendar, Check, Target, Brain, TrendingUp } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { useToast } from '@/hooks/use-toast';

const StudyPlanPage = () => {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // NEET 2026 Configuration
  const neetExamDate = new Date('2026-05-03');
  const today = new Date();
  const daysLeft = Math.ceil((neetExamDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
  
  // Subject allocation state
  const [subjectAllocations, setSubjectAllocations] = useState({
    Physics: 35,
    Chemistry: 30,
    Biology: 35
  });
  
  const totalWeeklyHours = Object.values(subjectAllocations).reduce((sum, hours) => sum + hours, 0);
  
  // NEET subjects with topics and proficiency
  const neetSubjects = [
    {
      id: 'physics',
      name: 'Physics',
      color: '#3B82F6',
      proficiency: 'medium',
      progress: 45,
      weeklyHours: subjectAllocations.Physics,
      topics: [
        { id: '1', name: 'Mechanics', completed: true, estimatedHours: 40, difficulty: 'medium' as const },
        { id: '2', name: 'Thermodynamics', completed: false, estimatedHours: 25, difficulty: 'medium' as const },
        { id: '3', name: 'Electromagnetism', completed: false, estimatedHours: 45, difficulty: 'hard' as const },
        { id: '4', name: 'Optics', completed: false, estimatedHours: 30, difficulty: 'medium' as const },
        { id: '5', name: 'Modern Physics', completed: false, estimatedHours: 35, difficulty: 'hard' as const }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      color: '#10B981',
      proficiency: 'weak',
      progress: 30,
      weeklyHours: subjectAllocations.Chemistry,
      topics: [
        { id: '1', name: 'Physical Chemistry', completed: false, estimatedHours: 50, difficulty: 'hard' as const },
        { id: '2', name: 'Organic Chemistry', completed: false, estimatedHours: 55, difficulty: 'hard' as const },
        { id: '3', name: 'Inorganic Chemistry', completed: true, estimatedHours: 40, difficulty: 'medium' as const }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      color: '#8B5CF6',
      proficiency: 'strong',
      progress: 65,
      weeklyHours: subjectAllocations.Biology,
      topics: [
        { id: '1', name: 'Cell Biology', completed: true, estimatedHours: 30, difficulty: 'easy' as const },
        { id: '2', name: 'Genetics', completed: false, estimatedHours: 35, difficulty: 'medium' as const },
        { id: '3', name: 'Ecology', completed: true, estimatedHours: 25, difficulty: 'easy' as const },
        { id: '4', name: 'Human Physiology', completed: false, estimatedHours: 40, difficulty: 'medium' as const },
        { id: '5', name: 'Plant Biology', completed: false, estimatedHours: 30, difficulty: 'medium' as const }
      ]
    }
  ];
  
  // Sample study plan events
  const studyPlanEvents = [
    { id: 1, date: new Date(), subject: "Physics", topic: "Kinematics", duration: 60 },
    { id: 2, date: new Date(), subject: "Chemistry", topic: "Chemical Bonding", duration: 45 },
    { id: 3, date: new Date(new Date().setDate(new Date().getDate() + 1)), subject: "Biology", topic: "Cell Structure", duration: 90 },
    { id: 4, date: new Date(new Date().setDate(new Date().getDate() + 2)), subject: "Physics", topic: "Thermodynamics", duration: 60 },
  ];
  
  // Filter events for the selected date
  const selectedDateEvents = studyPlanEvents.filter(event => 
    date && event.date.toDateString() === date.toDateString()
  );
  
  const handleAllocationChange = (subject: string, value: number[]) => {
    setSubjectAllocations(prev => ({
      ...prev,
      [subject]: value[0]
    }));
  };
  
  const handleSaveAllocations = () => {
    toast({
      title: "Time allocation updated",
      description: `Weekly study plan updated: ${totalWeeklyHours} hours total`,
    });
  };
  
  const getProficiencyBadge = (proficiency: string) => {
    const variants = {
      weak: 'destructive',
      medium: 'secondary',
      strong: 'default'
    };
    return (
      <Badge variant={variants[proficiency as keyof typeof variants] as any}>
        {proficiency}
      </Badge>
    );
  };
  
  return (
    <SharedPageLayout 
      title="NEET 2026 Study Plan"
      subtitle="Your comprehensive preparation strategy for NEET 2026"
    >
      {/* NEET 2026 Overview */}
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <div className="text-2xl font-bold text-blue-600">NEET 2026</div>
                <div className="text-sm text-gray-600">Target Exam</div>
              </div>
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <div className="text-2xl font-bold text-green-600">May 3, 2026</div>
                <div className="text-sm text-gray-600">Exam Date</div>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <div className="text-2xl font-bold text-orange-600">{daysLeft}</div>
                <div className="text-sm text-gray-600">Days Left</div>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <div className="text-2xl font-bold text-purple-600">{totalWeeklyHours}h</div>
                <div className="text-sm text-gray-600">Weekly Hours</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Time Allocation Section */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              Weekly Time Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(subjectAllocations).map(([subject, hours]) => {
                const subjectData = neetSubjects.find(s => s.name === subject);
                return (
                  <div key={subject} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: subjectData?.color }}
                        />
                        <span className="font-medium">{subject}</span>
                        {subjectData && getProficiencyBadge(subjectData.proficiency)}
                      </div>
                      <span className="text-sm text-muted-foreground">{hours}h/week</span>
                    </div>
                    <Slider
                      value={[hours]}
                      onValueChange={(value) => handleAllocationChange(subject, value)}
                      max={50}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                  </div>
                );
              })}
              <Button onClick={handleSaveAllocations} className="w-full mt-4">
                Save Time Allocation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subject Breakdown */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Subject Topics & Progress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {neetSubjects.map((subject) => (
            <Card key={subject.id}>
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-center text-base">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: subject.color }}
                    />
                    {subject.name}
                  </div>
                  {getProficiencyBadge(subject.proficiency)}
                </CardTitle>
                <Progress value={subject.progress} className="h-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {subject.topics?.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        {topic.completed ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <div className="h-3 w-3 border rounded" />
                        )}
                        <span className={topic.completed ? 'line-through text-gray-500' : ''}>
                          {topic.name}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {topic.estimatedHours}h
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Study Calendar
            </h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">
              {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
            </h3>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-4">
                {selectedDateEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <BookOpen className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{event.subject}</h4>
                        <p className="text-sm text-muted-foreground">{event.topic}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.duration} min
                      </div>
                      <Button variant="outline" size="sm">
                        <Check className="h-4 w-4 mr-1" /> Mark Complete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-10 w-10 mx-auto text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">
                  No study sessions scheduled for this date
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4">NEET 2026 Progress Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Subjects Progress</div>
                <div className="text-2xl font-bold">
                  {Math.round(neetSubjects.reduce((sum, s) => sum + s.progress, 0) / neetSubjects.length)}%
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${Math.round(neetSubjects.reduce((sum, s) => sum + s.progress, 0) / neetSubjects.length)}%` }} 
                  />
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Weekly Study Hours</div>
                <div className="text-2xl font-bold">{totalWeeklyHours}/100</div>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${totalWeeklyHours}%` }} />
                </div>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="text-sm text-muted-foreground">Days Remaining</div>
                <div className="text-2xl font-bold">{daysLeft}</div>
                <div className="text-xs text-muted-foreground">Until NEET 2026</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
