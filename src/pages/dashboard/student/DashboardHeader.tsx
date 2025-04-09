
import React from 'react';
import { Clock, Search, Bell, BookOpen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserProfileType } from "@/types/user";

interface DashboardHeaderProps {
  userProfile: UserProfileType;
  formattedTime: string;
  formattedDate: string;
  onViewStudyPlan: () => void;
}

const DashboardHeader = ({ userProfile, formattedTime, formattedDate, onViewStudyPlan }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 mt-10 md:mt-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-violet-500 rounded-full blur-sm opacity-50"></div>
              <Avatar className="h-14 w-14 border-2 border-white shadow-md relative">
                <AvatarImage src="https://api.dicebear.com/7.x/micah/svg?seed=John" />
                <AvatarFallback className="bg-gradient-to-r from-sky-500 to-violet-500 text-white">
                  {userProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Welcome back, <span className="gradient-text">{userProfile.name.split(' ')[0]}</span>
              </h1>
              <p className="text-muted-foreground">
                {formattedDate} · {formattedTime}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search topics, concepts..." 
              className="pl-9 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="relative bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
          </Button>
          
          <div className="bg-gradient-to-r from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 p-2 px-4 rounded-lg border border-sky-100 dark:border-sky-800/30 shadow-sm">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-sky-500" />
              <span className="text-sm">Next exam: <span className="font-medium">3 days</span></span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced exam goal section */}
      <div className="mt-6 bg-gradient-to-r from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 p-5 rounded-xl border border-sky-100 dark:border-sky-800/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="text-sm text-sky-700 dark:text-sky-300 font-medium uppercase tracking-wider">Current Goal</div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{userProfile.goals?.[0]?.title || "IIT-JEE"}</h3>
              <Badge className="ml-2 bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-700/50">
                {userProfile.goals?.[0]?.progress || 65}% Complete
              </Badge>
            </div>
          </div>
          <Button 
            onClick={onViewStudyPlan}
            className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 text-white shadow-lg flex items-center gap-2"
          >
            <BookOpen size={18} />
            View Study Plan
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
