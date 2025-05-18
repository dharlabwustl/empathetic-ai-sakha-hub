
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save, Plus } from "lucide-react";

interface NotesTabProps {
  notes: string[];
  onAddNote: (note: string) => void;
}

const NotesTab: React.FC<NotesTabProps> = ({ notes, onAddNote }) => {
  const [newNote, setNewNote] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
      setIsAdding(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Your Notes</h3>
        
        {!isAdding && (
          <Button
            onClick={() => setIsAdding(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            <span>Add Note</span>
          </Button>
        )}
      </div>
      
      {isAdding && (
        <Card>
          <CardContent className="p-4">
            <Textarea 
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="min-h-[120px] mb-2"
              placeholder="Write your note here..."
            />
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                onClick={handleAddNote}
                className="flex items-center gap-1"
              >
                <Save size={16} />
                <span>Save Note</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {notes.length === 0 && !isAdding ? (
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="font-medium text-lg mb-1">No notes yet</h3>
          <p className="text-muted-foreground mb-4">
            Add notes to help remember key points about this concept.
          </p>
          <Button
            onClick={() => setIsAdding(true)}
            variant="outline"
            className="flex items-center gap-1"
          >
            <Plus size={16} />
            <span>Add Your First Note</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <p className="whitespace-pre-wrap">{note}</p>
                <div className="text-xs text-muted-foreground mt-2">
                  Added {new Date().toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesTab;
