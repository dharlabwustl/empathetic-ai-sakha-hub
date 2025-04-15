import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, Tag, X, Download, FileType, Book, BookOpen, TestTube, FilePlus } from "lucide-react";
import { ContentUploaderProps } from "@/types/content";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CustomProgress } from "@/components/ui/custom-progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [materialType, setMaterialType] = useState("study_material");
  const [currentTab, setCurrentTab] = useState("upload");
  const [generatingContent, setGeneratingContent] = useState(false);
  const [generatedContentType, setGeneratedContentType] = useState("concept_card");

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
  
  const handleGenerateContent = () => {
    if (!examType || !subject) {
      toast({
        title: "Missing Information",
        description: "Please select an exam type and subject to generate content",
        variant: "destructive"
      });
      return;
    }
    
    setGeneratingContent(true);
    toast({
      title: "Generating Content",
      description: `Creating ${generatedContentType} for ${examType} - ${subject}...`,
      variant: "default"
    });
    
    setTimeout(() => {
      setGeneratingContent(false);
      toast({
        title: "Content Generated",
        description: `${generatedContentType} has been created successfully for ${examType} - ${subject}`,
        variant: "default"
      });
    }, 3000);
  };

  return (
    <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 rounded-none">
            <TabsTrigger value="upload" className="rounded-none data-[state=active]:bg-transparent">
              <Upload className="mr-2 h-4 w-4" />
              Upload Content
            </TabsTrigger>
            <TabsTrigger value="generate" className="rounded-none data-[state=active]:bg-transparent">
              <FilePlus className="mr-2 h-4 w-4" />
              Generate Content
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="p-6">
        <TabsContent value="upload" className="mt-0 p-0 border-none">
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
              className="block w-full cursor-pointer mb-6 bg-gray-100 dark:bg-gray-800 p-3 rounded text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-2 border-dashed border-gray-300 dark:border-gray-700"
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
                    <Label className="mb-1 block">Material Type *</Label>
                    <Select value={materialType} onValueChange={setMaterialType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="study_material">Study Material</SelectItem>
                        <SelectItem value="exam_syllabus">Exam Syllabus</SelectItem>
                        <SelectItem value="previous_papers">Previous Year Papers</SelectItem>
                        <SelectItem value="test">Practice Test</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                    <Label className="mb-1 block">Difficulty Level</Label>
                    <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
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
                <p className="text-center text-sm mt-1 text-gray-600 dark:text-gray-400">Uploading... {uploadProgress}%</p>
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
        </TabsContent>
        
        <TabsContent value="generate" className="mt-0 p-0 border-none">
          <div className="text-center mb-6">
            <FilePlus className="mx-auto h-12 w-12 text-indigo-400" />
            <h3 className="mt-2 text-lg font-semibold">Generate Content</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create content resources using AI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <Label className="mb-1 block">Content Type to Generate *</Label>
                <Select value={generatedContentType} onValueChange={setGeneratedContentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concept_card">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} />
                        <span>Concept Cards</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="flashcards">
                      <div className="flex items-center gap-2">
                        <Book size={16} />
                        <span>Flashcards</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="practice_exam">
                      <div className="flex items-center gap-2">
                        <FileType size={16} />
                        <span>Practice Exam</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="quiz">
                      <div className="flex items-center gap-2">
                        <TestTube size={16} />
                        <span>Quiz</span>
                      </div>
                    </SelectItem>
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
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="mb-1 block">Difficulty Level</Label>
                <Select value={difficultyLevel} onValueChange={setDifficultyLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
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
                  <Button type="button" size="sm" onClick={addTag} className="bg-indigo-600 hover:bg-indigo-700">
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
              
              <div>
                <Label className="mb-1 block">Topic (Optional)</Label>
                <Input placeholder="Enter specific topic or leave blank for general content" />
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateContent} 
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white hover:from-indigo-600 hover:to-blue-700"
            disabled={generatingContent}
          >
            {generatingContent ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FilePlus className="mr-2 h-4 w-4" />
                Generate {generatedContentType.replace('_', ' ')}
              </>
            )}
          </Button>
        </TabsContent>
      </div>
    </div>
  );
};

export default ContentUploader;
