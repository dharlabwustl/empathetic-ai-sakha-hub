
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Users, Mail, Shield, Copy, Check, AlertCircle, X } from 'lucide-react';
import { GroupSetupFormData } from './batch/types';

interface Plan {
  id: string;
  name: string;
  price: number;
  userCount?: number;
  planType?: 'group' | 'school' | 'corporate';
}

interface GroupPlanInviteModalProps {
  plan: Plan;
  onClose: () => void;
  onComplete: (emails: string[], inviteCodes: string[], batchName: string, roleType: string) => void;
}

export default function GroupPlanInviteModal({ plan, onClose, onComplete }: GroupPlanInviteModalProps) {
  const [formData, setFormData] = useState<GroupSetupFormData>({
    batchName: '',
    roleType: 'batch_leader',
    inviteMethod: 'email',
    emails: [],
  });
  const [currentEmail, setCurrentEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [inviteCodes] = useState<string[]>(
    Array(getMaxUsers()).fill(0).map(() => 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase())
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getMaxUsers = () => plan.userCount || 5;
  const remainingInvites = getMaxUsers() - 1 - formData.emails.length;

  const addEmail = () => {
    if (!currentEmail.trim()) return;
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(currentEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (formData.emails.includes(currentEmail)) {
      toast({
        title: "Duplicate Email",
        description: "This email has already been added",
        variant: "destructive",
      });
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      emails: [...prev.emails, currentEmail]
    }));
    setCurrentEmail('');
  };

  const removeEmail = (email: string) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails.filter(e => e !== email)
    }));
  };

  const handleSubmit = () => {
    if (!formData.batchName.trim()) {
      toast({
        title: "Batch Name Required",
        description: "Please enter a name for your batch",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      onComplete(
        formData.emails,
        inviteCodes.slice(0, Math.max(formData.emails.length, 1)),
        formData.batchName,
        formData.roleType
      );
      setIsSubmitting(false);
    }, 500);
  };

  const copyInviteCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    
    toast({
      title: "Code Copied!",
      description: "Invitation code copied to clipboard",
    });
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Set Up Your {plan.planType === 'school' ? 'School' : plan.planType === 'corporate' ? 'Corporate' : 'Group'} Plan
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Plan Summary Card */}
          <Card className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-4 border-purple-200 dark:border-purple-900">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{plan.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Up to {getMaxUsers()} users • ₹{Math.round(plan.price / getMaxUsers())}/user/month
                </p>
                <Badge className="mt-2 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                  {plan.planType === 'school' ? 'Educational' : plan.planType === 'corporate' ? 'Business' : 'Group'} License
                </Badge>
              </div>
            </div>
          </Card>

          {/* Batch Setup Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batch-name">Batch Name</Label>
              <Input 
                id="batch-name"
                placeholder="Enter a meaningful name for your batch"
                value={formData.batchName}
                onChange={(e) => setFormData(prev => ({ ...prev, batchName: e.target.value }))}
                className="border-purple-200 dark:border-purple-900 focus:border-purple-300 dark:focus:border-purple-700"
              />
            </div>

            <Separator className="my-4" />

            <Tabs value={formData.inviteMethod} onValueChange={(v) => setFormData(prev => ({ ...prev, inviteMethod: v as 'email' | 'code' }))}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" /> Invite by Email
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Manage Access Codes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Invite Members ({formData.emails.length}/{getMaxUsers() - 1})</Label>
                    <span className="text-sm text-purple-600 dark:text-purple-400">
                      {remainingInvites} invite{remainingInvites !== 1 ? 's' : ''} remaining
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <Input
                      placeholder="colleague@example.com"
                      value={currentEmail}
                      onChange={(e) => setCurrentEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addEmail()}
                      disabled={formData.emails.length >= getMaxUsers() - 1}
                      className="border-purple-200 dark:border-purple-900"
                    />
                    <Button
                      onClick={addEmail}
                      disabled={formData.emails.length >= getMaxUsers() - 1 || !currentEmail.trim()}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Add
                    </Button>
                  </div>

                  <ScrollArea className="h-[200px]">
                    <AnimatePresence>
                      {formData.emails.map((email, index) => (
                        <motion.div
                          key={email}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-lg px-4 py-2 mb-2"
                        >
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm">{email}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEmail(email)}
                            className="h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-900"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="code" className="space-y-4">
                <Label>Access Codes</Label>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-2">
                    {inviteCodes.slice(0, getMaxUsers() - 1).map((code, index) => (
                      <div
                        key={code}
                        className="flex items-center justify-between bg-purple-50 dark:bg-purple-900/20 rounded-lg px-4 py-2"
                      >
                        <code className="font-mono text-sm text-purple-700 dark:text-purple-300">
                          {code}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyInviteCode(code, index)}
                          className="flex items-center space-x-1 hover:bg-purple-100 dark:hover:bg-purple-900"
                        >
                          {copiedIndex === index ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          <span>{copiedIndex === index ? "Copied" : "Copy"}</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Warning Message */}
          <div className="flex items-start space-x-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              You'll be able to invite more members and manage your batch after completing the payment process.
              Access codes will be activated once payment is confirmed.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !formData.batchName.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              'Continue to Payment'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
