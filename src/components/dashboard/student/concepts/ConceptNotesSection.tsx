
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FileText, Save, Plus, Trash2 } from 'lucide-react';

interface ConceptNotesSectionProps {
  conceptId: string;
  conceptTitle: string;
}

interface Note {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const ConceptNotesSection: React.FC<ConceptNotesSectionProps> = ({ 
  conceptId,
  conceptTitle
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNote, setActiveNote] = useState<Note | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  
  // Load notes from local storage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
        if (parsedNotes.length > 0) {
          setActiveNote(parsedNotes[0]);
          setEditContent(parsedNotes[0].content);
        }
      } catch (e) {
        console.error('Error parsing saved notes:', e);
      }
    }
  }, [conceptId]);
  
  // Save notes to local storage whenever they change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(`concept-notes-${conceptId}`, JSON.stringify(notes));
    }
  }, [notes, conceptId]);
  
  const createNewNote = () => {
    const newNote: Note = {
      id: `note-${Date.now()}`,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setNotes([newNote, ...notes]);
    setActiveNote(newNote);
    setEditContent('');
    setIsEditing(true);
    
    toast({
      title: "New Note Created",
      description: `Note created for ${conceptTitle}`,
    });
  };
  
  const saveNote = () => {
    if (!activeNote) return;
    
    const updatedNotes = notes.map(note => {
      if (note.id === activeNote.id) {
        return {
          ...note,
          content: editContent,
          updatedAt: new Date().toISOString()
        };
      }
      return note;
    });
    
    setNotes(updatedNotes);
    setActiveNote({
      ...activeNote,
      content: editContent,
      updatedAt: new Date().toISOString()
    });
    setIsEditing(false);
    
    toast({
      title: "Note Saved",
      description: "Your note has been saved",
    });
  };
  
  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
    if (activeNote?.id === noteId) {
      if (updatedNotes.length > 0) {
        setActiveNote(updatedNotes[0]);
        setEditContent(updatedNotes[0].content);
      } else {
        setActiveNote(null);
        setEditContent('');
      }
    }
    
    localStorage.setItem(`concept-notes-${conceptId}`, JSON.stringify(updatedNotes));
    
    toast({
      title: "Note Deleted",
      description: "The note has been deleted",
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2 h-6 w-6 text-blue-600" />
          Notes for {conceptTitle}
        </h2>
        
        <Button onClick={createNewNote}>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center p-10 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">No Notes Yet</h3>
          <p className="text-gray-500 mb-4 max-w-md mx-auto">
            Create your first note for this concept. Notes help you organize your thoughts and reinforce your understanding.
          </p>
          <Button onClick={createNewNote}>
            <Plus className="mr-2 h-4 w-4" />
            Create First Note
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wider">
              Your Notes
            </h3>
            
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {notes.map(note => (
                <div 
                  key={note.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    activeNote?.id === note.id ? 
                    'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' : 
                    'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    setActiveNote(note);
                    setEditContent(note.content);
                    setIsEditing(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">
                      {note.content ? note.content.slice(0, 20) + (note.content.length > 20 ? '...' : '') : 'Empty note'}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(note.updatedAt)}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                {activeNote ? (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="font-medium">
                          {isEditing ? 'Editing Note' : 'Note Details'}
                        </h3>
                        <p className="text-xs text-gray-500">
                          Last updated: {formatDate(activeNote.updatedAt)}
                        </p>
                      </div>
                      
                      <Button 
                        variant={isEditing ? "default" : "outline"} 
                        onClick={() => {
                          if (isEditing) {
                            saveNote();
                          } else {
                            setIsEditing(true);
                          }
                        }}
                      >
                        {isEditing ? (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Note
                          </>
                        ) : (
                          'Edit Note'
                        )}
                      </Button>
                    </div>
                    
                    {isEditing ? (
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder="Write your notes here..."
                        className="min-h-[300px] p-4 rounded-md"
                      />
                    ) : (
                      <div className="bg-gray-50 dark:bg-gray-800/50 min-h-[300px] p-4 rounded-md whitespace-pre-wrap">
                        {activeNote.content || <span className="text-gray-400">No content in this note yet.</span>}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center p-6">
                    <p className="text-gray-500">Select a note to view or edit it.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
