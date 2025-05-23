
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilLine, Save, Trash2, Plus, Clock, Tag } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useUserNotes } from '@/hooks/useUserNotes';
import { toast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

interface NoteSectionProps {
  conceptName: string;
}

const NotesSection: React.FC<NoteSectionProps> = ({ conceptName }) => {
  const { saveNote, getNoteForConcept, deleteNote } = useUserNotes();
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editTags, setEditTags] = useState('');

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${conceptName}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    } else {
      // Set some example notes
      const exampleNotes = [
        {
          id: '1',
          title: 'Key Formula and Units',
          content: `${conceptName} formula and important units to remember.`,
          date: new Date().toISOString().split('T')[0],
          tags: ['formula', 'important']
        }
      ];
      setNotes(exampleNotes);
      localStorage.setItem(`notes_${conceptName}`, JSON.stringify(exampleNotes));
    }
  }, [conceptName]);
  
  const handleEditNote = (noteId: string) => {
    const noteToEdit = notes.find(note => note.id === noteId);
    if (noteToEdit) {
      setEditTitle(noteToEdit.title);
      setEditContent(noteToEdit.content);
      setEditTags(noteToEdit.tags.join(', '));
      setActiveNoteId(noteId);
      setEditMode(true);
    }
  };
  
  const handleSaveNote = () => {
    const updatedNotes = [...notes];
    
    if (activeNoteId) {
      // Edit existing note
      const noteIndex = notes.findIndex(note => note.id === activeNoteId);
      if (noteIndex !== -1) {
        updatedNotes[noteIndex] = {
          ...updatedNotes[noteIndex],
          title: editTitle || 'Untitled Note',
          content: editContent,
          tags: editTags.split(',').map(tag => tag.trim()).filter(tag => tag),
          date: new Date().toISOString().split('T')[0]
        };
      }
    } else {
      // Add new note
      const newNote: Note = {
        id: Date.now().toString(),
        title: editTitle || 'Untitled Note',
        content: editContent,
        date: new Date().toISOString().split('T')[0],
        tags: editTags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      updatedNotes.push(newNote);
    }
    
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${conceptName}`, JSON.stringify(updatedNotes));
    
    // Reset form
    setActiveNoteId(null);
    setEditMode(false);
    setEditTitle('');
    setEditContent('');
    setEditTags('');
    
    toast({
      title: "Note saved",
      description: "Your note has been saved successfully.",
    });
  };
  
  const handleDeleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${conceptName}`, JSON.stringify(updatedNotes));
    
    if (activeNoteId === noteId) {
      setActiveNoteId(null);
      setEditMode(false);
    }
    
    toast({
      title: "Note deleted",
      description: "Your note has been deleted.",
    });
  };
  
  const handleCreateNew = () => {
    setActiveNoteId(null);
    setEditTitle('');
    setEditContent('');
    setEditTags('');
    setEditMode(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PencilLine className="h-5 w-5 text-indigo-600" />
          My Notes for {conceptName}
        </CardTitle>
        <CardDescription>
          Keep track of important information and your own understanding
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Note list sidebar */}
          <div className="space-y-4">
            <Button 
              className="w-full"
              onClick={handleCreateNew}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Note
            </Button>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {notes.map(note => (
                <div
                  key={note.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    activeNoteId === note.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-900/50'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                  onClick={() => setActiveNoteId(note.id)}
                >
                  <h4 className="font-medium line-clamp-1">{note.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{note.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{note.date}</span>
                    </div>
                    <div className="flex gap-1">
                      {note.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span className="text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          +{note.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {notes.length === 0 && (
                <div className="text-center p-6 text-muted-foreground">
                  <p>No notes yet. Create your first note!</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Note editor or viewer */}
          <div className="md:col-span-2">
            {activeNoteId && !editMode ? (
              // Note viewer
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-medium">
                      {notes.find(note => note.id === activeNoteId)?.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{notes.find(note => note.id === activeNoteId)?.date}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditNote(activeNoteId)}
                    >
                      <PencilLine className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      onClick={() => handleDeleteNote(activeNoteId)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
                
                <div className="prose dark:prose-invert max-w-none mt-4">
                  {notes.find(note => note.id === activeNoteId)?.content.split('\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-1 mt-6">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {notes.find(note => note.id === activeNoteId)?.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ) : editMode ? (
              // Note editor
              <div className="space-y-4">
                <div>
                  <label htmlFor="note-title" className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <Input
                    id="note-title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Note title"
                  />
                </div>
                
                <div>
                  <label htmlFor="note-content" className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <Textarea
                    id="note-content"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    placeholder="Write your notes here..."
                    rows={10}
                  />
                </div>
                
                <div>
                  <label htmlFor="note-tags" className="block text-sm font-medium mb-1">
                    Tags (comma separated)
                  </label>
                  <Input
                    id="note-tags"
                    value={editTags}
                    onChange={(e) => setEditTags(e.target.value)}
                    placeholder="e.g., important, formula, exam"
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditMode(false);
                      if (!activeNoteId) setActiveNoteId(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveNote}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Note
                  </Button>
                </div>
              </div>
            ) : (
              // No note selected
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <PencilLine className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                <h3 className="text-lg font-medium">No Note Selected</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-6">
                  Select an existing note from the list or create a new one
                </p>
                <Button onClick={handleCreateNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Note
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        Your notes are saved automatically and synced across all your devices.
      </CardFooter>
    </Card>
  );
};

export default NotesSection;
