import React from "react";
import { UserProfileType, UserRole } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { DashboardTabsProps } from "@/pages/dashboard/student/DashboardContent";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  userProfile: UserProfileType;
  activeTab: string;
  onTabChange: (tab: string) => void;
  kpis: any[];
  nudges: any[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  onSkipTour: () => void;
  onCompleteTour: () => void;
  showStudyPlan: boolean;
  onCloseStudyPlan: () => void;
  onViewStudyPlan: () => void;
  hideSidebar: boolean;
  hideTabsNav: boolean;
  onToggleSidebar: () => void;
  onToggleTabsNav: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
  currentMood?: 'sad' | 'neutral' | 'happy' | 'motivated' | undefined;
}

const DashboardLayout = ({ 
  children,
  userProfile,
  activeTab,
  onTabChange,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  onSkipTour,
  onCompleteTour,
  showStudyPlan,
  onCloseStudyPlan,
  onViewStudyPlan,
  hideSidebar,
  hideTabsNav,
  onToggleSidebar,
  onToggleTabsNav,
  lastActivity,
  suggestedNextAction,
  currentMood
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-secondary border-b">
        <div className="container flex items-center h-16">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="mr-2 px-0 lg:hidden"
                onClick={onToggleSidebar}
              >
                {hideSidebar ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when you're done.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Link to="/" className="ml-auto font-bold">
            Sakha AI
          </Link>
          <DropdownMenu className="ml-auto">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="ml-auto h-8 w-8 p-0 data-[state=open]:bg-muted">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://avatar.vercel.sh/${userProfile.name}.png`} />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/dashboard/student/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/student/subscription")}>Subscription</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/student/batch")}>Batch</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/logout">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <div className="container grid lg:grid-cols-5 min-h-[calc(100vh-4rem)]">
        {!hideSidebar && (
          <aside className="border-r py-6 hidden lg:block">
            <div className="space-y-2">
              <Link to="/dashboard/student/overview" className="font-medium hover:underline block px-3 py-2">
                Overview
              </Link>
              <Link to="/dashboard/student/today" className="font-medium hover:underline block px-3 py-2">
                Today
              </Link>
              <Link to="/dashboard/student/academic" className="font-medium hover:underline block px-3 py-2">
                Academic Advisor
              </Link>
              <Link to="/dashboard/student/concepts" className="font-medium hover:underline block px-3 py-2">
                Concept Cards
              </Link>
              <Link to="/dashboard/student/flashcards" className="font-medium hover:underline block px-3 py-2">
                Flashcards
              </Link>
              <Link to="/dashboard/student/practice-exam" className="font-medium hover:underline block px-3 py-2">
                Practice Exams
              </Link>
              <Link to="/dashboard/student/notifications" className="font-medium hover:underline block px-3 py-2">
                Notifications
              </Link>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="space-y-2">
                <Link to="/dashboard/student/profile" className="font-medium hover:underline block px-3 py-2">
                  Profile
                </Link>
                <Link to="/dashboard/student/subscription" className="font-medium hover:underline block px-3 py-2">
                  Subscription
                </Link>
                <Link to="/dashboard/student/batch" className="font-medium hover:underline block px-3 py-2">
                  Batch
                </Link>
                <Link to="/dashboard/student/wellness" className="font-medium hover:underline block px-3 py-2">
                  Wellness Corner
                </Link>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex items-center justify-between px-3">
                <span className="text-sm font-medium">Dark Mode</span>
                <Switch
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                />
              </div>
            </div>
          </aside>
        )}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
