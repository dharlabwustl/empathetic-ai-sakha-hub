
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FastForward, Calendar, CheckCircle2, Clock, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RevisionSectionProps {
  conceptName: string;
}

const RevisionSection: React.FC<RevisionSectionProps> = ({ conceptName }) => {
  const [revisionSchedule, setRevisionSchedule] = useState([
    { date: "Today", status: "completed", time: "15 minutes" },
    { date: "Tomorrow", status: "scheduled", time: "10 minutes" },
    { date: "May 26", status: "scheduled", time: "20 minutes" },
    { date: "May 29", status: "scheduled", time: "15 minutes" },
    { date: "June 5", status: "scheduled", time: "10 minutes" }
  ]);
  
  const revisionTips = [
    "Review key formulas and their applications",
    "Practice with different numerical values",
    "Draw circuit diagrams to visualize relationships",
    "Connect this concept with related topics",
    "Quiz yourself on the fundamental principles"
  ];
  
  const revisionResources = [
    { title: "Quick Formula Sheet", type: "PDF" },
    { title: "Practice Questions", type: "Interactive" },
    { title: "Video Summary", type: "Video" },
    { title: "Mind Map", type: "Image" }
  ];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FastForward className="h-5 w-5 text-purple-600" />
            Revision Schedule
          </CardTitle>
          <CardDescription>
            Optimized spaced repetition schedule for {conceptName}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Revision Timeline */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-lg font-medium">Your Revision Timeline</h3>
              <div className="space-y-3">
                {revisionSchedule.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-3 rounded-lg border ${
                      item.status === "completed" 
                        ? "bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-950/50"
                        : "bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      item.status === "completed" 
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}>
                      {item.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <Calendar className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.date}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.status === "completed" 
                          ? "Completed revision session" 
                          : "Scheduled revision session"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <RefreshCcw className="h-3 w-3" />
                  Optimize Schedule
                </Button>
              </div>
            </div>
            
            {/* Revision Tips and Resources */}
            <div className="space-y-6">
              {/* Revision Tips */}
              <div>
                <h3 className="text-lg font-medium mb-3">Revision Tips</h3>
                <ul className="space-y-2">
                  {revisionTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 h-5 w-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Revision Resources */}
              <div>
                <h3 className="text-lg font-medium mb-3">Revision Resources</h3>
                <div className="space-y-2">
                  {revisionResources.map((resource, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      <span className="font-medium text-sm">{resource.title}</span>
                      <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                        {resource.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevisionSection;
