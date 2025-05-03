
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, BookOpen, Clock, Check, Star, Brain, Target } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { useVoiceAnnouncerContext } from '../voice/VoiceAnnouncer';
import { Badge } from '@/components/ui/badge';

// Study session type definition
interface StudySession {
  id: number;
  date: Date;
  subject: string;
  topic: string;
  duration: number;
  priority?: 'high' | 'medium' | 'low';
  isCompleted?: boolean;
  examGoal?: string;
}

const StudyPlanView: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [studyPlanEvents, setStudyPlanEvents] = useState<StudySession[]>([]);
  const { toast } = useToast();
  const voiceAnnouncer = useVoiceAnnouncerContext();
  
  // Load sample study plan data from localStorage or use defaults
  useEffect(() => {
    // Try to load from localStorage
    const savedPlanData = localStorage.getItem('studyPlanData');
    if (savedPlanData) {
      try {
        const parsedData = JSON.parse(savedPlanData);
        // Convert string dates back to Date objects
        const eventsWithDates = parsedData.map((event: any) => ({
          ...event,
          date: new Date(event.date)
        }));
        setStudyPlanEvents(eventsWithDates);
        return;
      } catch (e) {
        console.error("Error parsing study plan data:", e);
      }
    }
    
    // Default data if nothing is saved
    const defaultEvents: StudySession[] = [
      { id: 1, date: new Date(), subject: "Physics", topic: "Kinematics", duration: 60, priority: 'high', examGoal: 'NEET' },
      { id: 2, date: new Date(), subject: "Chemistry", topic: "Chemical Bonding", duration: 45, examGoal: 'NEET' },
      { id: 3, date: new Date(new Date().setDate(new Date().getDate() + 1)), subject: "Mathematics", topic: "Calculus", duration: 90, priority: 'medium', examGoal: 'NEET' },
      { id: 4, date: new Date(new Date().setDate(new Date().getDate() + 2)), subject: "Biology", topic: "Cell Structure", duration: 60, priority: 'high', examGoal: 'NEET' },
      { id: 5, date: new Date(new Date().setDate(new Date().getDate() + 3)), subject: "Physics", topic: "Dynamics", duration: 75, examGoal: 'NEET' },
      { id: 6, date: new Date(new Date().setDate(new Date().getDate() + 4)), subject: "Chemistry", topic: "Periodic Table", duration: 60, priority: 'medium', examGoal: 'NEET' },
      { id: 7, date: new Date(new Date().setDate(new Date().getDate() + 5)), subject: "Biology", topic: "Human Physiology", duration: 90, priority: 'high', examGoal: 'NEET' },
    ];
    
    setStudyPlanEvents(defaultEvents);
  }, []);
  
  // Filter events for the selected date
  const selectedDateEvents = studyPlanEvents.filter(event => 
    date && event.date.toDateString() === date.toDateString()
  );
  
  // Mark a study session as complete
  const markSessionComplete = (sessionId: number) => {
    const updatedEvents = studyPlanEvents.map(event => 
      event.id === sessionId ? { ...event, isCompleted: true } : event
    );
    
    setStudyPlanEvents(updatedEvents);
    
    // Save to localStorage
    localStorage.setItem('studyPlanData', JSON.stringify(updatedEvents));
    
    toast({
      title: "Session completed!",
      description: "Great job! Your progress has been saved.",
    });

    // Voice announcement
    voiceAnnouncer.speak("Excellent work completing your study session! Your progress has been saved. Keep up the great work!");
  };

  // Helper functions to get dates with events and highlight days with high priority tasks
  const getHighlightedDays = () => {
    return studyPlanEvents
      .filter(event => event.priority === 'high')
      .map(event => new Date(event.date));
  };
  
  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">My Study Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Study Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  modifiers={{
                    highlight: getHighlightedDays(),
                  }}
                  modifiersClassNames={{
                    highlight: 'bg-primary/20 text-primary font-bold',
                  }}
                />
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary/20"></div>
                    <span>High Priority</span>
                  </div>
                  <div>
                    <span>{studyPlanEvents.filter(e => e.isCompleted).length}/{studyPlanEvents.length} completed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Exam Goals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">NEET</h3>
                      <Badge variant="outline" className="bg-primary/5">Primary</Badge>
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>85 days remaining</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
                      </div>
                      <p className="mt-1">Overall progress: 65%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                {date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className={`flex items-center justify-between border-b pb-3 ${event.isCompleted ? 'opacity-60' : ''}`}>
                      <div className="flex items-start gap-3">
                        <div className={`p-2 ${
                          event.priority === 'high' ? 'bg-red-100 text-red-600' : 
                          event.priority === 'medium' ? 'bg-amber-100 text-amber-600' : 
                          'bg-primary/10 text-primary'
                        } rounded-full`}>
                          <BookOpen className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{event.subject}</h4>
                          <p className="text-sm text-muted-foreground">{event.topic}</p>
                          {event.examGoal && (
                            <div className="flex items-center mt-1">
                              <Star className="h-3 w-3 mr-1 text-amber-500" />
                              <span className="text-xs text-muted-foreground">For {event.examGoal}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.duration} min
                        </div>
                        <Button 
                          variant={event.isCompleted ? "outline" : "default"} 
                          size="sm"
                          onClick={() => markSessionComplete(event.id)}
                          disabled={event.isCompleted}
                        >
                          <Check className="h-4 w-4 mr-1" /> 
                          {event.isCompleted ? "Completed" : "Mark Complete"}
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => voiceAnnouncer.speak("Would you like me to create a new study session for this day? I can help you schedule topics based on your exam goals.")}
                  >
                    + Add New Study Session
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CalendarIcon className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-muted-foreground">
                    No study sessions scheduled for this date
                  </p>
                  <Button variant="outline" className="mt-4">
                    + Schedule a Study Session
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Smart Study Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Subjects Completed</div>
                  <div className="text-2xl font-bold">3/8</div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-full bg-primary rounded-full" style={{ width: '37.5%' }} />
                  </div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Hours Studied</div>
                  <div className="text-2xl font-bold">24/120</div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-full bg-primary rounded-full" style={{ width: '20%' }} />
                  </div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground">Days Remaining</div>
                  <div className="text-2xl font-bold">85</div>
                  <div className="text-xs text-muted-foreground">Until NEET exam</div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-4">Subject Breakdown for NEET</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                      <span>Physics</span>
                    </div>
                    <div className="text-sm">40% complete</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span>Chemistry</span>
                    </div>
                    <div className="text-sm">65% complete</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      <span>Biology</span>
                    </div>
                    <div className="text-sm">75% complete</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudyPlanView;
