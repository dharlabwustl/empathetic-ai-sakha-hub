
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, FileDown } from "lucide-react";
import { Link } from "react-router-dom";
import Markdown from 'react-markdown';
import flaskGuideContent from '@/documentation/FlaskBackendIntegration';
import signupDatabaseMapping from '@/documentation/SignupDatabaseMapping';
import pagewiseDatabaseMapping from '@/documentation/PagewiseDatabaseMapping';
import { useToast } from '@/components/ui/use-toast';

const PublicFlaskGuidePage = () => {
  const { toast } = useToast();

  // Function to download the flask guide as a document
  const downloadFlaskGuide = () => {
    try {
      // Create a Blob with the content
      const blob = new Blob([flaskGuideContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'flask-backend-integration-guide.docx';
      
      // Append to body, click, and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Flask Guide is being downloaded.",
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
  
  // Function to download signup database mapping
  const downloadSignupMapping = () => {
    try {
      const blob = new Blob([signupDatabaseMapping], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'signup-database-mapping.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Signup Database Mapping is being downloaded.",
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
  
  // Function to download pagewise database mapping
  const downloadPagewiseMapping = () => {
    try {
      const blob = new Blob([pagewiseDatabaseMapping], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'pagewise-database-mapping.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: "Pagewise Database Mapping is being downloaded.",
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
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6 flex items-center">
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Flask Backend Integration Guide</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Complete documentation for connecting Flask backend to PREPZR frontend
          </p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <Button 
              onClick={downloadFlaskGuide} 
              className="flex items-center gap-2"
              size="sm"
            >
              <FileDown className="h-4 w-4" />
              Download Flask Guide
            </Button>
            
            <Button 
              onClick={downloadSignupMapping}
              variant="secondary" 
              className="flex items-center gap-2"
              size="sm"
            >
              <FileDown className="h-4 w-4" />
              Download Signup Database Mapping
            </Button>
            
            <Button 
              onClick={downloadPagewiseMapping}
              variant="secondary" 
              className="flex items-center gap-2"
              size="sm"
            >
              <FileDown className="h-4 w-4" />
              Download Pagewise Database Mapping
            </Button>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-4">
            <p className="text-sm">
              Use the download buttons above to save any of the documentation files for offline use.
            </p>
          </div>
        </div>
        
        <Card className="w-full">
          <CardContent className="p-6">
            <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
              <div className="prose dark:prose-invert max-w-none">
                <Markdown>{flaskGuideContent}</Markdown>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicFlaskGuidePage;
