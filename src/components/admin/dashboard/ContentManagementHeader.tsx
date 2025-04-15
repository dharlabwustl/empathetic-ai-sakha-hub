import React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus, MoveRight, Tag, PlusCircle } from "lucide-react";

interface ContentManagementHeaderProps {
  handleUpload: () => void;
  handleCreateContent: () => void;
  handleTagManagement: () => void;
  handlePromptTuning: () => void;
  handleContentGeneration: () => void;
}

const ContentManagementHeader = ({
  handleUpload,
  handleCreateContent,
  handleTagManagement,
  handlePromptTuning,
  handleContentGeneration
}: ContentManagementHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
      <div>
        <h2 className="text-2xl font-bold mb-2">Content Management System</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage study materials, syllabi, practice exams, and other content resources
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={handleUpload} className="flex items-center gap-2">
          <Upload size={16} />
          <span>Upload</span>
        </Button>
        
        <Button variant="outline" onClick={handleCreateContent} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Create</span>
        </Button>
        
        <Button variant="outline" onClick={handleTagManagement} className="flex items-center gap-2">
          <Tag size={16} />
          <span>Tags</span>
        </Button>
        
        <Button variant="outline" onClick={handlePromptTuning} className="flex items-center gap-2">
          <MoveRight size={16} />
          <span>Prompts</span>
        </Button>
        
        <Button 
          onClick={handleContentGeneration}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-2"
        >
          <PlusCircle size={16} />
          <span>Generate Content</span>
        </Button>
      </div>
    </div>
  );
};

export default ContentManagementHeader;
