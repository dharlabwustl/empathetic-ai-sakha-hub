
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Clock, Target, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { SubscriptionType } from "@/types/user/base";

interface CreateExamCardDialogProps {
  onCreateExam: (examData: any) => void;
  userSubscription?: SubscriptionType | string;
}

const CreateExamCardDialog: React.FC<CreateExamCardDialogProps> = ({ 
  onCreateExam, 
  userSubscription = SubscriptionType.FREE 
}) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    difficulty: 'medium',
    questionCount: '10',
    timeLimit: '30',
    description: '',
    topics: ''
  });
  const { toast } = useToast();

  const subjects = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'History', 'Geography', 'Computer Science'
  ];

  const difficulties = [
    { value: 'easy', label: 'Easy', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'hard', label: 'Hard', color: 'bg-red-100 text-red-800' }
  ];

  const isPremiumFeature = userSubscription === SubscriptionType.FREE;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isPremiumFeature && parseInt(formData.questionCount) > 10) {
      toast({
        title: "Premium Feature",
        description: "Upgrade to create exams with more than 10 questions",
        variant: "destructive"
      });
      return;
    }

    const examData = {
      ...formData,
      id: `exam_${Date.now()}`,
      questionCount: parseInt(formData.questionCount),
      timeLimit: parseInt(formData.timeLimit),
      topics: formData.topics.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString()
    };

    onCreateExam(examData);
    setOpen(false);
    setFormData({
      title: '',
      subject: '',
      difficulty: 'medium',
      questionCount: '10',
      timeLimit: '30',
      description: '',
      topics: ''
    });

    toast({
      title: "Exam Created",
      description: "Your practice exam has been created successfully!",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-dashed border-2 border-primary/30 bg-primary/5 hover:bg-primary/10">
          <CardContent className="flex flex-col items-center justify-center p-8 text-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <Plus className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Create Custom Exam</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Design your own practice exam with AI-generated questions
            </p>
            <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Create AI-Generated Practice Exam
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Exam Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., Physics Motion Test"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff.value} value={diff.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={diff.color}>{diff.label}</Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="questionCount">Questions</Label>
              <Select value={formData.questionCount} onValueChange={(value) => setFormData({...formData, questionCount: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 Questions</SelectItem>
                  <SelectItem value="10">10 Questions</SelectItem>
                  <SelectItem value="15" disabled={isPremiumFeature}>15 Questions {isPremiumFeature && "(Premium)"}</SelectItem>
                  <SelectItem value="20" disabled={isPremiumFeature}>20 Questions {isPremiumFeature && "(Premium)"}</SelectItem>
                  <SelectItem value="30" disabled={isPremiumFeature}>30 Questions {isPremiumFeature && "(Premium)"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (min)</Label>
              <Select value={formData.timeLimit} onValueChange={(value) => setFormData({...formData, timeLimit: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topics">Topics (comma-separated)</Label>
            <Input
              id="topics"
              value={formData.topics}
              onChange={(e) => setFormData({...formData, topics: e.target.value})}
              placeholder="e.g., Kinematics, Newton's Laws, Energy"
            />
            <p className="text-xs text-muted-foreground">
              Specify topics to focus the AI question generation
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Additional instructions for the AI..."
              rows={3}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Generation time: ~30 seconds</span>
            </div>
            
            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Target className="h-4 w-4 mr-2" />
                Generate Exam
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamCardDialog;
