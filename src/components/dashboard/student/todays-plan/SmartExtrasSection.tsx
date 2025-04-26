
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { TodaysPlanData } from "@/types/student/todaysPlan";
import { Skeleton } from "@/components/ui/skeleton";
import { BookmarkPlus, CheckCircle, Sparkles, Flag } from "lucide-react";

interface SmartExtrasSectionProps {
  planData: TodaysPlanData | null;
  isLoading: boolean;
  onAddNote: (content: string) => void;
  onMarkDayComplete: () => void;
}

export default function SmartExtrasSection({
  planData,
  isLoading,
  onAddNote,
  onMarkDayComplete
}: SmartExtrasSectionProps) {
  const [noteContent, setNoteContent] = useState('');
  
  const handleSubmitNote = () => {
    if (noteContent.trim()) {
      onAddNote(noteContent);
      setNoteContent('');
    }
  };
  
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-full" />
        </CardFooter>
      </Card>
    );
  }
  
  if (!planData) return null;

  const completedTasksCount = 
    planData.tasks.concepts.filter(t => t.status === '✅ completed').length +
    planData.tasks.flashcards.filter(t => t.status === '✅ completed').length +
    planData.tasks.practiceExams.filter(t => t.status === '✅ completed').length;
    
  const totalTasksCount = 
    planData.tasks.concepts.length +
    planData.tasks.flashcards.length +
    planData.tasks.practiceExams.length;
  
  const allTasksCompleted = completedTasksCount === totalTasksCount;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <Sparkles className="h-5 w-5 mr-2 text-indigo-600" />
          Smart Extras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Notes Journal */}
          <div>
            <label htmlFor="journal" className="text-sm font-medium mb-1 block">
              Add Journal Notes (reflections, questions, thoughts)
            </label>
            <div className="flex flex-col gap-3">
              <Textarea 
                id="journal"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your thoughts about today's study session..."
                className="min-h-24"
              />
              <Button 
                onClick={handleSubmitNote}
                disabled={!noteContent.trim()}
                size="sm"
                className="w-full sm:w-auto ml-auto"
              >
                <BookmarkPlus className="h-4 w-4 mr-1" />
                Save Note
              </Button>
            </div>
          </div>
          
          {/* Tomorrow's Preview */}
          {planData.tomorrowPreview && (
            <div className="border rounded-lg p-3">
              <h4 className="text-sm font-medium flex items-center">
                <Flag className="h-4 w-4 mr-1 text-purple-500" />
                Tomorrow's Preview
              </h4>
              <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                <div>
                  <div className="text-muted-foreground">Concept Cards</div>
                  <div className="font-medium">{planData.tomorrowPreview.concepts}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Flashcards</div>
                  <div className="font-medium">{planData.tomorrowPreview.flashcards}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Practice Exams</div>
                  <div className="font-medium">{planData.tomorrowPreview.practiceExams}</div>
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {allTasksCompleted 
                  ? "All today's tasks completed! You can start tomorrow's plan now."
                  : "Complete all today's tasks to unlock tomorrow's plan early."}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onMarkDayComplete}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          I'm Done for Today ({completedTasksCount}/{totalTasksCount} Tasks)
        </Button>
      </CardFooter>
    </Card>
  );
}
