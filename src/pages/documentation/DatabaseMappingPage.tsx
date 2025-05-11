
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Download, Database } from "lucide-react";
import DatabaseMappingVisualizer from '@/components/documentation/DatabaseMappingVisualizer';
import { getDatabaseMappingAsMarkdown } from '@/utils/page-database-mapping';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DatabaseMappingPage: React.FC = () => {
  const { toast } = useToast();
  
  // Function to download the mapping data as Markdown
  const downloadMapping = () => {
    try {
      // Get the markdown content
      const markdownContent = getDatabaseMappingAsMarkdown();
      
      // Create a Blob with the content
      const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'prepzr-database-mapping.md';
      
      // Append to body, click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Database mapping documentation is being downloaded.",
      });
      
      console.log("Database mapping download initiated");
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
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/documentation">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Documentation
          </Button>
        </Link>
        <Button 
          onClick={downloadMapping}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Full Mapping
        </Button>
      </div>
      
      <Card className="mb-6 shadow-md border-blue-100 dark:border-blue-900">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 dark:bg-blue-900/50 p-3 rounded-full">
              <Database className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">PREPZR Database Schema Mapping</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                Complete mapping between frontend pages/components and database tables/fields.
                This interactive tool helps you understand how the frontend connects to the backend database.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 gap-6">
        <DatabaseMappingVisualizer />
        
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-bold mb-4">How to Use This Document</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              This interactive database mapping tool helps developers understand the relationship between 
              the frontend components and the backend database structure. For each page in the application:
            </p>
            
            <ol>
              <li>Select a page from the dropdown to see all its components</li>
              <li>For each component, you can view:
                <ul>
                  <li>The database fields mapping (frontend field → database column)</li>
                  <li>The database table structure</li>
                  <li>The API endpoint used to fetch/update the data</li>
                </ul>
              </li>
              <li>Use the "Download Full Mapping" button to get a comprehensive Markdown document</li>
            </ol>
            
            <p className="text-blue-600 dark:text-blue-400">
              This documentation is critical for both frontend and backend developers to maintain 
              consistency in the application's data structure and ensure proper API integrations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseMappingPage;
