
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarRange, Clock } from 'lucide-react';
import { MonthlyConceptSummary } from '@/types/user/base';
import ConceptProgressCircle from './ConceptProgressCircle';

const mockMonthlyData: MonthlyConceptSummary[] = [
  { subject: "Math", totalConcepts: 60, completed: 50, inProgress: 5, pending: 5 },
  { subject: "Science", totalConcepts: 55, completed: 55, inProgress: 0, pending: 0 },
  { subject: "History", totalConcepts: 45, completed: 30, inProgress: 10, pending: 5 },
  { subject: "Chemistry", totalConcepts: 40, completed: 30, inProgress: 5, pending: 5 },
];

const ConceptCardsMonthly: React.FC = () => {
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long' });
  const totalConcepts = mockMonthlyData.reduce((acc, curr) => acc + curr.totalConcepts, 0);
  const completedConcepts = mockMonthlyData.reduce((acc, curr) => acc + curr.completed, 0);
  const completionPercentage = Math.round((completedConcepts / totalConcepts) * 100);
  
  return (
    <div className="animate-in fade-in-50">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <CalendarRange className="h-4 w-4 text-indigo-600" />
          <span>Monthly Planner – {currentMonth} Overview</span>
        </h3>
        <Button variant="outline" size="sm" className="text-xs">
          View All <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      <div className="mb-6 bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Monthly Overview</h4>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Total Time Allocated: ~40 hrs</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6 mb-6">
          <ConceptProgressCircle 
            percentage={completionPercentage}
            size="xl"
            label={`${completionPercentage}%`}
          />
          
          <div>
            <h5 className="font-medium mb-2">Progress</h5>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
              {completedConcepts} of {totalConcepts} concepts completed
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {completionPercentage}% of monthly plan completed
            </p>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800/50">
              <th className="px-4 py-2 text-left">Subject</th>
              <th className="px-4 py-2 text-center">Total Concepts</th>
              <th className="px-4 py-2 text-center">Completed</th>
              <th className="px-4 py-2 text-center">In Progress</th>
              <th className="px-4 py-2 text-center">Pending</th>
              <th className="px-4 py-2 text-center">Progress</th>
            </tr>
          </thead>
          <tbody>
            {mockMonthlyData.map((subject, index) => {
              const subjectProgress = Math.round((subject.completed / subject.totalConcepts) * 100);
              
              return (
                <tr 
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30"
                >
                  <td className="px-4 py-3 font-medium">{subject.subject}</td>
                  <td className="px-4 py-3 text-center">{subject.totalConcepts}</td>
                  <td className="px-4 py-3 text-center text-green-600">{subject.completed}</td>
                  <td className="px-4 py-3 text-center text-yellow-600">{subject.inProgress}</td>
                  <td className="px-4 py-3 text-center text-gray-500">{subject.pending}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <div className="w-full max-w-[150px] bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div
                          className={`h-2 rounded-full ${
                            subjectProgress >= 100 ? 'bg-green-500' :
                            subjectProgress > 75 ? 'bg-green-400' :
                            subjectProgress > 50 ? 'bg-yellow-400' :
                            subjectProgress > 25 ? 'bg-orange-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${subjectProgress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{subjectProgress}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
        <h5 className="font-medium mb-2">Monthly Focus Insights</h5>
        <p className="text-sm">
          Based on your progress, we recommend focusing more on <span className="font-semibold">History</span> topics which 
          have the lowest completion rate. Consider allocating an additional 30 minutes daily to catch up.
        </p>
      </div>
    </div>
  );
};

export default ConceptCardsMonthly;
