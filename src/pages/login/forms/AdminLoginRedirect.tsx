
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

const AdminLoginRedirect: React.FC = () => {
  const navigate = useNavigate();
  
  const handleAdminLoginRedirect = () => {
    navigate('/admin/login');
  };
  
  return (
    <div className="flex flex-col items-center">
      <Button 
        variant="outline" 
        className="w-full flex items-center justify-center gap-2 border-gray-300"
        onClick={handleAdminLoginRedirect}
      >
        <ShieldCheck className="h-4 w-4 text-blue-600" />
        <span>Login as Administrator</span>
      </Button>
      <p className="text-xs text-gray-500 mt-2 text-center">
        For admin staff and system administrators only
      </p>
    </div>
  );
};

export default AdminLoginRedirect;
