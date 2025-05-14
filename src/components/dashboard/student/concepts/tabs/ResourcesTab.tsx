
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Link as LinkIcon, Video, Download, ExternalLink, Bookmark } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface ResourcesTabProps {
  conceptId: string;
  conceptTitle: string;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ conceptId, conceptTitle }) => {
  const { toast } = useToast();

  const resources = {
    textbooks: [
      {
        id: '1',
        title: 'NCERT Textbook',
        description: 'Official NCERT textbook covering all required topics for NEET preparation.',
        type: 'textbook',
        pages: '122-140',
        format: 'PDF',
        size: '8.2 MB'
      },
      {
        id: '2',
        title: 'HC Verma - Concepts of Physics',
        description: 'Comprehensive coverage with detailed explanations and numerical problems.',
        type: 'textbook',
        pages: '78-95',
        format: 'PDF',
        size: '12.4 MB'
      },
      {
        id: '3',
        title: 'Pradeep\'s Chemistry Guide',
        description: 'Concise explanations with practice questions and solved examples.',
        type: 'textbook',
        pages: '156-172',
        format: 'PDF',
        size: '10.1 MB'
      }
    ],
    materials: [
      {
        id: '1',
        title: `${conceptTitle} - Cheat Sheet`,
        description: 'Quick reference guide with all formulas and important points.',
        type: 'notes',
        pages: '2',
        format: 'PDF',
        size: '1.2 MB'
      },
      {
        id: '2',
        title: `${conceptTitle} - Mind Map`,
        description: 'Visual representation of the concept and related topics for better understanding.',
        type: 'diagram',
        format: 'JPG',
        size: '0.8 MB'
      },
      {
        id: '3',
        title: 'Solved Example Problems',
        description: 'Collection of solved problems with step-by-step explanations.',
        type: 'problems',
        pages: '8',
        format: 'PDF',
        size: '2.4 MB'
      },
      {
        id: '4',
        title: 'Last 10 Years\' Questions',
        description: 'Previous NEET questions related to this concept with detailed solutions.',
        type: 'questions',
        pages: '5',
        format: 'PDF',
        size: '1.8 MB'
      }
    ],
    web: [
      {
        id: '1',
        title: 'Khan Academy',
        description: 'Free comprehensive video tutorials and interactive exercises.',
        type: 'website',
        url: 'https://www.khanacademy.org'
      },
      {
        id: '2',
        title: 'BYJU\'S Learning App',
        description: 'Visual learning resources with animations and interactive simulations.',
        type: 'website',
        url: 'https://byjus.com'
      },
      {
        id: '3',
        title: 'Indian Journal of Physics',
        description: 'Research paper explaining recent developments in this concept.',
        type: 'research',
        url: 'https://www.springer.com/journal/12648'
      }
    ]
  };
  
  const handleResourceClick = (resource: any) => {
    // In a real app, this would open or download the resource
    console.log("Opening resource:", resource);
    
    toast({
      title: "Resource accessed",
      description: `Opening ${resource.title}...`,
    });
  };

  const renderResource = (resource: any) => {
    const getIconForResource = () => {
      switch(resource.type) {
        case 'textbook': return <BookOpen className="h-4 w-4" />;
        case 'notes':
        case 'problems':
        case 'questions': return <FileText className="h-4 w-4" />;
        case 'website':
        case 'research': return <LinkIcon className="h-4 w-4" />;
        case 'diagram': return <Video className="h-4 w-4" />;
        default: return <FileText className="h-4 w-4" />;
      }
    };
    
    return (
      <Card key={resource.id} className="border border-gray-200 hover:border-blue-300 transition-all dark:border-gray-700 dark:hover:border-blue-800">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-base font-medium flex items-center gap-2">
                {getIconForResource()}
                {resource.title}
              </CardTitle>
              <CardDescription className="mt-1">{resource.description}</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="h-7 flex gap-1">
              <Bookmark className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-3">
          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-3">
            {resource.pages && (
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                {resource.pages} pages
              </span>
            )}
            {resource.format && (
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                {resource.format}
              </span>
            )}
            {resource.size && (
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md">
                {resource.size}
              </span>
            )}
            {resource.url && (
              <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-md truncate max-w-full">
                External Link
              </span>
            )}
          </div>
          
          <div className="flex justify-end">
            <Button 
              size="sm"
              onClick={() => handleResourceClick(resource)}
              className="gap-1"
            >
              {resource.url ? (
                <>
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Visit
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Learning Resources</h3>
        <p className="text-sm text-muted-foreground">
          Additional materials to help you master {conceptTitle}.
        </p>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="textbooks">Textbooks</TabsTrigger>
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
          <TabsTrigger value="web">Web Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-4 space-y-4">
          <h4 className="text-sm font-medium text-muted-foreground">Recommended Textbooks</h4>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {resources.textbooks.slice(0, 2).map(renderResource)}
          </div>
          
          <h4 className="text-sm font-medium text-muted-foreground pt-2">Study Materials</h4>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {resources.materials.slice(0, 2).map(renderResource)}
          </div>
          
          <h4 className="text-sm font-medium text-muted-foreground pt-2">Web Resources</h4>
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {resources.web.slice(0, 2).map(renderResource)}
          </div>
          
          <div className="text-center pt-4">
            <Button variant="outline">View All Resources</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="textbooks" className="pt-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {resources.textbooks.map(renderResource)}
          </div>
        </TabsContent>
        
        <TabsContent value="materials" className="pt-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {resources.materials.map(renderResource)}
          </div>
        </TabsContent>
        
        <TabsContent value="web" className="pt-4">
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {resources.web.map(renderResource)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResourcesTab;
