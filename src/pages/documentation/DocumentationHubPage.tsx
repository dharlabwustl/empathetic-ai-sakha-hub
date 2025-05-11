
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronLeft, Download, Database, FileDown, BookOpen } from "lucide-react";
import signupDatabaseMapping from '@/documentation/SignupDatabaseMapping';
import pagewiseDatabaseMapping from '@/documentation/PagewiseDatabaseMapping';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DocumentationHubPage: React.FC = () => {
  const { toast } = useToast();

  // Function to download content as a document
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">PREPZR Documentation</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400">
            Complete documentation for frontend-backend integration
          </p>
        </div>
        
        {/* BIG PROMINENT DOWNLOAD BUTTONS AT THE TOP */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
          <Button 
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white py-6 px-8 text-lg"
            onClick={() => downloadAsDocument(signupDatabaseMapping, 'signup-database-mapping.docx')}
            size="lg"
          >
            <Download className="h-6 w-6" />
            Download Signup Database Mapping
          </Button>
          
          <Button 
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-6 px-8 text-lg"
            onClick={() => downloadAsDocument(pagewiseDatabaseMapping, 'pagewise-mapping.docx')}
            size="lg"
          >
            <Download className="h-6 w-6" />
            Download Pagewise Database Mapping
          </Button>
        </div>
        
        {/* NEW CARD FOR INTERACTIVE DATABASE MAPPING */}
        <Card className="mb-6 shadow-md border-blue-100 dark:border-blue-900">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-800/50 p-3 rounded-full">
                <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Interactive Database Schema Mapping</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 mt-1">
                  Explore the connections between frontend pages and database tables
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Our new interactive tool lets you explore how each page and component in the PREPZR frontend 
              connects to specific database tables and fields in the backend. Perfect for developers 
              integrating the frontend with the database.
            </p>
            <Link to="/documentation/database-mapping">
              <Button className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Database className="h-5 w-5" />
                View Interactive Database Mapping
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <div className="space-y-8">
            {/* Signup Database Mapping */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileDown className="h-5 w-5 text-green-600" />
                Signup Flow - Database Mapping
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Complete documentation for mapping frontend signup steps to database tables
              </p>
              <div className="flex flex-wrap gap-3">
                <Button 
                  className="w-full sm:w-auto flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => downloadAsDocument(signupDatabaseMapping, 'signup-database-mapping.docx')}
                  size="lg"
                >
                  <Download className="h-5 w-5" />
                  Download Document
                </Button>
                
                <Link to="/documentation/signup-database-mapping">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    View in Browser
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <FileDown className="h-5 w-5 text-purple-600" />
                Pagewise Database Integration Guide
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Complete documentation for frontend pages, components, data fields, and backend connections
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button 
                  className="w-full sm:w-auto flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => downloadAsDocument(pagewiseDatabaseMapping, 'pagewise-mapping.docx')}
                  size="lg"
                >
                  <Download className="h-5 w-5" />
                  Download Document
                </Button>
                
                <Link to="/documentation/pagewise-mapping">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    View in Browser
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm mt-4">
          If you have trouble with these download links, please contact technical support for assistance.
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md p-4 mt-4">
          <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
            Looking for Flask integration guide? <Link to="/flask-guide" className="underline font-bold">Click here</Link> to view and download the Flask Guide
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentationHubPage;
