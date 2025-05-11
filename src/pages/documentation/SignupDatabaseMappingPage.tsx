
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, FileDown } from "lucide-react";
import SignupDatabaseMappingViewer from '@/components/documentation/SignupDatabaseMappingViewer';
import signupDatabaseMapping from '@/documentation/SignupDatabaseMapping';

const SignupDatabaseMappingPage: React.FC = () => {
  // Function to download the documentation as a Word document
  const downloadAsDocument = () => {
    // Create a Blob with the content
    const blob = new Blob([signupDatabaseMapping], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'signup-database-mapping.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6 flex justify-between">
        <Link to="/documentation">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Documentation
          </Button>
        </Link>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={downloadAsDocument}
        >
          <FileDown className="h-4 w-4" />
          Download as Document
        </Button>
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
