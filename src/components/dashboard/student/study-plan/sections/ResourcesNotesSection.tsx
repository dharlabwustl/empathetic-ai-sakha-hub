
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, Bookmark, ExternalLink } from 'lucide-react';

export const ResourcesNotesSection = () => {
  const resources = [
    {
      id: 1,
      title: "Thermodynamics - Complete Guide",
      type: "pdf",
      subject: "Physics",
      difficulty: "medium",
      isBookmarked: true,
      lastAccessed: "2 hours ago"
    },
    {
      id: 2,
      title: "Organic Chemistry Mechanisms",
      type: "video",
      subject: "Chemistry", 
      difficulty: "hard",
      isBookmarked: false,
      lastAccessed: "1 day ago"
    },
    {
      id: 3,
      title: "Cell Biology Notes",
      type: "notes",
      subject: "Biology",
      difficulty: "easy",
      isBookmarked: true,
      lastAccessed: "Today"
    }
  ];

  const personalNotes = [
    {
      id: 1,
      title: "Important Formulas - Physics",
      subject: "Physics",
      createdAt: "2024-06-01",
      content: "Key formulas for mechanics and thermodynamics..."
    },
    {
      id: 2,
      title: "Organic Reaction Mechanisms",
      subject: "Chemistry",
      createdAt: "2024-05-28",
      content: "Step-by-step mechanisms for important reactions..."
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Study Resources & Personal Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Study Resources */}
          <div className="mb-6">
            <h3 className="font-medium mb-4">Recommended Study Resources</h3>
            <div className="space-y-3">
              {resources.map((resource) => (
                <Card key={resource.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getTypeIcon(resource.type)}
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{resource.subject}</Badge>
                            <Badge variant="outline" className={getDifficultyColor(resource.difficulty)}>
                              {resource.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Last accessed: {resource.lastAccessed}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {}}
                        >
                          {resource.isBookmarked ? (
                            <Bookmark className="h-4 w-4 fill-current text-yellow-500" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Open
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Personal Notes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Personal Notes</h3>
              <Button size="sm">
                <FileText className="h-4 w-4 mr-1" />
                New Note
              </Button>
            </div>
            <div className="space-y-3">
              {personalNotes.map((note) => (
                <Card key={note.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{note.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline">{note.subject}</Badge>
                          <span className="text-xs text-gray-500">
                            Created: {new Date(note.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{note.content}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-3">Quick Actions</h4>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-1" />
                Video Library
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                PDF Collection
              </Button>
              <Button variant="outline" size="sm">
                <Bookmark className="h-4 w-4 mr-1" />
                Bookmarks
              </Button>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-1" />
                Study Guides
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
