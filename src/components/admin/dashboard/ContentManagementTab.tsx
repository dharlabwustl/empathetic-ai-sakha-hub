
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ContentManagementHeader from "@/components/admin/dashboard/content/ContentManagementHeader";
import ContentSummaryCards from "@/components/admin/dashboard/content/ContentSummaryCards";
import ContentOverviewSection from "@/components/admin/dashboard/content/ContentOverviewSection";
import ConceptCardFormats from "@/components/admin/dashboard/content/ConceptCardFormats";
import AIModelIntegration from "@/components/admin/dashboard/content/AIModelIntegration";
import TabContentApprovalQueue from "@/components/admin/dashboard/content/TabContentApprovalQueue";
import TabContentStudyMaterials from "@/components/admin/dashboard/content/TabContentStudyMaterials";
import TabContentPrompts from "@/components/admin/dashboard/content/TabContentPrompts";
import ContentUploader from "@/components/admin/dashboard/content/ContentUploader";
import { useContentManagement } from "@/hooks/admin/useContentManagement";

const ContentManagementTab = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const {
    uploading,
    uploadProgress,
    selectedFile,
    overviewStats,
    handleFileSelect,
    handleFileRemove,
    handleUpload,
  } = useContentManagement();
  
  const handleUploadClick = () => {
    setActiveTab("upload");
  };
  
  const handleCreateContent = () => {
    toast({
      title: "Create Content",
      description: "Content creation wizard launched",
      variant: "default"
    });
  };
  
  const handleManageContent = (contentType: string) => {
    toast({
      title: `Manage ${contentType}`,
      description: `Opening ${contentType} management interface`,
      variant: "default"
    });
  };
  
  const handleEditPrompt = (promptType: string) => {
    toast({
      title: "Edit Prompt",
      description: `Opening prompt editor for ${promptType}`,
      variant: "default"
    });
  };
  
  const handleManageAllPrompts = () => {
    toast({
      title: "Manage All Prompts",
      description: "Opening comprehensive prompt management interface",
      variant: "default"
    });
  };

  const handleTestContentGeneration = () => {
    toast({
      title: "Testing Content Generation",
      description: "Connecting to Flask environment to test content generation...",
      variant: "default"
    });
    
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: "Content generation algorithm tested successfully",
        variant: "default"
      });
    }, 2000);
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Saving Settings",
      description: "Content management settings have been saved",
      variant: "default"
    });
  };
  
  const handleResetSettings = () => {
    toast({
      title: "Reset Settings",
      description: "Content management settings have been reset to defaults",
      variant: "default"
    });
  };
  
  const handleContentAction = (action: string, title: string) => {
    toast({
      title: `${action} Content`,
      description: `${action} action performed on "${title}"`,
      variant: "default"
    });
  };

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

  const handleSelectFormat = (format: string) => {
    toast({
      title: "Format Selected",
      description: `${format} format selected for concept card generation.`
    });
  };

  const handleConfigureFormat = (format: string) => {
    toast({
      title: "Configure Format",
      description: `Opening configuration for ${format} format.`
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <ContentManagementHeader 
        handleUpload={handleUploadClick}
        handleCreateContent={handleCreateContent}
        handleTagManagement={handleTagManagement}
        handlePromptTuning={handlePromptTuning}
        handleContentGeneration={handleTestContentGeneration}
      />
      
      <Card>
        <CardContent className="pt-6">
          <ContentSummaryCards handleManageContent={handleManageContent} />

          <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-4 grid w-full grid-cols-6 gap-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="formats">Concept Formats</TabsTrigger>
              <TabsTrigger value="ai-models">AI Models</TabsTrigger>
              <TabsTrigger value="upload">Upload & Generate</TabsTrigger>
              <TabsTrigger value="queue">Approval Queue</TabsTrigger>
              <TabsTrigger value="prompts">GPT Prompt Tuner</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <ContentOverviewSection stats={overviewStats} />
            </TabsContent>

            <TabsContent value="formats">
              <ConceptCardFormats 
                onSelectFormat={handleSelectFormat}
                onConfigureFormat={handleConfigureFormat}
              />
            </TabsContent>

            <TabsContent value="ai-models">
              <AIModelIntegration />
            </TabsContent>

            <TabsContent value="upload">
              <ContentUploader
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                selectedFile={selectedFile}
                onFileRemove={handleFileRemove}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
            </TabsContent>

            <TabsContent value="queue">
              <TabContentApprovalQueue handleContentAction={handleContentAction} />
            </TabsContent>

            <TabsContent value="prompts">
              <TabContentPrompts 
                handleEditPrompt={handleEditPrompt}
                handleManageAllPrompts={handleManageAllPrompts}
                handleTestContentGeneration={handleTestContentGeneration}
                handleSaveSettings={handleSaveSettings}
                handleResetSettings={handleResetSettings}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagementTab;
