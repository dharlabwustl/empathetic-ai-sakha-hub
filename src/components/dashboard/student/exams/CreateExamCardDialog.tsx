
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Sparkles } from 'lucide-react';
import { SubscriptionType } from '@/types/user/base';

interface CreateExamCardDialogProps {
  onCreateExam: (examData: any) => void;
  subscriptionType?: SubscriptionType;
}

const CreateExamCardDialog: React.FC<CreateExamCardDialogProps> = ({ 
  onCreateExam,
  subscriptionType = SubscriptionType.FREE
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [questions, setQuestions] = useState('');
  const [description, setDescription] = useState('');
  
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!title || !subject || !duration || !questions) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const examData = {
      title,
      subject,
      duration: parseInt(duration),
      questions: parseInt(questions),
      description,
      date: new Date().toISOString(),
      id: `exam-${Date.now()}`,
      status: 'not-started'
    };
    
    onCreateExam(examData);
    toast({
      title: "Exam created",
      description: "Your custom exam has been created successfully"
    });
    
    // Reset form and close dialog
    resetForm();
    setOpen(false);
  };
  
  const resetForm = () => {
    setTitle('');
    setSubject('');
    setDuration('');
    setQuestions('');
    setDescription('');
  };
  
  const isPremiumFeature = subscriptionType === SubscriptionType.FREE;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full h-full min-h-[220px]" variant="outline">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-blue-100 rounded-full p-3 mb-3">
              <PlusCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium">Create Custom Exam</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Design your own practice exam
            </p>
            {isPremiumFeature && (
              <Badge variant="outline" className="mt-3 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 border-amber-300">
                <Sparkles className="h-3 w-3 mr-1 text-amber-500" />
                Premium
              </Badge>
            )}
          </div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Custom Exam</DialogTitle>
        </DialogHeader>
        
        {isPremiumFeature ? (
          <div className="py-6 space-y-4">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-100">
                <CardTitle className="flex items-center text-lg">
                  <Sparkles className="h-5 w-5 mr-2 text-amber-500" />
                  Premium Feature
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6">
                  Upgrade to premium to create unlimited custom practice exams tailored to your needs.
                </p>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Exam Title</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Biology Practice Test 1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
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
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input 
                      id="duration"
                      type="number"
                      min="1"
                      placeholder="e.g., 60"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="questions">Number of Questions</Label>
                  <Input 
                    id="questions"
                    type="number"
                    min="1"
                    placeholder="e.g., 20"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea 
                    id="description"
                    placeholder="Add notes about this exam's focus areas or difficulty level"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Exam</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamCardDialog;
