
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminService } from "@/services/adminService";
import { ContentItem } from "@/types/admin";

const ContentPage = () => {
  const [loading, setLoading] = useState(true);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [contentType, setContentType] = useState<string>('all');
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchContent(contentType);
  }, [contentType]);

  const fetchContent = async (type: string) => {
    setLoading(true);
    try {
      const response = await adminService.getContent(type);
      setContentItems(response.data);
      setTotalItems(response.total);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type: string) => {
    setContentType(type);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <p className="text-gray-500">Manage all educational content in the system</p>
      </div>
      
      <Tabs defaultValue="all" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all" onClick={() => handleTypeChange('all')}>All Content</TabsTrigger>
            <TabsTrigger value="concept" onClick={() => handleTypeChange('concept')}>Concepts</TabsTrigger>
            <TabsTrigger value="flashcard" onClick={() => handleTypeChange('flashcard')}>Flashcards</TabsTrigger>
            <TabsTrigger value="question" onClick={() => handleTypeChange('question')}>Questions</TabsTrigger>
            <TabsTrigger value="exam" onClick={() => handleTypeChange('exam')}>Exams</TabsTrigger>
          </TabsList>
          
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Add New Content
          </Button>
        </div>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Content Library ({totalItems} items)</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                  <Button variant="outline" size="sm">
                    Filter
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading content...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-50 dark:bg-gray-800/50">
                        <th className="text-left p-4 font-medium">Title</th>
                        <th className="text-left p-4 font-medium">Type</th>
                        <th className="text-left p-4 font-medium">Subject</th>
                        <th className="text-left p-4 font-medium">Difficulty</th>
                        <th className="text-left p-4 font-medium">Created</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-left p-4 font-medium">Usage</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentItems.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="p-4">{item.title}</td>
                          <td className="p-4">
                            <Badge variant="outline" className={`
                              ${item.type === 'concept' ? 'bg-blue-100 text-blue-800' : ''}
                              ${item.type === 'flashcard' ? 'bg-green-100 text-green-800' : ''}
                              ${item.type === 'question' ? 'bg-purple-100 text-purple-800' : ''}
                              ${item.type === 'exam' ? 'bg-amber-100 text-amber-800' : ''}
                            `}>
                              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4">{item.subject}</td>
                          <td className="p-4">
                            <Badge variant="outline" className={`
                              ${item.difficulty === 'easy' ? 'bg-green-100 text-green-800' : ''}
                              ${item.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' : ''}
                              ${item.difficulty === 'hard' ? 'bg-red-100 text-red-800' : ''}
                            `}>
                              {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4">{formatDate(item.createdAt)}</td>
                          <td className="p-4">
                            {item.approved ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800">
                                Approved
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-amber-100 text-amber-800">
                                Pending
                              </Badge>
                            )}
                          </td>
                          <td className="p-4">{item.usageCount} uses</td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* The other tabs will show the same component but with filtered content */}
        <TabsContent value="concept">
          <Card>
            <CardHeader>
              <CardTitle>Concept Cards</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Same table as above but filtered for concepts */}
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading concepts...</p>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Content filtered to show only concepts.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="flashcard">
          <Card>
            <CardHeader>
              <CardTitle>Flashcards</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading flashcards...</p>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Content filtered to show only flashcards.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="question">
          <Card>
            <CardHeader>
              <CardTitle>Practice Questions</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading questions...</p>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Content filtered to show only practice questions.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="exam">
          <Card>
            <CardHeader>
              <CardTitle>Exams</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="w-10 h-10 border-4 border-t-indigo-500 border-indigo-200 rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading exams...</p>
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">Content filtered to show only exams.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default ContentPage;
