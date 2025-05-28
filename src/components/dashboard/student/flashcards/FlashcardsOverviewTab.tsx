
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { OverviewKPICard } from '../shared/OverviewKPICard';
import { SmartSuggestionBox } from '../shared/SmartSuggestionBox';
import { Brain, Target, TrendingUp, Clock } from 'lucide-react';

export const FlashcardsOverviewTab: React.FC = () => {
  const kpiData = [
    { title: "Cards Practiced Today", value: "24", subtext: "Goal: 30 cards", icon: <Brain className="h-6 w-6" /> },
    { title: "Weekly Practice", value: "156", subtext: "+12% from last week", icon: <Target className="h-6 w-6" /> },
    { title: "Avg. Recall Accuracy", value: "87%", subtext: "+3% improvement", variant: 'success' as const, icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Cards Needing Review", value: "18", subtext: "Due today", variant: 'warning' as const, icon: <Clock className="h-6 w-6" /> }
  ];

  const subjectStrength = [
    { subject: "Physics", strength: 85, status: "Strong", color: "bg-green-500" },
    { subject: "Chemistry", strength: 72, status: "Good", color: "bg-yellow-500" },
    { subject: "Biology", strength: 91, status: "Excellent", color: "bg-green-500" }
  ];

  const suggestions = [
    "You forgot 3 formulas from Thermodynamics",
    "Revise 'DNA Structure' flashcards today",
    "Practice Organic Chemistry reactions"
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <OverviewKPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Subject Strength */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Subject-wise Recall Strength</h3>
          {subjectStrength.map((subject) => (
            <div key={subject.subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{subject.subject}</span>
                <span className="text-sm font-semibold text-gray-600">{subject.status}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${subject.color}`}
                  style={{ width: `${subject.strength}%` }}
                />
              </div>
              <div className="text-xs text-gray-500">{subject.strength}% recall accuracy</div>
            </div>
          ))}
        </div>

        {/* Smart Suggestions */}
        <SmartSuggestionBox suggestions={suggestions} title="Flashcard Insights" />
      </div>
    </div>
  );
};
