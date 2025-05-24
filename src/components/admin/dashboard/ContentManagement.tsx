
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  FileText, 
  CreditCard, 
  BookOpen, 
  Calculator, 
  Upload, 
  Edit, 
  Trash2, 
  Eye,
  Plus,
  Database,
  Zap
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'concept-card' | 'flashcard' | 'exam' | 'formula';
  format: 'text' | 'visual' | 'diagram' | 'interactive' | '3d' | 'video';
  subject: string;
  status: 'active' | 'draft' | 'pending' | 'archived';
  createdDate: string;
  lastModified: string;
  usage: number;
  flaskEndpoint: string;
}

const ContentManagement: React.FC = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      type: 'concept-card',
      format: 'interactive',
      subject: 'Physics',
      status: 'active',
      createdDate: '2024-01-15',
      lastModified: '2024-01-15',
      usage: 543,
      flaskEndpoint: '/api/content/concept-cards'
    },
    {
      id: '2',
      title: 'Chemical Bonding Flashcards',
      type: 'flashcard',
      format: 'visual',
      subject: 'Chemistry',
      status: 'active',
      createdDate: '2024-01-14',
      lastModified: '2024-01-14',
      usage: 789,
      flaskEndpoint: '/api/content/flashcards'
    },
    {
      id: '3',
      title: 'IIT-JEE Physics Mock Test',
      type: 'exam',
      format: 'text',
      subject: 'Physics',
      status: 'active',
      createdDate: '2024-01-13',
      lastModified: '2024-01-13',
      usage: 234,
      flaskEndpoint: '/api/content/exams'
    },
    {
      id: '4',
      title: 'Quadratic Formula Collection',
      type: 'formula',
      format: 'text',
      subject: 'Mathematics',
      status: 'active',
      createdDate: '2024-01-12',
      lastModified: '2024-01-12',
      usage: 456,
      flaskEndpoint: '/api/content/formulas'
    }
  ]);

  const contentStats = {
    conceptCards: { total: 2543, active: 2234, formats: { text: 1200, visual: 543, interactive: 491, '3d': 234, video: 75 } },
    flashcards: { total: 5678, active: 5234, formats: { text: 2800, visual: 1834, interactive: 600, diagram: 444 } },
    exams: { total: 234, active: 198, formats: { text: 150, interactive: 48, adaptive: 36 } },
    formulas: { total: 1567, active: 1445, formats: { text: 1200, visual: 245, interactive: 122 } }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'draft': 'bg-yellow-100 text-yellow-800',
      'pending': 'bg-blue-100 text-blue-800',
      'archived': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      'concept-card': <FileText className="h-4 w-4" />,
      'flashcard': <CreditCard className="h-4 w-4" />,
      'exam': <BookOpen className="h-4 w-4" />,
      'formula': <Calculator className="h-4 w-4" />
    };
    return icons[type] || <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Content Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Concept Cards</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.conceptCards.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{contentStats.conceptCards.active} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flashcards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.flashcards.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{contentStats.flashcards.active} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exams</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.exams.total}</div>
            <p className="text-xs text-muted-foreground">{contentStats.exams.active} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Formulas</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.formulas.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{contentStats.formulas.active} active</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="concept-cards">Concept Cards</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="exams">Exams</TabsTrigger>
          <TabsTrigger value="formulas">Formulas</TabsTrigger>
          <TabsTrigger value="flask">Flask APIs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Format Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Concept Cards</h4>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="bg-blue-50 p-2 rounded">Text: {contentStats.conceptCards.formats.text}</div>
                      <div className="bg-green-50 p-2 rounded">Visual: {contentStats.conceptCards.formats.visual}</div>
                      <div className="bg-purple-50 p-2 rounded">Interactive: {contentStats.conceptCards.formats.interactive}</div>
                      <div className="bg-orange-50 p-2 rounded">3D: {contentStats.conceptCards.formats['3d']}</div>
                      <div className="bg-red-50 p-2 rounded">Video: {contentStats.conceptCards.formats.video}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Generation Pipeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span>Upload Resources</span>
                    <Badge className="bg-blue-100 text-blue-800">456 pending</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span>AI Processing</span>
                    <Badge className="bg-yellow-100 text-yellow-800">123 in queue</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span>Content Review</span>
                    <Badge className="bg-orange-100 text-orange-800">89 pending</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span>Published</span>
                    <Badge className="bg-green-100 text-green-800">2.3k this month</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="concept-cards" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Concept Cards Management</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Resources
                  </Button>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Card
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentItems.filter(item => item.type === 'concept-card').map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.format}</Badge>
                      </TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.usage}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
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

        <TabsContent value="flask" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Flask API Endpoints for Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span className="font-mono text-sm">/api/content/concept-cards</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Handles CRUD operations for concept cards with format support</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Methods: GET, POST, PUT, DELETE | Formats: text, visual, interactive, 3d, video
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <span className="font-mono text-sm">/api/content/generate</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-600">AI-powered content generation from uploaded resources</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Methods: POST | Input: files, format preferences | Output: generated content
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span className="font-mono text-sm">/api/content/batch-process</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Batch processing of multiple resources for content generation</p>
                  <div className="mt-2 text-xs text-gray-500">
                    Methods: POST | Async processing with job status tracking
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

export default ContentManagement;
