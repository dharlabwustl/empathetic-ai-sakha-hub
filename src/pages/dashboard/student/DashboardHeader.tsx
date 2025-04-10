
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user";
import { Eye } from "lucide-react";
import MoodLogButton from "@/components/dashboard/student/MoodLogButton";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
}

const DashboardHeader = ({
  userProfile,
  formattedTime,
  formattedDate,
  onViewStudyPlan
}: DashboardHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-stretch md:items-center mb-4 md:mb-6 gap-4">
      <div>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold">
          Hello, <span className="gradient-text">{userProfile.name}</span>!
        </h1>
        <div className="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 sm:gap-x-4">
          <span>{formattedDate}</span>
          <span className="hidden xs:inline-block">•</span>
          <span className="hidden xs:inline-block">{formattedTime}</span>
          {userProfile.goals && userProfile.goals[0] && (
            <span className="font-medium text-primary">
              Goal: {userProfile.goals[0].title}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 items-start justify-start md:justify-end">
        <MoodLogButton className={`${isMobile ? 'text-xs px-3 py-1' : ''} whitespace-nowrap`} />
        <Button 
          onClick={onViewStudyPlan}
          className={`flex items-center gap-2 shadow-md whitespace-nowrap bg-gradient-to-r from-sky-500 to-violet-500 ${isMobile ? 'text-xs px-3 py-1 h-8' : ''}`}
        >
          <Eye size={isMobile ? 14 : 18} />
          <span>View Study Plan</span>
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
