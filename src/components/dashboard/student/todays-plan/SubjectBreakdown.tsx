
import React from 'react';
import { Book, BookOpen, FileCheck, ArrowRight, Check, Clock, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Props {
  timeframe: 'today' | 'weekly' | 'monthly';
}

export default function SubjectBreakdown({ timeframe }: Props) {
  const subjects = [
    {
      name: 'Biology',
      concepts: [
        { id: 'c1', title: 'Photosynthesis Explained', completed: true },
        { id: 'c2', title: 'Cell Structure & Function', completed: true }
      ],
      flashcards: [
        { id: 'f1', title: 'Chapter 2 Quick Recap', completed: true }
      ],
      practiceTests: [
        { 
          id: 'p1', 
          title: 'Quiz: Plant Biology Basics', 
          completed: true,
          questions: 10,
          duration: 20
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Book className="text-blue-500" />
          Subject-Wise Breakdown
        </h3>
        <Link to="/dashboard/student/subjects">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {subjects.map((subject) => (
          <div key={subject.name} className="space-y-4 p-4 bg-white rounded-lg border">
            <h4 className="font-medium text-lg flex items-center gap-2">
              <Badge variant="outline">{subject.name}</Badge>
            </h4>

            {/* Concept Cards */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-500" />
                Concept Cards
              </h5>
              <div className="space-y-2">
                {subject.concepts.map((concept) => (
                  <Link 
                    key={concept.id}
                    to={`/dashboard/student/concepts/${concept.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span className={cn(
                      "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                      concept.completed ? "text-green-500" : "text-gray-300"
                    )}>
                      {concept.completed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                    </span>
                    <span className={cn(
                      "flex-1",
                      concept.completed && "text-gray-500"
                    )}>
                      {concept.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Flashcards */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium flex items-center gap-2">
                <Book className="h-4 w-4 text-blue-500" />
                Flashcards
              </h5>
              <div className="space-y-2">
                {subject.flashcards.map((flashcard) => (
                  <Link
                    key={flashcard.id}
                    to={`/dashboard/student/flashcards/${flashcard.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span className={cn(
                      "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                      flashcard.completed ? "text-green-500" : "text-gray-300"
                    )}>
                      {flashcard.completed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                    </span>
                    <span className={cn(
                      "flex-1",
                      flashcard.completed && "text-gray-500"
                    )}>
                      {flashcard.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Practice Tests */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium flex items-center gap-2">
                <FileCheck className="h-4 w-4 text-blue-500" />
                Practice Tests
              </h5>
              <div className="space-y-2">
                {subject.practiceTests.map((test) => (
                  <Link
                    key={test.id}
                    to={`/dashboard/student/practice/${test.id}`}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <span className={cn(
                      "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                      test.completed ? "text-green-500" : "text-gray-300"
                    )}>
                      {test.completed ? <Check className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
                    </span>
                    <div className="flex-1">
                      <span className={cn("block", test.completed && "text-gray-500")}>
                        {test.title}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <span>{test.questions} Qs</span>
                        <span>·</span>
                        <Clock className="h-3 w-3" />
                        <span>{test.duration} mins</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
