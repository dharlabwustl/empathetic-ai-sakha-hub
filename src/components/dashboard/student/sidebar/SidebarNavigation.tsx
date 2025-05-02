
import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  Calendar,
  GraduationCap,
  Users,
  MessageSquare,
  FileText,
  Settings,
  Book,
  PieChart,
  Bell,
  Wallet,
  Award,
  BookOpen
} from 'lucide-react';

interface NavigationItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  className?: string;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  to,
  icon,
  label,
  className,
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
          isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
          className
        )
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

export const SidebarNavigation: React.FC = () => {
  return (
    <nav className="space-y-1 px-2 py-3">
      <NavigationItem to="/dashboard/student" icon={<Home className="h-4 w-4" />} label="Dashboard" />
      <NavigationItem to="/dashboard/student/today" icon={<Calendar className="h-4 w-4" />} label="Today" />
      <NavigationItem to="/dashboard/student/academic-advisor" icon={<GraduationCap className="h-4 w-4" />} label="Academic Advisor" />
      <NavigationItem to="/dashboard/student/study-groups" icon={<Users className="h-4 w-4" />} label="Study Groups" />
      <NavigationItem to="/dashboard/student/chat" icon={<MessageSquare className="h-4 w-4" />} label="Ask PrepzrAI" />
      <NavigationItem to="/dashboard/student/explore" icon={<BookOpen className="h-4 w-4" />} label="Explore" />
      <NavigationItem to="/dashboard/student/notes" icon={<FileText className="h-4 w-4" />} label="Notes" />
      <NavigationItem to="/dashboard/student/analytics" icon={<PieChart className="h-4 w-4" />} label="Analytics" />
      <NavigationItem to="/dashboard/student/rewards" icon={<Award className="h-4 w-4" />} label="Rewards" />
      <NavigationItem to="/dashboard/student/wallet" icon={<Wallet className="h-4 w-4" />} label="Wallet" />
      <NavigationItem to="/dashboard/student/notifications" icon={<Bell className="h-4 w-4" />} label="Notifications" />
      <NavigationItem to="/dashboard/student/profile" icon={<Settings className="h-4 w-4" />} label="Profile" />
    </nav>
  );
};

export default SidebarNavigation;
