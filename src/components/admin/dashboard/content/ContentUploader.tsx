
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { X, Upload, FileText, FileImage, FileVideo, FileAudio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContentUploaderProps {
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  selectedFile: File | null;
  onFileRemove: () => void;
  uploading: boolean;
  uploadProgress: number;
}

const ContentUploader: React.FC<ContentUploaderProps> = ({
  handleFileSelect,
  handleUpload,
  selectedFile,
  onFileRemove,
  uploading,
  uploadProgress
}) => {
  const { toast } = useToast();
  const [examType, setExamType] = useState("");
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [conceptTag, setConceptTag] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [contentType, setContentType] = useState("");
  const [year, setYear] = useState("");

  const examTypes = [
    "IIT-JEE Main", "IIT-JEE Advanced", "NEET", "UPSC", "CAT", "GATE", 
    "CLAT", "NDA", "AFCAT", "Banking PO", "SSC", "Railway", "NTSE"
  ];

  const subjects = [
    "Physics", "Chemistry", "Mathematics", "Biology", "English", 
    "History", "Geography", "Political Science", "Economics", 
    "Computer Science", "Reasoning", "General Knowledge"
  ];

  const contentTypes = [
    "Syllabus", "Previous Year Question Paper", "Concept Card (Text)", 
    "Concept Card (Visual Diagram)", "Concept Card (3D Model)", 
    "Interactive Flashcard", "Exam", "Formula Practice", 
    "Video Lecture", "Audio Analysis", "Live Interactive Lab"
  ];

  const difficulties = ["Beginner", "Intermediate", "Advanced", "Expert"];

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <FileImage className="h-4 w-4" />;
    if (file.type.startsWith('video/')) return <FileVideo className="h-4 w-4" />;
    if (file.type.startsWith('audio/')) return <FileAudio className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const handleSubmit = () => {
    if (!selectedFile || !examType || !subject || !contentType) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields and select a file",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Processing Upload",
      description: `Processing ${selectedFile.name} for ${contentType} generation...`,
    });

    handleUpload();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Learning Material
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload Section */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="file-upload">Select File</Label>
            <Input
              id="file-upload"
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.mp3,.txt"
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Supported: PDF, DOC, PPT, Images, Videos, Audio (Max 100MB)
            </p>
          </div>

          {selectedFile && (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
              {getFileIcon(selectedFile)}
              <span className="text-sm font-medium">{selectedFile.name}</span>
              <Badge variant="outline">{(selectedFile.size / (1024 * 1024)).toFixed(1)} MB</Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onFileRemove}
                className="ml-auto h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>

        {/* Metadata Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Exam Type *</Label>
            <Select value={examType} onValueChange={setExamType}>
              <SelectTrigger>
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((exam) => (
                  <SelectItem key={exam} value={exam}>{exam}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Subject *</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subj) => (
                  <SelectItem key={subj} value={subj}>{subj}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Topic</Label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic name"
            />
          </div>

          <div>
            <Label>Concept Tag</Label>
            <Input
              value={conceptTag}
              onChange={(e) => setConceptTag(e.target.value)}
              placeholder="Enter concept tags (comma separated)"
            />
          </div>

          <div>
            <Label>Difficulty Level</Label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((diff) => (
                  <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Content Type to Generate *</Label>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                {contentTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Year field for Previous Year Papers */}
        {contentType === "Previous Year Question Paper" && (
          <div>
            <Label>Year</Label>
            <Input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year (e.g., 2023)"
              type="number"
              min="2000"
              max="2024"
            />
          </div>
        )}

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

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit} 
            disabled={uploading || !selectedFile}
            className="gap-2"
          >
            {uploading ? (
              <>Processing...</>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload & Generate Content
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentUploader;
