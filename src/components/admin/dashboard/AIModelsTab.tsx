
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Settings, Eye, Edit, Play } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ActionDialog from "@/components/admin/dialogs/ActionDialog";
import { useActionDialog } from "@/hooks/useActionDialog";

interface AIModel {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive';
  temperature: number;
  maxTokens: number;
  usage: string;
  lastUpdated: string;
}

const AIModelsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const { dialogState, openDialog, closeDialog } = useActionDialog();

  const mockModels: AIModel[] = [
    {
      id: "model-001",
      name: "Content Generator",
      type: "GPT-4",
      status: "active",
      temperature: 0.7,
      maxTokens: 2000,
      usage: "Content Generation",
      lastUpdated: "2023-10-15"
    },
    {
      id: "model-002",
      name: "Quiz Creator",
      type: "GPT-3.5",
      status: "active", 
      temperature: 0.5,
      maxTokens: 1500,
      usage: "Quiz Generation",
      lastUpdated: "2023-10-14"
    },
    {
      id: "model-003",
      name: "Explanation Bot",
      type: "Claude-3",
      status: "inactive",
      temperature: 0.3,
      maxTokens: 1000,
      usage: "Concept Explanation",
      lastUpdated: "2023-10-10"
    }
  ];

  const filteredModels = mockModels.filter(model => 
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewModel = (model: AIModel) => {
    openDialog('view', model.name, {
      id: model.id,
      name: model.name,
      type: model.type,
      status: model.status,
      temperature: model.temperature,
      maxTokens: model.maxTokens,
      usage: model.usage,
      lastUpdated: model.lastUpdated,
      totalRequests: '15,420',
      averageResponseTime: '2.3s'
    });
  };

  const handleEditModel = (model: AIModel) => {
    openDialog('ai-settings', model.name, {
      modelName: model.type,
      temperature: model.temperature,
      maxTokens: model.maxTokens,
      systemPrompt: `System prompt for ${model.name}...`,
      enableLogging: true,
      enableCache: false
    });
  };

  const handleTestModel = (model: AIModel) => {
    toast({
      title: "Testing Model",
      description: `Testing ${model.name} model...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: `${model.name} is working correctly.`,
      });
    }, 2000);
  };

  const handleSave = (data: any) => {
    toast({
      title: "Success",
      description: "AI model settings have been updated successfully.",
    });
  };

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              AI Models Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search models..." 
                  className="pl-8" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="grid grid-cols-8 gap-4 p-4 bg-muted/50 font-medium text-sm">
                <div>Model Name</div>
                <div>Type</div>
                <div>Status</div>
                <div>Temperature</div>
                <div>Max Tokens</div>
                <div>Usage</div>
                <div>Last Updated</div>
                <div>Actions</div>
              </div>
              
              {filteredModels.map((model) => (
                <div key={model.id} className="grid grid-cols-8 gap-4 p-4 border-t">
                  <div className="font-medium">{model.name}</div>
                  <div className="text-muted-foreground">{model.type}</div>
                  <div>
                    <Badge 
                      variant="outline" 
                      className={
                        model.status === 'active' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }
                    >
                      {model.status}
                    </Badge>
                  </div>
                  <div>{model.temperature}</div>
                  <div>{model.maxTokens}</div>
                  <div className="text-muted-foreground">{model.usage}</div>
                  <div className="text-muted-foreground">{model.lastUpdated}</div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleViewModel(model)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditModel(model)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleTestModel(model)}>
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
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
      />
    </>
  );
};

export default AIModelsTab;
