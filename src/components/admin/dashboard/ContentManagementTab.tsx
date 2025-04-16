
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Upload, FileType, BookOpen } from "lucide-react";
import ContentList from "@/components/admin/dashboard/ContentList";
import ContentUploader from "@/components/admin/dashboard/ContentUploader";
import { useToast } from "@/hooks/use-toast";
import { ContentType } from "@/types/content";

const ContentManagementTab = () => {
  const [activeTab, setActiveTab] = useState<ContentType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState("");
  const [showUploader, setShowUploader] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    setUploading(true);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setShowUploader(false);
            setSelectedFile(null);
            setUploadProgress(0);
            toast({
              title: "Upload completed!",
              description: `${selectedFile.name} has been uploaded successfully.`,
            });
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <form onSubmit={handleSearch} className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </form>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button className="w-full sm:w-auto gap-2 sm:gap-1" onClick={() => setShowUploader(true)}>
            <Plus size={16} className="sm:mr-0" />
            <Upload size={16} className="sm:mr-0" />
            <span>Upload Content</span>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto gap-2 sm:gap-1">
            <FileType size={16} className="sm:mr-0" />
            <BookOpen size={16} className="sm:mr-0" />
            <span>Generate Content</span>
          </Button>
        </div>
      </div>

      {showUploader && (
        <ContentUploader
          handleFileSelect={handleFileSelect}
          handleUpload={handleUpload}
          selectedFile={selectedFile}
          onFileRemove={handleFileRemove}
          uploading={uploading}
          uploadProgress={uploadProgress}
        />
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as ContentType | 'all')}>
        <TabsList className="w-full flex overflow-x-auto">
          <TabsTrigger value="all" className="flex-1">All Content</TabsTrigger>
          <TabsTrigger value="study_material" className="flex-1">Study Materials</TabsTrigger>
          <TabsTrigger value="concept_card" className="flex-1">Concept Cards</TabsTrigger>
          <TabsTrigger value="flashcard" className="flex-1">Flashcards</TabsTrigger>
          <TabsTrigger value="practice_exam" className="flex-1">Practice Exams</TabsTrigger>
          <TabsTrigger value="quiz" className="flex-1">Quizzes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ContentList contentType="all" />
        </TabsContent>
        <TabsContent value="study_material">
          <ContentList contentType="study_material" />
        </TabsContent>
        <TabsContent value="concept_card">
          <ContentList contentType="concept_card" />
        </TabsContent>
        <TabsContent value="flashcard">
          <ContentList contentType="flashcard" />
        </TabsContent>
        <TabsContent value="practice_exam">
          <ContentList contentType="practice_exam" />
        </TabsContent>
        <TabsContent value="quiz">
          <ContentList contentType="quiz" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagementTab;
