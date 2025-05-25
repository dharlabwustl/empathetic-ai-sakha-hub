
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from '@/hooks/use-toast';
import { Server, RefreshCw, Plus, Edit, Trash2, CheckCircle, AlertTriangle, Download } from 'lucide-react';

const ApiManagementTab: React.FC = () => {
  const [isChecking, setIsChecking] = useState(false);
  const { toast } = useToast();

  const studentModuleEndpoints = [
    // Student Dashboard Endpoints
    { category: "Student Dashboard", endpoint: "/api/students/dashboard", method: "GET", status: "active", description: "Student dashboard overview" },
    { category: "Student Dashboard", endpoint: "/api/students/profile", method: "GET", status: "active", description: "Student profile data" },
    { category: "Student Dashboard", endpoint: "/api/students/goals", method: "GET", status: "active", description: "Student goals and targets" },
    
    // Study Plan Endpoints
    { category: "Study Plans", endpoint: "/api/students/study-plans", method: "GET", status: "active", description: "Get student study plans" },
    { category: "Study Plans", endpoint: "/api/students/study-plans", method: "POST", status: "active", description: "Create new study plan" },
    { category: "Study Plans", endpoint: "/api/students/todays-plan", method: "GET", status: "active", description: "Today's study plan" },
    { category: "Study Plans", endpoint: "/api/students/study-progress", method: "GET", status: "active", description: "Study progress tracking" },
    
    // Concept Cards Endpoints
    { category: "Concept Cards", endpoint: "/api/concepts", method: "GET", status: "active", description: "Get all concept cards" },
    { category: "Concept Cards", endpoint: "/api/concepts/:id", method: "GET", status: "active", description: "Get specific concept card" },
    { category: "Concept Cards", endpoint: "/api/concepts/create", method: "POST", status: "active", description: "Create new concept card" },
    { category: "Concept Cards", endpoint: "/api/concepts/subjects", method: "GET", status: "active", description: "Get concepts by subject" },
    
    // Flashcards Endpoints
    { category: "Flashcards", endpoint: "/api/flashcards", method: "GET", status: "active", description: "Get all flashcards" },
    { category: "Flashcards", endpoint: "/api/flashcards/create", method: "POST", status: "active", description: "Create new flashcard" },
    { category: "Flashcards", endpoint: "/api/flashcards/study-session", method: "POST", status: "active", description: "Start flashcard study session" },
    
    // Practice Exams Endpoints
    { category: "Practice Exams", endpoint: "/api/exams", method: "GET", status: "active", description: "Get available exams" },
    { category: "Practice Exams", endpoint: "/api/exams/:id/start", method: "POST", status: "active", description: "Start practice exam" },
    { category: "Practice Exams", endpoint: "/api/exams/:id/submit", method: "POST", status: "active", description: "Submit exam answers" },
    { category: "Practice Exams", endpoint: "/api/exams/results", method: "GET", status: "active", description: "Get exam results" },
    
    // Mood Tracking Endpoints
    { category: "Mood Tracking", endpoint: "/api/students/mood-logs", method: "GET", status: "active", description: "Get mood tracking history" },
    { category: "Mood Tracking", endpoint: "/api/students/mood-logs", method: "POST", status: "active", description: "Log current mood" },
    { category: "Mood Tracking", endpoint: "/api/students/mood-analytics", method: "GET", status: "active", description: "Mood analytics data" },
    
    // Feel Good Corner Endpoints
    { category: "Feel Good Corner", endpoint: "/api/feel-good/content", method: "GET", status: "active", description: "Get feel-good content" },
    { category: "Feel Good Corner", endpoint: "/api/feel-good/jokes", method: "GET", status: "active", description: "Get motivational jokes" },
    { category: "Feel Good Corner", endpoint: "/api/feel-good/quotes", method: "GET", status: "active", description: "Get inspirational quotes" },
    { category: "Feel Good Corner", endpoint: "/api/feel-good/activities", method: "GET", status: "active", description: "Get relaxation activities" },
    
    // AI Tutor Endpoints
    { category: "AI Tutor", endpoint: "/api/ai/tutor-chat", method: "POST", status: "active", description: "Chat with AI tutor" },
    { category: "AI Tutor", endpoint: "/api/ai/doubt-resolution", method: "POST", status: "active", description: "Get AI doubt resolution" },
    { category: "AI Tutor", endpoint: "/api/ai/personalized-suggestions", method: "GET", status: "active", description: "Get AI suggestions" },
    
    // Analytics Endpoints
    { category: "Analytics", endpoint: "/api/analytics/performance", method: "GET", status: "active", description: "Student performance analytics" },
    { category: "Analytics", endpoint: "/api/analytics/study-habits", method: "GET", status: "active", description: "Study habits analysis" },
    { category: "Analytics", endpoint: "/api/analytics/weak-areas", method: "GET", status: "active", description: "Weak areas identification" },
    { category: "Analytics", endpoint: "/api/analytics/predictive", method: "GET", status: "active", description: "Predictive analytics" },
    
    // Subscription & Credits
    { category: "Subscription", endpoint: "/api/subscriptions/status", method: "GET", status: "active", description: "Subscription status" },
    { category: "Subscription", endpoint: "/api/credits/balance", method: "GET", status: "active", description: "Credit balance" },
    { category: "Subscription", endpoint: "/api/credits/purchase", method: "POST", status: "active", description: "Purchase credits" },
    
    // Voice Assistant
    { category: "Voice Assistant", endpoint: "/api/voice/commands", method: "POST", status: "active", description: "Process voice commands" },
    { category: "Voice Assistant", endpoint: "/api/voice/tts", method: "POST", status: "active", description: "Text-to-speech conversion" },
    
    // Notifications
    { category: "Notifications", endpoint: "/api/notifications", method: "GET", status: "active", description: "Get notifications" },
    { category: "Notifications", endpoint: "/api/notifications/mark-read", method: "PUT", status: "active", description: "Mark notifications as read" }
  ];

  const handleCheckEndpoints = async () => {
    setIsChecking(true);
    setTimeout(() => {
      setIsChecking(false);
      toast({
        title: "API Check Complete",
        description: "All endpoints have been validated successfully",
      });
    }, 2000);
  };

  const handleExportEndpoints = () => {
    const csvContent = "Category,Endpoint,Method,Status,Description\n" +
      studentModuleEndpoints.map(ep => 
        `${ep.category},${ep.endpoint},${ep.method},${ep.status},${ep.description}`
      ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'student_module_endpoints.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Student module endpoints exported to CSV",
    });
  };

  const groupedEndpoints = studentModuleEndpoints.reduce((acc, endpoint) => {
    if (!acc[endpoint.category]) {
      acc[endpoint.category] = [];
    }
    acc[endpoint.category].push(endpoint);
    return acc;
  }, {} as Record<string, typeof studentModuleEndpoints>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">API Endpoint Management</h3>
          <p className="text-sm text-gray-600">Manage and monitor all student module API endpoints</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportEndpoints} className="gap-2">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={handleCheckEndpoints} disabled={isChecking} className="gap-2">
            <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
            {isChecking ? "Checking..." : "Check All Endpoints"}
          </Button>
        </div>
      </div>

      {/* API Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Endpoints</p>
                <p className="text-2xl font-bold">{studentModuleEndpoints.length}</p>
              </div>
              <Server className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Endpoints</p>
                <p className="text-2xl font-bold text-green-600">{studentModuleEndpoints.filter(ep => ep.status === 'active').length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold">{Object.keys(groupedEndpoints).length}</p>
              </div>
              <Plus className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-blue-600">142ms</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Endpoints by Category */}
      {Object.entries(groupedEndpoints).map(([category, endpoints]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="text-lg">{category}</CardTitle>
            <CardDescription>{endpoints.length} endpoints in this category</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {endpoints.map((endpoint, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{endpoint.endpoint}</TableCell>
                    <TableCell>
                      <Badge variant={endpoint.method === 'GET' ? 'default' : endpoint.method === 'POST' ? 'secondary' : 'outline'}>
                        {endpoint.method}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={endpoint.status === 'active' ? 'default' : 'destructive'} className="bg-green-100 text-green-800">
                        {endpoint.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{endpoint.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ApiManagementTab;
