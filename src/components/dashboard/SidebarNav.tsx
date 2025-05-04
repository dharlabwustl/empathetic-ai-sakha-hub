
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Book, GraduationCap, Settings, Bell, Calendar, MessageSquare, Lightbulb, LayoutDashboard, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarNavProps {
  userType: 'student' | 'teacher' | 'admin';
  userName?: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  hideSettings?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ 
  userType, 
  userName, 
  activeTab, 
  onTabChange,
  hideSettings = false 
}) => {
  const location = useLocation();
  const isActive = (tabName: string) => location.pathname.includes(tabName);

  return (
    <div className="fixed inset-y-0 left-0 z-40 w-64 flex-col justify-between overflow-y-auto bg-white border-r dark:bg-gray-800 dark:border-gray-700 md:flex">
      <div className="flex flex-col h-full">
        <div className="flex-1 p-4">
          <Link to="/" className="flex items-center p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt={userName} />
              <AvatarFallback>{userName?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-md font-semibold dark:text-white">{userName}</span>
          </Link>
          <div className="py-4">
            <h4 className="mb-1 ml-4 rounded-md text-sm font-medium leading-none dark:text-white">Navigation</h4>
            <ul>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/dashboard/student"
                        className={`flex items-center p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("overview") ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}`}
                      >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Overview</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Go to dashboard overview</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/dashboard/student/today"
                        className={`flex items-center p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("today") ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Today</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>View today's plan</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/dashboard/student/academic"
                        className={`flex items-center p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("academic") ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}`}
                      >
                        <GraduationCap className="mr-2 h-4 w-4" />
                        <span>Academic Advisor</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Get academic guidance</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ul>
          </div>

          <div className="py-4">
            <h4 className="mb-1 ml-4 rounded-md text-sm font-medium leading-none dark:text-white">Learning Tools</h4>
            <ul>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/dashboard/student/concepts"
                        className={`flex items-center p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("concepts") ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}`}
                      >
                        <Lightbulb className="mr-2 h-4 w-4" />
                        <span>Concept Cards</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Explore concept cards</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/dashboard/student/flashcards"
                        className={`flex items-center p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("flashcards") ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}`}
                      >
                        <Book className="mr-2 h-4 w-4" />
                        <span>Flashcards</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Practice with flashcards</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/dashboard/student/practice-exam"
                        className={`flex items-center p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("practice-exam") ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}`}
                      >
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Practice Exams</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Take practice exams</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ul>
          </div>
          
          {/* Profile Link */}
          <div className="py-4">
            <h4 className="mb-1 ml-4 rounded-md text-sm font-medium leading-none dark:text-white">Account</h4>
            <ul>
              <li>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to="/dashboard/student/profile"
                        className={`flex items-center p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("profile") ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}`}
                      >
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>View your profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </li>
            </ul>
          </div>
        </div>

        {/* Settings - conditionally render based on hideSettings prop */}
        {!hideSettings && (
          <div className="mt-auto">
            <div className="border-t dark:border-gray-700">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to="/dashboard/student/settings"
                      className={`flex items-center p-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${isActive("settings") ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : ''}`}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>Manage your settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarNav;
