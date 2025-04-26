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
import { ThemeToggle } from '@/components/theme-toggle';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { isAdminAuthenticated, adminLogout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };
  
  const menuItems = [
    { path: '/admin/dashboard', icon: <BarChart2 size={20} />, label: 'Dashboard' },
    { path: '/admin/students', icon: <Users size={20} />, label: 'Students' },
    { path: '/admin/ai', icon: <Brain size={20} />, label: 'AI Personalization' },
    { path: '/admin/content', icon: <BookOpen size={20} />, label: 'Content' },
    { path: '/admin/features', icon: <Layers size={20} />, label: 'Features' },
    { path: '/admin/engagement', icon: <MessageSquare size={20} />, label: 'Engagement' },
    { path: '/admin/subscriptions', icon: <CreditCard size={20} />, label: 'Subscriptions' },
    { path: '/admin/issues', icon: <AlertCircle size={20} />, label: 'Issues' },
    { path: '/admin/notifications', icon: <Bell size={20} />, label: 'Notifications' },
    { path: '/admin/documentation', icon: <FileText size={20} />, label: 'Documentation' },
    { path: '/admin/system', icon: <Settings size={20} />, label: 'System' },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950 transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/admin/dashboard" className="font-bold text-lg">
            Admin Panel
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <nav className="flex-grow px-2 py-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.label}>
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
                  <span>{item.label}</span>
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
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden fixed top-4 left-4 z-50">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
