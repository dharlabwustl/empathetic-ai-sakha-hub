
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card } from "@/components/ui/card";
import {
  Brain,
  Repeat,
  TestTube,
  ChartBar,
  Check
} from 'lucide-react';

interface StudyMetricsGridProps {
  userProfile: UserProfileType;
}

const MetricCard = ({ icon: Icon, label, value, colorClass }: any) => (
  <Card className="p-4 flex items-start gap-4 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
    <div className={`rounded-lg p-2 ${colorClass}`}>
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </Card>
);

export const StudyMetricsGrid: React.FC<StudyMetricsGridProps> = ({ userProfile }) => {
  const metrics = [
    {
      icon: Brain,
      label: "Total Concept Cards",
      value: "234",
      colorClass: "bg-violet-500"
    },
    {
      icon: Repeat,
      label: "Flashcards to Complete",
      value: "89",
      colorClass: "bg-blue-500"
    },
    {
      icon: TestTube,
      label: "Practice Exams (Concept-wise)",
      value: "45",
      colorClass: "bg-emerald-500"
    },
    {
      icon: ChartBar,
      label: "Avg Quiz Score / Subject",
      value: "78%",
      colorClass: "bg-amber-500"
    },
    {
      icon: Brain,
      label: "Avg Flashcard Recall",
      value: "82%",
      colorClass: "bg-indigo-500"
    },
    {
      icon: Check,
      label: "Total Concepts Completed",
      value: "156",
      colorClass: "bg-green-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};
