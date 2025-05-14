
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, Plus, Trash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface NotesTabProps {
  concept: {
    id: string;
    title: string;
    notes?: string;
    userNotes?: string[];
  };
}

const NotesTab: React.FC<NotesTabProps> = ({ concept }) => {
  const officialNotes = concept.notes || "These are the official notes for this concept. They provide a comprehensive overview of the key points and principles.";
  const [userNotes, setUserNotes] = useState<string[]>(concept.userNotes || []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [addingNew, setAddingNew] = useState<boolean>(false);
  const [newNoteText, setNewNoteText] = useState<string>('');

  const handleEditNote = (index: number) => {
    setEditingIndex(index);
    setEditText(userNotes[index]);
  };

  const handleSaveNote = (index: number) => {
    const updatedNotes = [...userNotes];
    updatedNotes[index] = editText;
    setUserNotes(updatedNotes);
    setEditingIndex(null);
    
    toast({
      title: "Note updated",
      description: "Your note has been saved successfully"
    });
  };

  const handleDeleteNote = (index: number) => {
    const updatedNotes = userNotes.filter((_, i) => i !== index);
    setUserNotes(updatedNotes);
    
    toast({
      title: "Note deleted",
      description: "Your note has been removed"
    });
  };

  const handleAddNote = () => {
    if (newNoteText.trim()) {
      setUserNotes([...userNotes, newNoteText]);
      setNewNoteText('');
      setAddingNew(false);
      
      toast({
        title: "Note added",
        description: "Your new note has been added successfully"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Official Notes</h3>
        <Card>
          <CardContent className="p-4">
            <div className="prose max-w-none dark:prose-invert">
              {officialNotes.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">Your Notes</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => { setAddingNew(true); setNewNoteText(''); }}
            disabled={addingNew}
          >
            <Plus size={16} className="mr-1" />
            Add Note
          </Button>
        </div>
        
        {addingNew && (
          <Card className="mb-4">
            <CardContent className="p-4">
              <Textarea 
                placeholder="Type your note here..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                className="mb-3 min-h-[100px]"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setAddingNew(false)}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleAddNote}>
                  <Save size={16} className="mr-1" />
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="space-y-4">
          {userNotes.length === 0 && !addingNew ? (
            <Card>
              <CardContent className="p-4 text-center text-muted-foreground">
                <p>You haven't added any notes yet. Click "Add Note" to get started.</p>
              </CardContent>
            </Card>
          ) : (
            userNotes.map((note, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  {editingIndex === index ? (
                    <>
                      <Textarea 
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="mb-3 min-h-[100px]"
                      />
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => setEditingIndex(null)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleSaveNote(index)}
                        >
                          <Save size={16} className="mr-1" />
                          Save
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="prose max-w-none dark:prose-invert">
                        {note.split('\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDeleteNote(index)}
                        >
                          <Trash size={16} className="mr-1" />
                          Delete
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleEditNote(index)}
                        >
                          <Edit size={16} className="mr-1" />
                          Edit
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesTab;
