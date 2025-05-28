
import React from 'react';
import { OverviewKPICard } from '../shared/OverviewKPICard';
import { SmartSuggestionBox } from '../shared/SmartSuggestionBox';
import { FileText, Trophy, TrendingUp, Calendar } from 'lucide-react';

export const PracticeExamsOverviewTab: React.FC = () => {
  const kpiData = [
    { title: "Exams Taken Today", value: "2", subtext: "Goal: 3 exams", icon: <FileText className="h-6 w-6" /> },
    { title: "Weekly Exams", value: "12", subtext: "+8% from last week", icon: <Calendar className="h-6 w-6" /> },
    { title: "Avg. Score", value: "78%", subtext: "+5% improvement", variant: 'success' as const, icon: <Trophy className="h-6 w-6" /> },
    { title: "Accuracy Trend", value: "82%", subtext: "Trending up", variant: 'success' as const, icon: <TrendingUp className="h-6 w-6" /> }
  ];

  const subjectScores = [
    { subject: "Physics", score: 75, trend: "+3%", color: "bg-blue-500" },
    { subject: "Chemistry", score: 82, trend: "+7%", color: "bg-green-500" },
    { subject: "Biology", score: 79, trend: "+2%", color: "bg-purple-500" }
  ];

  const suggestions = [
    "You're struggling in Mechanics – Take another test",
    "Your accuracy in Biology has improved. Try full-length test",
    "Focus on Organic Chemistry practice"
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <OverviewKPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Subject Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subject-wise Exam Scores</h3>
          {subjectScores.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.subject}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{subject.score}%</span>
                  <span className="text-xs text-green-600">{subject.trend}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${subject.color}`}
                  style={{ width: `${subject.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Smart Suggestions */}
        <SmartSuggestionBox suggestions={suggestions} title="Exam Insights" />
      </div>
    </div>
  );
};
