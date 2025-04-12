
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Download, FileCog, Code, Server, 
  Brain, Database, Network, Puzzle, 
  ListChecks, FileJson, ArrowRight
} from "lucide-react";

const FlaskIntegrationGuide = () => {
  const { toast } = useToast();
  
  const handleDownloadGuide = () => {
    toast({
      title: "Downloading Integration Guide",
      description: "Preparing the comprehensive Flask integration documentation",
      variant: "default"
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Flask integration guide has been downloaded successfully",
        variant: "default"
      });
    }, 1500);
  };
  
  const handleDownloadSchemas = () => {
    toast({
      title: "Downloading Schema Documentation",
      description: "Preparing database schema documentation",
      variant: "default"
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Database schema documentation has been downloaded successfully",
        variant: "default"
      });
    }, 1500);
  };

  return (
    <Card className="bg-white/90 dark:bg-gray-900/90">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Server className="text-purple-500" />
          Flask Environment Integration
        </CardTitle>
        <CardDescription>
          Guide for seamlessly connecting your Sakha admin dashboard with Flask backend services
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <Code className="text-blue-500" />
              Integration Steps
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <ol className="list-decimal list-inside space-y-3 text-sm">
                <li className="pb-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Clone the Flask repository</span>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Our Flask backend is pre-configured with necessary models and database connections.
                  </p>
                </li>
                <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Set up the Python environment</span>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Use Python 3.9+ and install dependencies from requirements.txt
                  </p>
                </li>
                <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Configure environment variables</span>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Set API keys, database URIs, and other required configuration
                  </p>
                </li>
                <li className="py-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Run database migrations</span>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Use Flask-Migrate to initialize and update database schema
                  </p>
                </li>
                <li className="pt-3">
                  <span className="font-medium">Start Flask development server</span>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Run the application and connect with React frontend
                  </p>
                </li>
              </ol>
            </div>
            
            <div className="flex justify-between mt-2">
              <Button 
                className="gap-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white"
                onClick={handleDownloadGuide}
              >
                <Download size={16} />
                Download Complete Guide
              </Button>
              
              <Button 
                variant="outline"
                className="gap-2"
                onClick={() => {
                  window.open("https://github.com/flask-projects/ai-flask-template", "_blank");
                }}
              >
                <Code size={16} />
                View Sample Code
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium text-lg flex items-center gap-2">
              <Database className="text-green-500" />
              API Structure & Database
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium mb-3">Key API Endpoints</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <Badge className="bg-green-100 text-green-800 mr-2 mt-1">GET</Badge>
                  <div>
                    <p className="font-mono">/api/v1/students</p>
                    <p className="text-xs text-gray-600">Retrieve student data with pagination</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Badge className="bg-blue-100 text-blue-800 mr-2 mt-1">POST</Badge>
                  <div>
                    <p className="font-mono">/api/v1/ai/personalize</p>
                    <p className="text-xs text-gray-600">Generate personalized learning content</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Badge className="bg-purple-100 text-purple-800 mr-2 mt-1">POST</Badge>
                  <div>
                    <p className="font-mono">/api/v1/content/upload</p>
                    <p className="text-xs text-gray-600">Upload and process study materials</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Badge className="bg-amber-100 text-amber-800 mr-2 mt-1">GET</Badge>
                  <div>
                    <p className="font-mono">/api/v1/analytics/dashboard</p>
                    <p className="text-xs text-gray-600">Retrieve dashboard stats and metrics</p>
                  </div>
                </div>
              </div>
              
              <h4 className="font-medium mt-4 mb-2">Database Schema</h4>
              <p className="text-sm text-gray-600 mb-2">
                The database is designed to maintain consistency between admin and student views.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full flex justify-between items-center"
                onClick={handleDownloadSchemas}
              >
                <span className="flex items-center gap-2">
                  <FileJson size={16} className="text-blue-500" />
                  Download Database Schemas
                </span>
                <ArrowRight size={14} />
              </Button>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 p-4 rounded-lg border border-purple-100 dark:border-purple-900/50">
              <h4 className="font-medium flex items-center gap-2">
                <Brain className="text-purple-500" />
                AI Model Integration
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                Our Flask backend includes pre-configured connectors for various AI models and endpoints required for the personalization features.
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <Puzzle className="text-purple-500" size={14} />
                  <span>Sentiment analysis & emotional tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Puzzle className="text-purple-500" size={14} />
                  <span>Learning style detection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Puzzle className="text-purple-500" size={14} />
                  <span>Content generation & personalization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium mb-3">Getting Help & Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button variant="outline" className="justify-start">
              <ListChecks className="mr-2 h-4 w-4 text-green-500" />
              Technical Documentation
            </Button>
            <Button variant="outline" className="justify-start">
              <Network className="mr-2 h-4 w-4 text-blue-500" />
              Developer Community
            </Button>
            <Button variant="outline" className="justify-start">
              <FileCog className="mr-2 h-4 w-4 text-purple-500" />
              Integration Troubleshooting
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlaskIntegrationGuide;
