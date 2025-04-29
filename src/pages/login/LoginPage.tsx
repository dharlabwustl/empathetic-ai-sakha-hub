
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { School, Lock } from "lucide-react";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import StudentLoginForm from "./forms/StudentLoginForm";
import AdminLoginRedirect from "./forms/AdminLoginRedirect";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="p-8 bg-white dark:bg-gray-950 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-blue-300/20 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-8 relative">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2">
              <PrepzrLogo width={40} height={40} />
              <span className="font-display font-bold text-xl bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
                PREPZR
              </span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
        </div>
        
        <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <School size={16} />
              Student
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Lock size={16} />
              Admin
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="student">
            <StudentLoginForm activeTab={activeTab} />
          </TabsContent>
          
          <TabsContent value="admin">
            <AdminLoginRedirect />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;
