
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, FileDown } from "lucide-react";
import SignupDatabaseMappingViewer from '@/components/documentation/SignupDatabaseMappingViewer';
import signupDatabaseMapping from '@/documentation/SignupDatabaseMapping';
import { useToast } from '@/components/ui/use-toast';

const SignupDatabaseMappingPage: React.FC = () => {
  const { toast } = useToast();

  // Automatically trigger download on page load
  useEffect(() => {
    // Wait a moment before triggering the download to ensure page is loaded
    setTimeout(() => {
      downloadAsDocument();
      toast({
        title: "Download Started",
        description: "Your document is being downloaded automatically.",
      });
    }, 1000);
  }, []);
  
  // Function to download the documentation as a Word document
  const downloadAsDocument = () => {
    try {
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
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download Failed",
        description: "Please try the download button instead.",
        variant: "destructive",
      });
    }
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
          variant="default" 
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
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md">
            <p className="text-sm">
              If the automatic download didn't start, please click the "Download as Document" button above.
            </p>
          </div>
        </div>
        
        <SignupDatabaseMappingViewer />
      </div>
    </div>
  );
};

export default SignupDatabaseMappingPage;
