
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { PencilLine, Save, Plus, Trash2, Tag } from 'lucide-react';
import { useUserNotes } from '@/hooks/useUserNotes';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}

interface NotesTabProps {
  conceptId: string;
}

const NotesTab: React.FC<NotesTabProps> = ({ conceptId }) => {
  const { saveNote, getNoteForConcept } = useUserNotes();
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Key Points',
      content: 'Important concepts and formulas',
      tags: ['important', 'formula'],
      createdAt: '2024-01-15'
    }
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleCreateNote = () => {
    setIsEditing(true);
    setEditingNote(null);
    setTitle('');
    setContent('');
    setTags('');
  };

  const handleEditNote = (note: Note) => {
    setIsEditing(true);
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags.join(', '));
  };

  const handleSaveNote = () => {
    const newNote: Note = {
      id: editingNote?.id || Date.now().toString(),
      title: title || 'Untitled Note',
      content,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      createdAt: editingNote?.createdAt || new Date().toISOString().split('T')[0]
    };

    if (editingNote) {
      setNotes(notes.map(n => n.id === editingNote.id ? newNote : n));
    } else {
      setNotes([...notes, newNote]);
    }

    // Save to localStorage
    saveNote(conceptId, JSON.stringify(notes));
    
    setIsEditing(false);
    setEditingNote(null);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(n => n.id !== noteId));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">My Notes</h3>
        <Button onClick={handleCreateNote} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {editingNote ? 'Edit Note' : 'Create New Note'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Content</label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your notes here..."
                rows={8}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Tags</label>
              <Input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="important, formula, exam"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveNote}>
                <Save className="h-4 w-4 mr-2" />
                Save Note
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">{note.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditNote(note)}
                    >
                      <PencilLine className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{note.content}</p>
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Created: {note.createdAt}
                </div>
              </CardContent>
            </Card>
          ))}
          
          {notes.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <PencilLine className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No notes yet. Create your first note!</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default NotesTab;
