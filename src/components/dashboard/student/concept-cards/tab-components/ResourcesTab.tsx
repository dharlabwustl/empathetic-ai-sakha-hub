
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Book, FileText, Video, Download, ExternalLink, BookOpen } from 'lucide-react';

interface ResourcesTabProps {
  concept: {
    id: string;
    title: string;
    resources?: Array<{
      id: string;
      title: string;
      type: 'pdf' | 'video' | 'website' | 'book' | 'article';
      url: string;
      description?: string;
      isPremium?: boolean;
    }>;
  };
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ concept }) => {
  const resources = concept.resources || [
    {
      id: '1',
      title: 'Comprehensive Study Guide',
      type: 'pdf',
      url: '#',
      description: 'A detailed study guide covering all aspects of the concept with practice problems.',
      isPremium: false
    },
    {
      id: '2',
      title: 'Advanced Topics in Molecular Biology',
      type: 'book',
      url: '#',
      description: 'Recommended textbook for deeper understanding of cell structures and functions.',
      isPremium: true
    },
    {
      id: '3',
      title: 'Interactive Cell Visualization',
      type: 'website',
      url: '#',
      description: 'Interactive 3D models of cell structures to understand spatial relationships.',
      isPremium: false
    },
    {
      id: '4',
      title: 'Lecture Series by Prof. Johnson',
      type: 'video',
      url: '#',
      description: 'Acclaimed lecture series covering advanced topics related to this concept.',
      isPremium: true
    }
  ];

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-6 w-6" />;
      case 'video':
        return <Video className="h-6 w-6" />;
      case 'website':
        return <ExternalLink className="h-6 w-6" />;
      case 'book':
        return <Book className="h-6 w-6" />;
      case 'article':
        return <BookOpen className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  const getActionButton = (type: string, isPremium: boolean | undefined) => {
    if (isPremium) {
      return (
        <Button variant="secondary">
          Upgrade to Access
        </Button>
      );
    }

    switch (type) {
      case 'pdf':
        return (
          <Button>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        );
      case 'video':
        return (
          <Button>
            <Video className="mr-2 h-4 w-4" /> Watch
          </Button>
        );
      case 'website':
      case 'article':
        return (
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" /> Visit
          </Button>
        );
      case 'book':
        return (
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" /> View Details
          </Button>
        );
      default:
        return (
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" /> Open
          </Button>
        );
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-3">Additional Learning Resources</h3>
      
      {resources.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            <p>No additional resources available for this concept yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className={resource.isPremium ? "border-primary/30" : ""}>
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${resource.isPremium ? 'bg-primary/10' : 'bg-muted'}`}>
                    {getResourceIcon(resource.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{resource.title}</h4>
                      {resource.isPremium && (
                        <Badge variant="outline" className="text-primary border-primary">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{resource.description}</p>
                    <div className="text-xs flex items-center">
                      <Badge variant="secondary" className="mr-2">
                        {resource.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-5 pb-5 pt-0">
                {getActionButton(resource.type, resource.isPremium)}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourcesTab;
