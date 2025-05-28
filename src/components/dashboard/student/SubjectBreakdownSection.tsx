
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, TrendingUp } from 'lucide-react';

const SubjectBreakdownSection: React.FC = () => {
  const subjects = [
    {
      name: "Physics",
      priority: "High",
      concepts: { completed: 42, total: 60 },
      flashcards: { completed: 85, total: 120 },
      practiceTests: { completed: 15, total: 20 },
      quizScore: 72,
      recallAccuracy: 68,
      status: "in-progress"
    },
    {
      name: "Chemistry", 
      priority: "Medium",
      concepts: { completed: 48, total: 55 },
      flashcards: { completed: 110, total: 130 },
      practiceTests: { completed: 18, total: 22 },
      quizScore: 78,
      recallAccuracy: 74,
      status: "in-progress"
    },
    {
      name: "Biology",
      priority: "High", 
      concepts: { completed: 55, total: 55 },
      flashcards: { completed: 180, total: 180 },
      practiceTests: { completed: 25, total: 25 },
      quizScore: 92,
      recallAccuracy: 90,
      status: "completed"
    }
  ];

  const stats = [
    { label: "Concepts Completed", value: "45/60", change: "+5", icon: "📚" },
    { label: "Quiz Average Score", value: "82%", change: "+3", icon: "🎯" },
    { label: "Flashcard Recall", value: "78%", change: "+7", icon: "🧠" },
    { label: "Practice Tests", value: "12", change: "+2", icon: "📝" },
    { label: "Daily Study Goal", value: "4.5 hrs", change: "+0.5%", icon: "⏰" }
  ];

  const getPriorityBadge = (priority: string) => {
    const colors = {
      High: "bg-red-100 text-red-800 border-red-200",
      Medium: "bg-yellow-100 text-yellow-800 border-yellow-200", 
      Low: "bg-green-100 text-green-800 border-green-200"
    };
    return <Badge className={colors[priority as keyof typeof colors]}>{priority}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    return status === "completed" ? "✅" : "🟡";
  };

  const getStatusText = (status: string) => {
    return status === "completed" ? "Completed" : "In Progress";
  };

  return (
    <div className="space-y-6">
      {/* Subject Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-violet-600" />
            Subject-Wise Detailed Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Subject</th>
                  <th className="text-left p-2 font-medium">Priority</th>
                  <th className="text-left p-2 font-medium">Concepts</th>
                  <th className="text-left p-2 font-medium">Flashcards</th>
                  <th className="text-left p-2 font-medium">Practice Tests</th>
                  <th className="text-left p-2 font-medium">Quiz Score</th>
                  <th className="text-left p-2 font-medium">Recall Accuracy</th>
                  <th className="text-left p-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="p-2 font-medium">{subject.name}</td>
                    <td className="p-2">{getPriorityBadge(subject.priority)}</td>
                    <td className="p-2">
                      <div>
                        {subject.concepts.completed} / {subject.concepts.total}
                        <Progress 
                          value={(subject.concepts.completed / subject.concepts.total) * 100} 
                          className="h-1 mt-1" 
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <div>
                        {subject.flashcards.completed} / {subject.flashcards.total}
                        <Progress 
                          value={(subject.flashcards.completed / subject.flashcards.total) * 100} 
                          className="h-1 mt-1" 
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <div>
                        {subject.practiceTests.completed} / {subject.practiceTests.total}
                        <Progress 
                          value={(subject.practiceTests.completed / subject.practiceTests.total) * 100} 
                          className="h-1 mt-1" 
                        />
                      </div>
                    </td>
                    <td className="p-2">
                      <span className={`font-medium ${
                        subject.quizScore >= 80 ? 'text-green-600' : 
                        subject.quizScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {subject.quizScore}%
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`font-medium ${
                        subject.recallAccuracy >= 80 ? 'text-green-600' : 
                        subject.recallAccuracy >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {subject.recallAccuracy}%
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center gap-1">
                        <span>{getStatusIcon(subject.status)}</span>
                        <span className="text-sm">{getStatusText(subject.status)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </div>
              <div className="flex items-center justify-center gap-1 text-green-600">
                <TrendingUp className="h-3 w-3" />
                <span className="text-xs">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectBreakdownSection;
