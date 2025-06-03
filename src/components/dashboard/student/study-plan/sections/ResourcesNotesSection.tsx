
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, ExternalLink } from 'lucide-react';

export const ResourcesNotesSection = () => {
  const resources = [
    {
      id: 1,
      title: 'Mechanics - Detailed Notes',
      type: 'pdf',
      subject: 'Physics',
      difficulty: 'medium',
      isBookmarked: true
    },
    {
      id: 2,
      title: 'Atomic Structure Video Lecture',
      type: 'video',
      subject: 'Chemistry',
      difficulty: 'easy',
      isBookmarked: false
    },
    {
      id: 3,
      title: 'Cell Biology Practice Questions',
      type: 'practice',
      subject: 'Biology',
      difficulty: 'hard',
      isBookmarked: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      case 'practice': return <BookOpen className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const variants: Record<string, any> = {
      'easy': 'secondary',
      'medium': 'default',
      'hard': 'destructive'
    };
    return <Badge variant={variants[difficulty]}>{difficulty}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Study Resources & Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(resource.type)}
                      <div>
                        <h4 className="font-medium">{resource.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">{resource.subject}</span>
                          {getDifficultyBadge(resource.difficulty)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {resource.isBookmarked && (
                        <Badge variant="outline">Bookmarked</Badge>
                      )}
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
