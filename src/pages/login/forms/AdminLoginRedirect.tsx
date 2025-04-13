
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const AdminLoginRedirect: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-full">
            <Building2 size={20} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h3 className="font-semibold">Admin Access</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Secure login for administrators</p>
          </div>
        </div>
      </div>
      
      <Button 
        type="button" 
        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600"
        onClick={() => navigate("/admin/login")}
      >
        Continue to Admin Login
      </Button>
    </div>
  );
};

export default AdminLoginRedirect;
