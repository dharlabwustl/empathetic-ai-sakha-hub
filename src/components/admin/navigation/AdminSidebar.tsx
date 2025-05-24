
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  BarChart3,
  Shield,
  Database,
  UserCheck,
  Brain,
  GraduationCap,
  Zap,
  DollarSign,
  Globe,
  FileText,
  Heart,
  Target,
  MessageSquare,
  Trophy,
  HelpCircle,
  TrendingUp,
  Smartphone,
  Link2,
  Gamepad2,
  Bell
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const currentTab = new URLSearchParams(location.search).get('tab') || 'overview';

  const menuItems = [
    // Core Dashboard
    { 
      section: 'Dashboard',
      items: [
        { icon: LayoutDashboard, label: 'Overview', tab: 'overview' },
        { icon: BarChart3, label: 'Analytics', tab: 'analytics' },
        { icon: DollarSign, label: 'Revenue', tab: 'revenue' }
      ]
    },
    
    // User Management
    { 
      section: 'User Management',
      items: [
        { icon: Users, label: 'Users', tab: 'users' },
        { icon: UserCheck, label: 'Student Profiles', tab: 'student-profiles' },
        { icon: Trophy, label: 'Gamification', tab: 'gamification' }
      ]
    },

    // Content & Learning
    { 
      section: 'Content & Learning',
      items: [
        { icon: BookOpen, label: 'Content', tab: 'content' },
        { icon: GraduationCap, label: 'Exams', tab: 'exams' },
        { icon: Target, label: 'Study Plans', tab: 'study-plans' }
      ]
    },

    // AI & Personalization
    { 
      section: 'AI & Personalization',
      items: [
        { icon: Brain, label: 'AI Models', tab: 'ai-models' },
        { icon: Zap, label: 'Personalization', tab: 'personalization' },
        { icon: Heart, label: 'Mood Analytics', tab: 'mood-analytics' }
      ]
    },

    // Communication & Engagement
    { 
      section: 'Communication',
      items: [
        { icon: MessageSquare, label: 'Communication', tab: 'communication' },
        { icon: Bell, label: 'Notifications', tab: 'notifications' },
        { icon: HelpCircle, label: 'Support System', tab: 'support' }
      ]
    },

    // Advanced Analytics
    { 
      section: 'Advanced Analytics',
      items: [
        { icon: TrendingUp, label: 'User Journey', tab: 'user-journey' },
        { icon: BarChart3, label: 'A/B Testing', tab: 'ab-testing' },
        { icon: Users, label: 'Cohort Analysis', tab: 'cohort-analysis' }
      ]
    },

    // System Management
    { 
      section: 'System Management',
      items: [
        { icon: Zap, label: 'Features', tab: 'features' },
        { icon: DollarSign, label: 'Subscriptions', tab: 'subscriptions' },
        { icon: Database, label: 'Database', tab: 'database' },
        { icon: Globe, label: 'API Management', tab: 'api' },
        { icon: Link2, label: 'Integrations', tab: 'integrations' }
      ]
    },

    // Mobile & Apps
    { 
      section: 'Mobile Management',
      items: [
        { icon: Smartphone, label: 'Mobile Apps', tab: 'mobile-apps' },
        { icon: Bell, label: 'Push Notifications', tab: 'push-notifications' }
      ]
    },

    // Security & Settings
    { 
      section: 'Security & Settings',
      items: [
        { icon: Shield, label: 'Security', tab: 'security' },
        { icon: Settings, label: 'Settings', tab: 'settings' },
        { icon: FileText, label: 'Logs', tab: 'logs' }
      ]
    }
  ];

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-screen overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Admin Panel</h2>
      </div>
      
      <nav className="mt-4 px-2">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-6">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              {section.section}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.tab;
                
                return (
                  <Link
                    key={item.tab}
                    to={`/admin/dashboard?tab=${item.tab}`}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700'
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
