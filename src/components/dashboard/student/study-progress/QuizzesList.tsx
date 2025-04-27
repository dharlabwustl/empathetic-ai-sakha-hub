
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuizzesList = () => {
  // Mock data for quizzes
  const quizzes = [
    { id: '1', title: 'Physics Weekly Quiz', score: '85%', date: '2 days ago', status: 'Completed' },
    { id: '2', title: 'Chemistry Chapter 4 Test', score: '73%', date: '1 week ago', status: 'Completed' },
    { id: '3', title: 'Mathematics Practice Test', score: null, date: 'Expires in 3 days', status: 'Pending' }
  ];

  return (
    <div className="space-y-4">
      {quizzes.map(quiz => (
        <Card key={quiz.id}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">{quiz.title}</CardTitle>
            <CardDescription>{quiz.date}</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              {quiz.score ? (
                <span className="font-semibold">{quiz.score}</span>
              ) : (
                <Button size="sm" variant="outline">Start Quiz</Button>
              )}
              <span className={`text-xs px-2 py-1 rounded-full ${
                quiz.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {quiz.status}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuizzesList;
