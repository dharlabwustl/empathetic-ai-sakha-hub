
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
  );
};

export default ContentManagementHeader;
