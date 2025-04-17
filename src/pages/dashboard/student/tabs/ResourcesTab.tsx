
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, Video, Download } from "lucide-react";

interface ResourcesTabProps {
  userProfile: UserProfileType;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ userProfile }) => {
  const resources = [
    { id: 1, title: "Physics Formula Sheet", type: "PDF", category: "Study Material", icon: FileText },
    { id: 2, title: "Organic Chemistry Reactions", type: "Video", category: "Tutorial", icon: Video },
    { id: 3, title: "Calculus Practice Problems", type: "PDF", category: "Practice", icon: FileText },
    { id: 4, title: "Biology Textbook Chapter 5", type: "eBook", category: "Reading", icon: BookOpen }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Learning Resources</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resources.map(resource => {
          const Icon = resource.icon;
          
          return (
            <Card key={resource.id} className="overflow-hidden">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4">
                <Icon className="h-8 w-8 text-blue-500" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{resource.title}</CardTitle>
                <div className="flex text-xs text-muted-foreground">
                  <span className="mr-2">{resource.type}</span>
                  <span>•</span>
                  <span className="ml-2">{resource.category}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <button className="text-sm text-blue-600 font-medium flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                  <span className="text-xs text-muted-foreground">Added 3 days ago</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Need more resources?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Request additional study materials based on your learning needs.</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Request Materials
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
