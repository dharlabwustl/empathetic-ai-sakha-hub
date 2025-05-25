
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Target } from 'lucide-react';

const SubjectTasksBreakdown: React.FC = () => {
  // Mock data for subject breakdown
  const subjects = [
    {
      name: "Physics",
      concepts: 2,
      flashcards: 1,
      practiceExams: 1,
      totalTime: 90,
      color: "blue"
    },
    {
      name: "Chemistry", 
      concepts: 1,
      flashcards: 1,
      practiceExams: 1,
      totalTime: 50,
      color: "green"
    },
    {
      name: "Mathematics",
      concepts: 0,
      flashcards: 0,
      practiceExams: 0,
      totalTime: 0,
      color: "purple"
    }
  ];

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">Subject Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjects.map((subject) => (
            <Card key={subject.name} className={`border-l-4 border-l-${subject.color}-500`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{subject.name}</h3>
                  <Badge variant="outline">{subject.totalTime}m total</Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-blue-600" />
                    <span>{subject.concepts} concepts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Brain className="h-4 w-4 text-purple-600" />
                    <span>{subject.flashcards} flashcards</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-green-600" />
                    <span>{subject.practiceExams} practice</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectTasksBreakdown;
