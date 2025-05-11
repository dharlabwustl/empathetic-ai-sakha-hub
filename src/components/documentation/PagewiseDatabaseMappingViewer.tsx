import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Markdown from 'react-markdown';
import pagewiseDatabaseMapping from '@/documentation/PagewiseDatabaseMapping';

const PagewiseDatabaseMappingViewer: React.FC = () => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardTitle className="text-xl font-semibold">Page-by-Page Database & API Integration Guide</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="page-mapping" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="page-mapping">Page Mappings</TabsTrigger>
            <TabsTrigger value="implementation">Implementation Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="page-mapping" className="p-4">
            <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
              <div className="prose dark:prose-invert max-w-none">
                <Markdown>{pagewiseDatabaseMapping}</Markdown>
              </div>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="implementation" className="p-4">
            <ScrollArea className="h-[calc(100vh-16rem)] pr-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">Implementation Guidelines</h3>
                  <p className="text-muted-foreground mt-2">
                    General guidelines for implementing page-to-database connections:
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">1. Authentication & Global User Context</h4>
                  <p>Use the AuthContext to manage user state across all pages:</p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm overflow-auto">
                    {`// Import auth context at the top of your component
import { useAuth } from '@/contexts/auth/AuthContext';

// Inside your component
const { user, isAuthenticated } = useAuth();

// Use user data for API calls
const fetchUserData = async () => {
  if (!isAuthenticated) return;

  const response = await fetch(\`\${API_BASE_URL}/students/\${user.id}/profile\`, {
    headers: {
      Authorization: \`Bearer \${user.token}\`
    }
  });
  // Process response...
}`}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">2. API Service Layer</h4>
                  <p>Create dedicated service files for each major feature:</p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm overflow-auto">
                    {`// Example: studentService.ts
import { API_BASE_URL, API_ENDPOINTS } from '@/services/api/apiConfig';

export const studentService = {
  getProfile: async (studentId: string, token: string) => {
    try {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.STUDENTS.PROFILE(studentId)}\`,
        {
          headers: {
            Authorization: \`Bearer \${token}\`
          }
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  },

  // Other API methods...
};`}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">3. Error Handling Strategy</h4>
                  <p>Standardize error handling across all API requests:</p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm overflow-auto">
                    {`// When making API requests, follow this pattern:
const fetchData = async () => {
  setLoading(true);
  try {
    const data = await studentService.getStudyPlan(user.id, user.token);
    setStudyPlan(data);
  } catch (error) {
    if (error.response?.status === 401) {
      // Handle authentication error
      logout();
      navigate('/login');
    } else {
      // Handle other errors
      toast({
        title: "Error fetching data",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    }
  } finally {
    setLoading(false);
  }
};`}
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">4. State Management</h4>
                  <p>Use React Query for data fetching and caching:</p>
                  <pre className="bg-slate-100 dark:bg-slate-800 p-2 rounded text-sm overflow-auto">
                    {`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// In your component
const queryClient = useQueryClient();

// Fetch data
const { data: conceptCards, isLoading, error } = useQuery({
  queryKey: ['conceptCards', user.id],
  queryFn: () => conceptService.getConceptCards(user.id, user.token),
  enabled: !!user?.id
});

// Update data
const mutation = useMutation({
  mutationFn: (cardId: string) => 
    conceptService.markCardAsCompleted(user.id, cardId, user.token),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['conceptCards', user.id]
    });
    toast({
      title: "Success",
      description: "Card marked as completed"
    });
  }
});`}
                  </pre>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PagewiseDatabaseMappingViewer;
