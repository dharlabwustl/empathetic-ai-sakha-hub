
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SubjectProgress, StudyStreak } from '@/types/user';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip, CartesianGrid } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudyTimeChartProps {
  subjects: SubjectProgress[];
  selectedSubject: SubjectProgress | null;
  selectSubject: (id: string) => void;
  studyStreak: StudyStreak | null;
}

const StudyTimeChart = ({ subjects, selectedSubject, selectSubject, studyStreak }: StudyTimeChartProps) => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.1 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 2.7 },
    { day: 'Fri', hours: 3.5 },
    { day: 'Sat', hours: 4.2 },
    { day: 'Sun', hours: 1.2 },
  ];

  const subjectTimeData = subjects.map(subject => ({
    name: subject.name,
    hours: Math.round(Math.random() * 10 + 5) // Placeholder data
  }));

  const handleSubjectChange = (value: string) => {
    selectSubject(value);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Study Time Analytics</h3>
        <Select
          value={selectedSubject?.id || 'all'}
          onValueChange={handleSubjectChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject.id} value={subject.id}>
                {subject.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium mb-2">Weekly Study Hours</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h4 className="text-sm font-medium mb-2">Study Hours by Subject</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              layout="vertical"
              data={subjectTimeData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="hours" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {studyStreak && (
        <div className="p-4 bg-amber-50 rounded-md border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium text-amber-800 dark:text-amber-300">Your Study Streak</h4>
              <p className="text-sm text-amber-700 dark:text-amber-400">{studyStreak.current} days in a row</p>
            </div>
            <div className="text-2xl">
              🔥
            </div>
          </div>
          <div className="mt-2 flex justify-between gap-2">
            <div className="bg-white dark:bg-gray-800 p-2 rounded flex-1 text-center">
              <div className="text-xs text-gray-500">Best</div>
              <div className="font-bold">{studyStreak.best} days</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded flex-1 text-center">
              <div className="text-xs text-gray-500">This Week</div>
              <div className="font-bold">{studyStreak.thisWeek} hrs</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-2 rounded flex-1 text-center">
              <div className="text-xs text-gray-500">This Month</div>
              <div className="font-bold">{studyStreak.thisMonth} hrs</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyTimeChart;
