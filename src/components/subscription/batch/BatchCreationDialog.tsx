
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BatchCreationDialogProps {
  onBatchCreate: (batchData: BatchCreationData) => void;
  trigger?: React.ReactNode;
}

interface BatchCreationData {
  name: string;
  planType: 'group' | 'school' | 'corporate';
  maxMembers: number;
  duration: number; // in months
  price: number;
  description?: string;
  features: string[];
}

const planTemplates = {
  group: {
    maxMembers: [5, 10, 15, 20],
    basePrice: 999,
    pricePerMember: 199,
    features: [
      'Shared study plans',
      'Group discussions',
      'Progress tracking',
      'AI tutoring for all members',
      'Collaborative notes'
    ]
  },
  school: {
    maxMembers: [30, 50, 100, 200],
    basePrice: 4999,
    pricePerMember: 99,
    features: [
      'Classroom management',
      'Teacher dashboard',
      'Student progress reports',
      'Bulk content creation',
      'Advanced analytics',
      'Parent portal access'
    ]
  },
  corporate: {
    maxMembers: [50, 100, 250, 500],
    basePrice: 9999,
    pricePerMember: 199,
    features: [
      'Employee training modules',
      'Skill assessment tools',
      'Custom learning paths',
      'Corporate reporting',
      'API integrations',
      'Dedicated support'
    ]
  }
};

const BatchCreationDialog: React.FC<BatchCreationDialogProps> = ({ onBatchCreate, trigger }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<BatchCreationData>({
    name: '',
    planType: 'group',
    maxMembers: 5,
    duration: 12,
    price: 999,
    description: '',
    features: planTemplates.group.features
  });
  
  const { toast } = useToast();

  const handlePlanTypeChange = (planType: 'group' | 'school' | 'corporate') => {
    const template = planTemplates[planType];
    setFormData({
      ...formData,
      planType,
      maxMembers: template.maxMembers[0],
      price: template.basePrice,
      features: template.features
    });
  };

  const handleMembersChange = (maxMembers: number) => {
    const template = planTemplates[formData.planType];
    const price = template.basePrice + (maxMembers - template.maxMembers[0]) * template.pricePerMember;
    setFormData({
      ...formData,
      maxMembers,
      price
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a batch name",
        variant: "destructive"
      });
      return;
    }

    onBatchCreate(formData);
    setOpen(false);
    
    // Reset form
    setFormData({
      name: '',
      planType: 'group',
      maxMembers: 5,
      duration: 12,
      price: 999,
      description: '',
      features: planTemplates.group.features
    });

    toast({
      title: "Batch Created",
      description: `${formData.name} has been created successfully`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Create Batch
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Batch</DialogTitle>
          <DialogDescription>
            Set up a new batch for group learning and collaboration
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Batch Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter batch name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="planType">Plan Type</Label>
              <Select value={formData.planType} onValueChange={handlePlanTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="group">Group Plan</SelectItem>
                  <SelectItem value="school">School Plan</SelectItem>
                  <SelectItem value="corporate">Corporate Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maxMembers">Maximum Members</Label>
              <Select 
                value={formData.maxMembers.toString()} 
                onValueChange={(value) => handleMembersChange(parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {planTemplates[formData.planType].maxMembers.map((count) => (
                    <SelectItem key={count} value={count.toString()}>
                      {count} members
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (months)</Label>
              <Select 
                value={formData.duration.toString()} 
                onValueChange={(value) => setFormData({ ...formData, duration: parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                  <SelectItem value="24">24 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the batch"
            />
          </div>

          <div className="space-y-3">
            <Label>Included Features</Label>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <Badge key={index} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Pricing Summary</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">₹{formData.price.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">
                  for {formData.duration} months ({formData.maxMembers} members)
                </div>
              </div>
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Create Batch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BatchCreationDialog;
