import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart } from "@/components/ui/chart";
import { SubjectProgress, StudyStreak } from "@/types/user";

interface StudyTimeChartProps {
  subjectProgress: SubjectProgress;
  studyStreak: StudyStreak;
}

const StudyTimeChart: React.FC<StudyTimeChartProps> = ({ subjectProgress, studyStreak }) => {
  // Mock data for the chart
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hours Studied',
        data: studyStreak.thisWeek,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Hours',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Day',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Study Time</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default StudyTimeChart;
