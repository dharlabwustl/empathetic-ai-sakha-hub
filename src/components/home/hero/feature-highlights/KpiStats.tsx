
import React from 'react';
import { Progress } from "@/components/ui/progress";

const KpiStats: React.FC = () => {
  const stats = [
    {
      label: "estimated of students said PREPZR helped reduce exam stress",
      value: 56,
      color: "bg-green-500",
      textColor: "text-green-600"
    },
    {
      label: "improvement in exam scores with personalized learning",
      value: 43,
      color: "bg-blue-500",
      textColor: "text-blue-600"
    },
    {
      label: "reduction in study time for the same exam results",
      value: 27,
      color: "bg-purple-500",
      textColor: "text-purple-600"
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 border border-gray-100 dark:border-gray-700">
          <div className="flex items-end justify-between mb-2">
            <span className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}%</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Proven Results That Matter</span>
          </div>
          <Progress value={stat.value} className={`h-2 mb-2 ${stat.color}`} />
          <p className="text-sm text-gray-700 dark:text-gray-300">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default KpiStats;
