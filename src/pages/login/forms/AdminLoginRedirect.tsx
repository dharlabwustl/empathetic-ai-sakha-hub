
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

const AdminLoginRedirect: React.FC = () => {
  const navigate = useNavigate();

  const handleAdminRedirect = () => {
    // Set admin flag to indicate this is an admin login attempt
    localStorage.setItem('admin_login_attempt', 'true');
    
    // Clear any student login data to prevent conflicts
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('new_user_signup');
    
    // Direct redirect to admin login page
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        For administrators and staff members. Requires special credentials.
      </p>
      <Button 
        variant="outline"
        className="flex items-center justify-center gap-2 border-gray-300 dark:border-gray-700 hover:border-blue-500"
        onClick={handleAdminRedirect}
      >
        <ShieldAlert size={16} />
        <span>Access Admin Portal</span>
      </Button>
    </div>
  );
};

export default AdminLoginRedirect;
