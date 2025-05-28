
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { OverviewKPICard } from '../shared/OverviewKPICard';
import { SmartSuggestionBox } from '../shared/SmartSuggestionBox';
import { BookOpen, Target, TrendingUp, Award } from 'lucide-react';

export const ConceptsOverviewTab: React.FC = () => {
  const kpiData = [
    { title: "Total Concepts", value: "156", subtext: "78 Completed, 45 In Progress, 33 Pending", icon: <BookOpen className="h-6 w-6" /> },
    { title: "Today's Target", value: "8", subtext: "5 remaining", icon: <Target className="h-6 w-6" /> },
    { title: "Accuracy %", value: "84%", subtext: "+5% from last week", variant: 'success' as const, icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Mastery Score", value: "72", subtext: "Good progress!", variant: 'success' as const, icon: <Award className="h-6 w-6" /> }
  ];

  const subjectProgress = [
    { subject: "Physics", completed: 65, total: 85, percentage: 76 },
    { subject: "Chemistry", completed: 48, total: 70, percentage: 69 },
    { subject: "Biology", completed: 52, total: 75, percentage: 69 }
  ];

  const suggestions = [
    "Revise Electromagnetism today",
    "Try 2 hard-level concepts from Organic Chemistry",
    "Complete Thermodynamics concepts this week"
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <OverviewKPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Subject Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subject-wise Progress</h3>
          {subjectProgress.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.subject}</span>
                <span className="text-sm text-gray-600">{subject.completed}/{subject.total} concepts</span>
              </div>
              <Progress value={subject.percentage} className="h-2" />
              <div className="text-xs text-gray-500">{subject.percentage}% completed</div>
            </div>
          ))}
        </div>

        {/* Smart Suggestions */}
        <SmartSuggestionBox suggestions={suggestions} />
      </div>
    </div>
  );
};
