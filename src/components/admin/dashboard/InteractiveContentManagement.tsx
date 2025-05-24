
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, FileText, Image, Video, Cube, BookOpen, 
  Brain, Target, Eye, Edit, Trash2, Plus, Search,
  Download, Share, Calendar, Users, CheckCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ContentItem {
  id: string;
  title: string;
  type: 'concept-card' | 'flashcard' | 'exam' | 'formula' | '3d-model' | 'interactive-visual' | 'video';
  subject: string;
  topic: string;
  status: 'active' | 'draft' | 'review' | 'archived';
  createdBy: string;
  createdDate: string;
  lastModified: string;
  views: number;
  engagementScore: number;
  difficulty: 'easy' | 'medium' | 'hard';
  linkedStudentDashboard: boolean;
}

const InteractiveContentManagement: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Photosynthesis Process',
      type: 'concept-card',
      subject: 'Biology',
      topic: 'Plant Biology',
      status: 'active',
      createdBy: 'Dr. Smith',
      createdDate: '2024-01-10',
      lastModified: '2024-01-15',
      views: 1247,
      engagementScore: 89,
      difficulty: 'medium',
      linkedStudentDashboard: true
    },
    {
      id: '2',
      title: 'Quadratic Equations Practice',
      type: 'flashcard',
      subject: 'Mathematics',
      topic: 'Algebra',
      status: 'active',
      createdBy: 'Prof. Johnson',
      createdDate: '2024-01-08',
      lastModified: '2024-01-12',
      views: 892,
      engagementScore: 92,
      difficulty: 'hard',
      linkedStudentDashboard: true
    },
    {
      id: '3',
      title: 'Chemical Bonding 3D Model',
      type: '3d-model',
      subject: 'Chemistry',
      topic: 'Chemical Bonds',
      status: 'active',
      createdBy: 'Dr. Wilson',
      createdDate: '2024-01-05',
      lastModified: '2024-01-14',
      views: 567,
      engagementScore: 95,
      difficulty: 'medium',
      linkedStudentDashboard: true
    },
    {
      id: '4',
      title: 'Physics Motion Simulator',
      type: 'interactive-visual',
      subject: 'Physics',
      topic: 'Mechanics',
      status: 'review',
      createdBy: 'Dr. Brown',
      createdDate: '2024-01-12',
      lastModified: '2024-01-16',
      views: 234,
      engagementScore: 87,
      difficulty: 'hard',
      linkedStudentDashboard: false
    },
    {
      id: '5',
      title: 'JEE Physics Mock Test',
      type: 'exam',
      subject: 'Physics',
      topic: 'Comprehensive',
      status: 'active',
      createdBy: 'AI Generated',
      createdDate: '2024-01-14',
      lastModified: '2024-01-16',
      views: 1893,
      engagementScore: 91,
      difficulty: 'hard',
      linkedStudentDashboard: true
    }
  ]);

  const contentStats = {
    total: contentItems.length,
    active: contentItems.filter(item => item.status === 'active').length,
    draft: contentItems.filter(item => item.status === 'draft').length,
    review: contentItems.filter(item => item.status === 'review').length,
    linkedToDashboard: contentItems.filter(item => item.linkedStudentDashboard).length
  };

  const subjects = ['Biology', 'Mathematics', 'Physics', 'Chemistry'];
  const contentTypes = [
    { value: 'concept-card', label: 'Concept Cards', icon: <FileText className="h-4 w-4" /> },
    { value: 'flashcard', label: 'Flashcards', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'exam', label: 'Exams', icon: <Target className="h-4 w-4" /> },
    { value: 'formula', label: 'Formulas', icon: <Brain className="h-4 w-4" /> },
    { value: '3d-model', label: '3D Models', icon: <Cube className="h-4 w-4" /> },
    { value: 'interactive-visual', label: 'Interactive Visuals', icon: <Eye className="h-4 w-4" /> },
    { value: 'video', label: 'Videos', icon: <Video className="h-4 w-4" /> }
  ];

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSubject = selectedSubject === 'all' || item.subject === selectedSubject;
    
    return matchesSearch && matchesType && matchesSubject;
  });

  const linkToDashboard = (contentId: string) => {
    setContentItems(prev =>
      prev.map(item =>
        item.id === contentId
          ? { ...item, linkedStudentDashboard: !item.linkedStudentDashboard }
          : item
      )
    );
    
    const item = contentItems.find(item => item.id === contentId);
    toast({
      title: item?.linkedStudentDashboard ? "Unlinked from Dashboard" : "Linked to Dashboard",
      description: `${item?.title} has been ${item?.linkedStudentDashboard ? 'removed from' : 'added to'} student dashboard.`
    });
  };

  const updateContentStatus = (contentId: string, newStatus: ContentItem['status']) => {
    setContentItems(prev =>
      prev.map(item =>
        item.id === contentId
          ? { ...item, status: newStatus, lastModified: new Date().toISOString().split('T')[0] }
          : item
      )
    );
    
    toast({
      title: "Status Updated",
      description: `Content status has been changed to ${newStatus}.`
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'draft': 'bg-yellow-100 text-yellow-800',
      'review': 'bg-blue-100 text-blue-800',
      'archived': 'bg-gray-100 text-gray-800'
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

  const getTypeIcon = (type: string) => {
    const typeConfig = contentTypes.find(t => t.value === type);
    return typeConfig?.icon || <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Content Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.total}</div>
            <p className="text-xs text-muted-foreground">All content items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.active}</div>
            <p className="text-xs text-muted-foreground">Live content</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.review}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.draft}</div>
            <p className="text-xs text-muted-foreground">Work in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dashboard Linked</CardTitle>
            <Share className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentStats.linkedToDashboard}</div>
            <p className="text-xs text-muted-foreground">Student accessible</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manage">Manage Content</TabsTrigger>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="formats">Content Formats</TabsTrigger>
          <TabsTrigger value="analytics">Content Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="manage" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Content Management</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-48"
                    />
                  </div>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">All Types</option>
                    {contentTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm"
                  >
                    <option value="all">All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContent.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{item.title}</h3>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <Badge className={getDifficultyColor(item.difficulty)}>
                              {item.difficulty}
                            </Badge>
                            {item.linkedStudentDashboard && (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Dashboard Linked
                              </Badge>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <span className="text-gray-500">Subject:</span>
                              <span className="font-medium ml-1">{item.subject}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Topic:</span>
                              <span className="font-medium ml-1">{item.topic}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Views:</span>
                              <span className="font-medium ml-1">{item.views.toLocaleString()}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Engagement:</span>
                              <span className="font-medium ml-1">{item.engagementScore}%</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Created by {item.createdBy} on {item.createdDate}</span>
                            <span>Last modified: {item.lastModified}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <div className="flex gap-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => linkToDashboard(item.id)}
                          >
                            {item.linkedStudentDashboard ? 'Unlink' : 'Link to Dashboard'}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <select
                          value={item.status}
                          onChange={(e) => updateContentStatus(item.id, e.target.value as ContentItem['status'])}
                          className="px-2 py-1 border rounded text-xs"
                        >
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="review">Review</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contentTypes.map((type) => (
                  <div key={type.value} className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        {type.icon}
                      </div>
                      <h3 className="font-semibold">{type.label}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Create new {type.label.toLowerCase()} for student learning
                    </p>
                    <Button className="w-full" onClick={() => toast({ title: `Creating ${type.label}...` })}>
                      <Plus className="mr-2 h-4 w-4" />
                      Create {type.label}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Supported Content Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Interactive Formats</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Cube className="h-4 w-4 text-blue-500" />
                        <span>3D Models</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Supported</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-purple-500" />
                        <span>Interactive Visualizations</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Supported</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Video className="h-4 w-4 text-red-500" />
                        <span>Video Content</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Supported</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Learning Materials</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-500" />
                        <span>Concept Cards</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-500" />
                        <span>Flashcards</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-orange-500" />
                        <span>Practice Exams</span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Top Performing Content</h3>
                  {contentItems
                    .sort((a, b) => b.engagementScore - a.engagementScore)
                    .slice(0, 3)
                    .map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">#{index + 1}</span>
                          {getTypeIcon(item.type)}
                          <span className="text-sm">{item.title}</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          {item.engagementScore}%
                        </Badge>
                      </div>
                    ))
                  }
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Subject Distribution</h3>
                  {subjects.map(subject => {
                    const count = contentItems.filter(item => item.subject === subject).length;
                    const percentage = (count / contentItems.length) * 100;
                    return (
                      <div key={subject} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{subject}</span>
                          <span>{count} items</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold">Usage Statistics</h3>
                  <div className="space-y-3">
                    <div className="text-center p-4 border rounded">
                      <div className="text-2xl font-bold text-blue-600">
                        {contentItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">Total Views</div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <div className="text-2xl font-bold text-green-600">
                        {(contentItems.reduce((sum, item) => sum + item.engagementScore, 0) / contentItems.length).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-500">Avg Engagement</div>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <div className="text-2xl font-bold text-purple-600">
                        {contentStats.linkedToDashboard}
                      </div>
                      <div className="text-sm text-gray-500">Dashboard Linked</div>
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

export default InteractiveContentManagement;
