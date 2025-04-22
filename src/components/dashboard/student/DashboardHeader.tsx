import React from "react";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Clock, Settings, Flame } from "lucide-react"; // Added Flame import
import { UserProfileType } from "@/types/user/base";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 mb-4">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
            {userProfile.avatar ? (
              <img
                src={userProfile.avatar}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <Settings className="w-6 h-6 mx-auto mt-3 text-gray-500" />
            )}
          </div>
          <span className="absolute bottom-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
            {userProfile.studyStreak?.current || 0}
            <Flame className="w-3 h-3 ml-1" />
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{formattedTime}, {userProfile.name}</h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          View Calendar
        </Button>
        <Button size="sm" onClick={onViewStudyPlan}>
          <Clock className="mr-2 h-4 w-4" />
          Today's Plan
        </Button>
        <Button variant="ghost" size="sm">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
