
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Outlet } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAdminAuth } from '@/contexts/auth/AdminAuthContext';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { isAdminAuthenticated, adminLogout } = useAdminAuth();

  const handleLogout = () => {
    if (adminLogout) {
      adminLogout();
      navigate('/admin/login', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Admin header with logout */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">PREPZR Admin</h1>
          {isAdminAuthenticated && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </header>
      
      {/* Main content area */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
