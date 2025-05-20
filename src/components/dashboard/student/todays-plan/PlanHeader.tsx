
import React from 'react';
import { TodaysPlanData, TimelineView } from '@/types/student/todaysPlan';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, List, Calendar as CalendarIcon } from 'lucide-react';

interface PlanHeaderProps {
  planData: TodaysPlanData | null;
  activeView: TimelineView;
  setActiveView: (view: TimelineView) => void;
  isMobile?: boolean;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({ planData, activeView, setActiveView, isMobile }) => {
  if (!planData) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-2 md:p-0">
      <div>
        <h1 className={`${isMobile ? "text-lg" : "text-2xl"} font-bold`}>Today's Study Plan</h1>
        <p className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center mr-2 md:mr-4 bg-primary/10 rounded-md px-2 md:px-3 py-1">
          <Clock className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} mr-1 md:mr-2 text-primary`} />
          <span className={`font-medium ${isMobile ? "text-xs" : ""}`}>
            {planData.timeAllocation ? planData.timeAllocation.total || 0 : 0} min
          </span>
        </div>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 md:p-1 flex">
          <Button
            variant={activeView === 'list' ? 'default' : 'ghost'}
            size={isMobile ? "sm" : "default"}
            className={`rounded-md ${isMobile ? "h-7 px-2" : ""}`}
            onClick={() => setActiveView('list')}
          >
            <List className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} ${isMobile ? "mr-0" : "mr-1"}`} />
            <span className={`${isMobile ? "hidden" : "hidden sm:inline"}`}>List</span>
          </Button>
          <Button
            variant={activeView === 'timeline' ? 'default' : 'ghost'}
            size={isMobile ? "sm" : "default"}
            className={`rounded-md ${isMobile ? "h-7 px-2" : ""}`}
            onClick={() => setActiveView('timeline')}
          >
            <Clock className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} ${isMobile ? "mr-0" : "mr-1"}`} />
            <span className={`${isMobile ? "hidden" : "hidden sm:inline"}`}>Timeline</span>
          </Button>
          <Button
            variant={activeView === 'calendar' ? 'default' : 'ghost'}
            size={isMobile ? "sm" : "default"}
            className={`rounded-md ${isMobile ? "h-7 px-2" : ""}`}
            onClick={() => setActiveView('calendar')}
          >
            <CalendarIcon className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} ${isMobile ? "mr-0" : "mr-1"}`} />
            <span className={`${isMobile ? "hidden" : "hidden sm:inline"}`}>Calendar</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlanHeader;
