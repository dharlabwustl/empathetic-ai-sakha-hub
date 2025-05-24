
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, Video, Cpu, Puzzle, BookOpen, Brain,
  Eye, Upload, Settings, BarChart3
} from 'lucide-react';

interface ContentFormat {
  id: string;
  name: string;
  type: 'visual' | '3d' | 'interactive' | 'video' | 'text' | 'diagram';
  count: number;
  status: 'active' | 'inactive' | 'processing';
  description: string;
}

const InteractiveContentTab: React.FC = () => {
  const { toast } = useToast();
  const [contentFormats] = useState<ContentFormat[]>([
    {
      id: '1',
      name: 'Interactive Visuals',
      type: 'visual',
      count: 1247,
      status: 'active',
      description: 'Dynamic charts, graphs, and visual representations'
    },
    {
      id: '2',
      name: '3D Models',
      type: '3d',
      count: 324,
      status: 'active',
      description: 'Three-dimensional interactive learning objects'
    },
    {
      id: '3',
      name: 'Concept Cards',
      type: 'interactive',
      count: 2156,
      status: 'active',
      description: 'Interactive flashcards with multimedia content'
    },
    {
      id: '4',
      name: 'Video Content',
      type: 'video',
      count: 876,
      status: 'active',
      description: 'Educational videos with interactive elements'
    },
    {
      id: '5',
      name: 'Formula Visualizations',
      type: 'diagram',
      count: 543,
      status: 'processing',
      description: 'Mathematical formulas with step-by-step breakdowns'
    },
    {
      id: '6',
      name: 'Text-based Content',
      type: 'text',
      count: 3247,
      status: 'active',
      description: 'Rich text content with embedded interactions'
    }
  ]);

  const handleUploadContent = (formatType: string) => {
    toast({
      title: "Upload Content",
      description: `Opening upload interface for ${formatType} content.`,
    });
  };

  const handleManageFormat = (formatId: string) => {
    const format = contentFormats.find(f => f.id === formatId);
    toast({
      title: "Manage Format",
      description: `Opening management panel for ${format?.name}.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'visual': return <BarChart3 className="h-4 w-4" />;
      case '3d': return <Cpu className="h-4 w-4" />;
      case 'interactive': return <Puzzle className="h-4 w-4" />;
      case 'video': return <Video className="h-4 w-4" />;
      case 'diagram': return <Brain className="h-4 w-4" />;
      case 'text': return <FileText className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Formats</CardTitle>
            <Puzzle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentFormats.length}</div>
            <p className="text-xs text-muted-foreground">Available formats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentFormats.reduce((sum, f) => sum + f.count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Content items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interactive Content</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentFormats.filter(f => f.type === 'interactive' || f.type === '3d').reduce((sum, f) => sum + f.count, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Interactive items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {contentFormats.filter(f => f.status === 'processing').length}
            </div>
            <p className="text-xs text-muted-foreground">Being processed</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="formats" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="formats">Content Formats</TabsTrigger>
          <TabsTrigger value="upload">Upload Content</TabsTrigger>
          <TabsTrigger value="management">Content Management</TabsTrigger>
        </TabsList>

        <TabsContent value="formats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Content Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Format</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Content Count</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentFormats.map((format) => (
                    <TableRow key={format.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                            {getTypeIcon(format.type)}
                          </div>
                          <div>
                            <div className="font-medium">{format.name}</div>
                            <div className="text-sm text-gray-500">{format.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="capitalize">{format.type}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold">{format.count.toLocaleString()}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(format.status)}>
                          {format.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleUploadContent(format.name)}>
                            <Upload className="h-3 w-3 mr-1" />
                            Upload
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleManageFormat(format.id)}>
                            <Settings className="h-3 w-3 mr-1" />
                            Manage
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Interactive Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentFormats.map((format) => (
                  <div key={format.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {getTypeIcon(format.type)}
                      <h3 className="font-semibold">{format.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{format.description}</p>
                    <div className="space-y-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleUploadContent(format.name)}
                      >
                        <Upload className="h-3 w-3 mr-2" />
                        Upload {format.name}
                      </Button>
                      <div className="text-xs text-gray-500">
                        Current: {format.count.toLocaleString()} items
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Management Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Bulk Operations</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Manage multiple content items at once
                    </p>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full">
                        Bulk Upload
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Bulk Delete
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Bulk Tag
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Quality Control</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Ensure content quality and consistency
                    </p>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full">
                        Run Quality Check
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Auto-Tag Content
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Validate Links
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Analytics</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Track content usage and performance
                    </p>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full">
                        <Eye className="h-3 w-3 mr-1" />
                        Usage Reports
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Performance
                      </Button>
                      <Button size="sm" variant="outline" className="w-full">
                        Export Data
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveContentTab;
