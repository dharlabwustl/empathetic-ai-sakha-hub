
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartBar } from 'lucide-react';

interface ProgressTrackerProps {
  userProfile: UserProfileType;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ userProfile }) => {
  // Mock data for progress tracking
  const progressData = [
    {
      timeline: 'Daily Status',
      conceptsDone: 5,
      flashcardsDone: 25,
      testsTaken: 1,
      completionPercentage: 80
    },
    {
      timeline: 'Weekly Status',
      conceptsDone: 23,
      flashcardsDone: 120,
      testsTaken: 4,
      completionPercentage: 65
    },
    {
      timeline: 'Monthly Status',
      conceptsDone: 72,
      flashcardsDone: 345,
      testsTaken: 12,
      completionPercentage: 58
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <ChartBar className="h-5 w-5 text-green-500" />
        <h3 className="text-lg font-semibold">Progress Tracker</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timeline</TableHead>
              <TableHead>Concepts Done</TableHead>
              <TableHead>Flashcards Done</TableHead>
              <TableHead>Tests Taken</TableHead>
              <TableHead>Completion %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {progressData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.timeline}</TableCell>
                <TableCell>{item.conceptsDone}</TableCell>
                <TableCell>{item.flashcardsDone}</TableCell>
                <TableCell>{item.testsTaken}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{item.completionPercentage}%</span>
                    <Progress value={item.completionPercentage} className="w-20" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
