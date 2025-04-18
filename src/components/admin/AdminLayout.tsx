import React, { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart2, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Brain, 
  MessageSquare, 
  CreditCard,
  AlertCircle, 
  Bell,
  FileText,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface AdminLayoutProps {
  children: ReactNode;
}

interface SidebarItem {
  name: string;
  icon: ReactNode;
  path: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { adminUser, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const sidebarItems = [
    { name: 'Dashboard', icon: <BarChart2 size={20} />, path: '/admin/dashboard' },
    { name: 'Students', icon: <Users size={20} />, path: '/admin/students' },
    { name: 'AI Personalization', icon: <Brain size={20} />, path: '/admin/ai' },
    { name: 'Content', icon: <BookOpen size={20} />, path: '/admin/content' },
    { name: 'Features', icon: <Layers size={20} />, path: '/admin/features' },
    { name: 'Engagement', icon: <MessageSquare size={20} />, path: '/admin/engagement' },
    { name: 'Subscriptions', icon: <CreditCard size={20} />, path: '/admin/subscriptions' },
    { name: 'System', icon: <Settings size={20} />, path: '/admin/system' },
    { name: 'Analytics', icon: <BarChart2 size={20} />, path: '/admin/analytics' },
    { name: 'Issues', icon: <AlertCircle size={20} />, path: '/admin/issues' },
    { name: 'Notifications', icon: <Bell size={20} />, path: '/admin/notifications' },
    { name: 'Documentation', icon: <FileText size={20} />, path: '/admin/documentation' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/admin/dashboard" className="font-bold text-lg">
            Admin Panel
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <nav className="flex-grow px-2 py-4">
          <ul>
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    location.pathname === item.path
                      ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile Section */}
        <div className="border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h6 className="font-medium">{adminUser?.name || 'Admin'}</h6>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {adminUser?.role || 'Administrator'}
              </p>
            </div>
            <Badge className="ml-2">{adminUser?.role}</Badge>
          </div>
          <Button
            variant="ghost"
            className="mt-2 w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Mobile Menu Button */}
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden fixed top-4 left-4 z-50">
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
