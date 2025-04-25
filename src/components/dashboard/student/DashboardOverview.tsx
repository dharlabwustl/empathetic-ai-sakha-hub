
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Brain, ChartBar } from "lucide-react";

interface DashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
}

export default function DashboardOverview({
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features
}: DashboardOverviewProps) {
  // Mock values for KPI metrics - in a real app, these would come from your data source
  const kpiMetrics = {
    totalConceptCards: 450,
    flashcardsToComplete: 120,
    practiceExams: 45,
    averageQuizScore: 82,
    averageFlashcardAccuracy: 78,
    totalConceptsCompleted: 385
  };

  // Mock subject data
  const subjects = [
    { 
      name: 'Physics', 
      priority: 'High',
      concepts: { done: 45, total: 60 },
      flashcards: { done: 120, total: 150 },
      practiceTests: { done: 20, total: 25 },
      quizScore: 85,
      flashcardAccuracy: 72,
      status: 'in-progress'
    },
    { 
      name: 'Chemistry', 
      priority: 'High',
      concepts: { done: 55, total: 55 },
      flashcards: { done: 180, total: 180 },
      practiceTests: { done: 25, total: 25 },
      quizScore: 92,
      flashcardAccuracy: 88,
      status: 'completed'
    },
    { 
      name: 'Mathematics', 
      priority: 'Medium',
      concepts: { done: 20, total: 40 },
      flashcards: { done: 90, total: 100 },
      practiceTests: { done: 10, total: 15 },
      quizScore: 75,
      flashcardAccuracy: 65,
      status: 'need-attention'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Exam Goal Section - Now more prominent */}
      <Card className="p-6 border-t-4 border-blue-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Book className="text-blue-500" />
              Exam Goal: {userProfile?.goals?.[0]?.title || 'IIT-JEE'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your personalized study plan is tailored for this exam
            </p>
          </div>
          <div className="mt-2 md:mt-0 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium text-sm">
            {kpiMetrics.totalConceptsCompleted}/{kpiMetrics.totalConceptCards} Concepts Completed
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-violet-50 rounded-lg">
            <p className="text-sm text-gray-600">Enrolled Subjects</p>
            <p className="text-2xl font-bold text-violet-700">{subjects.length}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Concept Cards</p>
            <p className="text-2xl font-bold text-blue-700">
              {kpiMetrics.totalConceptCards}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Flashcards to Complete</p>
            <p className="text-2xl font-bold text-green-700">
              {kpiMetrics.flashcardsToComplete}
            </p>
          </div>
          <div className="p-4 bg-amber-50 rounded-lg">
            <p className="text-sm text-gray-600">Practice Exams</p>
            <p className="text-2xl font-bold text-amber-700">
              {kpiMetrics.practiceExams}
            </p>
          </div>
        </div>
      </Card>

      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-white rounded-lg shadow-sm border">
              <div className="space-y-1">
                <span className="text-sm text-gray-500">🧠 Total Concept Cards</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.totalConceptCards}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">🔁 Flashcards to Complete</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.flashcardsToComplete}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">🧪 Practice Exams</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.practiceExams}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">📊 Avg Quiz Score</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.averageQuizScore}%</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">🧠 Flashcard Accuracy</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.averageFlashcardAccuracy}%</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">✅ Concepts Completed</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.totalConceptsCompleted}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ProfileCard profile={userProfile} />
        </div>
      </div>

      {/* Subject-Wise Breakdown */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <Brain className="text-primary" />
          Subject-Wise Breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Subject</th>
                <th className="pb-2">Priority</th>
                <th className="pb-2">Concepts</th>
                <th className="pb-2">Flashcards</th>
                <th className="pb-2">Tests</th>
                <th className="pb-2">Quiz Score</th>
                <th className="pb-2">Recall Accuracy</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.name} className="border-b">
                  <td className="py-3 font-medium">{subject.name}</td>
                  <td>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      subject.priority === 'High' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {subject.priority}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {subject.concepts.done} / {subject.concepts.total}
                      </span>
                      <Progress value={(subject.concepts.done / subject.concepts.total) * 100} className="w-20" />
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {subject.flashcards.done} / {subject.flashcards.total}
                      </span>
                      <Progress value={(subject.flashcards.done / subject.flashcards.total) * 100} className="w-20" />
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {subject.practiceTests.done} / {subject.practiceTests.total}
                      </span>
                      <Progress value={(subject.practiceTests.done / subject.practiceTests.total) * 100} className="w-20" />
                    </div>
                  </td>
                  <td>
                    <span className="text-sm font-medium">{subject.quizScore}%</span>
                  </td>
                  <td>
                    <span className="text-sm font-medium">{subject.flashcardAccuracy}%</span>
                  </td>
                  <td>
                    <span className="flex items-center gap-1">
                      {subject.status === 'completed' ? '✅' : subject.status === 'in-progress' ? '🟡' : '🟠'}
                      <span className="text-sm capitalize">{subject.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Progress Tracker */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
          <ChartBar className="text-primary" />
          Progress Tracker
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Daily Status */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Daily Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Concepts Done</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Flashcards Done</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tests Taken</span>
                <span className="font-medium">1</span>
              </div>
              <Progress value={75} className="mt-2" />
            </div>
          </div>

          {/* Weekly Status */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Weekly Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Concepts Done</span>
                <span className="font-medium">25</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Flashcards Done</span>
                <span className="font-medium">150</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tests Taken</span>
                <span className="font-medium">5</span>
              </div>
              <Progress value={85} className="mt-2" />
            </div>
          </div>

          {/* Monthly Status */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Monthly Status</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Concepts Done</span>
                <span className="font-medium">85</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Flashcards Done</span>
                <span className="font-medium">450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tests Taken</span>
                <span className="font-medium">15</span>
              </div>
              <Progress value={90} className="mt-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Nudges Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <NudgePanel nudges={nudges} markAsRead={markNudgeAsRead} />
        </div>
      </div>
    </div>
  );
}
