
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Tag, X, Download } from "lucide-react";
import { ContentUploaderProps } from "@/types/content";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CustomProgress } from "@/components/ui/custom-progress";

const ContentUploader = ({ 
  handleFileSelect, 
  handleUpload, 
  selectedFile, 
  onFileRemove,
  uploading, 
  uploadProgress 
}: ContentUploaderProps) => {
  const { toast } = useToast();
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [contentType, setContentType] = useState("");
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("");

  const addTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const simulateHandleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Upload Error",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    if (!contentType || !subject || !examType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required metadata fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Upload Started",
      description: "Processing your content upload...",
      variant: "default"
    });

    // Simulate the upload process
    handleUpload();

    // Simulate successful upload after progress completes
    setTimeout(() => {
      toast({
        title: "Upload Successful",
        description: `${selectedFile.name} has been uploaded and tagged successfully for ${examType} - ${subject}`,
        variant: "default"
      });
    }, 2500);
  };
  
  const handleGenerateDocumentation = () => {
    toast({
      title: "Generating Documentation",
      description: "Creating comprehensive documentation for the uploaded content...",
      variant: "default"
    });
    
    setTimeout(() => {
      toast({
        title: "Documentation Created",
        description: "Documentation has been successfully generated and is ready for download",
        variant: "default"
      });
    }, 1800);
  };

  return (
    <div className="mb-6 p-6 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-slate-900/50">
      <div className="text-center mb-4">
        <Upload className="mx-auto h-12 w-12 text-purple-400" />
        <h3 className="mt-2 text-lg font-semibold">Upload Content</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drag and drop files or click to browse
        </p>
      </div>
      
      <div className="mt-6">
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={handleFileSelect}
        />
        <label 
          htmlFor="fileUpload" 
          className="block w-full cursor-pointer mb-6 bg-gray-100 dark:bg-gray-800 p-3 rounded text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Browse Files
        </label>
        
        {selectedFile && (
          <Card className="p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-medium">Selected File</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add metadata to your content</p>
              </div>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={onFileRemove}
                className="h-8 gap-1"
              >
                <X size={14} />
                Remove
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-4 flex justify-between items-center">
              <div className="truncate">
                <p className="font-medium truncate">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="mb-1 block">Content Type *</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="study_material">Study Material</SelectItem>
                    <SelectItem value="practice_exam">Practice Exam</SelectItem>
                    <SelectItem value="syllabus">Syllabus</SelectItem>
                    <SelectItem value="question_bank">Question Bank</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                    <SelectItem value="reference">Reference Material</SelectItem>
                    <SelectItem value="previous_papers">Previous Year Papers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">Subject *</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="computer_science">Computer Science</SelectItem>
                    <SelectItem value="general_knowledge">General Knowledge</SelectItem>
                    <SelectItem value="social_sciences">Social Sciences</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="polity">Polity</SelectItem>
                    <SelectItem value="economics">Economics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">For Exam Type *</Label>
                <Select value={examType} onValueChange={setExamType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upsc">UPSC</SelectItem>
                    <SelectItem value="jee">JEE Main</SelectItem>
                    <SelectItem value="jee_advanced">JEE Advanced</SelectItem>
                    <SelectItem value="neet">NEET</SelectItem>
                    <SelectItem value="cat">CAT</SelectItem>
                    <SelectItem value="gmat">GMAT</SelectItem>
                    <SelectItem value="gate">GATE</SelectItem>
                    <SelectItem value="clat">CLAT</SelectItem>
                    <SelectItem value="cuet">CUET</SelectItem>
                    <SelectItem value="gre">GRE</SelectItem>
                    <SelectItem value="ugc_net">UGC NET</SelectItem>
                    <SelectItem value="bank_exams">Banking</SelectItem>
                    <SelectItem value="ssc">SSC</SelectItem>
                    <SelectItem value="state_psc">State PSCs</SelectItem>
                    <SelectItem value="defense">Defense Exams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">Add Tags</Label>
                <div className="flex gap-2">
                  <Input 
                    value={currentTag} 
                    onChange={e => setCurrentTag(e.target.value)} 
                    onKeyDown={e => e.key === 'Enter' && addTag()}
                    placeholder="Enter tag and press Enter" 
                  />
                  <Button type="button" size="sm" onClick={addTag} className="bg-purple-600 hover:bg-purple-700">
                    <Tag size={16} />
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X 
                          size={12} 
                          className="cursor-pointer" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
        
        {uploading && (
          <div className="w-full mb-4">
            <CustomProgress 
              value={uploadProgress} 
              className="h-2.5" 
              indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-600"
            />
            <p className="text-center text-sm mt-1 text-gray-600">Uploading... {uploadProgress}%</p>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={simulateHandleUpload} 
            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700" 
            disabled={!selectedFile || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Content
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              toast({
                title: "AI Content Generation",
                description: "Opening AI content generation panel",
                variant: "default"
              });
            }}
          >
            Generate with AI
          </Button>
        </div>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2"
            onClick={handleGenerateDocumentation}
          >
            <Download size={16} />
            Generate & Download Documentation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentUploader;
