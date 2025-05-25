
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Server, Database, Download } from "lucide-react";

export const DocumentationPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Complete technical documentation for the Prepzr admin platform
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Server className="w-4 h-4" />
              <span>API Documentation</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>Database Schema</span>
            </TabsTrigger>
            <TabsTrigger value="guides" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Integration Guides</span>
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
        </Tabs>
      </div>
    </AdminLayout>
  );
};
