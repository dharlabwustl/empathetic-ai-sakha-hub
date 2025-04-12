
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText,
  MoveRight, 
  PlusCircle,
  Tag,
  Book,
  FileSpreadsheet,
  GraduationCap
} from "lucide-react";

import ContentUploader from "./content/ContentUploader";
import ContentBrowser from "./content/ContentBrowser";
import { useContentManagement } from "@/hooks/admin/useContentManagement";

const ContentManagementTab = () => {
  const { toast } = useToast();
  const { 
    uploading, 
    uploadProgress, 
    selectedFile, 
    uploadedFiles, 
    searchTerm,
    currentTab,
    filteredFiles,
    handleFileSelect,
    handleFileRemove,
    handleUpload,
    setSearchTerm,
    setCurrentTab
  } = useContentManagement();

  const handleTagManagement = () => {
    toast({
      title: "Tag Management",
      description: "Tag management feature opened."
    });
  };

  const handlePromptTuning = () => {
    toast({
      title: "Prompt Tuning",
      description: "GPT Prompt tuning dialog opened."
    });
  };

  const handleContentGeneration = () => {
    toast({
      title: "Content Generation",
      description: "AI content generation initialized."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Content Management System</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage study materials, syllabi, practice exams, and other content resources
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTagManagement}>
            <Tag size={16} className="mr-2" />
            Manage Tags
          </Button>
          <Button variant="outline" onClick={handlePromptTuning}>
            <MoveRight size={16} className="mr-2" />
            Tune GPT Prompts
          </Button>
          <Button onClick={handleContentGeneration}>
            <PlusCircle size={16} className="mr-2" />
            Generate Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="study-material" onValueChange={setCurrentTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="study-material" className="flex items-center gap-1">
              <FileText size={16} />
              <span>Study Materials</span>
            </TabsTrigger>
            <TabsTrigger value="syllabus" className="flex items-center gap-1">
              <Book size={16} />
              <span>Syllabus</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-1">
              <FileSpreadsheet size={16} />
              <span>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="exam-material" className="flex items-center gap-1">
              <GraduationCap size={16} />
              <span>Exam Material</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <FileText size={16} />
              <span>All</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="study-material" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Study Materials</CardTitle>
              <CardDescription>Upload and manage study notes, reference materials, and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentUploader 
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                selectedFile={selectedFile}
                onFileRemove={handleFileRemove}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="syllabus" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Syllabus</CardTitle>
              <CardDescription>Upload and manage exam syllabi and curriculum materials</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentUploader 
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                selectedFile={selectedFile}
                onFileRemove={handleFileRemove}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Practice Materials</CardTitle>
              <CardDescription>Upload and manage practice tests, question banks, and worksheets</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentUploader 
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                selectedFile={selectedFile}
                onFileRemove={handleFileRemove}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exam-material" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Exam Materials</CardTitle>
              <CardDescription>Upload and manage previous year papers, sample papers, and exam resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentUploader 
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                selectedFile={selectedFile}
                onFileRemove={handleFileRemove}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Content</CardTitle>
              <CardDescription>View and manage all uploaded content</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagementTab;
