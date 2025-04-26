
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { SectionHeader } from '@/components/ui/section-header';
import { useTodaysPlan } from '@/hooks/useTodaysPlan';
import { Link } from 'react-router-dom';
import { TimelineView, MoodType, SubjectTaskBreakdown } from '@/types/student/todaysPlan';
import { UserProfileType } from '@/types/user';
import { Calendar, CalendarDays, CalendarRange, Book, BookOpen, FileText, Clock, AlertTriangle, Check, BookCheck } from 'lucide-react';

interface RedesignedTodaysPlanProps {
  userProfile: UserProfileType;
}

const RedesignedTodaysPlan: React.FC<RedesignedTodaysPlanProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [activeView, setActiveView] = useState<TimelineView>('daily');
  const currentMood = userProfile.mood as MoodType | undefined;

  const {
    loading,
    error,
    planData,
    refreshData,
    markTaskCompleted,
    addBookmark,
    addNote,
    markDayComplete
  } = useTodaysPlan(userProfile?.goals?.[0]?.title || "IIT-JEE", userProfile?.name || "Student");

  // Calculate overall progress percentage
  const totalTasks = !loading && planData ? 
    Object.values(planData.tasks).reduce((acc, taskList: any[]) => acc + taskList.length, 0) : 0;
  
  const completedTasks = !loading && planData ? 
    Object.values(planData.tasks).reduce((acc, taskList: any[]) => 
      acc + taskList.filter((task: any) => task.status === '✅ completed').length, 0) : 0;
  
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Calculate pending tasks
  const pendingTasks = !loading && planData ? 
    Object.values(planData.tasks).reduce((acc: any[], taskList: any[]) => 
      [...acc, ...taskList.filter((task: any) => task.status !== '✅ completed')], []) : [];

  if (error) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center">
          <h3 className="text-lg font-medium text-red-600 mb-2">Error Loading Study Plan</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={refreshData}>Try Again</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionHeader 
        title="Today's Study Plan"
        subtitle={!loading && planData ? 
          `Hi ${planData.userName}, here's your personalized daily plan based on your 📌 ${planData.examGoal} exam goal and 🧮 current progress.` :
          "Loading your personalized study plan..."}
      />
      
      {/* Overall Progress */}
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Progress value={completionPercentage} className="h-2" />
        </div>
        <Badge variant="outline">
          Today's Completion: {completionPercentage}% ✓
        </Badge>
      </div>

      {/* Timeline Navigation */}
      <Tabs value={activeView} onValueChange={(value) => setActiveView(value as TimelineView)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>🔹 Today</span>
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>🔸 Weekly</span>
          </TabsTrigger>
          <TabsTrigger value="monthly" className="flex items-center gap-2">
            <CalendarRange className="h-4 w-4" />
            <span>🔸 Monthly</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Daily View Content */}
        <TabsContent value="daily" className="space-y-6 mt-6">
          {/* Mood-based Tip */}
          {currentMood && (
            <div className={`p-4 rounded-lg ${
              currentMood === 'happy' ? 'bg-green-50 border border-green-200 text-green-800' :
              currentMood === 'focused' ? 'bg-blue-50 border border-blue-200 text-blue-800' :
              currentMood === 'tired' ? 'bg-amber-50 border border-amber-200 text-amber-800' :
              currentMood === 'stressed' ? 'bg-red-50 border border-red-200 text-red-800' :
              'bg-purple-50 border border-purple-200 text-purple-800'
            }`}>
              <p className="text-sm">
                {currentMood === 'happy' ? "Perfect day to tackle a challenging concept! Try completing an extra task." :
                currentMood === 'focused' ? "Great focus! Consider tackling some backlog items today." :
                currentMood === 'tired' ? "Take it easy today. Focus on review tasks first." :
                currentMood === 'stressed' ? "Let's keep it light. Pick your most comfortable subject." :
                "Your plan has been adjusted based on your current mood."}
              </p>
            </div>
          )}
          
          {/* Quick Access Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link to="/dashboard/student/concepts" className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                <Book className="h-4 w-4 mr-2" /> Concepts Hub
              </Button>
            </Link>
            <Link to="/dashboard/student/flashcards" className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                <BookOpen className="h-4 w-4 mr-2" /> Flashcards Hub
              </Button>
            </Link>
            <Link to="/dashboard/student/practice-exam" className="w-full">
              <Button variant="outline" className="w-full" size="sm">
                <FileText className="h-4 w-4 mr-2" /> Practice Tests
              </Button>
            </Link>
            <Button variant="outline" className="w-full" size="sm">
              <AlertTriangle className="h-4 w-4 mr-2" /> My Backlogs
            </Button>
          </div>
          
          {loading ? (
            <div className="space-y-4">
              <div className="h-48 animate-pulse bg-gray-100 rounded-lg"></div>
              <div className="h-48 animate-pulse bg-gray-100 rounded-lg"></div>
            </div>
          ) : (
            <>
              {/* Subject-Wise Breakdown */}
              {planData && Object.keys(planData.subjectBreakdown).map((subject) => (
                <SubjectCard 
                  key={subject}
                  subjectName={subject}
                  subjectData={planData.subjectBreakdown[subject]}
                  onTaskComplete={markTaskCompleted}
                />
              ))}
              
              {/* Time Allocation Section */}
              <TimeAllocationSection timeAllocation={planData?.timeAllocation} />
              
              {/* Pending Tasks Section */}
              {pendingTasks.length > 0 && (
                <PendingTasksSection pendingTasks={pendingTasks} />
              )}
              
              {/* Tomorrow's Preview */}
              {planData?.tomorrowPreview && (
                <TomorrowPreviewSection preview={planData.tomorrowPreview} completionPercentage={completionPercentage} />
              )}
              
              {/* Smart Extras */}
              <SmartExtrasSection 
                bookmarks={planData?.smartExtras.bookmarks || []}
                notes={planData?.smartExtras.notes || []}
                onAddNote={addNote}
                onMarkDayComplete={markDayComplete}
              />
            </>
          )}
        </TabsContent>
        
        {/* Weekly View Content */}
        <TabsContent value="weekly" className="space-y-4 mt-6">
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Weekly View</h3>
            <p className="text-muted-foreground">
              Your weekly study plan will appear here, showing scheduled tasks across the entire week. 
              This helps you plan ahead and maintain a balanced study approach.
            </p>
          </Card>
        </TabsContent>
        
        {/* Monthly View Content */}
        <TabsContent value="monthly" className="space-y-4 mt-6">
          <Card className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">Monthly View</h3>
            <p className="text-muted-foreground">
              Your monthly overview will display here, with major milestones, exam dates,
              and long-term planning to help you stay on track with your exam goals.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Subject Card Component
interface SubjectCardProps {
  subjectName: string;
  subjectData: any;
  onTaskComplete: (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ subjectName, subjectData, onTaskComplete }) => {
  return (
    <Card key={subjectName}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookCheck className="h-5 w-5 text-primary" />
          {subjectName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Tasks Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Task Type</th>
                  <th className="text-left py-2">Assigned</th>
                  <th className="text-left py-2">Pending</th>
                  <th className="text-right py-2">Time</th>
                  <th className="text-right py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Concepts Row */}
                {subjectData.concepts.length > 0 && (
                  <tr className="border-b">
                    <td className="py-2 flex items-center gap-2">
                      <Book className="h-4 w-4 text-blue-500" />
                      <span>Concepts</span>
                    </td>
                    <td className="py-2">
                      {subjectData.concepts.length} {subjectData.concepts.length === 1 ? 'concept' : 'concepts'}
                    </td>
                    <td className="py-2">
                      {subjectData.concepts.filter(c => c.status !== '✅ completed').length > 0 ? (
                        <Badge variant="destructive">
                          {subjectData.concepts.filter(c => c.status !== '✅ completed').length} pending
                        </Badge>
                      ) : (
                        <Badge variant="outline">None</Badge>
                      )}
                    </td>
                    <td className="py-2 text-right">
                      {subjectData.concepts.reduce((acc, c) => acc + c.timeEstimate, 0)} min
                    </td>
                    <td className="py-2 text-right">
                      <Link to={`/dashboard/student/concepts/${subjectName.toLowerCase()}`}>
                        <Button size="sm" variant="ghost">Start</Button>
                      </Link>
                    </td>
                  </tr>
                )}
                
                {/* Flashcards Row */}
                {subjectData.flashcards.length > 0 && (
                  <tr className="border-b">
                    <td className="py-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-amber-500" />
                      <span>Flashcards</span>
                    </td>
                    <td className="py-2">
                      {subjectData.flashcards.reduce((acc, f) => acc + (f.cardCount || 0), 0)} cards
                    </td>
                    <td className="py-2">
                      {subjectData.flashcards.filter(f => f.status !== '✅ completed').length > 0 ? (
                        <Badge variant="destructive">
                          {subjectData.flashcards.filter(f => f.status !== '✅ completed').length} pending
                        </Badge>
                      ) : (
                        <Badge variant="outline">None</Badge>
                      )}
                    </td>
                    <td className="py-2 text-right">
                      {subjectData.flashcards.reduce((acc, f) => acc + f.timeEstimate, 0)} min
                    </td>
                    <td className="py-2 text-right">
                      <Link to={`/dashboard/student/flashcards/${subjectName.toLowerCase()}`}>
                        <Button size="sm" variant="ghost">Review</Button>
                      </Link>
                    </td>
                  </tr>
                )}
                
                {/* Practice Exams Row */}
                {subjectData.practiceExams.length > 0 && (
                  <tr className="border-b last:border-0">
                    <td className="py-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-purple-500" />
                      <span>Practice Test</span>
                    </td>
                    <td className="py-2">
                      {subjectData.practiceExams.length} {subjectData.practiceExams.length === 1 ? 'test' : 'tests'}
                    </td>
                    <td className="py-2">
                      {subjectData.practiceExams.filter(p => p.status !== '✅ completed').length > 0 ? (
                        <Badge variant="destructive">
                          {subjectData.practiceExams.filter(p => p.status !== '✅ completed').length} pending
                        </Badge>
                      ) : (
                        <Badge variant="outline">None</Badge>
                      )}
                    </td>
                    <td className="py-2 text-right">
                      {subjectData.practiceExams.reduce((acc, p) => acc + p.timeEstimate, 0)} min
                    </td>
                    <td className="py-2 text-right">
                      <Link to={`/dashboard/student/practice-exam/${subjectName.toLowerCase()}`}>
                        <Button size="sm" variant="ghost">Take Test</Button>
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Time Allocation Section
interface TimeAllocationSectionProps {
  timeAllocation?: {
    conceptCards: number;
    flashcards: number;
    practiceTests: number;
    total: number;
  };
}

const TimeAllocationSection: React.FC<TimeAllocationSectionProps> = ({ timeAllocation }) => {
  if (!timeAllocation) return null;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Time Allocation Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Concepts</p>
              <p className="text-lg font-medium">
                {Math.floor(timeAllocation.conceptCards / 60) > 0 ? 
                  `${Math.floor(timeAllocation.conceptCards / 60)}h ${timeAllocation.conceptCards % 60}m` : 
                  `${timeAllocation.conceptCards}m`}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Flashcards</p>
              <p className="text-lg font-medium">
                {Math.floor(timeAllocation.flashcards / 60) > 0 ? 
                  `${Math.floor(timeAllocation.flashcards / 60)}h ${timeAllocation.flashcards % 60}m` : 
                  `${timeAllocation.flashcards}m`}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Practice Tests</p>
              <p className="text-lg font-medium">
                {Math.floor(timeAllocation.practiceTests / 60) > 0 ? 
                  `${Math.floor(timeAllocation.practiceTests / 60)}h ${timeAllocation.practiceTests % 60}m` : 
                  `${timeAllocation.practiceTests}m`}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Time</p>
              <p className="text-lg font-medium">
                {Math.floor(timeAllocation.total / 60) > 0 ? 
                  `${Math.floor(timeAllocation.total / 60)}h ${timeAllocation.total % 60}m` : 
                  `${timeAllocation.total}m`}
              </p>
            </div>
          </div>
          <div className="text-sm text-muted-foreground mt-4 bg-blue-50 p-3 rounded-md border border-blue-100 text-blue-700">
            ✅ Breaks recommended after every 60-90 minutes
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Pending Tasks Section
interface PendingTasksSectionProps {
  pendingTasks: any[];
}

const PendingTasksSection: React.FC<PendingTasksSectionProps> = ({ pendingTasks }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Pending Tasks & Direct Action Links
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Subject</th>
                <th className="text-left py-2">Task</th>
                <th className="text-left py-2">Details</th>
                <th className="text-right py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingTasks.map((task) => (
                <tr key={task.id} className="border-b">
                  <td className="py-2">{task.subject}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      {task.type === 'concept' && <Book className="h-4 w-4 text-blue-500" />}
                      {task.type === 'flashcard' && <BookOpen className="h-4 w-4 text-amber-500" />}
                      {task.type === 'practice-exam' && <FileText className="h-4 w-4 text-purple-500" />}
                      <span className="capitalize">{task.type}</span>
                    </div>
                  </td>
                  <td className="py-2">"{task.title}" pending</td>
                  <td className="py-2 text-right">
                    <Link to={`/dashboard/student/${task.type}s/${task.id}`}>
                      <Button size="sm" variant="ghost">
                        {task.type === 'concept' ? 'Complete Concept' : 
                         task.type === 'flashcard' ? 'Review Flashcards' : 'Complete Test'}
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

// Tomorrow's Preview Section
interface TomorrowPreviewSectionProps {
  preview: {
    concepts: number;
    flashcards: number;
    practiceExams: number;
  };
  completionPercentage: number;
}

const TomorrowPreviewSection: React.FC<TomorrowPreviewSectionProps> = ({ preview, completionPercentage }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <CalendarDays className="h-5 w-5 text-green-600" />
          Tomorrow's Plan Preview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-blue-500" />
                  <span>Concepts</span>
                </div>
                <Badge variant="outline">{preview.concepts}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-amber-500" />
                  <span>Flashcards</span>
                </div>
                <Badge variant="outline">{preview.flashcards}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-purple-500" />
                  <span>Practice Tests</span>
                </div>
                <Badge variant="outline">{preview.practiceExams}</Badge>
              </div>
            </div>
          </div>
          
          {completionPercentage < 100 && (
            <div className="text-sm text-muted-foreground mt-4 bg-amber-50 p-3 rounded-md border border-amber-100 text-amber-700">
              Complete today's plan to unlock full details of tomorrow's schedule
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Smart Extras Section
interface SmartExtrasSectionProps {
  bookmarks: string[];
  notes: {
    id: string;
    date: string;
    content: string;
  }[];
  onAddNote: (content: string) => void;
  onMarkDayComplete: () => void;
}

const SmartExtrasSection: React.FC<SmartExtrasSectionProps> = ({ 
  bookmarks, 
  notes,
  onAddNote,
  onMarkDayComplete
}) => {
  const [newNote, setNewNote] = useState("");
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote.trim());
      setNewNote("");
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookCheck className="h-5 w-5 text-violet-600" />
          Smart Extras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Journal Notes */}
          <div>
            <h4 className="font-medium mb-2">📝 Journal Notes</h4>
            <div className="space-y-2">
              <textarea 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add your thoughts, reflections, or questions about today's learning..."
                className="w-full rounded-md border border-gray-300 p-2 min-h-[80px]"
              />
              <Button variant="outline" onClick={handleAddNote} disabled={!newNote.trim()}>
                Add Note
              </Button>
            </div>
            
            {notes.length > 0 && (
              <div className="mt-3 space-y-2">
                {notes.map(note => (
                  <div key={note.id} className="bg-gray-50 p-3 rounded-md text-sm">
                    <div className="text-xs text-gray-500 mb-1">
                      {new Date(note.date).toLocaleString()}
                    </div>
                    {note.content}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Complete Day Button */}
          <div className="pt-4 flex justify-center">
            <Button 
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={onMarkDayComplete}
            >
              <Check className="h-4 w-4 mr-1" /> I'm Done for Today
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RedesignedTodaysPlan;
