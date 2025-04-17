
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Database, Users, Settings, BarChart, FileText, Image, FileUp } from 'lucide-react';
import SurroundingInfluencesSection from "@/components/admin/dashboard/personalization/SurroundingInfluencesSection";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleDownloadDocument = () => {
    // In a real app, this would trigger an actual document download
    // For demo purposes, we'll just create a link to a sample document
    const link = document.createElement('a');
    link.href = '/sample-student-journey-doc.docx';  // This would be a real document path in production
    link.download = 'Student-Journey-Flow-Documentation.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="container mx-auto p-4 pb-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your application settings and users</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="mr-2">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Manage Users
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,231</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground">Currently active</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">System Health</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">Healthy</div>
                <p className="text-xs text-muted-foreground">All systems operational</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Items</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8,429</div>
                <p className="text-xs text-muted-foreground">+18 added today</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Monitor system activities and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <div className="mr-4 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {["User login", "Profile updated", "Content added", "New quiz created", "Report generated"][i-1]}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {`${i} ${i === 1 ? 'minute' : 'minutes'} ago`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Personalization Features</CardTitle>
                <CardDescription>Student experience customization modules</CardDescription>
              </CardHeader>
              <CardContent>
                <SurroundingInfluencesSection />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage all users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <p>User management interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Database Schema</CardTitle>
                <CardDescription>Current data model structure and relationships</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-2">Entity Relationships</h3>
                  <img 
                    src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                    alt="Database Schema" 
                    className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-4"
                  />
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="space-y-1">
                      <p className="font-medium">User Profile</p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                        <li>ID (PK)</li>
                        <li>Name</li>
                        <li>Email</li>
                        <li>Role</li>
                        <li>MoodID (FK)</li>
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Student Goals</p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                        <li>ID (PK)</li>
                        <li>UserID (FK)</li>
                        <li>Title</li>
                        <li>Target</li>
                        <li>Progress</li>
                      </ul>
                    </div>
                    <div className="space-y-1 mt-2">
                      <p className="font-medium">Learning Activities</p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                        <li>ID (PK)</li>
                        <li>UserID (FK)</li>
                        <li>Type</li>
                        <li>Content</li>
                        <li>CompletionStatus</li>
                      </ul>
                    </div>
                    <div className="space-y-1 mt-2">
                      <p className="font-medium">Mood Tracking</p>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                        <li>ID (PK)</li>
                        <li>Type</li>
                        <li>Description</li>
                        <li>RecommendationID (FK)</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <Button className="w-full" variant="outline">
                  <Database className="mr-2 h-4 w-4" />
                  View Full Schema
                </Button>
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Student Journey Documentation</CardTitle>
                <CardDescription>Complete flow and data points documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium mb-3">Document Contents</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Student Journey Flow</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Complete user flow diagram from onboarding to graduation</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Image className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Data Visualization</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Charts and diagrams explaining data collection points</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Database className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Relationship Models</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Database schema and entity relationships</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FileUp className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Implementation Guide</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Technical requirements and integration steps</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleDownloadDocument} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Complete Documentation
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>System performance and usage metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Analytics interface will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
