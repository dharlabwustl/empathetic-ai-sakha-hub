
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Coins, Crown, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CreateExamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateExamDialog: React.FC<CreateExamDialogProps> = ({ open, onOpenChange }) => {
  const { toast } = useToast();
  const [examData, setExamData] = useState({
    subject: '',
    topic: '',
    difficulty: '',
    questions: 20,
    duration: 30
  });

  const creditPlans = [
    {
      id: 'basic',
      name: 'Basic Pack',
      credits: 5,
      price: 9.99,
      color: 'bg-blue-500',
      icon: <Coins className="h-5 w-5" />
    },
    {
      id: 'standard',
      name: 'Standard Pack',
      credits: 15,
      price: 24.99,
      color: 'bg-purple-500',
      icon: <Zap className="h-5 w-5" />,
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Pack',
      credits: 30,
      price: 39.99,
      color: 'bg-gold-500',
      icon: <Crown className="h-5 w-5" />
    }
  ];

  const handleCreateExam = () => {
    if (!examData.subject || !examData.topic || !examData.difficulty) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Mock exam creation - would integrate with backend
    toast({
      title: "Exam Created Successfully!",
      description: `Your ${examData.subject} exam has been created with ${examData.questions} questions.`,
    });
    
    onOpenChange(false);
  };

  const handlePurchaseCredits = (planId: string) => {
    toast({
      title: "Purchase Credits",
      description: `Redirecting to payment for ${planId} plan...`,
    });
    // Would integrate with payment system
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create Custom Practice Exam</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exam Configuration */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Exam Configuration</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={examData.subject} onValueChange={(value) => setExamData(prev => ({ ...prev, subject: value }))}>
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

                  <div>
                    <Label htmlFor="topic">Topic *</Label>
                    <Input
                      id="topic"
                      placeholder="Enter specific topic (e.g., Mechanics, Organic Chemistry)"
                      value={examData.topic}
                      onChange={(e) => setExamData(prev => ({ ...prev, topic: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty Level *</Label>
                    <Select value={examData.difficulty} onValueChange={(value) => setExamData(prev => ({ ...prev, difficulty: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="questions">Number of Questions</Label>
                      <Select value={examData.questions.toString()} onValueChange={(value) => setExamData(prev => ({ ...prev, questions: parseInt(value) }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10 Questions</SelectItem>
                          <SelectItem value="20">20 Questions</SelectItem>
                          <SelectItem value="30">30 Questions</SelectItem>
                          <SelectItem value="50">50 Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Select value={examData.duration.toString()} onValueChange={(value) => setExamData(prev => ({ ...prev, duration: parseInt(value) }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Coins className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Credit Cost: 1 Credit</span>
                  </div>
                  <p className="text-xs text-blue-600">Each custom exam requires 1 credit to generate</p>
                </div>

                <Button onClick={handleCreateExam} className="w-full mt-4">
                  Create Exam (1 Credit)
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Credit Plans */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Purchase Exam Credits</h3>
                
                <div className="space-y-4">
                  {creditPlans.map((plan) => (
                    <Card key={plan.id} className={`border-2 transition-all duration-200 hover:shadow-lg ${plan.popular ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-full ${plan.color} text-white`}>
                              {plan.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold">{plan.name}</h4>
                              {plan.popular && (
                                <Badge variant="secondary" className="text-xs">Most Popular</Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold">${plan.price}</p>
                            <p className="text-sm text-gray-600">{plan.credits} credits</p>
                          </div>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-3">
                          <p>• Create {plan.credits} custom practice exams</p>
                          <p>• Choose your subjects and topics</p>
                          <p>• Adjust difficulty levels</p>
                          <p>• Detailed performance analytics</p>
                        </div>

                        <Button 
                          onClick={() => handlePurchaseCredits(plan.id)}
                          className="w-full"
                          variant={plan.popular ? "default" : "outline"}
                        >
                          Purchase {plan.credits} Credits
                        </Button>

                        <p className="text-xs text-center text-gray-500 mt-2">
                          ${(plan.price / plan.credits).toFixed(2)} per exam
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600 text-center">
                    Credits never expire • Secure payment • Instant access
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateExamDialog;
