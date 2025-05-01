
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FlaskDeveloperGuide = () => {
  const { toast } = useToast();

  const handleDownloadGuide = () => {
    // Create a JSON object with Flask integration guide content
    const jsonContent = JSON.stringify({
      title: "Flask Integration Guide for MySQL",
      version: "1.0.0",
      sections: [
        {
          title: "Setup & Installation",
          content: "Install required packages: Flask, SQLAlchemy, Flask-SQLAlchemy, mysql-connector-python"
        },
        {
          title: "Database Configuration",
          content: "Configure MySQL database connection using SQLAlchemy ORM"
        },
        {
          title: "API Development",
          content: "Structure your Flask API with blueprints and RESTful endpoints"
        },
        {
          title: "Models Creation",
          content: "Define SQLAlchemy models that map to your MySQL tables"
        },
        {
          title: "Authentication",
          content: "Implement JWT or session-based authentication"
        },
        {
          title: "Migrations",
          content: "Use Flask-Migrate to handle database schema changes"
        },
        {
          title: "Testing",
          content: "Implement unit and integration tests for your API"
        },
        {
          title: "Deployment",
          content: "Deploy using Gunicorn/uWSGI with Nginx"
        }
      ],
      created: new Date().toISOString()
    }, null, 2);
    
    // Create a blob and download it
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flask-mysql-integration-guide.json';
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "Flask MySQL integration guide is being downloaded",
      variant: "default"
    });
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Flask MySQL Developer Guide</h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Flask MySQL Integration Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            This guide provides comprehensive instructions for integrating a Flask 
            application with MySQL database for backend development.
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">1. Setup & Installation</h3>
              <p className="text-sm text-muted-foreground">
                Install required packages: Flask, SQLAlchemy, Flask-SQLAlchemy, mysql-connector-python
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">2. Database Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Configure MySQL database connection using SQLAlchemy ORM
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">3. API Development</h3>
              <p className="text-sm text-muted-foreground">
                Structure your Flask API with blueprints and RESTful endpoints
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">4. Models Creation</h3>
              <p className="text-sm text-muted-foreground">
                Define SQLAlchemy models that map to your MySQL tables
              </p>
            </div>
            
            <div>
              <h3 className="font-medium mb-1">5. Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Implement JWT or session-based authentication
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button 
              onClick={handleDownloadGuide} 
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download Complete Guide
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <p className="text-sm text-gray-500 mt-4">
        Version: 1.0.0 | Last updated: May 1, 2025
      </p>
    </div>
  );
};

export default FlaskDeveloperGuide;
