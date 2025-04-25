
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarDays } from 'lucide-react';

interface DailyFocusProps {
  userProfile: UserProfileType;
}

export const DailyFocus: React.FC<DailyFocusProps> = ({ userProfile }) => {
  // Mock data for daily focus
  const dailyFocusData = [
    {
      subject: 'Mathematics',
      conceptsToComplete: 3,
      flashcards: 15,
      practiceTest: 'Yes',
      estimatedTime: '2:00'
    },
    {
      subject: 'Physics',
      conceptsToComplete: 2,
      flashcards: 10,
      practiceTest: 'No',
      estimatedTime: '1:30'
    },
    {
      subject: 'Chemistry',
      conceptsToComplete: 2,
      flashcards: 12,
      practiceTest: 'Yes',
      estimatedTime: '1:45'
    }
  ];

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Daily Plan – Today's Focus</h3>
      </div>
      
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        {today}
      </p>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Concepts to Complete</TableHead>
              <TableHead>Flashcards</TableHead>
              <TableHead>Practice Test</TableHead>
              <TableHead>Est. Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dailyFocusData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.subject}</TableCell>
                <TableCell>{item.conceptsToComplete}</TableCell>
                <TableCell>{item.flashcards}</TableCell>
                <TableCell>{item.practiceTest}</TableCell>
                <TableCell>{item.estimatedTime}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p className="flex items-center gap-1">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          Auto-updates upon completion
        </p>
        <p className="flex items-center gap-1 mt-1">
          <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
          Navigate past days to check or complete pending items
        </p>
      </div>
    </Card>
  );
};
