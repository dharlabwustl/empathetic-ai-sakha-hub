
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, Users, FileText, Bot, BookOpen, 
  GraduationCap, Heart, Smile, MessageCircle, Bell,
  UserGroup, CreditCard, BarChart3, Mic, Globe,
  Target, FileSearch, Shield
} from 'lucide-react';

const adminModules = [
  { path: '/admin/system', label: 'System Overview', icon: LayoutDashboard },
  { path: '/admin/students', label: 'Student Management', icon: Users },
  { path: '/admin/content', label: 'Content Management', icon: FileText },
  { path: '/admin/ai-models', label: 'AI Models', icon: Bot },
  { path: '/admin/study-plans', label: 'Study Plans', icon: BookOpen },
  { path: '/admin/exams', label: 'Exam Management', icon: GraduationCap },
  { path: '/admin/mood', label: 'Mood Analytics', icon: Heart },
  { path: '/admin/feel-good', label: 'Feel Good Corner', icon: Smile },
  { path: '/admin/ai-tutor', label: 'AI Tutor', icon: MessageCircle },
  { path: '/admin/notifications', label: 'Notifications', icon: Bell },
  { path: '/admin/batches', label: 'Batch Management', icon: UserGroup },
  { path: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { path: '/admin/analytics', label: 'Analytics Center', icon: BarChart3 },
  { path: '/admin/voice', label: 'Voice Assistant', icon: Mic },
  { path: '/admin/surrounding', label: 'Surrounding Influence', icon: Globe },
  { path: '/admin/exam-readiness', label: 'Exam Readiness', icon: Target },
  { path: '/admin/logs', label: 'System Logs', icon: FileSearch },
  { path: '/admin/security', label: 'Security Center', icon: Shield },
];

const AdminNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
        <div className="space-y-2">
          {adminModules.map((module) => {
            const Icon = module.icon;
            const isActive = location.pathname === module.path;
            
            return (
              <Link key={module.path} to={module.path}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start gap-2 ${
                    isActive ? 'bg-blue-600 text-white' : ''
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {module.label}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavigation;
