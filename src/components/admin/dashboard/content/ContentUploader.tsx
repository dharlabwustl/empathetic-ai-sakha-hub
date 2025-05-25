
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, X, Plus } from 'lucide-react';
import { ContentUploaderProps } from "@/types/content";

const ContentUploader: React.FC<ContentUploaderProps> = ({
  handleFileSelect,
  handleUpload,
  selectedFile,
  onFileRemove,
  uploading,
  uploadProgress
}) => {
  const { toast } = useToast();
  const [contentMetadata, setContentMetadata] = useState({
    exam: '',
    subject: '',
    topic: '',
    concept: '',
    difficulty: '',
    contentType: '',
    year: '',
    tags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');

  const examOptions = [
    'IIT-JEE', 'NEET', 'UPSC', 'CAT', 'GATE', 'GMAT', 'GRE', 'IELTS', 'TOEFL'
  ];

  const subjectOptions = [
    'Physics', 'Chemistry', 'Mathematics', 'Biology', 'English', 'History', 
    'Geography', 'Political Science', 'Economics', 'Computer Science'
  ];

  const difficultyLevels = [
    'Beginner', 'Intermediate', 'Advanced', 'Expert'
  ];

  const contentTypes = [
    'Syllabus', 'Previous Year Question Paper', 'Concept Card - Text', 
    'Concept Card - Visual Diagram', 'Concept Card - 3D Model', 
    'Concept Card - Interactive Lab', 'Concept Card - Video', 
    'Interactive Flashcard', 'Exam', 'Formula Sheet', 'Study Material',
    'Practice Questions', 'Mock Test'
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !contentMetadata.tags.includes(newTag.trim())) {
      setContentMetadata(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setContentMetadata(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleMetadataUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    if (!contentMetadata.exam || !contentMetadata.subject || !contentMetadata.contentType) {
      toast({
        title: "Missing required fields",
        description: "Please fill in exam, subject, and content type.",
        variant: "destructive"
      });
      return;
    }

    console.log('Uploading with metadata:', {
      file: selectedFile,
      metadata: contentMetadata
    });

    handleUpload();
    
    toast({
      title: "Upload initiated",
      description: `${selectedFile.name} is being processed with AI content generation.`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Content Upload & AI Generation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload Section */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="fileUpload"
              className="hidden"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.mp4,.mp3"
            />
            <label htmlFor="fileUpload" className="cursor-pointer">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supports: PDF, DOC, DOCX, TXT, JPG, PNG, MP4, MP3
              </p>
            </label>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium">{selectedFile.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onFileRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Metadata Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="exam">Exam *</Label>
            <Select value={contentMetadata.exam} onValueChange={(value) => 
              setContentMetadata(prev => ({ ...prev, exam: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select exam" />
              </SelectTrigger>
              <SelectContent>
                {examOptions.map(exam => (
                  <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Select value={contentMetadata.subject} onValueChange={(value) => 
              setContentMetadata(prev => ({ ...prev, subject: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectOptions.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="Enter topic"
              value={contentMetadata.topic}
              onChange={(e) => setContentMetadata(prev => ({ ...prev, topic: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="concept">Concept</Label>
            <Input
              id="concept"
              placeholder="Enter concept"
              value={contentMetadata.concept}
              onChange={(e) => setContentMetadata(prev => ({ ...prev, concept: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select value={contentMetadata.difficulty} onValueChange={(value) => 
              setContentMetadata(prev => ({ ...prev, difficulty: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficultyLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contentType">Content Type to Generate *</Label>
            <Select value={contentMetadata.contentType} onValueChange={(value) => 
              setContentMetadata(prev => ({ ...prev, contentType: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {contentMetadata.contentType === 'Previous Year Question Paper' && (
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                placeholder="Enter year (e.g., 2023)"
                value={contentMetadata.year}
                onChange={(e) => setContentMetadata(prev => ({ ...prev, year: e.target.value }))}
              />
            </div>
          )}
        </div>

        {/* Tags Section */}
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            />
            <Button variant="outline" size="sm" onClick={handleAddTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {contentMetadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {contentMetadata.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                  {tag} <X className="h-3 w-3 ml-1" />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading and processing...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </div>
        )}

        {/* Upload Button */}
        <Button 
          onClick={handleMetadataUpload}
          disabled={uploading || !selectedFile}
          className="w-full"
        >
          {uploading ? 'Processing...' : 'Upload & Generate AI Content'}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          AI will automatically generate the selected content type based on your uploaded material and metadata.
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentUploader;
