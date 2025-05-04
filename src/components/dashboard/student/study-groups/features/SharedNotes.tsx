
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Plus,
  FileText,
  Edit,
  Trash2,
  Save,
  X,
  User
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { useStudyGroups } from '../hooks/useStudyGroups';

interface SharedNotesProps {
  groupId: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

const SharedNotes: React.FC<SharedNotesProps> = ({ groupId }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const { fetchGroupNotes, addGroupNote, updateGroupNote, deleteGroupNote } = useStudyGroups();

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setLoading(true);
        const fetchedNotes = await fetchGroupNotes(groupId);
        setNotes(fetchedNotes);
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [groupId, fetchGroupNotes]);

  const handleAddNote = async () => {
    try {
      const addedNote = await addGroupNote(groupId, newNote);
      setNotes([...notes, addedNote]);
      setNewNote({ title: '', content: '' });
      setShowAddDialog(false);
    } catch (error) {
      console.error('Failed to add note:', error);
    }
  };

  const handleUpdateNote = async (noteId: string, updatedData: Partial<Note>) => {
    try {
      const updatedNote = await updateGroupNote(groupId, noteId, updatedData);
      setNotes(notes.map(note => note.id === noteId ? { ...note, ...updatedNote } : note));
      setEditingNoteId(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await deleteGroupNote(groupId, noteId);
      setNotes(notes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Shared Notes
        </h2>
        <Button 
          onClick={() => setShowAddDialog(true)}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Note
        </Button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <FileText size={48} strokeWidth={1.5} />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No notes yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            Create the first note to share with your group members
          </p>
          <Button 
            onClick={() => setShowAddDialog(true)}
            variant="outline"
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-1" />
            Create a note
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map(note => (
            <Card key={note.id} className={editingNoteId === note.id ? 'border-blue-500' : ''}>
              <CardHeader className="pb-2">
                {editingNoteId === note.id ? (
                  <Input
                    value={note.title}
                    onChange={(e) => {
                      const updatedNotes = notes.map(n => 
                        n.id === note.id ? { ...n, title: e.target.value } : n
                      );
                      setNotes(updatedNotes);
                    }}
                    className="font-semibold"
                  />
                ) : (
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                )}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="h-3 w-3" />
                  <span>{note.createdBy.name}</span>
                  <span className="text-gray-400">•</span>
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                </div>
              </CardHeader>
              <CardContent>
                {editingNoteId === note.id ? (
                  <>
                    <Textarea
                      value={note.content}
                      onChange={(e) => {
                        const updatedNotes = notes.map(n => 
                          n.id === note.id ? { ...n, content: e.target.value } : n
                        );
                        setNotes(updatedNotes);
                      }}
                      rows={5}
                      className="resize-none mb-3"
                    />
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setEditingNoteId(null)}
                        className="flex items-center gap-1"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={() => handleUpdateNote(note.id, { 
                          title: note.title, 
                          content: note.content 
                        })}
                        className="flex items-center gap-1"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="whitespace-pre-wrap">{note.content}</p>
                    <div className="flex justify-end gap-2 mt-4">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setEditingNoteId(note.id)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-600 flex items-center gap-1"
                        onClick={() => handleDeleteNote(note.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Note</DialogTitle>
            <DialogDescription>
              Create a new note to share with your study group
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Input
                placeholder="Note title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Note content"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                rows={6}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancel</Button>
            <Button onClick={handleAddNote} disabled={!newNote.title || !newNote.content}>
              Add Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SharedNotes;
