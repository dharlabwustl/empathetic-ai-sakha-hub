
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Video, Link, Star, Download, ExternalLink } from 'lucide-react';

export const ResourcesNotesSection = () => {
  const [resources] = useState([
    {
      id: 1,
      title: 'NCERT Physics Solutions',
      type: 'pdf',
      subject: 'Physics',
      topic: 'Mechanics',
      url: '#',
      isBookmarked: true,
      difficulty: 'medium',
      rating: 4.8,
      downloads: 1240
    },
    {
      id: 2,
      title: 'Organic Chemistry Video Series',
      type: 'video',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      url: '#',
      isBookmarked: false,
      difficulty: 'hard',
      rating: 4.9,
      downloads: 890
    },
    {
      id: 3,
      title: 'Biology Quick Notes',
      type: 'notes',
      subject: 'Biology',
      topic: 'Human Physiology',
      url: '#',
      isBookmarked: true,
      difficulty: 'easy',
      rating: 4.7,
      downloads: 567
    },
    {
      id: 4,
      title: 'Physics Practice Problems',
      type: 'practice',
      subject: 'Physics',
      topic: 'Thermodynamics',
      url: '#',
      isBookmarked: false,
      difficulty: 'hard',
      rating: 4.6,
      downloads: 432
    }
  ]);

  const [personalNotes] = useState([
    {
      id: 1,
      title: 'Important Formulas - Physics',
      subject: 'Physics',
      lastModified: '2024-06-01',
      content: 'Collection of important physics formulas for quick revision...'
    },
    {
      id: 2,
      title: 'Chemical Reactions Summary',
      subject: 'Chemistry',
      lastModified: '2024-05-30',
      content: 'Summary of important organic chemistry reactions...'
    },
    {
      id: 3,
      title: 'Biology Diagrams',
      subject: 'Biology',
      lastModified: '2024-05-28',
      content: 'Important diagrams for human physiology and plant biology...'
    }
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4 text-red-600" />;
      case 'pdf': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'notes': return <BookOpen className="h-4 w-4 text-green-600" />;
      case 'practice': return <Link className="h-4 w-4 text-purple-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Resources & Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="resources">Study Resources</TabsTrigger>
              <TabsTrigger value="notes">Personal Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="resources">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Recommended Resources</h3>
                  <Button variant="outline" size="sm">
                    <Link className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
                
                {resources.map((resource) => (
                  <Card key={resource.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          {getTypeIcon(resource.type)}
                          <div>
                            <h4 className="font-semibold">{resource.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {resource.subject}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {resource.topic}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${getDifficultyColor(resource.difficulty)}`}
                              >
                                {resource.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {resource.isBookmarked && (
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          )}
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{resource.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="h-3 w-3" />
                            <span>{resource.downloads} downloads</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="notes">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Your Personal Notes</h3>
                  <Button variant="outline" size="sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Note
                  </Button>
                </div>
                
                {personalNotes.map((note) => (
                  <Card key={note.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold">{note.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {note.subject}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Last modified: {new Date(note.lastModified).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            Share
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-3">{note.content}</p>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3 w-3 mr-1" />
                          Open
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
