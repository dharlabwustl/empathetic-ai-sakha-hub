import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  FileText, 
  Image, 
  Play, 
  Edit, 
  Trash2, 
  Upload,
  Search,
  Filter,
  Eye,
  Download
} from 'lucide-react';

const InteractiveContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');

  // Mock data for interactive content
  const contentItems = [
    {
      id: '1',
      title: 'Physics - Electromagnetism 3D Model',
      type: '3D Model',
      subject: 'Physics',
      views: 234,
      status: 'published',
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      title: 'Chemistry - Molecular Structure Visualizer',
      type: 'Interactive Visual',
      subject: 'Chemistry',
      views: 189,
      status: 'draft',
      lastUpdated: '2024-01-14'
    },
    {
      id: '3',
      title: 'Math - Calculus Formula Cards',
      type: 'Formula Cards',
      subject: 'Mathematics',
      views: 456,
      status: 'published',
      lastUpdated: '2024-01-13'
    },
    {
      id: '4',
      title: 'Biology - Cell Structure Exam',
      type: 'Interactive Exam',
      subject: 'Biology',
      views: 321,
      status: 'published',
      lastUpdated: '2024-01-12'
    }
  ];

  const contentStats = {
    total: 248,
    published: 195,
    draft: 32,
    pending: 21,
    formats: {
      '3D Models': 45,
      'Interactive Visuals': 67,
      'Concept Cards': 89,
      'Flashcards': 123,
      'Formula Cards': 78,
      'Interactive Exams': 56
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Interactive Content Management</h2>
          <p className="text-muted-foreground">Manage 3D models, visuals, concept cards, flashcards, and interactive exams</p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Upload Content
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{contentStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Content</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{contentStats.published}</div>
            <div className="text-sm text-muted-foreground">Published</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-amber-600">{contentStats.draft}</div>
            <div className="text-sm text-muted-foreground">Draft</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{contentStats.pending}</div>
            <div className="text-sm text-muted-foreground">Pending Review</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Management */}
      <Card>
        <CardHeader>
          <CardTitle>Content Library</CardTitle>
          <CardDescription>Browse and manage all interactive content formats</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="3d-models">3D Models</TabsTrigger>
              <TabsTrigger value="visuals">Interactive Visuals</TabsTrigger>
              <TabsTrigger value="cards">Concept Cards</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
              <TabsTrigger value="exams">Interactive Exams</TabsTrigger>
            </TabsList>

            {/* Search and Filter */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="border rounded-lg">
                <div className="grid grid-cols-6 gap-4 p-4 border-b bg-muted/50 font-medium">
                  <div>Content</div>
                  <div>Type</div>
                  <div>Subject</div>
                  <div>Views</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                {contentItems.map((item) => (
                  <div key={item.id} className="grid grid-cols-6 gap-4 p-4 border-b last:border-b-0">
                    <div className="font-medium">{item.title}</div>
                    <div>
                      <Badge variant="outline">{item.type}</Badge>
                    </div>
                    <div>{item.subject}</div>
                    <div>{item.views}</div>
                    <div>
                      <Badge 
                        variant={item.status === 'published' ? 'default' : 'secondary'}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Other tabs would have similar content */}
            <TabsContent value="3d-models">
              <div className="text-center py-8">
                <h3 className="text-lg font-semibold mb-2">3D Models</h3>
                <p className="text-muted-foreground">Manage interactive 3D models and visualizations</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Format Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Content Format Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(contentStats.formats).map(([format, count]) => (
              <div key={format} className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm font-medium">{format}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveContentManagement;
