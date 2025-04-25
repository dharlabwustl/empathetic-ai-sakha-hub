
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SubjectBreakdownProps {
  userProfile: UserProfileType;
}

export const SubjectBreakdown: React.FC<SubjectBreakdownProps> = ({ userProfile }) => {
  const subjects = [
    {
      name: "Math",
      priority: "High",
      conceptsDone: 45,
      conceptsTotal: 60,
      flashcardsDone: 120,
      flashcardsTotal: 150,
      testsDone: 20,
      testsTotal: 25,
      status: "in-progress" as const
    },
    // ... Add more subjects as needed
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🟡';
      case 'needs-attention': return '🟠';
      default: return '⚪';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">🧠 Subject-Wise Breakdown</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Concepts</TableHead>
              <TableHead>Flashcards</TableHead>
              <TableHead>Tests</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.name}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    subject.priority === 'High' ? 'bg-red-100 text-red-700' :
                    subject.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {subject.priority}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{subject.conceptsDone}/{subject.conceptsTotal}</span>
                    <Progress value={(subject.conceptsDone/subject.conceptsTotal) * 100} className="w-20" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{subject.flashcardsDone}/{subject.flashcardsTotal}</span>
                    <Progress value={(subject.flashcardsDone/subject.flashcardsTotal) * 100} className="w-20" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{subject.testsDone}/{subject.testsTotal}</span>
                    <Progress value={(subject.testsDone/subject.testsTotal) * 100} className="w-20" />
                  </div>
                </TableCell>
                <TableCell>{getStatusIcon(subject.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
