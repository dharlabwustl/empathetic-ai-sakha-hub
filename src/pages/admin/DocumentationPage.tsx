
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, BookOpen, Download, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DocumentationPage = () => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Documentation",
      description: "This feature is currently under development.",
      variant: "default"
    });
  };

  const handleDownloadFlaskGuide = () => {
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
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-gray-500 dark:text-gray-400">
            System documentation and knowledge resources
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input placeholder="Search documentation..." className="pl-10" />
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Featured Documentation</h2>
        <Button 
          variant="outline" 
          className="flex items-center gap-2" 
          onClick={handleDownloadFlaskGuide}
        >
          <Download size={16} />
          Download Flask MySQL Guide
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span>Getting Started</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Introduction guides for new administrators and setup instructions.
            </p>
            <button 
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              onClick={showToast}
            >
              <span>Read documentation</span>
              <ExternalLink size={14} />
            </button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-green-500" />
              <span>AI Model Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Learn how to manage and optimize AI personalization models.
            </p>
            <button 
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              onClick={showToast}
            >
              <span>Read documentation</span>
              <ExternalLink size={14} />
            </button>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <span>Content Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Guidelines for managing educational content and study materials.
            </p>
            <button 
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              onClick={showToast}
            >
              <span>Read documentation</span>
              <ExternalLink size={14} />
            </button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Technical Documentation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">System Architecture</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Technical</td>
                  <td className="px-6 py-4 whitespace-nowrap">Apr 10, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v2.1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={showToast}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">API Documentation</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Technical</td>
                  <td className="px-6 py-4 whitespace-nowrap">Apr 05, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v3.4</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={showToast}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">Flask MySQL Integration</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Technical</td>
                  <td className="px-6 py-4 whitespace-nowrap">May 01, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v1.0</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={handleDownloadFlaskGuide}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">Database Schema</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Technical</td>
                  <td className="px-6 py-4 whitespace-nowrap">Mar 28, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v2.8</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={showToast}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium">Security Guidelines</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Policy</td>
                  <td className="px-6 py-4 whitespace-nowrap">Mar 15, 2025</td>
                  <td className="px-6 py-4 whitespace-nowrap">v1.9</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                      className="text-blue-600 hover:underline inline-flex items-center gap-1"
                      onClick={showToast}
                    >
                      <Download size={14} />
                      <span>Download</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default DocumentationPage;
