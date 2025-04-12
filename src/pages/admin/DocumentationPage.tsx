
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, BookOpen, Download, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const DocumentationPage = () => {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Documentation",
      description: "This feature is currently under development.",
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
