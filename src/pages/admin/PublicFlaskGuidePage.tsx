
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, FileDown, Download } from "lucide-react";
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Flask Backend Integration Guide</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Complete documentation for connecting Flask backend to PREPZR frontend
          </p>
        </div>

        {/* SUPER PROMINENT DOWNLOAD SECTION WITH LARGE BUTTONS */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-100 dark:border-blue-800 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Download Documentation Files</h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={downloadFlaskGuide} 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-6 px-8 text-lg"
              size="lg"
            >
              <Download className="h-6 w-6" />
              Download Flask Guide
            </Button>
            
            <Button 
              onClick={downloadSignupMapping}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-6 px-8 text-lg"
              size="lg"
            >
              <Download className="h-6 w-6" />
              Download Signup Database Mapping
            </Button>
            
            <Button 
              onClick={downloadPagewiseMapping}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 text-lg" 
              size="lg"
            >
              <Download className="h-6 w-6" />
              Download Pagewise Database Mapping
            </Button>
          </div>
        </div>
        
        {/* Original download buttons as fallback */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button 
            onClick={downloadFlaskGuide} 
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            size="default"
          >
            <Download className="h-5 w-5" />
            Download Flask Guide
          </Button>
          
          <Button 
            onClick={downloadSignupMapping}
            variant="secondary" 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            size="default"
          >
            <Download className="h-5 w-5" />
            Download Signup Database Mapping
          </Button>
          
          <Button 
            onClick={downloadPagewiseMapping}
            variant="secondary" 
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
            size="default"
          >
            <Download className="h-5 w-5" />
            Download Pagewise Database Mapping
          </Button>
        </div>
          
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-4">
          <p className="text-center font-medium text-yellow-800 dark:text-yellow-200">
            Having trouble? Click directly on the large download buttons above to get all documentation files.
          </p>
        </div>
        
        <Card className="w-full">
          <CardContent className="p-6">
            <ScrollArea className="h-[calc(100vh-24rem)] pr-4">
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
