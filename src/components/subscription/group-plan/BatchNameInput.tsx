
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface BatchNameInputProps {
  batchName: string;
  onChange: (value: string) => void;
}

const BatchNameInput = ({ batchName, onChange }: BatchNameInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="batch-name">Batch Name</Label>
      <Input 
        id="batch-name"
        placeholder="Enter a meaningful name for your batch"
        value={batchName}
        onChange={(e) => onChange(e.target.value)}
        className="border-purple-200 dark:border-purple-900 focus:border-purple-300 dark:focus:border-purple-700"
      />
    </div>
  );
};

export default BatchNameInput;
