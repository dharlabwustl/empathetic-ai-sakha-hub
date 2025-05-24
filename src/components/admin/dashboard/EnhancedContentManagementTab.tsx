
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, FileText, Tag, Brain, Search, Filter, Plus, 
  Edit, Trash2, Download, BookOpen, Target, Zap 
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'text' | 'video' | 'quiz' | 'flashcard' | 'exam';
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  createdDate: string;
  usage: number;
  rating: number;
}

interface ContentGeneration {
  id: string;
  sourceFile: string;
  targetExam: string;
  targetSubject: string;
  targetFormat: string;
  difficulty: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  generatedItems: number;
}

const EnhancedContentManagementTab: React.FC = () => {
  const { toast } = useToast();
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Quadratic Equations - Complete Guide',
      type: 'text',
      subject: 'Mathematics',
      difficulty: 'medium',
      tags: ['algebra', 'equations', 'JEE'],
      status: 'published',
      createdDate: '2024-01-15',
      usage: 234,
      rating: 4.8
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions Quiz',
      type: 'quiz',
      subject: 'Chemistry',
      difficulty: 'hard',
      tags: ['organic', 'reactions', 'NEET'],
      status: 'published',
      createdDate: '2024-01-14',
      usage: 189,
      rating: 4.6
    },
    {
      id: '3',
      title: 'Physics Motion Flashcards',
      type: 'flashcard',
      subject: 'Physics',
      difficulty: 'easy',
      tags: ['motion', 'kinematics', 'basics'],
      status: 'draft',
      createdDate: '2024-01-13',
      usage: 45,
      rating: 4.2
    }
  ]);

  const [generations, setGenerations] = useState<ContentGeneration[]>([
    {
      id: '1',
      sourceFile: 'JEE_Math_Reference.pdf',
      targetExam: 'JEE Main',
      targetSubject: 'Mathematics',
      targetFormat: 'Quiz',
      difficulty: 'Medium',
      status: 'completed',
      progress: 100,
      generatedItems: 25
    },
    {
      id: '2',
      sourceFile: 'NEET_Biology_Concepts.pdf',
      targetExam: 'NEET',
      targetSubject: 'Biology',
      targetFormat: 'Flashcards',
      difficulty: 'Easy',
      status: 'processing',
      progress: 65,
      generatedItems: 12
    }
  ]);

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredContent = contentItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === 'all' || item.subject === selectedSubject;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const handleUploadForGeneration = () => {
    toast({
      title: "Processing Upload",
      description: "AI is analyzing your reference material for content generation...",
    });

    const newGeneration: ContentGeneration = {
      id: (generations.length + 1).toString(),
      sourceFile: 'Uploaded_Reference.pdf',
      targetExam: 'JEE Main',
      targetSubject: 'Mathematics',
      targetFormat: 'Mixed',
      difficulty: 'Medium',
      status: 'processing',
      progress: 0,
      generatedItems: 0
    };

    setGenerations([...generations, newGeneration]);
    setIsUploadDialogOpen(false);

    // Simulate processing
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setGenerations(prev => prev.map(gen => 
        gen.id === newGeneration.id 
          ? { ...gen, progress, generatedItems: Math.floor(progress / 4) }
          : gen
      ));

      if (progress >= 100) {
        clearInterval(interval);
        setGenerations(prev => prev.map(gen => 
          gen.id === newGeneration.id 
            ? { ...gen, status: 'completed' as const }
            : gen
        ));
        toast({
          title: "Generation Complete",
          description: "25 new content items have been generated successfully!",
        });
      }
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <FileText className="h-4 w-4" />;
      case 'video': return <Upload className="h-4 w-4" />;
      case 'quiz': return <Target className="h-4 w-4" />;
      case 'flashcard': return <BookOpen className="h-4 w-4" />;
      case 'exam': return <Edit className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

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
            <p className="text-xs text-muted-foreground">+15 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contentItems.filter(c => c.status === 'published').length}</div>
            <p className="text-xs text-muted-foreground">Live content items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Usage</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contentItems.reduce((sum, c) => sum + c.usage, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(contentItems.reduce((sum, c) => sum + c.rating, 0) / contentItems.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="repository" className="space-y-4">
        <TabsList>
          <TabsTrigger value="repository">Content Repository</TabsTrigger>
          <TabsTrigger value="generation">AI Generation</TabsTrigger>
          <TabsTrigger value="tagging">Tag Management</TabsTrigger>
        </TabsList>

        <TabsContent value="repository" className="space-y-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search content..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Download size={16} />
                Export
              </Button>
              <Button className="flex items-center gap-2">
                <Plus size={16} />
                Create Content
              </Button>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid gap-4">
            {filteredContent.map((item) => (
              <Card key={item.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        {getTypeIcon(item.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          <span>{item.subject}</span>
                          <span className="capitalize">{item.difficulty}</span>
                          <span>{item.usage} uses</span>
                          <span>★ {item.rating}</span>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {item.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500">
                          Created: {item.createdDate}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="generation" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">AI Content Generation</h3>
              <p className="text-sm text-gray-600">Upload reference materials to generate tailored content</p>
            </div>

            <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Upload size={16} />
                  Upload & Generate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Reference Material</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Upload File</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Drop files here or click to browse
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports PDF, DOC, TXT (Max 10MB)
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label>Target Exam</Label>
                    <Select defaultValue="jee">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jee">JEE Main/Advanced</SelectItem>
                        <SelectItem value="neet">NEET</SelectItem>
                        <SelectItem value="cat">CAT</SelectItem>
                        <SelectItem value="gate">GATE</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Subject</Label>
                    <Select defaultValue="math">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Content Format</Label>
                    <Select defaultValue="mixed">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mixed">Mixed Content</SelectItem>
                        <SelectItem value="quiz">Quizzes Only</SelectItem>
                        <SelectItem value="flashcard">Flashcards Only</SelectItem>
                        <SelectItem value="text">Study Material</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Difficulty Level</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleUploadForGeneration} className="w-full">
                    <Brain className="mr-2 h-4 w-4" />
                    Generate Content
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Generation Status */}
          <div className="space-y-4">
            {generations.map((gen) => (
              <Card key={gen.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium">{gen.sourceFile}</h4>
                      <div className="text-sm text-gray-600">
                        {gen.targetExam} • {gen.targetSubject} • {gen.targetFormat} • {gen.difficulty}
                      </div>
                    </div>
                    <Badge className={getStatusColor(gen.status)}>
                      {gen.status}
                    </Badge>
                  </div>
                  
                  {gen.status === 'processing' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Generating content...</span>
                        <span>{gen.progress}%</span>
                      </div>
                      <Progress value={gen.progress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Generated: {gen.generatedItems} items
                    </div>
                    {gen.status === 'completed' && (
                      <Button variant="outline" size="sm">
                        View Generated Content
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tagging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Tag Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Create new tag..." className="flex-1" />
                  <Button>Add Tag</Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {['algebra', 'geometry', 'calculus', 'physics', 'chemistry', 'biology', 'JEE', 'NEET', 'easy', 'medium', 'hard'].map((tag) => (
                    <Badge key={tag} variant="outline" className="px-3 py-1">
                      {tag}
                      <button className="ml-2 text-red-500 hover:text-red-700">×</button>
                    </Badge>
                  ))}
                </div>
                
                <div className="text-sm text-gray-600">
                  Total tags: 11 • Most used: algebra (45 items)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedContentManagementTab;
