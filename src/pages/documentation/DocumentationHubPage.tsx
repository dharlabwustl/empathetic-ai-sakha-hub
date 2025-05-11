
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, FileDown } from "lucide-react";
import signupDatabaseMapping from '@/documentation/SignupDatabaseMapping';
import pagewiseDatabaseMapping from '@/documentation/PagewiseDatabaseMapping';
import { useToast } from '@/components/ui/use-toast';

const DocumentationHubPage: React.FC = () => {
  const { toast } = useToast();

  // Function to download content as a Word document
  const downloadAsDocument = (content: string, filename: string) => {
    try {
      // Create a Blob with the content
      const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      
      // Append to body, click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: `${filename} is being downloaded.`,
      });
    } catch (error) {
      console.error("Download failed:", error);
      toast({
        title: "Download Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
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
          <h1 className="text-3xl font-bold">PREPZR Documentation Downloads</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Click on the buttons below to download documentation files directly
          </p>
        </div>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="space-y-8">
            {/* Signup Database Mapping */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Signup Flow - Database Mapping</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Complete documentation for mapping frontend signup steps to database tables
              </p>
              <Button 
                className="w-full sm:w-auto flex items-center gap-2"
                onClick={() => downloadAsDocument(signupDatabaseMapping, 'signup-database-mapping.docx')}
              >
                <FileDown className="h-4 w-4" />
                Download Signup Database Mapping
              </Button>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-xl font-semibold">Pagewise Database Integration Guide</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Complete documentation for frontend pages, components, data fields, and backend connections
              </p>
              <Button 
                className="w-full sm:w-auto flex items-center gap-2 mt-4"
                onClick={() => downloadAsDocument(pagewiseDatabaseMapping, 'pagewise-mapping.docx')}
              >
                <FileDown className="h-4 w-4" />
                Download Pagewise Database Mapping
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
          If you have trouble with these download links, please contact technical support for assistance.
        </div>
      </div>
    </div>
  );
};

export default DocumentationHubPage;
