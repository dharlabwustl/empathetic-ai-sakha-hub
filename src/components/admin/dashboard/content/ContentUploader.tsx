
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { X, Upload, File, Check } from "lucide-react";
import { ContentUploaderProps, ContentType } from "@/types/content";

export const ContentUploader: React.FC<ContentUploaderProps> = ({
  handleFileSelect,
  handleUpload,
  selectedFile,
  onFileRemove,
  uploading,
  uploadProgress
}) => {
  const [contentType, setContentType] = React.useState<ContentType>("study_material");
  const [subject, setSubject] = React.useState<string>("");
  const [examGoal, setExamGoal] = React.useState<string>("");
  const [difficultyLevel, setDifficultyLevel] = React.useState<string>("intermediate");
  const [generateAdditional, setGenerateAdditional] = React.useState<boolean>(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Upload Content</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="contentType">Content Type</Label>
          <Select
            value={contentType}
            onValueChange={(value) => setContentType(value as ContentType)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="study_material">Study Material</SelectItem>
              <SelectItem value="syllabus">Syllabus</SelectItem>
              <SelectItem value="exam">Exam</SelectItem>
              <SelectItem value="previous_papers">Previous Year Papers</SelectItem>
              <SelectItem value="notes">Notes</SelectItem>
              <SelectItem value="reference">Reference Material</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="physics">Physics</SelectItem>
              <SelectItem value="chemistry">Chemistry</SelectItem>
              <SelectItem value="mathematics">Mathematics</SelectItem>
              <SelectItem value="biology">Biology</SelectItem>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="social_science">Social Science</SelectItem>
              <SelectItem value="computer_science">Computer Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="examGoal">Exam Goal</Label>
          <Select value={examGoal} onValueChange={setExamGoal}>
            <SelectTrigger>
              <SelectValue placeholder="Select exam goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jee">JEE</SelectItem>
              <SelectItem value="neet">NEET</SelectItem>
              <SelectItem value="jee_advanced">JEE Advanced</SelectItem>
              <SelectItem value="jee_mains">JEE Mains</SelectItem>
              <SelectItem value="cbse">CBSE</SelectItem>
              <SelectItem value="icse">ICSE</SelectItem>
              <SelectItem value="upsc">UPSC</SelectItem>
              <SelectItem value="gate">GATE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="difficultyLevel">Difficulty Level</Label>
          <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="pt-2">
        <Label className="block mb-2">File Upload</Label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          {selectedFile ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded mr-3">
                  <File size={24} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onFileRemove}
                disabled={uploading}
              >
                <X size={16} />
              </Button>
            </div>
          ) : (
            <>
              <Input
                id="fileUpload"
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv"
              />
              <Label
                htmlFor="fileUpload"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-lg font-medium">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mt-1">
                  PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX, TXT, CSV (Max 10MB)
                </p>
              </Label>
            </>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="generateAdditional" 
              className="mr-2"
              checked={generateAdditional}
              onChange={(e) => setGenerateAdditional(e.target.checked)}
            />
            <Label htmlFor="generateAdditional" className="text-sm cursor-pointer">
              Auto-generate additional learning content (Concept Cards, Flashcards, Practice Tests)
            </Label>
          </div>
          
          {uploading ? (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
            </div>
          ) : (
            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || !subject || !examGoal}
              className="w-full"
            >
              {uploadProgress === 100 ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Uploaded Successfully
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload File
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentUploader;
