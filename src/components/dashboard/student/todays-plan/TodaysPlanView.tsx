
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import BackButton from '@/components/dashboard/student/BackButton';
import { 
  BookOpen, Clock, CheckCircle, Sparkles, ArrowRight, 
  Calendar, BookMarked, FileText, CheckSquare, ListTodo
} from 'lucide-react';

const TodaysPlanView = () => {
  const [activeTab, setActiveTab] = useState('subjects');
  
  // Mock data for today's study plan
  const todaysPlan = {
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    }),
    progress: 45,
    totalHours: 4.5,
    completedHours: 2,
    subjects: [
      {
        id: 's1',
        name: 'Physics',
        topics: [
          { id: 't1', name: 'Newton\'s Laws', completed: true, duration: 30 },
          { id: 't2', name: 'Conservation of Energy', completed: false, duration: 45 },
          { id: 't3', name: 'Practice Problems', completed: false, duration: 30 }
        ],
        color: 'blue'
      },
      {
        id: 's2',
        name: 'Chemistry',
        topics: [
          { id: 't4', name: 'Organic Reactions', completed: false, duration: 40 },
          { id: 't5', name: 'Chemical Bonding', completed: false, duration: 35 }
        ],
        color: 'green'
      },
      {
        id: 's3',
        name: 'Mathematics',
        topics: [
          { id: 't6', name: 'Integration', completed: true, duration: 50 },
          { id: 't7', name: 'Differential Equations', completed: false, duration: 60 }
        ],
        color: 'purple'
      }
    ],
    timeBlocks: [
      { id: 'b1', startTime: '09:00', endTime: '10:30', subject: 'Physics', topics: ['Newton\'s Laws', 'Conservation of Energy'] },
      { id: 'b2', startTime: '11:00', endTime: '12:00', subject: 'Chemistry', topics: ['Organic Reactions'] },
      { id: 'b3', startTime: '14:00', endTime: '15:30', subject: 'Mathematics', topics: ['Integration', 'Differential Equations'] },
      { id: 'b4', startTime: '16:00', endTime: '17:00', subject: 'Physics', topics: ['Practice Problems'] }
    ],
    recommendations: [
      { id: 'r1', title: 'Review previous quiz mistakes', priority: 'high', timeEstimate: 20 },
      { id: 'r2', title: 'Flashcard review for Chemistry terms', priority: 'medium', timeEstimate: 15 },
      { id: 'r3', title: 'Practice exam for Physics', priority: 'low', timeEstimate: 45 }
    ]
  };

  const calculateSubjectProgress = (subject) => {
    const totalTopics = subject.topics.length;
    const completedTopics = subject.topics.filter(topic => topic.completed).length;
    return (completedTopics / totalTopics) * 100;
  };
  
  const calculateTotalTopics = () => {
    return todaysPlan.subjects.reduce((acc, subject) => acc + subject.topics.length, 0);
  };
  
  const calculateCompletedTopics = () => {
    return todaysPlan.subjects.reduce((acc, subject) => {
      return acc + subject.topics.filter(topic => topic.completed).length;
    }, 0);
  };

  const subjectColorClasses = {
    blue: 'bg-blue-100 border-blue-200 text-blue-700',
    green: 'bg-green-100 border-green-200 text-green-700',
    purple: 'bg-purple-100 border-purple-200 text-purple-700',
    orange: 'bg-orange-100 border-orange-200 text-orange-700',
    pink: 'bg-pink-100 border-pink-200 text-pink-700',
  };

  const priorityClasses = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200'
  };

  return (
    <SharedPageLayout 
      title="Today's Study Plan" 
      subtitle={todaysPlan.date}
    >
      <div className="space-y-6">
        {/* Back button */}
        <BackButton to="/dashboard/student" label="Back to Dashboard" />

        {/* Progress overview */}
        <Card className="border-2 border-blue-100">
          <CardHeader className="pb-2">
            <CardTitle className="flex justify-between items-center">
              <span>Overall Progress</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {calculateCompletedTopics()} of {calculateTotalTopics()} topics completed
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Daily Progress</span>
                  <span>{todaysPlan.progress}%</span>
                </div>
                <Progress value={todaysPlan.progress} className="h-2" />
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-blue-600" />
                  <span>
                    <span className="font-semibold">{todaysPlan.completedHours}</span>
                    <span className="text-muted-foreground"> of </span>
                    <span className="font-semibold">{todaysPlan.totalHours} hours</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="h-4 w-4 mr-1 text-blue-600" />
                  <span>
                    <span className="font-semibold">{todaysPlan.subjects.length}</span>
                    <span className="text-muted-foreground"> subjects</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                  <span>
                    <span className="font-semibold">{calculateCompletedTopics()}</span>
                    <span className="text-muted-foreground"> topics completed</span>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation tabs for different views */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="subjects" className="flex gap-1 items-center">
              <BookMarked className="h-4 w-4" /> Subjects
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex gap-1 items-center">
              <Calendar className="h-4 w-4" /> Schedule
            </TabsTrigger>
            <TabsTrigger value="suggestions" className="flex gap-1 items-center">
              <Sparkles className="h-4 w-4" /> Suggestions
            </TabsTrigger>
          </TabsList>
          
          {/* Subjects Tab */}
          <TabsContent value="subjects">
            <div className="space-y-4">
              {todaysPlan.subjects.map((subject) => (
                <Card key={subject.id} className="overflow-hidden">
                  <CardHeader className={`pb-2 ${subjectColorClasses[subject.color]} bg-opacity-30`}>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                      <Badge variant="outline" className={subjectColorClasses[subject.color]}>
                        {subject.topics.filter(t => t.completed).length}/{subject.topics.length} Topics
                      </Badge>
                    </div>
                    <div className="w-full mt-2">
                      <Progress 
                        value={calculateSubjectProgress(subject)} 
                        className="h-1.5" 
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {subject.topics.map((topic) => (
                        <li 
                          key={topic.id} 
                          className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50"
                        >
                          <div className="flex items-center">
                            {topic.completed ? (
                              <CheckSquare className="h-5 w-5 text-green-600 mr-2" />
                            ) : (
                              <ListTodo className="h-5 w-5 text-blue-600 mr-2" />
                            )}
                            <span className={topic.completed ? 'line-through text-gray-500' : ''}>
                              {topic.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-gray-50">
                              <Clock className="h-3 w-3 mr-1" />
                              {topic.duration} min
                            </Badge>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Time Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysPlan.timeBlocks.map((block) => (
                    <div 
                      key={block.id} 
                      className="flex border rounded-md overflow-hidden"
                    >
                      <div className="bg-gray-100 p-3 font-medium text-center min-w-[80px]">
                        <div>{block.startTime}</div>
                        <div className="text-xs text-gray-500">to</div>
                        <div>{block.endTime}</div>
                      </div>
                      <div className="p-3 flex-grow">
                        <h4 className="font-medium">{block.subject}</h4>
                        <p className="text-sm text-gray-600">
                          {block.topics.join(', ')}
                        </p>
                      </div>
                      <div className="flex items-center pr-3">
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Suggestions Tab */}
          <TabsContent value="suggestions">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Smart Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todaysPlan.recommendations.map((rec) => (
                    <div 
                      key={rec.id} 
                      className="flex items-center justify-between p-3 border rounded-md"
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        <div>
                          <h4 className="font-medium">{rec.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {rec.timeEstimate} min
                            </span>
                            <Badge variant="outline" className={priorityClasses[rec.priority]}>
                              {rec.priority} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="whitespace-nowrap">
                        Add to Plan
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 mt-6">
          <Button variant="outline" className="flex items-center gap-1">
            <FileText className="h-4 w-4" /> View Full Study Plan
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Tomorrow's Plan
          </Button>
          <Button variant="outline" className="flex items-center gap-1 text-green-600">
            <CheckCircle className="h-4 w-4" /> Mark All Complete
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default TodaysPlanView;
