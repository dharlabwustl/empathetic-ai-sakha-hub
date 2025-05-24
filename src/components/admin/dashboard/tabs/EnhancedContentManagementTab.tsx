
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Upload, Brain, Tag, FileText, Zap, Eye, Edit, Trash2, Download } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  type: 'concept-card' | 'flashcard' | 'exam' | 'formula' | 'video' | 'document';
  subject: string;
  exam: string;
  difficulty: 'easy' | 'medium' | 'hard';
  format: 'text' | 'visual' | 'interactive' | '3d' | 'video';
  tags: string[];
  status: 'draft' | 'review' | 'approved' | 'archived';
  createdDate: string;
  aiGenerated: boolean;
  usage: number;
}

interface ContentTag {
  id: string;
  name: string;
  category: string;
  count: number;
}

const EnhancedContentManagementTab = () => {
  const { toast } = useToast();
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      type: 'concept-card',
      subject: 'Physics',
      exam: 'IIT-JEE',
      difficulty: 'medium',
      format: 'interactive',
      tags: ['mechanics', 'fundamental-laws', 'jee-important'],
      status: 'approved',
      createdDate: '2024-01-20',
      aiGenerated: true,
      usage: 567
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      type: 'flashcard',
      subject: 'Chemistry',
      exam: 'NEET',
      difficulty: 'hard',
      format: 'visual',
      tags: ['organic', 'reactions', 'neet-essential'],
      status: 'review',
      createdDate: '2024-01-19',
      aiGenerated: true,
      usage: 234
    }
  ]);

  const [tags, setTags] = useState<ContentTag[]>([
    { id: '1', name: 'mechanics', category: 'physics', count: 45 },
    { id: '2', name: 'organic', category: 'chemistry', count: 67 },
    { id: '3', name: 'jee-important', category: 'exam', count: 123 },
    { id: '4', name: 'neet-essential', category: 'exam', count: 89 }
  ]);

  const [uploadSettings, setUploadSettings] = useState({
    autoTag: true,
    autoGenerate: true,
    qualityCheck: true,
    duplicateCheck: true
  });

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [generationSettings, setGenerationSettings] = useState({
    exam: '',
    subject: '',
    difficulty: 'medium',
    format: 'concept-card',
    targetFormat: 'interactive'
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAIGeneration = () => {
    if (!selectedFile || !generationSettings.exam || !generationSettings.subject) {
      toast({
        title: "Missing Information",
        description: "Please upload a file and select exam and subject",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "AI Content Generation Started",
      description: "Analyzing uploaded material and generating content...",
    });

    // Simulate AI generation process
    setTimeout(() => {
      const newContent: ContentItem = {
        id: Date.now().toString(),
        title: `AI Generated - ${selectedFile.name}`,
        type: generationSettings.format as any,
        subject: generationSettings.subject,
        exam: generationSettings.exam,
        difficulty: generationSettings.difficulty as any,
        format: generationSettings.targetFormat as any,
        tags: ['ai-generated', 'new-content'],
        status: 'review',
        createdDate: new Date().toISOString().split('T')[0],
        aiGenerated: true,
        usage: 0
      };

      setContentItems([newContent, ...contentItems]);
      setIsUploadDialogOpen(false);
      setSelectedFile(null);

      toast({
        title: "Content Generated Successfully",
        description: `Created ${generationSettings.format} from uploaded material`,
      });
    }, 3000);
  };

  const handleApproveContent = (contentId: string) => {
    setContentItems(contentItems.map(item => 
      item.id === contentId ? { ...item, status: 'approved' } : item
    ));
    
    toast({
      title: "Content Approved",
      description: "Content has been approved and is now live",
    });
  };

  const handleTagContent = (contentId: string, newTags: string[]) => {
    setContentItems(contentItems.map(item => 
      item.id === contentId ? { ...item, tags: [...item.tags, ...newTags] } : item
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const exportContentData = () => {
    const data = {
      content: contentItems,
      tags: tags,
      exportDate: new Date().toISOString(),
      totalItems: contentItems.length
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'content-repository.json';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Content repository data has been exported",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Enhanced Content Management</h2>
          <p className="text-gray-600">AI-driven content generation and centralized repository</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportContentData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload & Generate
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>AI Content Generation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Upload Reference Material</Label>
                  <Input type="file" onChange={handleFileUpload} accept=".pdf,.docx,.txt,.pptx" />
                  <p className="text-xs text-gray-500 mt-1">
                    Supported: PDF, DOCX, TXT, PPTX (max 10MB)
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Exam</Label>
                    <Select value={generationSettings.exam} onValueChange={(value) => 
                      setGenerationSettings({ ...generationSettings, exam: value })
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select exam" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IIT-JEE">IIT-JEE</SelectItem>
                        <SelectItem value="NEET">NEET</SelectItem>
                        <SelectItem value="UPSC">UPSC</SelectItem>
                        <SelectItem value="CAT">CAT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Subject</Label>
                    <Select value={generationSettings.subject} onValueChange={(value) => 
                      setGenerationSettings({ ...generationSettings, subject: value })
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Content Type</Label>
                    <Select value={generationSettings.format} onValueChange={(value) => 
                      setGenerationSettings({ ...generationSettings, format: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concept-card">Concept Cards</SelectItem>
                        <SelectItem value="flashcard">Flashcards</SelectItem>
                        <SelectItem value="exam">Practice Exam</SelectItem>
                        <SelectItem value="formula">Formula Sheet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Format</Label>
                    <Select value={generationSettings.targetFormat} onValueChange={(value) => 
                      setGenerationSettings({ ...generationSettings, targetFormat: value })
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="visual">Visual</SelectItem>
                        <SelectItem value="interactive">Interactive</SelectItem>
                        <SelectItem value="3d">3D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button onClick={handleAIGeneration} className="w-full">
                  <Brain className="mr-2 h-4 w-4" />
                  Generate Content with AI
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="repository" className="w-full">
        <TabsList>
          <TabsTrigger value="repository">Content Repository</TabsTrigger>
          <TabsTrigger value="tags">Tag Management</TabsTrigger>
          <TabsTrigger value="analytics">AI Analytics</TabsTrigger>
          <TabsTrigger value="settings">Generation Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="repository">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Centralized Content Repository
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>AI Generated</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {item.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {item.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{item.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.aiGenerated ? (
                          <Badge className="bg-blue-100 text-blue-800">
                            <Brain className="mr-1 h-3 w-3" />
                            AI
                          </Badge>
                        ) : (
                          <span className="text-gray-500">Manual</span>
                        )}
                      </TableCell>
                      <TableCell>{item.usage}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          {item.status === 'review' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleApproveContent(item.id)}
                            >
                              ✓
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5" />
                Content Tagging System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input placeholder="Add new tag..." />
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="subject">Subject</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="difficulty">Difficulty</SelectItem>
                      <SelectItem value="format">Format</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Add Tag</Button>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {tags.map((tag) => (
                    <div key={tag.id} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">{tag.name}</Badge>
                        <span className="text-sm text-gray-500">{tag.count}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{tag.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Generated Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {contentItems.filter(item => item.aiGenerated).length}
                </div>
                <p className="text-sm text-gray-600">
                  {Math.round((contentItems.filter(item => item.aiGenerated).length / contentItems.length) * 100)}% of total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {contentItems.filter(item => item.status === 'review').length}
                </div>
                <p className="text-sm text-gray-600">Items awaiting approval</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Total Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {contentItems.reduce((sum, item) => sum + item.usage, 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Content interactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {new Set(contentItems.map(item => item.format)).size}
                </div>
                <p className="text-sm text-gray-600">Different formats available</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>AI Generation Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label>Default Difficulty Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Content Quality Threshold</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High (95%+)</SelectItem>
                        <SelectItem value="medium">Medium (85%+)</SelectItem>
                        <SelectItem value="low">Low (75%+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label>AI Model Configuration</Label>
                  <Textarea placeholder="Enter custom AI model parameters..." />
                </div>
                
                <Button className="w-full">
                  <Zap className="mr-2 h-4 w-4" />
                  Save AI Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedContentManagementTab;
