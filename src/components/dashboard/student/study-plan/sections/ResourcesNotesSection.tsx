
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  BookOpen, 
  FileText, 
  Link as LinkIcon,
  Plus,
  Save
} from 'lucide-react';

export const ResourcesNotesSection = () => {
  const [newNote, setNewNote] = useState('');
  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [newResourceUrl, setNewResourceUrl] = useState('');

  const resources = [
    {
      id: 1,
      title: 'NCERT Physics Chapter 1',
      url: 'https://example.com/physics-ch1',
      subject: 'Physics',
      type: 'textbook'
    },
    {
      id: 2,
      title: 'Organic Chemistry Practice Problems',
      url: 'https://example.com/org-chem',
      subject: 'Chemistry',
      type: 'practice'
    },
    {
      id: 3,
      title: 'Biology Video Lectures',
      url: 'https://example.com/bio-lectures',
      subject: 'Biology',
      type: 'video'
    }
  ];

  const notes = [
    {
      id: 1,
      title: 'Newton\'s Laws Quick Notes',
      content: 'Key formulas and concepts for Newton\'s laws of motion...',
      subject: 'Physics',
      date: '2024-06-03'
    },
    {
      id: 2,
      title: 'Chemical Bonding Summary',
      content: 'Important points about ionic and covalent bonding...',
      subject: 'Chemistry',
      date: '2024-06-02'
    }
  ];

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'Chemistry': return 'bg-green-100 text-green-700 border-green-300';
      case 'Biology': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Study Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {resources.map((resource) => (
                <div key={resource.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getSubjectColor(resource.subject)}>
                        {resource.subject}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <h5 className="font-medium mb-3">Add New Resource</h5>
              <div className="space-y-2">
                <Input 
                  placeholder="Resource title"
                  value={newResourceTitle}
                  onChange={(e) => setNewResourceTitle(e.target.value)}
                />
                <Input 
                  placeholder="Resource URL"
                  value={newResourceUrl}
                  onChange={(e) => setNewResourceUrl(e.target.value)}
                />
                <Button size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Study Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {notes.map((note) => (
                <div key={note.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{note.title}</h4>
                    <Badge className={getSubjectColor(note.subject)}>
                      {note.subject}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{note.content}</p>
                  <div className="text-xs text-gray-500">{note.date}</div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4">
              <h5 className="font-medium mb-3">Quick Note</h5>
              <div className="space-y-2">
                <Textarea 
                  placeholder="Add a quick note..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  rows={3}
                />
                <Button size="sm" className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Note
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
