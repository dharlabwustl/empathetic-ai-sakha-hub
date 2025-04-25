
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
  PenLine
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStudyPlan } from "@/hooks/useUserStudyPlan";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

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
    const conceptTime = 60;
    const flashcardTime = 30;
    const practiceTime = 20;
    return { conceptTime, flashcardTime, practiceTime, total: conceptTime + flashcardTime + practiceTime };
  };

  const times = calculateTotalTime();

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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmarkConcept(concept.id)}
                            className={cn(
                              "hover:text-blue-500",
                              bookmarkedConcepts.includes(concept.id) && "text-blue-500"
                            )}
                          >
                            <BookmarkPlus size={16} />
                          </Button>
                        </div>
                        {concept.description && (
                          <p className="text-sm text-gray-600">{concept.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
            >
              I'm Done for Today
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
