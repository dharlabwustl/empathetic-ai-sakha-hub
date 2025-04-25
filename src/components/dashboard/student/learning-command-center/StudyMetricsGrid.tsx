
import React from 'react';
import { Card } from "@/components/ui/card";
import { Brain, Repeat, TestTube, ChartBar, Check } from 'lucide-react';
import { StudyMetrics } from '@/types/user/base';

interface StudyMetricsGridProps {
  metrics: StudyMetrics;
}

const MetricCard = ({ icon: Icon, label, value, emoji }: {
  icon: any;
  label: string;
  value: string | number;
  emoji: string;
}) => (
  <Card className="p-4 flex items-center gap-4 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800/50 dark:to-gray-900/50 hover:shadow-md transition-all">
    <div className="flex-shrink-0">
      <span className="text-2xl">{emoji}</span>
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</p>
      <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
    </div>
  </Card>
);

export const StudyMetricsGrid: React.FC<StudyMetricsGridProps> = ({ metrics }) => {
  const metricsData = [
    {
      emoji: '🧠',
      icon: Brain,
      label: "Total Concept Cards",
      value: metrics.totalConceptCards
    },
    {
      emoji: '🔁',
      icon: Repeat,
      label: "Flashcards to Complete",
      value: metrics.flashcardsToComplete
    },
    {
      emoji: '🧪',
      icon: TestTube,
      label: "Practice Exams",
      value: metrics.practiceExams
    },
    {
      emoji: '📊',
      icon: ChartBar,
      label: "Avg Quiz Score",
      value: `${metrics.averageQuizScore}%`
    },
    {
      emoji: '🧠',
      icon: Brain,
      label: "Flashcard Recall",
      value: `${metrics.averageRecallAccuracy}%`
    },
    {
      emoji: '✅',
      icon: Check,
      label: "Concepts Completed",
      value: metrics.totalConceptsCompleted
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metricsData.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};
