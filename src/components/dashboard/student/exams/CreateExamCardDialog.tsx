
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { SubscriptionType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';

interface CreateExamCardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateExam: (exam: any) => void;
  userSubscription?: SubscriptionType;
}

const CreateExamCardDialog: React.FC<CreateExamCardDialogProps> = ({ 
  open, 
  onOpenChange,
  onCreateExam,
  userSubscription = SubscriptionType.FREE
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    topic: '',
    difficulty: 'medium',
    timeLimit: 30,
    questionCount: 20
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if the user has a free subscription and already created too many exams
    if (userSubscription === SubscriptionType.FREE) {
      toast({
        title: "Subscription Limit",
        description: "Free users can only create up to 3 custom exams. Upgrade for unlimited exams.",
        variant: "destructive"
      });
      return;
    }
    
    onCreateExam({
      ...formData,
      id: `exam-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'active'
    });
    
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Practice Exam</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Exam Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              placeholder="e.g., Physics Mock Test - Mechanics" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="Briefly describe what topics this exam covers" 
              rows={3} 
              required 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select 
                value={formData.subject} 
                onValueChange={(value) => handleSelectChange('subject', value)}
              >
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="biology">Biology</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Input 
                id="topic" 
                name="topic" 
                value={formData.topic} 
                onChange={handleChange} 
                placeholder="e.g., Mechanics" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Difficulty Level</Label>
            <RadioGroup 
              value={formData.difficulty} 
              onValueChange={(value) => handleSelectChange('difficulty', value)}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy">Easy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard">Hard</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input 
                id="timeLimit" 
                name="timeLimit" 
                type="number" 
                min={5} 
                max={180} 
                value={formData.timeLimit} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="questionCount">Number of Questions</Label>
              <div className="relative">
                <Input 
                  id="questionCount" 
                  name="questionCount" 
                  type="number" 
                  min={5} 
                  max={userSubscription === SubscriptionType.FREE ? 30 : 100} 
                  value={formData.questionCount} 
                  onChange={handleChange} 
                  required 
                />
                {userSubscription === SubscriptionType.FREE && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <Badge variant="outline" className="flex items-center h-5 text-xs">
                      <Lock className="h-3 w-3 mr-1" />
                      Max 30
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Exam</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamCardDialog;
