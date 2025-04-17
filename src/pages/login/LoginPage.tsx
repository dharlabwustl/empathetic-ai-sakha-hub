
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { School, User, Lock, Building2 } from "lucide-react";
import SakhaLogo from "@/components/common/SakhaLogo";
import StudentLoginForm from "./forms/StudentLoginForm";
import TutorLoginForm from "./forms/TutorLoginForm";
import AdminLoginRedirect from "./forms/AdminLoginRedirect";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("student");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="p-8 bg-white dark:bg-gray-950 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-violet-200/30 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-8 relative">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
                alt="Sakha AI"
                className="w-10 h-10"
              />
              <span className="font-display font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Sakha AI
              </span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
        </div>
        
        <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <School size={16} />
              Student
            </TabsTrigger>
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <User size={16} />
              Tutor
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Lock size={16} />
              Admin
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="student">
            <StudentLoginForm activeTab={activeTab} />
          </TabsContent>
          
          <TabsContent value="tutor">
            <TutorLoginForm activeTab={activeTab} />
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
