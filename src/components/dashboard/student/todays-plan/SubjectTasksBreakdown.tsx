
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { BookOpen, Brain, FileText, Clock } from "lucide-react";

interface TaskCardProps {
  title: string;
  type: 'concept' | 'flashcard' | 'exam';
  timeEstimate: number;
  status: 'pending' | 'completed';
  path: string;
}

const TaskCard = ({ title, type, timeEstimate, status, path }: TaskCardProps) => (
  <Link to={path} className="block">
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {type === 'concept' && <BookOpen className="h-4 w-4 text-blue-500" />}
            {type === 'flashcard' && <Brain className="h-4 w-4 text-purple-500" />}
            {type === 'exam' && <FileText className="h-4 w-4 text-emerald-500" />}
            <span className="font-medium">{title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-500">{timeEstimate}min</span>
            <Badge variant={status === 'completed' ? 'default' : 'secondary'}>
              {status === 'completed' ? '✓ Done' : '⏳ Pending'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export const SubjectTasksBreakdown = () => {
  const subjects = [
    {
      id: 'math',
      name: 'Mathematics',
      concepts: [
        { id: 1, title: 'Linear Equations', timeEstimate: 30, status: 'pending' as const },
        { id: 2, title: 'Quadratic Functions', timeEstimate: 45, status: 'completed' as const }
      ],
      flashcards: [
        { id: 1, title: 'Algebra Basics', timeEstimate: 15, status: 'pending' as const },
        { id: 2, title: 'Geometry Terms', timeEstimate: 20, status: 'completed' as const }
      ],
      exams: [
        { id: 1, title: 'Algebra Quiz 1', timeEstimate: 30, status: 'pending' as const }
      ]
    },
    // ... Add more subjects here
  ];

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {subjects.map(subject => (
        <AccordionItem key={subject.id} value={subject.id}>
          <AccordionTrigger className="text-lg font-semibold">
            {subject.name}
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            {/* Concepts */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500">Concepts</h4>
              <div className="grid gap-2">
                {subject.concepts.map(concept => (
                  <TaskCard
                    key={concept.id}
                    title={concept.title}
                    type="concept"
                    timeEstimate={concept.timeEstimate}
                    status={concept.status}
                    path={`/dashboard/student/concepts/${concept.id}`}
                  />
                ))}
              </div>
            </div>

            {/* Flashcards */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500">Flashcards</h4>
              <div className="grid gap-2">
                {subject.flashcards.map(flashcard => (
                  <TaskCard
                    key={flashcard.id}
                    title={flashcard.title}
                    type="flashcard"
                    timeEstimate={flashcard.timeEstimate}
                    status={flashcard.status}
                    path={`/dashboard/student/flashcards/${flashcard.id}`}
                  />
                ))}
              </div>
            </div>

            {/* Practice Exams */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-500">Practice Exams</h4>
              <div className="grid gap-2">
                {subject.exams.map(exam => (
                  <TaskCard
                    key={exam.id}
                    title={exam.title}
                    type="exam"
                    timeEstimate={exam.timeEstimate}
                    status={exam.status}
                    path={`/dashboard/student/practice-exam/${exam.id}`}
                  />
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
