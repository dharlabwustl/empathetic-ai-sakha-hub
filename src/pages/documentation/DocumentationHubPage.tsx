
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ChevronLeft, FileDown, FileText, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import signupDatabaseMapping from '@/documentation/SignupDatabaseMapping';
import pagewiseDatabaseMapping from '@/documentation/PagewiseDatabaseMapping';
import { useToast } from '@/components/ui/use-toast';

const DocumentationHubPage: React.FC = () => {
  const { toast } = useToast();

  // Function to convert documentation content to a downloadable Word document
  const downloadAsDocument = (content: string, filename: string) => {
    try {
      // Create a Blob with the content
      const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      // Create a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
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
          <h1 className="text-3xl font-bold">PREPZR Technical Documentation</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Access all technical documentation for the PREPZR platform
          </p>
          
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md">
            <h2 className="text-xl font-medium mb-2">Direct Download Links</h2>
            <div className="flex gap-4 flex-wrap">
              <Button 
                variant="default" 
                className="flex items-center gap-2"
                onClick={() => downloadAsDocument(signupDatabaseMapping, 'signup-database-mapping.docx')}
              >
                <FileDown className="h-4 w-4" />
                Download Signup Database Mapping
              </Button>
              <Button 
                variant="default" 
                className="flex items-center gap-2"
                onClick={() => downloadAsDocument(pagewiseDatabaseMapping, 'pagewise-mapping.docx')}
              >
                <FileDown className="h-4 w-4" />
                Download Pagewise Database Mapping
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Signup Database Mapping Documentation */}
          <Card className="w-full h-full">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <CardTitle className="flex justify-between items-center">
                <span>Signup Database Mapping</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => downloadAsDocument(signupDatabaseMapping, 'signup-database-mapping.docx')}
                >
                  <FileDown className="h-4 w-4" />
                  Download
                </Button>
              </CardTitle>
              <CardDescription>
                Complete mapping of signup flows to database tables
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <p className="text-sm">
                  This document provides a comprehensive guide to how frontend signup forms map to database tables and fields.
                </p>
                <div className="flex justify-between">
                  <Link to="/documentation/signup-database-mapping">
                    <Button className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Online
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pagewise Database Mapping Documentation */}
          <Card className="w-full h-full">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <CardTitle className="flex justify-between items-center">
                <span>Pagewise Database Mapping</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => downloadAsDocument(pagewiseDatabaseMapping, 'pagewise-mapping.docx')}
                >
                  <FileDown className="h-4 w-4" />
                  Download
                </Button>
              </CardTitle>
              <CardDescription>
                Page-by-page API and database integration guide
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <p className="text-sm">
                  This document details how each page in the application connects to backend API endpoints and database tables.
                </p>
                <div className="flex justify-between">
                  <Link to="/documentation/pagewise-mapping">
                    <Button className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      View Online
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="w-full mt-4">
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
            <CardDescription>
              More technical documentation for the PREPZR platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>API Reference</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Database Schema</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>Implementation Guide</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentationHubPage;
