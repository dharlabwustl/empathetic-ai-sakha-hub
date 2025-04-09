
import React from 'react';
import { Clock, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserProfileType } from "@/types/user";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
}

const DashboardHeader = ({ userProfile, formattedTime, formattedDate }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 mt-10 md:mt-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
              <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=John" />
              <AvatarFallback className="bg-gradient-to-r from-sky-500 to-violet-500 text-white">
                {userProfile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground gradient-text">
                Welcome back, {userProfile.name.split(' ')[0]}
              </h1>
              <p className="text-muted-foreground">
                {formattedDate} · {formattedTime}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search topics, concepts..." 
              className="pl-9 bg-white dark:bg-gray-800"
            />
          </div>
          <div className="bg-white/50 dark:bg-gray-800/50 p-2 px-3 rounded-lg border border-gray-100 dark:border-gray-800 text-sm flex items-center gap-2">
            <Clock size={16} className="text-sky-500" />
            <span>Next mock test: <span className="font-medium">3 days</span></span>
          </div>
        </div>
      </div>
      
      {/* Enhanced exam goal section */}
      <div className="mt-6 bg-gradient-to-r from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 p-4 rounded-lg border border-sky-100 dark:border-sky-800/30">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-sky-700 dark:text-sky-300 font-medium uppercase">Current Goal</div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{userProfile.goals?.[0]?.title || "IIT-JEE"}</h3>
              <Badge variant="outline" className="ml-2 bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700/50">
                {userProfile.goals?.[0]?.progress || 65}% Complete
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
