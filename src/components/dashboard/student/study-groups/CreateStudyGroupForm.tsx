
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CreateStudyGroupFormProps {
  onCancel: () => void;
}

const CreateStudyGroupForm: React.FC<CreateStudyGroupFormProps> = ({ onCancel }) => {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    subject: '',
    meetingFrequency: 'Weekly',
    tags: '',
    cover: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGroupData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setGroupData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to the backend
    console.log('Creating group with data:', groupData);
    // Reset form or navigate away
    onCancel();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New Study Group</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter a name for your group"
              value={groupData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe the purpose and goals of your study group"
              value={groupData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select 
                value={groupData.subject} 
                onValueChange={(value) => handleSelectChange('subject', value)}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Biology">Biology</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meetingFrequency">Meeting Frequency</Label>
              <Select 
                value={groupData.meetingFrequency} 
                onValueChange={(value) => handleSelectChange('meetingFrequency', value)}
              >
                <SelectTrigger id="meetingFrequency">
                  <SelectValue placeholder="How often will you meet?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Twice Weekly">Twice Weekly</SelectItem>
                  <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="As Needed">As Needed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="e.g., JEE, Advanced Physics, Mechanics"
              value={groupData.tags}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cover">Cover Image URL (optional)</Label>
            <Input
              id="cover"
              name="cover"
              placeholder="https://example.com/image.jpg"
              value={groupData.cover}
              onChange={handleChange}
            />
            {groupData.cover && (
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-1">Preview:</p>
                <div 
                  className="h-20 bg-cover bg-center rounded"
                  style={{ backgroundImage: `url(${groupData.cover})` }}
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={!groupData.name || !groupData.description || !groupData.subject}>
            Create Group
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateStudyGroupForm;
