import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Server, Database, Download, FileJson, FileSpreadsheet, FileImage } from "lucide-react";
import { AVAILABLE_EXPORTS } from "@/services/api/apiConfig";

export const DocumentationPage = () => {
  const handleDownload = (exportItem: any) => {
    // Trigger download for the specific export format
    console.log(`Downloading: ${exportItem.title}`);
    
    // In a real implementation, this would trigger the actual download
    // For now, we'll show a mock download action
    const link = document.createElement('a');
    link.href = '#';
    link.download = exportItem.title.toLowerCase().replace(/\s+/g, '_');
    link.click();
  };

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Documentation Center</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Comprehensive technical documentation and export center for PREPZR platform
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>API Docs</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>Database</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Integration</span>
            </TabsTrigger>
            <TabsTrigger value="exports" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Downloads</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Documentation</CardTitle>
                <CardDescription>
                  Welcome to the Prepzr Admin Platform documentation. Here you will find comprehensive guides and
                  documentation to help you start working with our system as quickly as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Getting Started</CardTitle>
                      <CardDescription>Learn the basics of using the admin panel</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        This guide will walk you through the fundamental features and capabilities of the admin panel.
                      </p>
                      <Button variant="outline" className="w-full">
                        Read Guide
                      </Button>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Backend Integration</CardTitle>
                      <CardDescription>Configure your backend services</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Follow our step-by-step instructions for connecting your Flask backend to this admin panel.
                      </p>
                      <Button variant="outline" className="w-full" onClick={() => window.location.href = '/admin/flask-guide'}>
                        View Flask Guide
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            {/* API documentation content */}
            <Card>
              <CardHeader>
                <CardTitle>API Reference</CardTitle>
                <CardDescription>
                  Explore the API endpoints available for integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">GET</Badge>
                        <span className="font-mono text-sm">/api/v1/students</span>
                      </div>
                      <Badge>Auth Required</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Returns a paginated list of all students with their basic information.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">POST</Badge>
                        <span className="font-mono text-sm">/api/v1/students</span>
                      </div>
                      <Badge>Auth Required</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Create a new student profile with the submitted data.
                    </p>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">PUT</Badge>
                        <span className="font-mono text-sm">/api/v1/students/:id</span>
                      </div>
                      <Badge>Auth Required</Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Update an existing student profile by ID.
                    </p>
                  </div>
                  
                  <Button className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Full API Specification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            {/* Database schema content */}
            <Card>
              <CardHeader>
                <CardTitle>Database Schema Documentation</CardTitle>
                <CardDescription>
                  Explore the database tables and relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">users</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Core table for storing user account information
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="font-medium">id</div>
                      <div>UUID</div>
                      <div className="text-blue-500">Primary Key</div>
                      
                      <div className="font-medium">email</div>
                      <div>VARCHAR(255)</div>
                      <div className="text-blue-500">Unique</div>
                      
                      <div className="font-medium">password</div>
                      <div>VARCHAR(255)</div>
                      <div className="text-blue-500"></div>
                      
                      <div className="font-medium">name</div>
                      <div>VARCHAR(255)</div>
                      <div className="text-blue-500"></div>
                      
                      <div className="font-medium">role</div>
                      <div>VARCHAR(50)</div>
                      <div className="text-blue-500"></div>
                      
                      <div className="font-medium">created_at</div>
                      <div>TIMESTAMP</div>
                      <div className="text-blue-500"></div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium mb-2">student_profiles</h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Extended information about student users
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="font-medium">id</div>
                      <div>UUID</div>
                      <div className="text-blue-500">Primary Key</div>
                      
                      <div className="font-medium">user_id</div>
                      <div>UUID</div>
                      <div className="text-blue-500">Foreign Key (users.id)</div>
                      
                      <div className="font-medium">study_preference</div>
                      <div>VARCHAR(50)</div>
                      <div className="text-blue-500"></div>
                      
                      <div className="font-medium">target_exam</div>
                      <div>VARCHAR(100)</div>
                      <div className="text-blue-500"></div>
                    </div>
                  </div>
                  
                  <Button className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Full Schema
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Integration Guides</CardTitle>
                <CardDescription>
                  Step-by-step instructions for connecting different backend services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Flask Integration</CardTitle>
                      <CardDescription>Connect a Flask backend to Prepzr Admin</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Complete guide for setting up a Flask backend with SQLAlchemy models and REST APIs.
                      </p>
                      <Button onClick={() => window.location.href = '/admin/flask-guide'} className="w-full">
                        View Guide
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Django Integration</CardTitle>
                      <CardDescription>Connect a Django backend to Prepzr Admin</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500 mb-4">
                        Complete guide for setting up a Django backend with Django ORM and REST framework.
                      </p>
                      <Button variant="outline" className="w-full">
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentation & Schema Exports</CardTitle>
                <CardDescription>
                  Download comprehensive documentation and database schemas in multiple formats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {AVAILABLE_EXPORTS.map((exportItem) => (
                    <Card key={exportItem.endpoint} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          {exportItem.format === 'csv' && <FileSpreadsheet className="h-5 w-5 text-green-600" />}
                          {exportItem.format === 'json' && <FileJson className="h-5 w-5 text-blue-600" />}
                          {exportItem.format === 'pdf' && <FileImage className="h-5 w-5 text-red-600" />}
                          {exportItem.format === 'docx' && <FileText className="h-5 w-5 text-purple-600" />}
                          {exportItem.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {exportItem.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {exportItem.format.toUpperCase()}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDownload(exportItem)}
                            className="gap-2"
                          >
                            <Download className="h-3 w-3" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Export Descriptions</h3>
                  <div className="space-y-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Database Schema Exports</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• <strong>CSV Format:</strong> Table structure with columns, data types, and relationships</li>
                          <li>• <strong>JSON Format:</strong> Structured schema with complete metadata and relationships</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">API Documentation Exports</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• <strong>PDF Format:</strong> Professional documentation for printing and sharing</li>
                          <li>• <strong>Word Format:</strong> Editable documentation for customization</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Flask Integration Guide</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• <strong>Step-by-step instructions</strong> for Flask backend setup</li>
                          <li>• <strong>Code examples</strong> and configuration templates</li>
                          <li>• <strong>Database models</strong> and API endpoint implementations</li>
                          <li>• <strong>Authentication</strong> and security configuration</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};
