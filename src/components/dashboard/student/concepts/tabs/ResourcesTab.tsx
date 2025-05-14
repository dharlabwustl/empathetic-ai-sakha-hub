
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, FileText, Video, Book, Presentation } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'video' | 'website' | 'book' | 'presentation';
  source: string;
  description: string;
  link: string;
}

interface ResourcesTabProps {
  resources?: Resource[];
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ 
  resources = [
    {
      id: '1',
      title: 'Complete Concept Guide',
      type: 'pdf',
      source: 'PREPZR Library',
      description: 'Comprehensive study material covering all aspects of the concept with examples and practice questions.',
      link: '#'
    },
    {
      id: '2',
      title: 'Advanced Explanation Video',
      type: 'video',
      source: 'Khan Academy',
      description: 'An in-depth video explanation with animations and real-world applications.',
      link: 'https://www.youtube.com/watch?v=example'
    },
    {
      id: '3',
      title: 'Interactive Practice Problems',
      type: 'website',
      source: 'PREPZR Interactive',
      description: 'Practice problems with step-by-step solutions and instant feedback.',
      link: '#'
    },
    {
      id: '4',
      title: 'Standard Textbook Reference',
      type: 'book',
      source: 'Oxford Publications',
      description: 'The standard textbook reference for this concept, chapter 7, pages 125-142.',
      link: '#'
    },
    {
      id: '5',
      title: 'Exam-focused Summary',
      type: 'presentation',
      source: 'PREPZR Expert',
      description: 'A concise presentation focusing on exam-relevant aspects of this concept.',
      link: '#'
    }
  ]
}) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-600" />;
      case 'website':
        return <ExternalLink className="h-5 w-5 text-green-600" />;
      case 'book':
        return <Book className="h-5 w-5 text-amber-600" />;
      case 'presentation':
        return <Presentation className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  const getActionButton = (type: string, link: string) => {
    switch (type) {
      case 'pdf':
        return (
          <Button size="sm" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        );
      case 'video':
      case 'website':
        return (
          <Button size="sm" variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Open
          </Button>
        );
      case 'book':
        return (
          <Button size="sm" variant="outline">
            <Book className="h-4 w-4 mr-2" />
            Preview
          </Button>
        );
      default:
        return (
          <Button size="sm" variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            Access
          </Button>
        );
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Additional Resources</h3>
      <p className="text-muted-foreground">
        Enhance your understanding with these carefully selected resources.
      </p>
      
      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-3">
          {resources.map((resource) => (
            <Card key={resource.id} className="border shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="mr-3 mt-1">{getResourceIcon(resource.type)}</div>
                  <div className="space-y-2 flex-1">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{resource.title}</h4>
                        <Badge variant="outline">{resource.type.toUpperCase()}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">Source: {resource.source}</p>
                    </div>
                    <p className="text-sm">{resource.description}</p>
                    <div className="flex justify-end">
                      {getActionButton(resource.type, resource.link)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ResourcesTab;
