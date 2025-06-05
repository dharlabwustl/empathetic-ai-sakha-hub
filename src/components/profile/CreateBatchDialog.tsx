
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateBatchDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateBatch: (data: any) => void;
  memberLimit: number;
}

export const CreateBatchDialog = ({ open, onClose, onCreateBatch, memberLimit }: CreateBatchDialogProps) => {
  const [batchName, setBatchName] = useState('');
  const [description, setDescription] = useState('');
  const [maxMembers, setMaxMembers] = useState(memberLimit);

  const handleCreate = () => {
    onCreateBatch({
      batchName,
      description,
      maxMembers
    });
    setBatchName('');
    setDescription('');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Batch</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="batchName">Batch Name</Label>
            <Input
              id="batchName"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              placeholder="Enter batch name"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your batch"
            />
          </div>
          
          <div>
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <Select value={maxMembers.toString()} onValueChange={(value) => setMaxMembers(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: memberLimit }, (_, i) => i + 1).map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} member{num > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!batchName} className="flex-1">
              Create Batch
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
