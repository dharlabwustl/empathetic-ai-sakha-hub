
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import SignupDatabaseMappingViewer from '@/components/documentation/SignupDatabaseMappingViewer';

const SignupDatabaseMappingPage: React.FC = () => {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Signup Flow Database Integration</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Complete documentation for mapping frontend signup steps to database tables
          </p>
        </div>
        
        <SignupDatabaseMappingViewer />
      </div>
    </div>
  );
};

export default SignupDatabaseMappingPage;
