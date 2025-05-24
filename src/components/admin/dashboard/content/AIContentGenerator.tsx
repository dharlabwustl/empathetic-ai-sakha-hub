
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Brain, 
  Zap, 
  Download,
  Eye,
  Trash2,
  Save,
  RefreshCw,
  CheckCircle
} from 'lucide-react';

interface GeneratedContent {
  id: string;
  title: string;
  type: 'concept-card' | 'flashcard' | 'exam' | 'formula';
  format: 'text' | 'visual' | 'interactive' | '3d' | 'video';
  subject: string;
  exam: string;
  content: string;
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'generated' | 'reviewed' | 'approved' | 'rejected';
  createdAt: Date;
}

const AIContentGenerator = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  
  // Form states
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [contentFormats, setContentFormats] = useState<string[]>([]);
  const [customPrompt, setCustomPrompt] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('medium');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleContentTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setContentTypes([...contentTypes, type]);
    } else {
      setContentTypes(contentTypes.filter(t => t !== type));
    }
  };

  const handleFormatChange = (format: string, checked: boolean) => {
    if (checked) {
      setContentFormats([...contentFormats, format]);
    } else {
      setContentFormats(contentFormats.filter(f => f !== format));
    }
  };

  const handleUploadAndGenerate = async () => {
    if (!selectedExam || !selectedSubject || contentTypes.length === 0 || selectedFiles.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields and upload files.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate file upload
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploading(false);
          startContentGeneration();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const startContentGeneration = async () => {
    setGenerating(true);
    setGenerationProgress(0);

    toast({
      title: "AI Processing Started",
      description: "Analyzing uploaded materials and generating content...",
    });

    // Simulate AI content generation
    const generationInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(generationInterval);
          setGenerating(false);
          generateMockContent();
          return 100;
        }
        return prev + 5;
      });
    }, 300);
  };

  const generateMockContent = () => {
    const mockContent: GeneratedContent[] = [];
    const contentTypeMap = {
      'concept-card': 'Concept Card',
      'flashcard': 'Flashcard',
      'exam': 'Practice Exam',
      'formula': 'Formula Sheet'
    };

    contentTypes.forEach((type, index) => {
      contentFormats.forEach((format, formatIndex) => {
        mockContent.push({
          id: `generated-${index}-${formatIndex}`,
          title: `${contentTypeMap[type as keyof typeof contentTypeMap]} - ${selectedSubject} ${format}`,
          type: type as any,
          format: format as any,
          subject: selectedSubject,
          exam: selectedExam,
          content: `AI generated ${type} content for ${selectedSubject} in ${format} format...`,
          tags: [selectedSubject.toLowerCase(), selectedExam.toLowerCase(), type, format],
          difficulty: difficultyLevel as any,
          status: 'generated',
          createdAt: new Date()
        });
      });
    });

    setGeneratedContent(mockContent);
    
    toast({
      title: "Content Generation Complete",
      description: `Generated ${mockContent.length} pieces of content. Review and approve before adding to repository.`,
    });
  };

  const handleContentAction = (contentId: string, action: 'approve' | 'reject' | 'edit') => {
    setGeneratedContent(prev => 
      prev.map(content => 
        content.id === contentId 
          ? { ...content, status: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : content.status }
          : content
      )
    );

    toast({
      title: `Content ${action}d`,
      description: `Content has been ${action}d and ${action === 'approve' ? 'added to repository' : 'marked for revision'}.`,
    });
  };

  const approvedContent = generatedContent.filter(c => c.status === 'approved');
  const pendingContent = generatedContent.filter(c => c.status === 'generated');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Content Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upload">Upload & Configure</TabsTrigger>
              <TabsTrigger value="generate">Generate Content</TabsTrigger>
              <TabsTrigger value="review">Review & Approve</TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exam">Target Exam</Label>
                  <Select value={selectedExam} onValueChange={setSelectedExam}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="iit-jee">IIT JEE</SelectItem>
                      <SelectItem value="neet">NEET</SelectItem>
                      <SelectItem value="upsc">UPSC</SelectItem>
                      <SelectItem value="cat">CAT</SelectItem>
                      <SelectItem value="gate">GATE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Content Types to Generate</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['concept-card', 'flashcard', 'exam', 'formula'].map(type => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={contentTypes.includes(type)}
                        onChange={(e) => handleContentTypeChange(type, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm capitalize">{type.replace('-', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Content Formats</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {['text', 'visual', 'interactive', '3d', 'video'].map(format => (
                    <label key={format} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={contentFormats.includes(format)}
                        onChange={(e) => handleFormatChange(format, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm capitalize">{format}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="files">Upload Reference Materials</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  accept=".pdf,.docx,.pptx,.txt,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                />
                <p className="text-xs text-gray-500">
                  Upload PDFs, documents, images, or other reference materials (max 50MB each)
                </p>
              </div>

              {selectedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Files ({selectedFiles.length})</Label>
                  <div className="space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="prompt">Custom Instructions (Optional)</Label>
                <Textarea
                  id="prompt"
                  placeholder="Provide specific instructions for content generation..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="generate" className="space-y-4">
              <div className="text-center space-y-4">
                {!uploading && !generating && generatedContent.length === 0 && (
                  <div>
                    <Button 
                      onClick={handleUploadAndGenerate}
                      size="lg"
                      className="flex items-center gap-2"
                    >
                      <Zap className="h-4 w-4" />
                      Start AI Content Generation
                    </Button>
                    <p className="text-sm text-gray-500 mt-2">
                      Upload files and generate content using AI
                    </p>
                  </div>
                )}

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Upload className="h-4 w-4 animate-pulse" />
                      <span>Uploading files...</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full max-w-md mx-auto" />
                  </div>
                )}

                {generating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Brain className="h-4 w-4 animate-pulse text-purple-600" />
                      <span>AI is generating content...</span>
                    </div>
                    <Progress value={generationProgress} className="w-full max-w-md mx-auto" />
                    <p className="text-xs text-gray-500">
                      Analyzing materials and creating {contentTypes.length} content types in {contentFormats.length} formats
                    </p>
                  </div>
                )}

                {generatedContent.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-medium">Content generation completed!</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{generatedContent.length}</div>
                        <div className="text-xs text-gray-500">Total Generated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{approvedContent.length}</div>
                        <div className="text-xs text-gray-500">Approved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{pendingContent.length}</div>
                        <div className="text-xs text-gray-500">Pending Review</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="review" className="space-y-4">
              {generatedContent.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No content generated yet. Go to the Generate tab to create content.
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedContent.map((content) => (
                    <Card key={content.id} className="relative">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{content.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline">{content.type}</Badge>
                              <Badge variant="outline">{content.format}</Badge>
                              <Badge variant="outline">{content.difficulty}</Badge>
                              <Badge 
                                className={
                                  content.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  content.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }
                              >
                                {content.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-3">{content.content}</p>
                        <div className="flex items-center gap-2 mb-3">
                          {content.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        {content.status === 'generated' && (
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleContentAction(content.id, 'approve')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleContentAction(content.id, 'edit')}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleContentAction(content.id, 'reject')}
                              className="text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIContentGenerator;
