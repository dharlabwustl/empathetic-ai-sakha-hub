
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ContentManagementHeader from "@/components/admin/dashboard/content/ContentManagementHeader";
import ContentSummaryCards from "@/components/admin/dashboard/content/ContentSummaryCards";
import TabContentApprovalQueue from "@/components/admin/dashboard/content/TabContentApprovalQueue";
import TabContentStudyMaterials from "@/components/admin/dashboard/content/TabContentStudyMaterials";
import TabContentPrompts from "@/components/admin/dashboard/content/TabContentPrompts";
import ContentUploader from "@/components/admin/dashboard/content/ContentUploader";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";
import { useContentManagement } from "@/hooks/admin/useContentManagement";

const ContentManagementTab = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("queue");
  const [showUploader, setShowUploader] = useState(false);
  const { dialogState, openDialog, closeDialog } = useActionDialog();
  
  const {
    uploading,
    uploadProgress,
    selectedFile,
    handleFileSelect,
    handleFileRemove,
    handleUpload,
  } = useContentManagement();
  
  const handleUploadClick = () => {
    openDialog('content-upload', 'Upload Content', {
      title: '',
      subject: '',
      topic: '',
      exam: '',
      difficulty: 'Medium',
      formatType: 'PDF',
      tags: '',
      sections: 1,
      description: ''
    });
  };
  
  const handleCreateContent = () => {
    openDialog('create', 'Create New Content', {
      title: '',
      type: 'Study Material',
      subject: '',
      description: '',
      exam: '',
      difficulty: 'Medium'
    });
  };
  
  const handleManageContent = (contentType: string) => {
    openDialog('view', `${contentType} Management`, {
      type: contentType,
      totalItems: Math.floor(Math.random() * 100) + 50,
      pendingApproval: Math.floor(Math.random() * 10) + 1,
      lastUpdated: new Date().toLocaleDateString()
    });
  };
  
  const handleEditPrompt = (promptType: string) => {
    openDialog('ai-settings', `${promptType} Prompt`, {
      modelName: 'GPT-4',
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: `This is the current prompt for ${promptType}...`,
      enableLogging: true,
      enableCache: false
    });
  };
  
  const handleContentAction = (action: string, title: string) => {
    if (action === 'approve' || action === 'reject') {
      openDialog(action as any, title, {
        title: title,
        reason: '',
        feedback: ''
      });
    } else {
      toast({
        title: `${action} Content`,
        description: `${action} action performed on "${title}"`,
        variant: "default"
      });
    }
  };

  const handleTagManagement = () => {
    openDialog('settings', 'Tag Management', {
      totalTags: 45,
      popularTags: ['Physics', 'Mathematics', 'Chemistry'],
      recentlyAdded: 5
    });
  };

  const handlePromptTuning = () => {
    openDialog('ai-settings', 'GPT Prompt Tuning', {
      modelName: 'GPT-4',
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: 'You are an educational content generator...'
    });
  };

  const handleSave = (data: any) => {
    toast({
      title: "Success",
      description: `${data.name || data.title} has been saved successfully.`,
    });
    setShowUploader(false);
  };

  const handleConfirm = () => {
    const actionType = dialogState.type === 'delete' ? 'deleted' : 
                     dialogState.type === 'approve' ? 'approved' : 
                     dialogState.type === 'reject' ? 'rejected' : 'processed';
    toast({
      title: "Success",
      description: `${dialogState.title} has been ${actionType}.`,
      variant: dialogState.type === 'delete' || dialogState.type === 'reject' ? 'destructive' : 'default'
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <>
      <div className="space-y-6">
        <ContentManagementHeader 
          handleUpload={handleUploadClick}
          handleCreateContent={handleCreateContent}
          handleTagManagement={handleTagManagement}
          handlePromptTuning={handlePromptTuning}
          handleContentGeneration={() => {
            toast({
              title: "Testing Content Generation",
              description: "Content generation test initiated successfully.",
            });
          }}
        />
        
        <Card>
          <CardContent className="pt-6">
            <ContentSummaryCards handleManageContent={handleManageContent} />

            <Tabs defaultValue="queue" value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mb-4 grid w-full grid-cols-3 gap-2">
                <TabsTrigger value="queue">Approval Queue</TabsTrigger>
                <TabsTrigger value="studyMaterials">Study Materials</TabsTrigger>
                <TabsTrigger value="prompts">GPT Prompt Tuner</TabsTrigger>
              </TabsList>

              <TabsContent value="queue">
                <TabContentApprovalQueue handleContentAction={handleContentAction} />
              </TabsContent>

              <TabsContent value="studyMaterials">
                <TabContentStudyMaterials 
                  handleUpload={handleUploadClick} 
                  handleContentAction={handleContentAction} 
                />
              </TabsContent>

              <TabsContent value="prompts">
                <TabContentPrompts 
                  handleEditPrompt={handleEditPrompt}
                  handleManageAllPrompts={() => {
                    openDialog('view', 'All Prompts', {
                      totalPrompts: 25,
                      categories: ['Content Generation', 'Quiz Creation', 'Explanation'],
                      lastModified: new Date().toLocaleDateString()
                    });
                  }}
                  handleTestContentGeneration={() => {
                    toast({
                      title: "Testing Content Generation",
                      description: "Content generation test completed successfully.",
                    });
                  }}
                  handleSaveSettings={() => {
                    toast({
                      title: "Settings Saved",
                      description: "Prompt settings have been saved.",
                    });
                  }}
                  handleResetSettings={() => {
                    toast({
                      title: "Settings Reset",
                      description: "Prompt settings have been reset to defaults.",
                    });
                  }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <ActionDialog
        type={dialogState.type!}
        title={dialogState.title}
        data={dialogState.data}
        isOpen={dialogState.isOpen}
        onClose={closeDialog}
        onSave={handleSave}
        onConfirm={handleConfirm}
      />
    </>
  );
};

export default ContentManagementTab;
