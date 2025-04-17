
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface QuizzesTabProps {
  userProfile: UserProfileType;
}

const QuizzesTab: React.FC<QuizzesTabProps> = ({ userProfile }) => {
  const quizzes = [
    { id: 1, title: "Physics Mechanics", score: "85%", date: "2 days ago", status: "Completed" },
    { id: 2, title: "Organic Chemistry", score: "70%", date: "5 days ago", status: "Completed" },
    { id: 3, title: "Calculus I", score: "92%", date: "1 week ago", status: "Completed" },
    { id: 4, title: "Biology Fundamentals", status: "Not Started" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quizzes</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommended Quizzes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quizzes.slice(0, 2).map(quiz => (
                <div key={quiz.id} className="border p-3 rounded-md">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{quiz.title}</h3>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">New</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Based on your recent activity</p>
                  <button className="mt-3 text-sm text-blue-600 font-medium">Take Quiz</button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Quiz Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {quizzes.filter(q => q.status === "Completed").slice(0, 3).map(quiz => (
                <div key={quiz.id} className="flex justify-between items-center border-b pb-2 last:border-0">
                  <div>
                    <h3 className="font-medium">{quiz.title}</h3>
                    <p className="text-xs text-muted-foreground">{quiz.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{quiz.score}</div>
                    <button className="text-xs text-blue-600">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizzesTab;
