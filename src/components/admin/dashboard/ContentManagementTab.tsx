
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Upload, FileType, BookOpen } from "lucide-react";
import ContentList from "@/components/admin/dashboard/ContentList";
import ContentUploader from "@/components/admin/dashboard/ContentUploader";
import { useToast } from "@/hooks/use-toast";

const ContentManagementTab = () => {
  const [activeTab, setActiveTab] = useState("all");
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
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploading(false);
            setShowUploader(false);
            setSelectedFile(null);
            setUploadProgress(0);
            toast({
              title: "Upload completed!",
              description: `${selectedFile.name} has been uploaded successfully.`
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
      {/* Actions header */}
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
      
      {/* Uploader section */}
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
      
      {/* Content tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full flex overflow-x-auto">
          <TabsTrigger value="all" className="flex-1">All Content</TabsTrigger>
          <TabsTrigger value="study_materials" className="flex-1">Study Materials</TabsTrigger>
          <TabsTrigger value="concept_cards" className="flex-1">Concept Cards</TabsTrigger>
          <TabsTrigger value="flashcards" className="flex-1">Flashcards</TabsTrigger>
          <TabsTrigger value="practice_exams" className="flex-1">Practice Exams</TabsTrigger>
          <TabsTrigger value="quizzes" className="flex-1">Quizzes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ContentList contentType="all" />
        </TabsContent>
        <TabsContent value="study_materials">
          <ContentList contentType="study_materials" />
        </TabsContent>
        <TabsContent value="concept_cards">
          <ContentList contentType="concept_cards" />
        </TabsContent>
        <TabsContent value="flashcards">
          <ContentList contentType="flashcards" />
        </TabsContent>
        <TabsContent value="practice_exams">
          <ContentList contentType="practice_exams" />
        </TabsContent>
        <TabsContent value="quizzes">
          <ContentList contentType="quizzes" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagementTab;
