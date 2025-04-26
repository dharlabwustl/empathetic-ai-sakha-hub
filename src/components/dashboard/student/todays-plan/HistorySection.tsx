
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TodaysPlanData, PastDayRecord } from "@/types/student/todaysPlan";
import { Skeleton } from "@/components/ui/skeleton";
import { History, Clock, CheckCircle } from "lucide-react";
import { format, parseISO } from "date-fns";

interface HistorySectionProps {
  planData: TodaysPlanData | null;
  isLoading: boolean;
}

export default function HistorySection({
  planData,
  isLoading
}: HistorySectionProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }
  
  if (!planData) return null;

  const getStatusIndicator = (status: PastDayRecord['status']) => {
    switch(status) {
      case 'completed': return <span className="text-green-500">✅ Done</span>;
      case 'incomplete': return <span className="text-amber-500">🟡 Incomplete</span>;
      case 'pending': return <span className="text-red-500">🔴 Pending</span>;
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), "MMM dd");
    } catch (err) {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-lg">
          <History className="h-5 w-5 mr-2 text-indigo-600" />
          History & Backlog
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Concepts</TableHead>
                <TableHead>Flashcards</TableHead>
                <TableHead>Practice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {planData.pastDays.map((day, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{formatDate(day.date)}</TableCell>
                  <TableCell>{day.conceptsCompleted}/{day.conceptsTotal}</TableCell>
                  <TableCell>{day.flashcardsCompleted}/{day.flashcardsTotal}</TableCell>
                  <TableCell>{day.practiceCompleted}/{day.practiceTotal}</TableCell>
                  <TableCell>{getStatusIndicator(day.status)}</TableCell>
                  <TableCell>
                    {day.status !== 'completed' && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        Finish Now
                      </Button>
                    )}
                    {day.status === 'completed' && (
                      <Button variant="ghost" size="sm" className="h-7 text-xs text-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Complete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-sm text-center text-muted-foreground">
          <p>Tip: Incomplete tasks are automatically carried forward to your backlog.</p>
        </div>
      </CardContent>
    </Card>
  );
}
