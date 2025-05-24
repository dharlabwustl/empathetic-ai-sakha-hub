
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3, 
  Database, 
  Shield, 
  FileText,
  CreditCard,
  Brain,
  TestTube,
  GraduationCap,
  Zap,
  DollarSign,
  Heart,
  MessageSquare,
  Bell,
  Eye,
  ChevronDown,
  ChevronRight,
  Home,
  Menu,
  X
} from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path?: string;
  badge?: string;
  children?: SidebarItem[];
  isNew?: boolean;
}

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>(['dashboard', 'management']);

  const sidebarItems: SidebarItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Home,
      path: '/admin/dashboard?tab=overview'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      children: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/dashboard?tab=analytics' },
        { id: 'revenue', label: 'Revenue Analytics', icon: DollarSign, path: '/admin/dashboard?tab=revenue' },
        { id: 'mood-analytics', label: 'Mood Analytics', icon: Heart, path: '/admin/dashboard?tab=mood-analytics' }
      ]
    },
    {
      id: 'management',
      label: 'Management',
      icon: Settings,
      children: [
        { id: 'users', label: 'Users', icon: Users, path: '/admin/dashboard?tab=users' },
        { id: 'student-profiles', label: 'Student Profiles', icon: GraduationCap, path: '/admin/dashboard?tab=student-profiles' },
        { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard, path: '/admin/dashboard?tab=subscriptions' },
        { id: 'payments', label: 'Payments', icon: DollarSign, path: '/admin/dashboard?tab=payments' }
      ]
    },
    {
      id: 'content',
      label: 'Content',
      icon: BookOpen,
      children: [
        { id: 'content-management', label: 'Content Management', icon: FileText, path: '/admin/dashboard?tab=content' },
        { id: 'content-repository', label: 'Content Repository', icon: Database, path: '/admin/dashboard?tab=content-repository' },
        { id: 'exams', label: 'Exam Management', icon: GraduationCap, path: '/admin/dashboard?tab=exams' },
        { id: 'study-plans', label: 'Study Plans', icon: BookOpen, path: '/admin/dashboard?tab=study-plans' }
      ]
    },
    {
      id: 'ai-tools',
      label: 'AI & Testing',
      icon: Brain,
      children: [
        { id: 'ai-models', label: 'AI Models', icon: Brain, path: '/admin/dashboard?tab=ai-models' },
        { id: 'ai-testing', label: 'AI Testing Hub', icon: TestTube, path: '/admin/dashboard?tab=ai-testing', isNew: true },
        { id: 'features', label: 'Feature Management', icon: Zap, path: '/admin/dashboard?tab=features' }
      ]
    },
    {
      id: 'system',
      label: 'System',
      icon: Database,
      children: [
        { id: 'database', label: 'Database', icon: Database, path: '/admin/dashboard?tab=database' },
        { id: 'api', label: 'API Management', icon: Zap, path: '/admin/dashboard?tab=api' },
        { id: 'security', label: 'Security', icon: Shield, path: '/admin/dashboard?tab=security' },
        { id: 'settings', label: 'System Settings', icon: Settings, path: '/admin/dashboard?tab=settings' },
        { id: 'logs', label: 'System Logs', icon: FileText, path: '/admin/dashboard?tab=logs' }
      ]
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: MessageSquare,
      children: [
        { id: 'notifications', label: 'Notifications', icon: Bell, path: '/admin/dashboard?tab=notifications' }
      ]
    },
    {
      id: 'documentation',
      label: 'Documentation',
      icon: FileText,
      path: '/admin/documentation'
    }
  ];

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname + location.search === path;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const renderSidebarItem = (item: SidebarItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.id);
    const Icon = item.icon;

    if (hasChildren) {
      return (
        <div key={item.id} className="space-y-1">
          <Button
            variant="ghost"
            className={`w-full justify-start gap-3 h-10 ${depth > 0 ? 'pl-8' : 'pl-4'}`}
            onClick={() => toggleExpanded(item.id)}
          >
            <Icon className="h-4 w-4" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </>
            )}
          </Button>
          {!isCollapsed && isExpanded && (
            <div className="space-y-1">
              {item.children.map(child => renderSidebarItem(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Button
        key={item.id}
        variant={isActive(item.path) ? "default" : "ghost"}
        className={`w-full justify-start gap-3 h-10 ${depth > 0 ? 'pl-8' : 'pl-4'}`}
        onClick={() => item.path && handleNavigation(item.path)}
      >
        <Icon className="h-4 w-4" />
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <Badge variant="secondary" className="h-5 text-xs">
                {item.badge}
              </Badge>
            )}
            {item.isNew && (
              <Badge variant="default" className="h-5 text-xs bg-green-600">
                New
              </Badge>
            )}
          </>
        )}
      </Button>
    );
  };

  return (
    <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <Link to="/admin/dashboard" className="flex items-center">
              <PrepzrLogo width={120} height={40} />
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      <ScrollArea className="flex-1 px-2 py-4">
        <div className="space-y-2">
          {sidebarItems.map(item => renderSidebarItem(item))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default AdminSidebar;
