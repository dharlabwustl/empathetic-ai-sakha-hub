
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodaysPlan, TodaysPlanData, TimeAllocation, SubjectProgress, PastDayRecord } from '@/types/student/todaysPlan';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';
import { UserProfileBase } from '@/types/user/base';
import { Calendar, BookOpen, Brain, FileText, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface RedesignedTodaysPlanProps {
  userProfile: UserProfileBase;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ userProfile, currentMood, onMoodChange }) => {
  const navigate = useNavigate();

  // Mock data for today's plan
  const mockTodaysPlan: TodaysPlanData = {
    date: new Date().toISOString(),
    greeting: `Good ${getTimeOfDay()}, ${userProfile.name}!`,
    currentMood: currentMood || MoodType.Motivated,
    studyBlocks: [
      {
        id: 'sb-1',
        title: "Newton's Laws of Motion",
        duration: 30,
        startTime: '09:00',
        completed: false,
        type: 'concept' as TaskType,
        subject: 'Physics',
        topic: 'Mechanics'
      },
      {
        id: 'sb-2',
        title: "Chemistry Periodic Table",
        duration: 20,
        startTime: '10:00',
        completed: false,
        type: 'flashcard' as TaskType,
        subject: 'Chemistry',
        topic: 'Elements'
      },
      {
        id: 'sb-3',
        title: "Physics Mid-Term Mock",
        duration: 60,
        startTime: '11:00',
        completed: false,
        type: 'test' as TaskType,
        subject: 'Physics',
        topic: 'Mixed Topics'
      }
    ],
    progress: {
      plannedHours: 4,
      completedHours: 1.5,
      completedTasks: 2,
      totalTasks: 6
    },
    pendingTasks: [],
    backlogTasks: [],
    timeAllocation: {
      concepts: 40,
      flashcards: 25,
      practice: 30,
      breaks: 5
    },
    subjectProgress: [
      {
        subject: 'Physics',
        completion: 65,
        concepts: 3,
        flashcards: 20,
        practiceExams: 1
      },
      {
        subject: 'Chemistry',
        completion: 42,
        concepts: 2,
        flashcards: 15,
        practiceExams: 1
      },
      {
        subject: 'Mathematics',
        completion: 78,
        concepts: 4,
        flashcards: 25,
        practiceExams: 2
      }
    ],
    pastRecords: []
  };

  // Navigate to different sections
  const navigateToSection = (section: string) => {
    navigate(`/dashboard/student/${section}`);
  };

  return (
    <div className="space-y-6">
      {/* Header with greeting and buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">{mockTodaysPlan.greeting}</h1>
          <p className="text-muted-foreground">Here's your personalized study plan for today</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="default"
            className="bg-gradient-to-r from-violet-500 to-purple-600"
            onClick={() => navigateToSection('today')}
          >
            <Calendar className="h-4 w-4 mr-2" />
            View Full Plan
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Study blocks */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-violet-500" />
                Today's Study Blocks
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Completed {mockTodaysPlan.progress.completedTasks} of {mockTodaysPlan.progress.totalTasks} tasks</span>
                  <span>{Math.round((mockTodaysPlan.progress.completedTasks / mockTodaysPlan.progress.totalTasks) * 100)}% complete</span>
                </div>
                <Progress value={(mockTodaysPlan.progress.completedTasks / mockTodaysPlan.progress.totalTasks) * 100} className="h-2" />
              </div>
              
              <div className="mt-6 space-y-4">
                {mockTodaysPlan.studyBlocks.map((block) => {
                  const isPast = block.startTime && new Date(`${new Date().toDateString()} ${block.startTime}`) < new Date();
                  
                  return (
                    <div 
                      key={block.id}
                      className={`p-4 border rounded-lg ${
                        block.completed 
                          ? 'bg-green-50 border-green-200' 
                          : isPast 
                            ? 'bg-red-50 border-red-200' 
                            : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${getBlockTypeColor(block.type)}`}>
                            {getBlockTypeIcon(block.type)}
                          </div>
                          <div>
                            <h3 className="font-medium">{block.title}</h3>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <span>{block.subject}</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                <span>{block.duration} min</span>
                              </div>
                              {block.startTime && (
                                <>
                                  <span>•</span>
                                  <span>{block.startTime}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm"
                          variant={block.completed ? "outline" : "default"}
                          onClick={() => navigateToSection(getBlockNavigationPath(block.type))}
                        >
                          {block.completed ? 'Review' : 'Start Now'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
                
                <div className="flex justify-center mt-2">
                  <Button variant="link" onClick={() => navigateToSection('today')}>
                    View all scheduled tasks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right column - Stats & Info */}
        <div className="space-y-6">
          {/* Progress summary */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Daily Progress</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-blue-50 rounded-md">
                    <p className="text-xs text-muted-foreground">Planned</p>
                    <p className="text-lg font-semibold">{mockTodaysPlan.progress.plannedHours} hrs</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded-md">
                    <p className="text-xs text-muted-foreground">Completed</p>
                    <p className="text-lg font-semibold">{mockTodaysPlan.progress.completedHours} hrs</p>
                  </div>
                  <div className="text-center p-2 bg-amber-50 rounded-md">
                    <p className="text-xs text-muted-foreground">Remaining</p>
                    <p className="text-lg font-semibold">{mockTodaysPlan.progress.plannedHours - mockTodaysPlan.progress.completedHours} hrs</p>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1 text-xs">
                    <span>Daily Progress</span>
                    <span>{Math.round((mockTodaysPlan.progress.completedHours / mockTodaysPlan.progress.plannedHours) * 100)}%</span>
                  </div>
                  <Progress value={(mockTodaysPlan.progress.completedHours / mockTodaysPlan.progress.plannedHours) * 100} className="h-2" />
                </div>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" className="w-full" onClick={() => navigateToSection('today')}>
                  View Detailed Progress
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Links */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-lg font-medium mb-4">Quick Access</h2>
              
              <div className="grid grid-cols-1 gap-3">
                <Button variant="outline" className="justify-start" onClick={() => navigateToSection('concepts')}>
                  <BookOpen className="h-4 w-4 mr-2 text-blue-500" />
                  Concept Cards
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigateToSection('flashcards')}>
                  <Brain className="h-4 w-4 mr-2 text-amber-500" />
                  Flashcards
                </Button>
                <Button variant="outline" className="justify-start" onClick={() => navigateToSection('practice')}>
                  <FileText className="h-4 w-4 mr-2 text-violet-500" />
                  Practice Exams
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper functions
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "Morning";
  if (hour < 17) return "Afternoon";
  return "Evening";
}

function getBlockTypeIcon(type: TaskType) {
  switch (type) {
    case 'concept': return <BookOpen className="h-5 w-5 text-blue-600" />;
    case 'flashcard': return <Brain className="h-5 w-5 text-amber-600" />;
    case 'test': return <FileText className="h-5 w-5 text-violet-600" />;
    case 'revision': return <Clock className="h-5 w-5 text-green-600" />;
    case 'break': return <Coffee className="h-5 w-5 text-teal-600" />;
    default: return <BookOpen className="h-5 w-5 text-blue-600" />;
  }
}

function getBlockTypeColor(type: TaskType) {
  switch (type) {
    case 'concept': return 'bg-blue-100';
    case 'flashcard': return 'bg-amber-100';
    case 'test': return 'bg-violet-100';
    case 'revision': return 'bg-green-100';
    case 'break': return 'bg-teal-100';
    default: return 'bg-blue-100';
  }
}

function getBlockNavigationPath(type: TaskType) {
  switch (type) {
    case 'concept': return 'concepts';
    case 'flashcard': return 'flashcards';
    case 'test': return 'practice';
    case 'revision': return 'concepts';
    default: return 'today';
  }
}

// Import Coffee icon
import { Coffee } from 'lucide-react';

export default RedesignedTodaysPlan;
