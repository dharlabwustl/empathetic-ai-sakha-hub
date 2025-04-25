
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SubjectMetrics } from '@/types/user/base';

interface SubjectsTableProps {
  subjects: SubjectMetrics[];
}

const getStatusEmoji = (status: string) => {
  switch (status) {
    case 'completed': return '✅';
    case 'in-progress': return '🟡';
    case 'need-attention': return '🟠';
    default: return '⚪️';
  }
};

export const SubjectsTable: React.FC<SubjectsTableProps> = ({ subjects }) => {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Subject</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Concepts</TableHead>
            <TableHead>Flashcards</TableHead>
            <TableHead>Practice Tests</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{subject.subject}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                  ${subject.priority === 'High' ? 'bg-red-100 text-red-700' : 
                    subject.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-green-100 text-green-700'}`}>
                  {subject.priority}
                </span>
              </TableCell>
              <TableCell>{subject.concepts.completed} / {subject.concepts.total}</TableCell>
              <TableCell>{subject.flashcards.completed} / {subject.flashcards.total}</TableCell>
              <TableCell>{subject.practiceTests.completed} / {subject.practiceTests.total}</TableCell>
              <TableCell className="text-right">
                <span className="text-lg">{getStatusEmoji(subject.status)}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
