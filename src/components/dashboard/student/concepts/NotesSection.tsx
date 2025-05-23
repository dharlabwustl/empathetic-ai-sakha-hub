
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilLine, Save, TrashIcon, PlusCircle, Clock, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface NotesSectionProps {
  conceptName: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({ conceptName }) => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Key Formula Explanation',
      content: `The formula V = IR is the mathematical representation of Ohm's Law, where:
- V is the voltage across the conductor in volts (V)
- I is the current through the conductor in amperes (A)
- R is the resistance of the conductor in ohms (Ω)

This means that the current through a conductor is directly proportional to the voltage and inversely proportional to the resistance.`,
      lastEdited: '2023-05-26T14:30:00',
      tags: ['formula', 'important']
    },
    {
      id: 2,
      title: 'Common Mistakes to Avoid',
      content: `1. Don't forget to convert units (e.g., kΩ to Ω)
2. Always check if the conductor is ohmic before applying Ohm's Law
3. In complex circuits, apply Ohm's Law to individual components, not the entire circuit
4. Remember that temperature affects resistance, which can affect the validity of Ohm's Law calculations`,
      lastEdited: '2023-06-02T10:15:00',
      tags: ['mistakes', 'tips']
    }
  ]);
  
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('');
  
  const handleAddNote = () => {
    if (newNoteTitle.trim() === '' || newNoteContent.trim() === '') return;
    
    const newNote = {
      id: Date.now(),
      title: newNoteTitle,
      content: newNoteContent,
      lastEdited: new Date().toISOString(),
      tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
    };
    
    setNotes([...notes, newNote]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
    setIsAddingNote(false);
  };
  
  const handleUpdateNote = (id: number) => {
    if (newNoteTitle.trim() === '' || newNoteContent.trim() === '') return;
    
    const updatedNotes = notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          title: newNoteTitle,
          content: newNoteContent,
          lastEdited: new Date().toISOString(),
          tags: newNoteTags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        };
      }
      return note;
    });
    
    setNotes(updatedNotes);
    setNewNoteTitle('');
    setNewNoteContent('');
    setNewNoteTags('');
    setEditingNoteId(null);
  };
  
  const handleEditNote = (id: number) => {
    const noteToEdit = notes.find(note => note.id === id);
    if (!noteToEdit) return;
    
    setNewNoteTitle(noteToEdit.title);
    setNewNoteContent(noteToEdit.content);
    setNewNoteTags(noteToEdit.tags.join(', '));
    setEditingNoteId(id);
    setIsAddingNote(false);
  };
  
  const handleDeleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PencilLine className="h-5 w-5 text-indigo-600" />
            <span>Notes: {conceptName}</span>
          </div>
          <Button 
            onClick={() => {
              setIsAddingNote(!isAddingNote);
              setEditingNoteId(null);
              setNewNoteTitle('');
              setNewNoteContent('');
              setNewNoteTags('');
            }}
            variant="outline"
            size="sm"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add Note
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Note editor */}
          {(isAddingNote || editingNoteId !== null) && (
            <Card className="col-span-1 lg:col-span-2 border-2 border-indigo-200 dark:border-indigo-900/50">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-medium">
                  {editingNoteId !== null ? 'Edit Note' : 'Add New Note'}
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label htmlFor="note-title" className="block text-sm font-medium mb-1">
                      Title
                    </label>
                    <Input
                      id="note-title"
                      placeholder="Note title"
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="note-content" className="block text-sm font-medium mb-1">
                      Content
                    </label>
                    <Textarea
                      id="note-content"
                      placeholder="Note content"
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      rows={6}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="note-tags" className="block text-sm font-medium mb-1">
                      Tags (comma separated)
                    </label>
                    <Input
                      id="note-tags"
                      placeholder="formula, important, revision"
                      value={newNoteTags}
                      onChange={(e) => setNewNoteTags(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    onClick={() => {
                      setIsAddingNote(false);
                      setEditingNoteId(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      editingNoteId !== null 
                        ? handleUpdateNote(editingNoteId) 
                        : handleAddNote()
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingNoteId !== null ? 'Update Note' : 'Save Note'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Notes list */}
          {notes.map((note) => (
            <Card key={note.id} className={editingNoteId === note.id ? 'border-indigo-300 dark:border-indigo-700' : ''}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{note.title}</h3>
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7" 
                      onClick={() => handleEditNote(note.id)}
                    >
                      <PencilLine className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-7 w-7 text-red-600 dark:text-red-400"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2 text-sm whitespace-pre-line">
                  {note.content}
                </div>
                
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="h-3 w-3" />
                    <span>Last edited: {formatDate(note.lastEdited)}</span>
                  </div>
                  
                  <div className="flex-1"></div>
                  
                  <div className="flex items-center gap-1">
                    <Tag className="h-3 w-3 text-gray-400" />
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {/* Empty state */}
          {notes.length === 0 && !isAddingNote && (
            <div className="col-span-1 lg:col-span-2 flex flex-col items-center justify-center py-8 text-center">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-3 mb-4">
                <PencilLine className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium mb-2">No notes yet</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm mb-4">
                Create your first note to capture key insights and important details about this concept.
              </p>
              <Button onClick={() => setIsAddingNote(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Your First Note
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NotesSection;
