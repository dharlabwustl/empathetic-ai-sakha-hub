
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';

interface SubjectProgressProps {
  subject: string;
  progress: number;
  strengths: string[];
  weaknesses: string[];
}

const SubjectProgress: React.FC<SubjectProgressProps> = ({ subject, progress, strengths, weaknesses }) => {
  return (
    <div className="mb-6 p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium text-lg">{subject}</h3>
        <span className="text-sm font-medium">{progress}% complete</span>
      </div>
      
      <Progress value={progress} className="h-2 mb-4" />
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h4 className="text-sm font-medium text-green-700 mb-2">Strengths</h4>
          <ul className="text-sm space-y-1">
            {strengths.map((strength, index) => (
              <li key={index} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                {strength}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-red-700 mb-2">Areas to Improve</h4>
          <ul className="text-sm space-y-1">
            {weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></span>
                {weakness}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const SubjectOverview: React.FC = () => {
  // Mock subject progress data
  const subjectData = [
    {
      subject: "Physics",
      progress: 78,
      strengths: ["Mechanics", "Optics", "Waves"],
      weaknesses: ["Thermodynamics", "Nuclear Physics"]
    },
    {
      subject: "Chemistry",
      progress: 85,
      strengths: ["Organic Chemistry", "Chemical Bonding", "Periodic Table"],
      weaknesses: ["Electrochemistry", "Chemical Kinetics"]
    },
    {
      subject: "Mathematics",
      progress: 73,
      strengths: ["Calculus", "Algebra"],
      weaknesses: ["Trigonometry", "Probability", "Statistics"]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {subjectData.map((subject, index) => (
          <SubjectProgress 
            key={index}
            subject={subject.subject}
            progress={subject.progress}
            strengths={subject.strengths}
            weaknesses={subject.weaknesses}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default SubjectOverview;
