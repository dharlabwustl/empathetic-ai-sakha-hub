
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Book,
  Brain,
  Clock,
  CheckCircle,
  Circle,
  CalendarDays,
  ArrowRight,
  BookmarkPlus,
  PenLine,
  ArrowRightCircle,
  LockIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStudyPlan } from "@/hooks/useUserStudyPlan";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface StudyTask {
  id: string;
  subject: string;
  type: 'concept' | 'flashcard' | 'practice';
  title: string;
  duration: number;
  completed: boolean;
  description?: string;
}

interface SubjectGroup {
  subject: string;
  concepts: StudyTask[];
  flashcards: StudyTask[];
  practiceExams: StudyTask[];
}

const studyHistory = [
  {
    date: '2025-04-24',
    stats: { concepts: '4/5', flashcards: '1/1', practiceTests: '1/1' }
  },
  {
    date: '2025-04-23',
    stats: { concepts: '3/4', flashcards: '0/1', practiceTests: '1/1' }
  },
  {
    date: '2025-04-22',
    stats: { concepts: '5/5', flashcards: '2/2', practiceTests: '1/1' }
  }
];

export default function TodayStudyPlan() {
  const { conceptCards, loading, markConceptCompleted } = useUserStudyPlan();
  const { toast } = useToast();
  const [showNotes, setShowNotes] = useState(false);
  const [studyNotes, setStudyNotes] = useState('');
  const [bookmarkedConcepts, setBookmarkedConcepts] = useState<string[]>([]);
  const [showTomorrow, setShowTomorrow] = useState(false);

  const todayTasks = conceptCards
    .filter(card => card.scheduledFor === 'today')
    .reduce<SubjectGroup[]>((acc, card) => {
      const existingGroup = acc.find(group => group.subject === card.subject);
      const task: StudyTask = {
        id: card.id,
        subject: card.subject,
        type: 'concept',
        title: card.title,
        duration: card.estimatedTime,
        completed: card.completed,
        description: card.chapter
      };

      if (existingGroup) {
        existingGroup.concepts.push(task);
      } else {
        acc.push({
          subject: card.subject,
          concepts: [task],
          flashcards: [],
          practiceExams: []
        });
      }
      return acc;
    }, []);

  // For each subject, auto-generate flashcards based on completed concepts
  todayTasks.forEach(group => {
    // Generate flashcards for completed concepts
    const completedConcepts = group.concepts.filter(c => c.completed);
    completedConcepts.forEach((concept, index) => {
      if (index < 2) { // Limit to 2 flashcard sets per subject
        group.flashcards.push({
          id: `flash-${concept.id}`,
          subject: concept.subject,
          type: 'flashcard',
          title: `${concept.title} Flashcards`,
          duration: 15,
          completed: Math.random() > 0.5, // randomly set some as completed
          description: `Review key points from ${concept.title}`
        });
      }
    });
    
    // Add practice exams if there are enough completed concepts and flashcards
    if (completedConcepts.length >= 2 && group.flashcards.filter(f => f.completed).length >= 1) {
      group.practiceExams.push({
        id: `exam-${group.subject}-${Date.now()}`,
        subject: group.subject,
        type: 'practice',
        title: `${group.subject} Quick Quiz`,
        duration: 20,
        completed: false,
        description: '10 questions to test your knowledge'
      });
    }
  });

  const handleMarkComplete = (taskId: string) => {
    markConceptCompleted(taskId);
    toast({
      title: "Task completed!",
      description: "Your progress has been updated.",
    });
  };

  const handleBookmarkConcept = (conceptId: string) => {
    setBookmarkedConcepts(prev => 
      prev.includes(conceptId) 
        ? prev.filter(id => id !== conceptId)
        : [...prev, conceptId]
    );
    toast({
      title: "Concept bookmarked",
      description: "You can review this concept later.",
    });
  };

  const calculateTotalTime = () => {
    const conceptTime = todayTasks.reduce((total, group) => 
      total + group.concepts.reduce((sum, concept) => sum + concept.duration, 0), 0);
    
    const flashcardTime = todayTasks.reduce((total, group) => 
      total + group.flashcards.reduce((sum, flash) => sum + flash.duration, 0), 0);
    
    const practiceTime = todayTasks.reduce((total, group) => 
      total + group.practiceExams.reduce((sum, exam) => sum + exam.duration, 0), 0);
    
    return { 
      conceptTime, 
      flashcardTime, 
      practiceTime, 
      total: conceptTime + flashcardTime + practiceTime 
    };
  };

  const times = calculateTotalTime();
  
  // Check if all tasks are completed
  const allTasksCompleted = todayTasks.every(group => 
    group.concepts.every(c => c.completed) && 
    group.flashcards.every(f => f.completed) && 
    group.practiceExams.every(p => p.completed)
  );

  return (
    <div className="space-y-6">
      {/* Main Study Plan Card */}
      <Card className="border-t-4 border-t-blue-500">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Brain className="text-blue-500" />
              Today's Study Plan ({format(new Date(), 'MMM dd, yyyy')})
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2"
              onClick={() => setShowNotes(!showNotes)}
            >
              <PenLine size={16} />
              Study Notes
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Time Guidance Section */}
          <div className="bg-blue-50 p-4 rounded-lg space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Clock className="text-blue-500" size={18} />
              Time Guidance
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-white rounded-md">
                <div className="text-sm text-gray-600">Concept Cards</div>
                <div className="text-lg font-semibold">{times.conceptTime} mins</div>
              </div>
              <div className="p-3 bg-white rounded-md">
                <div className="text-sm text-gray-600">Flashcards</div>
                <div className="text-lg font-semibold">{times.flashcardTime} mins</div>
              </div>
              <div className="p-3 bg-white rounded-md">
                <div className="text-sm text-gray-600">Practice Tests</div>
                <div className="text-lg font-semibold">{times.practiceTime} mins</div>
              </div>
              <div className="p-3 bg-white rounded-md">
                <div className="text-sm text-gray-600">Total Time</div>
                <div className="text-lg font-semibold">{times.total} mins</div>
              </div>
            </div>
          </div>

          {/* Subject-Wise Breakdown */}
          <div className="space-y-6">
            {todayTasks.map((group, index) => (
              <div key={group.subject} className="space-y-4">
                <h3 className="font-medium flex items-center gap-2">
                  <Book className="text-blue-500" size={18} />
                  {group.subject}
                </h3>

                {/* Concepts Section */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-600">Concept Cards</h4>
                  {group.concepts.map(concept => (
                    <div
                      key={concept.id}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-lg border transition-all",
                        concept.completed
                          ? "bg-green-50 border-green-200"
                          : "bg-white border-gray-200"
                      )}
                    >
                      <button
                        onClick={() => handleMarkComplete(concept.id)}
                        className={cn(
                          "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                          concept.completed ? "text-green-500" : "text-gray-300"
                        )}
                      >
                        {concept.completed ? <CheckCircle /> : <Circle />}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            "font-medium",
                            concept.completed && "text-green-700"
                          )}>
                            {concept.title}
                          </span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              <Clock size={10} className="mr-1" />
                              {concept.duration} min
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleBookmarkConcept(concept.id);
                              }}
                              className={cn(
                                "hover:text-blue-500",
                                bookmarkedConcepts.includes(concept.id) && "text-blue-500"
                              )}
                            >
                              <BookmarkPlus size={16} />
                            </Button>
                          </div>
                        </div>
                        {concept.description && (
                          <p className="text-sm text-gray-600">{concept.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Flashcards Section - Auto-generated based on completed concepts */}
                {group.flashcards.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-600">Flashcards</h4>
                    {group.flashcards.map(flashcard => (
                      <div
                        key={flashcard.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border transition-all",
                          flashcard.completed
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-gray-200"
                        )}
                      >
                        <button
                          onClick={() => {
                            // Toggle completion state
                            const updatedTasks = [...todayTasks];
                            const groupIndex = updatedTasks.findIndex(g => g.subject === group.subject);
                            const cardIndex = updatedTasks[groupIndex].flashcards.findIndex(f => f.id === flashcard.id);
                            updatedTasks[groupIndex].flashcards[cardIndex].completed = !flashcard.completed;
                            
                            toast({
                              title: flashcard.completed ? "Marked as incomplete" : "Marked as complete",
                              description: `${flashcard.title} has been updated.`
                            });
                          }}
                          className={cn(
                            "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                            flashcard.completed ? "text-green-500" : "text-gray-300"
                          )}
                        >
                          {flashcard.completed ? <CheckCircle /> : <Circle />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              "font-medium",
                              flashcard.completed && "text-green-700"
                            )}>
                              {flashcard.title}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              <Clock size={10} className="mr-1" />
                              {flashcard.duration} min
                            </Badge>
                          </div>
                          {flashcard.description && (
                            <p className="text-sm text-gray-600">{flashcard.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Practice Exams Section - Only shown if preconditions met */}
                {group.practiceExams.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-600">Practice Exams</h4>
                    {group.practiceExams.map(exam => (
                      <div
                        key={exam.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg border transition-all",
                          exam.completed
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-gray-200"
                        )}
                      >
                        <button
                          onClick={() => {
                            // Toggle completion state
                            const updatedTasks = [...todayTasks];
                            const groupIndex = updatedTasks.findIndex(g => g.subject === group.subject);
                            const examIndex = updatedTasks[groupIndex].practiceExams.findIndex(e => e.id === exam.id);
                            updatedTasks[groupIndex].practiceExams[examIndex].completed = !exam.completed;
                            
                            toast({
                              title: exam.completed ? "Marked as incomplete" : "Marked as complete",
                              description: `${exam.title} has been updated.`
                            });
                          }}
                          className={cn(
                            "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                            exam.completed ? "text-green-500" : "text-gray-300"
                          )}
                        >
                          {exam.completed ? <CheckCircle /> : <Circle />}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={cn(
                              "font-medium",
                              exam.completed && "text-green-700"
                            )}>
                              {exam.title}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              <Clock size={10} className="mr-1" />
                              {exam.duration} min
                            </Badge>
                          </div>
                          {exam.description && (
                            <p className="text-sm text-gray-600">{exam.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Study History Section */}
          <div className="border-t pt-6">
            <h3 className="font-medium flex items-center gap-2 mb-4">
              <CalendarDays className="text-blue-500" size={18} />
              Recent Study History
            </h3>
            <div className="space-y-3">
              {studyHistory.map(day => (
                <div key={day.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm">
                    {format(new Date(day.date), 'MMM dd')}
                  </div>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>Concepts: {day.stats.concepts}</span>
                    <span>Flashcards: {day.stats.flashcards}</span>
                    <span>Tests: {day.stats.practiceTests}</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Details
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Tomorrow's Preview - Unlocks when today is complete */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium flex items-center gap-2">
                <CalendarDays className="text-blue-500" size={18} />
                Tomorrow's Preview
              </h3>
              <Button
                variant="outline"
                size="sm"
                disabled={!allTasksCompleted}
                onClick={() => setShowTomorrow(!showTomorrow)}
              >
                {allTasksCompleted ? 'Show Preview' : 'Complete today first'}
                <ArrowRightCircle size={16} className="ml-1" />
              </Button>
            </div>
            
            {showTomorrow ? (
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm mb-2">Here's what you'll be learning tomorrow:</p>
                <ul className="space-y-2">
                  <li className="text-sm flex items-center gap-2">
                    <Circle className="h-3 w-3 text-blue-500" />
                    Physics: Kinematics Advanced Concepts (3 cards)
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <Circle className="h-3 w-3 text-blue-500" />
                    Chemistry: Periodic Table Relations (2 cards)
                  </li>
                  <li className="text-sm flex items-center gap-2">
                    <Circle className="h-3 w-3 text-blue-500" />
                    Math: Integration Techniques (2 cards)
                  </li>
                </ul>
              </div>
            ) : (
              <div className="p-6 bg-gray-50 rounded-lg text-center">
                {allTasksCompleted ? (
                  <div className="flex flex-col items-center">
                    <ArrowRightCircle className="h-8 w-8 text-blue-500 mb-2" />
                    <p>Click 'Show Preview' to see tomorrow's plan</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <LockIcon className="h-8 w-8 text-gray-400 mb-2" />
                    <p>Complete today's tasks to unlock tomorrow's preview</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Study Notes Section */}
          {showNotes && (
            <div className="border-t pt-6">
              <h3 className="font-medium mb-3">Study Notes</h3>
              <textarea
                className="w-full h-32 p-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your study notes, thoughts, or questions here..."
                value={studyNotes}
                onChange={(e) => setStudyNotes(e.target.value)}
              />
            </div>
          )}

          {/* Done for Today Button */}
          <div className="border-t pt-6 flex justify-center">
            <Button 
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => {
                toast({
                  title: "Great work today!",
                  description: "Your study session has been recorded.",
                });
              }}
            >
              I'm Done for Today
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
