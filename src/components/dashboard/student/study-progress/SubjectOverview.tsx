
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip } from 'recharts';

interface Subject {
  id: string;
  name: string;
  progress: number;
  color: string;
  [key: string]: any;
}

interface SubjectOverviewProps {
  subjects: Subject[];
}

export const SubjectOverview: React.FC<SubjectOverviewProps> = ({ subjects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="font-medium mb-4">Subject Progress</h3>
        <div className="space-y-4">
          {subjects.map(subject => (
            <div key={subject.id} className="space-y-2">
              <div className="flex justify-between">
                <span>{subject.name}</span>
                <span className="font-medium">{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} className="h-2" style={{backgroundColor: `${subject.color}40`}}>
                <div className="h-full" style={{backgroundColor: subject.color}}></div>
              </Progress>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-4">Strong vs Weak Subjects</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjects}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="progress" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
