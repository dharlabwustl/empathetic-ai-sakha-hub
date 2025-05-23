
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FastForward, Clock, CheckCircle, Calendar, Hourglass, BarChart3 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface RevisionSectionProps {
  conceptName: string;
}

const RevisionSection: React.FC<RevisionSectionProps> = ({ conceptName }) => {
  // Sample revision data
  const revisionHistory = [
    { date: '2023-05-01', score: 65, time: 25 },
    { date: '2023-05-10', score: 72, time: 20 },
    { date: '2023-05-22', score: 78, time: 15 },
    { date: '2023-06-05', score: 85, time: 12 }
  ];
  
  const upcomingRevisions = [
    { date: '2023-06-20', priority: 'medium', reason: 'Scheduled interval revision' },
    { date: '2023-07-10', priority: 'low', reason: 'Long-term retention check' }
  ];
  
  // Calculate optimal revision time based on spaced repetition algorithm
  // This is a simplified example
  const lastRevisionDate = new Date(revisionHistory[revisionHistory.length - 1].date);
  const daysSinceLastRevision = Math.floor((new Date().getTime() - lastRevisionDate.getTime()) / (1000 * 3600 * 24));
  
  const nextOptimalRevision = new Date(lastRevisionDate);
  nextOptimalRevision.setDate(nextOptimalRevision.getDate() + 14); // Simple example: 14 days after last revision
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const getFormattedNextRevisionDate = () => {
    return nextOptimalRevision.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const getRevisionStatus = () => {
    if (daysSinceLastRevision > 21) return 'overdue';
    if (daysSinceLastRevision > 14) return 'due';
    return 'upcoming';
  };
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'overdue': return 'text-red-600 dark:text-red-400';
      case 'due': return 'text-amber-600 dark:text-amber-400';
      case 'upcoming': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };
  
  const revisionStatus = getRevisionStatus();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FastForward className="h-5 w-5 text-indigo-600" />
          Revision Schedule: {conceptName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Next revision</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      revisionStatus === 'overdue' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      revisionStatus === 'due' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {revisionStatus.charAt(0).toUpperCase() + revisionStatus.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-3">
                    <div className={`p-2 rounded-full ${
                      revisionStatus === 'overdue' ? 'bg-red-100 dark:bg-red-900/30' :
                      revisionStatus === 'due' ? 'bg-amber-100 dark:bg-amber-900/30' :
                      'bg-green-100 dark:bg-green-900/30'
                    }`}>
                      <Calendar className={`h-6 w-6 ${getStatusColor(revisionStatus)}`} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">{getFormattedNextRevisionDate()}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {daysSinceLastRevision} days since last revision
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-5">
                    <Button className="w-full">
                      <FastForward className="h-4 w-4 mr-2" />
                      Start Revision Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-4">Retention Forecast</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>Current retention</span>
                        <span className="font-semibold">
                          {revisionHistory[revisionHistory.length - 1].score}%
                        </span>
                      </div>
                      <Progress 
                        value={revisionHistory[revisionHistory.length - 1].score} 
                        className="h-2" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>1 week without revision</span>
                        <span className="font-semibold">
                          {Math.max(0, revisionHistory[revisionHistory.length - 1].score - 5)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.max(0, revisionHistory[revisionHistory.length - 1].score - 5)} 
                        className="h-2" 
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-1 text-sm">
                        <span>1 month without revision</span>
                        <span className="font-semibold">
                          {Math.max(0, revisionHistory[revisionHistory.length - 1].score - 15)}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.max(0, revisionHistory[revisionHistory.length - 1].score - 15)} 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Revision History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revisionHistory.map((revision, index) => (
                    <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{formatDate(revision.date)}</h4>
                          <span className="text-sm text-gray-500">
                            {index === 0 ? 'First session' : (index === revisionHistory.length - 1) ? 'Most recent' : `Session ${index + 1}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <BarChart3 className="h-4 w-4" />
                            Score: {revision.score}%
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Time spent: {revision.time} min
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Upcoming Revisions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingRevisions.map((revision, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">{formatDate(revision.date)}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          revision.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          revision.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        }`}>
                          {revision.priority.charAt(0).toUpperCase() + revision.priority.slice(1)} priority
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {revision.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-4">Forgetting Curve</h3>
                <div className="aspect-[4/3] bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 flex items-center justify-center">
                  <Hourglass className="h-12 w-12 text-slate-300" />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Based on your learning patterns, we've calculated your optimal revision schedule to maximize retention.
                </p>
              </CardContent>
            </Card>
            
            <Button variant="outline" className="w-full">
              Adjust Revision Schedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevisionSection;
