
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  Database, 
  Download, 
  FileText, 
  Code, 
  Settings, 
  Server,
  Book,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Globe,
  Monitor
} from 'lucide-react';

interface ExportItem {
  id: string;
  title: string;
  description: string;
  format: string;
  category: 'database' | 'api' | 'documentation' | 'flask';
  icon: React.ReactNode;
  size?: string;
  lastUpdated?: string;
}

const EnhancedDatabaseSchemaDownloader: React.FC = () => {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState<string | null>(null);

  const exportItems: ExportItem[] = [
    // Database exports
    {
      id: 'db-schema-csv',
      title: 'Database Schema (CSV)',
      description: 'Complete database schema with tables, columns, relationships, and constraints',
      format: 'CSV',
      category: 'database',
      icon: <Database className="h-5 w-5" />,
      size: '2.4 MB',
      lastUpdated: 'Today'
    },
    {
      id: 'db-schema-json',
      title: 'Database Schema (JSON)',
      description: 'Structured database schema in JSON format with metadata',
      format: 'JSON',
      category: 'database',
      icon: <Code className="h-5 w-5" />,
      size: '1.8 MB',
      lastUpdated: 'Today'
    },
    {
      id: 'db-data-export',
      title: 'Sample Data Export',
      description: 'Sample data from all tables for testing and development',
      format: 'CSV',
      category: 'database',
      icon: <Database className="h-5 w-5" />,
      size: '15.2 MB',
      lastUpdated: '2 hours ago'
    },
    
    // API Documentation
    {
      id: 'api-docs-pdf',
      title: 'API Documentation (PDF)',
      description: 'Complete API documentation with endpoints, parameters, and examples',
      format: 'PDF',
      category: 'api',
      icon: <FileText className="h-5 w-5" />,
      size: '8.7 MB',
      lastUpdated: 'Today'
    },
    {
      id: 'api-docs-word',
      title: 'API Documentation (Word)',
      description: 'Editable API documentation in Microsoft Word format',
      format: 'DOCX',
      category: 'api',
      icon: <FileText className="h-5 w-5" />,
      size: '6.3 MB',
      lastUpdated: 'Today'
    },
    {
      id: 'postman-collection',
      title: 'Postman Collection',
      description: 'Ready-to-use Postman collection with all API endpoints',
      format: 'JSON',
      category: 'api',
      icon: <Monitor className="h-5 w-5" />,
      size: '450 KB',
      lastUpdated: 'Today'
    },
    
    // Flask Integration
    {
      id: 'flask-guide-pdf',
      title: 'Flask Integration Guide (PDF)',
      description: 'Step-by-step guide for integrating Flask backend with PREPZR',
      format: 'PDF',
      category: 'flask',
      icon: <Server className="h-5 w-5" />,
      size: '12.1 MB',
      lastUpdated: 'Yesterday'
    },
    {
      id: 'flask-guide-word',
      title: 'Flask Integration Guide (Word)',
      description: 'Editable Flask integration guide with code examples',
      format: 'DOCX',
      category: 'flask',
      icon: <Server className="h-5 w-5" />,
      size: '9.8 MB',
      lastUpdated: 'Yesterday'
    },
    {
      id: 'flask-starter-code',
      title: 'Flask Starter Code',
      description: 'Complete Flask application starter code with authentication',
      format: 'ZIP',
      category: 'flask',
      icon: <Code className="h-5 w-5" />,
      size: '5.2 MB',
      lastUpdated: 'Yesterday'
    },
    
    // Complete Documentation
    {
      id: 'complete-docs-pdf',
      title: 'Complete Documentation (PDF)',
      description: 'All documentation combined in a single comprehensive PDF',
      format: 'PDF',
      category: 'documentation',
      icon: <Book className="h-5 w-5" />,
      size: '45.6 MB',
      lastUpdated: 'Today'
    },
    {
      id: 'complete-docs-word',
      title: 'Complete Documentation (Word)',
      description: 'All documentation combined in a single editable Word document',
      format: 'DOCX',
      category: 'documentation',
      icon: <Book className="h-5 w-5" />,
      size: '38.2 MB',
      lastUpdated: 'Today'
    },
    {
      id: 'developer-handbook',
      title: 'Developer Handbook',
      description: 'Complete developer handbook with best practices and guidelines',
      format: 'PDF',
      category: 'documentation',
      icon: <Book className="h-5 w-5" />,
      size: '28.4 MB',
      lastUpdated: 'Today'
    }
  ];

  const handleDownload = async (item: ExportItem) => {
    setDownloading(item.id);
    
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create and trigger download
      const blob = new Blob([`Mock ${item.title} content`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.title.toLowerCase().replace(/\s+/g, '-')}.${item.format.toLowerCase()}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download Started",
        description: `${item.title} is being downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setDownloading(null);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'database': return <Database className="h-4 w-4" />;
      case 'api': return <Globe className="h-4 w-4" />;
      case 'flask': return <Server className="h-4 w-4" />;
      case 'documentation': return <Book className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'database': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'api': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'flask': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'documentation': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const filterByCategory = (category: string) => {
    return exportItems.filter(item => item.category === category);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Database & Documentation Center</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Download database schemas, API documentation, Flask integration guides, and complete system documentation
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database Tables</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Active tables</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">API Endpoints</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Active endpoints</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documentation Pages</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">Total pages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Updated</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Today</div>
            <p className="text-xs text-muted-foreground">All systems</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Downloads</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="api">API Docs</TabsTrigger>
          <TabsTrigger value="flask">Flask Integration</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {exportItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {item.icon}
                      <Badge variant="outline" className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                    </div>
                    <Badge variant="secondary">{item.format}</Badge>
                  </div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{item.size}</span>
                    <span>{item.lastUpdated}</span>
                  </div>
                  <Button 
                    onClick={() => handleDownload(item)}
                    disabled={downloading === item.id}
                    className="w-full"
                  >
                    {downloading === item.id ? (
                      <>Downloading...</>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download {item.format}
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {['database', 'api', 'flask', 'documentation'].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterByCategory(category).map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <Badge variant="outline" className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                      </div>
                      <Badge variant="secondary">{item.format}</Badge>
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{item.size}</span>
                      <span>{item.lastUpdated}</span>
                    </div>
                    <Button 
                      onClick={() => handleDownload(item)}
                      disabled={downloading === item.id}
                      className="w-full"
                    >
                      {downloading === item.id ? (
                        <>Downloading...</>
                      ) : (
                        <>
                          <Download className="w-4 h-4 mr-2" />
                          Download {item.format}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            System Status
          </CardTitle>
          <CardDescription>
            Current status of all documentation and export systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Database Schema</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>API Documentation</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Flask Integration</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>Export Services</span>
              </div>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Maintenance</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDatabaseSchemaDownloader;
