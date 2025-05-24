
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Image, 
  Video, 
  Layers, 
  Zap, 
  Upload, 
  Eye, 
  Edit, 
  Trash2,
  Play,
  Download,
  Share,
  BarChart3,
  Users,
  Clock,
  Star
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id: string;
  title: string;
  type: 'concept-card' | 'flashcard' | 'exam' | 'formula' | '3d-model' | 'video' | 'interactive-visual' | 'diagram';
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'published' | 'draft' | 'review' | 'archived';
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  author: string;
  description: string;
}

const InteractiveContentTab: React.FC = () => {
  const { toast } = useToast();
  const [contentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Photosynthesis Process',
      type: 'concept-card',
      subject: 'Biology',
      difficulty: 'medium',
      status: 'published',
      views: 2543,
      likes: 189,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      author: 'Dr. Sharma',
      description: 'Interactive concept card explaining the photosynthesis process with animations'
    },
    {
      id: '2',
      title: 'Quadratic Equations',
      type: 'flashcard',
      subject: 'Mathematics',
      difficulty: 'hard',
      status: 'published',
      views: 1876,
      likes: 145,
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      author: 'Prof. Gupta',
      description: 'Interactive flashcards for mastering quadratic equation formulas'
    },
    {
      id: '3',
      title: 'Organic Chemistry Mock Test',
      type: 'exam',
      subject: 'Chemistry',
      difficulty: 'hard',
      status: 'published',
      views: 3421,
      likes: 267,
      createdAt: '2024-01-13',
      updatedAt: '2024-01-14',
      author: 'Dr. Verma',
      description: 'Comprehensive exam on organic chemistry reactions and mechanisms'
    },
    {
      id: '4',
      title: 'DNA Structure Model',
      type: '3d-model',
      subject: 'Biology',
      difficulty: 'medium',
      status: 'review',
      views: 987,
      likes: 76,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-13',
      author: 'Dr. Patel',
      description: 'Interactive 3D model of DNA double helix structure'
    },
    {
      id: '5',
      title: 'Newton\'s Laws Explanation',
      type: 'video',
      subject: 'Physics',
      difficulty: 'easy',
      status: 'published',
      views: 4532,
      likes: 398,
      createdAt: '2024-01-11',
      updatedAt: '2024-01-12',
      author: 'Prof. Singh',
      description: 'Video explanation of Newton\'s three laws of motion with examples'
    }
  ]);

  const contentTypes = [
    { type: 'concept-card', name: 'Concept Cards', icon: FileText, count: 234, color: 'bg-blue-100 text-blue-800' },
    { type: 'flashcard', name: 'Flashcards', icon: Layers, count: 567, color: 'bg-green-100 text-green-800' },
    { type: 'exam', name: 'Exams', icon: FileText, count: 89, color: 'bg-purple-100 text-purple-800' },
    { type: 'formula', name: 'Formulas', icon: Zap, count: 145, color: 'bg-yellow-100 text-yellow-800' },
    { type: '3d-model', name: '3D Models', icon: Layers, count: 67, color: 'bg-red-100 text-red-800' },
    { type: 'video', name: 'Videos', icon: Video, count: 123, color: 'bg-indigo-100 text-indigo-800' },
    { type: 'interactive-visual', name: 'Interactive Visuals', icon: Image, count: 89, color: 'bg-pink-100 text-pink-800' },
    { type: 'diagram', name: 'Diagrams', icon: Image, count: 156, color: 'bg-gray-100 text-gray-800' }
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'published': 'bg-green-100 text-green-800',
      'draft': 'bg-gray-100 text-gray-800',
      'review': 'bg-yellow-100 text-yellow-800',
      'archived': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors: Record<string, string> = {
      'easy': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'hard': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const handleContentAction = (action: string, contentId: string) => {
    toast({
      title: "Content Action",
      description: `${action} action performed on content item.`,
    });
  };

  const totalViews = contentItems.reduce((sum, item) => sum + item.views, 0);
  const totalLikes = contentItems.reduce((sum, item) => sum + item.likes, 0);
  const publishedCount = contentItems.filter(item => item.status === 'published').length;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentItems.length}</div>
            <p className="text-xs text-muted-foreground">Across all formats</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLikes}</div>
            <p className="text-xs text-muted-foreground">Total likes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedCount}</div>
            <p className="text-xs text-muted-foreground">Live content items</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Content Overview</TabsTrigger>
          <TabsTrigger value="management">Content Management</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="upload">Upload & Create</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {contentTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <div key={type.type} className="border rounded-lg p-4 text-center">
                      <IconComponent className="h-8 w-8 mx-auto mb-2 text-gray-600" />
                      <h3 className="font-medium text-sm">{type.name}</h3>
                      <p className="text-2xl font-bold mt-1">{type.count}</p>
                      <Badge className={type.color} size="sm">
                        Active
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Content Library</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Upload
                  </Button>
                  <Button>
                    <Upload className="h-4 w-4 mr-2" />
                    Add Content
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{item.title}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                          <Badge className={getDifficultyColor(item.difficulty)}>
                            {item.difficulty}
                          </Badge>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {item.views} views
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {item.likes} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {item.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.createdAt}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContentAction('view', item.id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContentAction('edit', item.id)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContentAction('share', item.id)}
                        >
                          <Share className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleContentAction('download', item.id)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contentItems.slice(0, 5).map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <span className="font-medium text-sm">{item.title}</span>
                        <div className="text-xs text-gray-500">{item.type} • {item.subject}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{item.views} views</div>
                        <div className="text-xs text-gray-500">{item.likes} likes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average View Time</span>
                      <span>4.2 min</span>
                    </div>
                    <Progress value={84} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Completion Rate</span>
                      <span>76%</span>
                    </div>
                    <Progress value={76} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>User Satisfaction</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Content Quality Score</span>
                      <span>88%</span>
                    </div>
                    <Progress value={88} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {contentTypes.slice(0, 6).map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Button 
                        key={type.type}
                        variant="outline" 
                        className="h-20 flex flex-col items-center justify-center"
                        onClick={() => handleContentAction('create', type.type)}
                      >
                        <IconComponent className="h-6 w-6 mb-2" />
                        <span className="text-xs">{type.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <h4 className="font-medium text-blue-800 mb-1">Content Standards</h4>
                    <p className="text-blue-700">Ensure all content follows educational standards and is age-appropriate.</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border border-green-200">
                    <h4 className="font-medium text-green-800 mb-1">Quality Guidelines</h4>
                    <p className="text-green-700">Use high-resolution images and clear audio for better engagement.</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-1">Format Requirements</h4>
                    <p className="text-yellow-700">Check file size limits and supported formats before uploading.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InteractiveContentTab;
