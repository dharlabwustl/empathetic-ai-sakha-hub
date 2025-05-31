
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Calendar as CalendarIcon, BookOpen, Clock, Calendar, Check, Target, TrendingUp, AlertTriangle, Timer, Brain } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { StudyPlanSubject } from '@/types/user/studyPlan';

const StudyPlanPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  // NEET 2026 study plan data
  const examDate = new Date('2026-05-03');
  const examName = 'NEET 2026';
  const daysRemaining = Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const [subjects, setSubjects] = useState<StudyPlanSubject[]>([
    {
      id: 'physics',
      name: 'Physics',
      color: '#8B5CF6',
      hoursPerWeek: 15,
      weeklyHours: 15,
      progress: 45,
      priority: 'high',
      proficiency: 'weak',
      completed: false,
      isWeakSubject: true,
      topics: [
        { id: 'p1', name: 'Mechanics', completed: false, estimatedHours: 40, difficulty: 'medium', status: 'in-progress' },
        { id: 'p2', name: 'Thermodynamics', completed: false, estimatedHours: 25, difficulty: 'medium', status: 'not-started' },
        { id: 'p3', name: 'Electromagnetism', completed: false, estimatedHours: 35, difficulty: 'hard', status: 'not-started' },
        { id: 'p4', name: 'Modern Physics', completed: false, estimatedHours: 30, difficulty: 'hard', status: 'not-started' },
        { id: 'p5', name: 'Optics', completed: false, estimatedHours: 20, difficulty: 'medium', status: 'not-started' }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      color: '#10B981',
      hoursPerWeek: 12,
      weeklyHours: 12,
      progress: 62,
      priority: 'medium',
      proficiency: 'medium',
      completed: false,
      topics: [
        { id: 'c1', name: 'Physical Chemistry', completed: false, estimatedHours: 45, difficulty: 'hard', status: 'in-progress' },
        { id: 'c2', name: 'Organic Chemistry', completed: false, estimatedHours: 50, difficulty: 'hard', status: 'not-started' },
        { id: 'c3', name: 'Inorganic Chemistry', completed: true, estimatedHours: 35, difficulty: 'medium', status: 'completed' }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      color: '#F59E0B',
      hoursPerWeek: 13,
      weeklyHours: 13,
      progress: 78,
      priority: 'high',
      proficiency: 'strong',
      completed: false,
      topics: [
        { id: 'b1', name: 'Human Physiology', completed: true, estimatedHours: 35, difficulty: 'medium', status: 'completed' },
        { id: 'b2', name: 'Plant Biology', completed: false, estimatedHours: 30, difficulty: 'medium', status: 'in-progress' },
        { id: 'b3', name: 'Genetics', completed: false, estimatedHours: 25, difficulty: 'hard', status: 'not-started' },
        { id: 'b4', name: 'Ecology', completed: false, estimatedHours: 20, difficulty: 'easy', status: 'not-started' }
      ]
    }
  ]);

  const totalWeeklyHours = subjects.reduce((sum, subject) => sum + subject.hoursPerWeek, 0);
  
  // Sample study plan events for the calendar
  const studyPlanEvents = [
    { id: 1, date: new Date(), subject: "Physics", topic: "Mechanics - Newton's Laws", duration: 120 },
    { id: 2, date: new Date(), subject: "Chemistry", topic: "Physical Chemistry - Thermodynamics", duration: 90 },
    { id: 3, date: new Date(new Date().setDate(new Date().getDate() + 1)), subject: "Biology", topic: "Plant Biology - Photosynthesis", duration: 90 },
    { id: 4, date: new Date(new Date().setDate(new Date().getDate() + 2)), subject: "Physics", topic: "Electromagnetism - Electric Fields", duration: 120 },
  ];
  
  // Filter events for the selected date
  const selectedDateEvents = studyPlanEvents.filter(event => 
    date && event.date.toDateString() === date.toDateString()
  );

  const handleHoursChange = (subjectId: string, newHours: number[]) => {
    setSubjects(prev => prev.map(subject => 
      subject.id === subjectId 
        ? { ...subject, hoursPerWeek: newHours[0], weeklyHours: newHours[0] }
        : subject
    ));
  };

  const getSubjectStatusBadge = (subject: StudyPlanSubject) => {
    if (subject.proficiency === 'weak') {
      return (
        <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Weak Subject
        </Badge>
      );
    } else if (subject.proficiency === 'strong') {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
          <TrendingUp className="h-3 w-3 mr-1" />
          Strong Subject
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
        Medium
      </Badge>
    );
  };

  const calculateCompletedTopics = (topics: any[]) => {
    return topics.filter(topic => topic.completed).length;
  };

  return (
    <SharedPageLayout 
      title="NEET 2026 Study Plan"
      subtitle="Your adaptive study schedule for NEET 2026 - 3rd May 2026"
    >
      {/* Exam Overview */}
      <div className="mb-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{examName}</div>
                <div className="text-sm text-gray-600">Target Exam</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{daysRemaining}</div>
                <div className="text-sm text-gray-600">Days Remaining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalWeeklyHours}h</div>
                <div className="text-sm text-gray-600">Weekly Hours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">May 3, 2026</div>
                <div className="text-sm text-gray-600">Exam Date</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Allocation Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5 text-primary" />
              Adjustable Time Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {subjects.map((subject) => (
              <div key={subject.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <div>
                      <h4 className="font-medium">{subject.name}</h4>
                      <div className="flex items-center gap-2">
                        {getSubjectStatusBadge(subject)}
                        <span className="text-sm text-gray-600">
                          {calculateCompletedTopics(subject.topics || [])} / {subject.topics?.length || 0} topics completed
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{subject.hoursPerWeek}h/week</div>
                    <div className="text-sm text-gray-600">{subject.progress}% complete</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Hours</span>
                    <span>{subject.hoursPerWeek}h</span>
                  </div>
                  <Slider
                    value={[subject.hoursPerWeek]}
                    onValueChange={(value) => handleHoursChange(subject.id, value)}
                    max={25}
                    min={5}
                    step={1}
                    className="w-full"
                  />
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        backgroundColor: subject.color, 
                        width: `${subject.progress}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Topic Breakdown */}
                <div className="mt-3 space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">Topic Timeline:</h5>
                  <div className="grid grid-cols-1 gap-2">
                    {subject.topics?.map((topic) => (
                      <div key={topic.id} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          {topic.completed ? (
                            <Check className="h-4 w-4 text-green-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                          <span className={topic.completed ? 'line-through text-gray-500' : ''}>
                            {topic.name}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {topic.difficulty}
                          </Badge>
                        </div>
                        <span className="text-gray-600">{topic.estimatedHours}h</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        {/* Calendar */}
        <Card>
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
            
            {/* Daily Schedule for Selected Date */}
            <div className="mt-4">
              <h4 className="font-medium mb-2">
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }) : 'Select a date'}
              </h4>
              
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <BookOpen className="h-4 w-4 text-primary mt-1" />
                        <div className="flex-1">
                          <h5 className="font-medium text-sm">{event.subject}</h5>
                          <p className="text-xs text-gray-600">{event.topic}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{event.duration} min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500 text-sm">
                  No sessions scheduled
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Strategy Summary */}
      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Adaptive Strategy Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-medium text-red-800 mb-2">Focus Areas (Weak Subjects)</h4>
                <ul className="space-y-1">
                  {subjects.filter(s => s.proficiency === 'weak').map(subject => (
                    <li key={subject.id} className="text-sm text-red-700">
                      • {subject.name} - {subject.hoursPerWeek}h/week
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Maintain Performance</h4>
                <ul className="space-y-1">
                  {subjects.filter(s => s.proficiency === 'medium').map(subject => (
                    <li key={subject.id} className="text-sm text-blue-700">
                      • {subject.name} - {subject.hoursPerWeek}h/week
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800 mb-2">Strong Subjects</h4>
                <ul className="space-y-1">
                  {subjects.filter(s => s.proficiency === 'strong').map(subject => (
                    <li key={subject.id} className="text-sm text-green-700">
                      • {subject.name} - {subject.hoursPerWeek}h/week
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanPage;
