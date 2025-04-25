
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { ConceptCardItem, ConceptsOverview, SubjectBreakdown } from '@/types/user/base';
import ConceptProgressCircle from './ConceptProgressCircle';

const mockWeeklyOverview: ConceptsOverview = {
  total: 42,
  completed: 30,
  inProgress: 8,
  pending: 4,
  subjectBreakdown: [
    { subject: "Math", count: 12 },
    { subject: "Science", count: 15 },
    { subject: "History", count: 10 },
    { subject: "Chemistry", count: 5 }
  ]
};

const ConceptCardsWeekly: React.FC = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Get the start of the week (Sunday)
  
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6); // End of the week (Saturday)
  
  // Format dates as Apr 21–27
  const formattedStartDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const formattedEndDate = endDate.toLocaleDateString('en-US', { day: 'numeric' });
  
  return (
    <div className="animate-in fade-in-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-indigo-600" />
          <span>Weekly Concepts ({formattedStartDate}–{formattedEndDate})</span>
        </h3>
        <Button variant="outline" size="sm" className="text-xs">
          View All <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold">Overview</h4>
            <span className="text-sm text-indigo-600 dark:text-indigo-400">{formattedStartDate}–{formattedEndDate}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-4">
              <ConceptProgressCircle 
                percentage={(mockWeeklyOverview.completed / mockWeeklyOverview.total) * 100} 
                size="lg"
                label={`${mockWeeklyOverview.completed}/${mockWeeklyOverview.total}`}
              />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Completion Rate</p>
                <p className="font-semibold">{Math.round((mockWeeklyOverview.completed / mockWeeklyOverview.total) * 100)}%</p>
              </div>
            </div>
            
            <div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">🟢 Completed</span>
                  <span className="text-sm font-medium">{mockWeeklyOverview.completed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">🟡 In Progress</span>
                  <span className="text-sm font-medium">{mockWeeklyOverview.inProgress}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">🔴 Pending</span>
                  <span className="text-sm font-medium">{mockWeeklyOverview.pending}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
            <h5 className="text-sm font-medium mb-3">Estimated Completion Time</h5>
            <div className="flex justify-between text-sm">
              <span>Remaining</span>
              <span className="font-semibold">~3.5 hours</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5 border border-gray-100 dark:border-gray-700">
          <h4 className="font-semibold mb-4">Subjects Breakdown</h4>
          
          <div className="space-y-3">
            {mockWeeklyOverview.subjectBreakdown.map((subject, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  index === 0 ? 'bg-indigo-500' :
                  index === 1 ? 'bg-emerald-500' :
                  index === 2 ? 'bg-amber-500' : 'bg-rose-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{subject.subject}</span>
                    <span className="text-sm font-medium">{subject.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        index === 0 ? 'bg-indigo-500' :
                        index === 1 ? 'bg-emerald-500' :
                        index === 2 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${(subject.count / mockWeeklyOverview.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" size="sm" className="w-full">
              See Subject Details
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 items-center pt-4">
        <span className="text-sm font-medium">Quick Filters:</span>
        <Button variant="outline" size="sm" className="text-xs">All Concepts</Button>
        <Button variant="outline" size="sm" className="text-xs bg-green-50 border-green-200 text-green-700">Completed</Button>
        <Button variant="outline" size="sm" className="text-xs bg-yellow-50 border-yellow-200 text-yellow-700">In Progress</Button>
        <Button variant="outline" size="sm" className="text-xs bg-gray-50 border-gray-200 text-gray-700">Pending</Button>
      </div>
    </div>
  );
};

export default ConceptCardsWeekly;
