
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Video, BookOpen, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'article' | 'book' | 'worksheet' | 'other';
  url: string;
  source?: string;
  isPremium?: boolean;
}

interface ResourcesTabProps {
  resources: Resource[];
  conceptId: string;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ resources, conceptId }) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'book':
        return <BookOpen className="h-4 w-4" />;
      case 'worksheet':
        return <Download className="h-4 w-4" />;
      default:
        return <ExternalLink className="h-4 w-4" />;
    }
  };
  
  const handleOpenResource = (url: string) => {
    window.open(url, '_blank');
  };
  
  if (resources.length === 0) {
    return (
      <div className="bg-muted/50 rounded-lg p-8 text-center">
        <h3 className="font-medium text-lg mb-1">No additional resources available</h3>
        <p className="text-muted-foreground">
          Check back later for additional resources on this concept.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Additional Resources for Deeper Understanding</h3>
      
      <div className="grid gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-center p-4">
                <div className={`rounded-full p-2.5 mr-4 ${
                  resource.type === 'video' ? 'bg-red-100 text-red-700' :
                  resource.type === 'article' ? 'bg-blue-100 text-blue-700' :
                  resource.type === 'book' ? 'bg-green-100 text-green-700' :
                  resource.type === 'worksheet' ? 'bg-purple-100 text-purple-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {getResourceIcon(resource.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      {resource.source && (
                        <p className="text-sm text-muted-foreground">Source: {resource.source}</p>
                      )}
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      {resource.isPremium && (
                        <Badge variant="outline" className="bg-gradient-to-r from-amber-200 to-yellow-300 text-amber-800 border-amber-300">
                          Premium
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-4 flex-shrink-0"
                  onClick={() => handleOpenResource(resource.url)}
                >
                  <span className="hidden sm:inline mr-1">Open</span>
                  <ExternalLink size={16} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResourcesTab;
