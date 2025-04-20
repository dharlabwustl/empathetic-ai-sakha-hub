import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Mail, Share2, UserPlus, X, Copy, Check, AlertCircle, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteMethod, setInviteMethod] = useState<'email' | 'code'>('email');
  const [batchName, setBatchName] = useState('');
  const [roleType, setRoleType] = useState('batch_leader'); // batch_leader, school_admin, corporate_admin
  const { toast } = useToast();
  
  // Determine the maximum number of users based on the plan type
  const getMaxUsers = () => {
    if (plan.planType === 'school') return 50;
    if (plan.planType === 'corporate') return 100;
    return plan.userCount || 5; // Default to 5 for group plans
  };
  
  // Generate unique invite codes for each potential user in the group
  const [inviteCodes, setInviteCodes] = useState<string[]>(
    Array(getMaxUsers()).fill(0).map(() => 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase())
  );
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  
  const addEmail = () => {
    if (!currentEmail.trim()) return;
    
    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(currentEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    if (emails.includes(currentEmail)) {
      toast({
        title: "Duplicate Email",
        description: "This email has already been added",
        variant: "destructive",
      });
      return;
    }
    
    setEmails([...emails, currentEmail]);
    setCurrentEmail('');
  };
  
  const removeEmail = (email: string) => {
    setEmails(emails.filter(e => e !== email));
  };
  
  const handleSubmit = () => {
    // Validate batch name
    if (!batchName.trim()) {
      toast({
        title: "Batch Name Required",
        description: "Please enter a name for your batch",
        variant: "destructive",
      });
      return;
    }
    
    if (inviteMethod === 'email' && emails.length === 0) {
      toast({
        title: "No Members Added",
        description: "Add at least one member or continue with just yourself",
        variant: "default",
      });
    }
    
    setIsSubmitting(true);
    
    // For the actual implementation, we'll pass the emails, invite codes, batch name, and role type
    setTimeout(() => {
      onComplete(emails, inviteCodes.slice(0, Math.max(emails.length, 1)), batchName, roleType);
      setIsSubmitting(false);
    }, 500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addEmail();
    }
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

  // Calculate how many more invites can be added
  const maxInvites = getMaxUsers() - 1; // -1 for the plan owner
  const remainingInvites = maxInvites - emails.length;
  
  const getPlanTypeTitle = () => {
    switch (plan.planType) {
      case 'school':
        return 'School Plan';
      case 'corporate':
        return 'Corporate Plan';
      default:
        return 'Group Plan';
    }
  };
  
  const getRoleOptions = () => {
    switch (plan.planType) {
      case 'school':
        return (
          <Select value={roleType} onValueChange={setRoleType}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role Type</SelectLabel>
                <SelectItem value="school_admin">School Administrator</SelectItem>
                <SelectItem value="batch_leader">Batch Leader</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      case 'corporate':
        return (
          <Select value={roleType} onValueChange={setRoleType}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role Type</SelectLabel>
                <SelectItem value="corporate_admin">Corporate Administrator</SelectItem>
                <SelectItem value="batch_leader">Department Leader</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      default:
        return (
          <Select value={roleType} onValueChange={setRoleType}>
            <SelectTrigger>
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role Type</SelectLabel>
                <SelectItem value="batch_leader">Batch Leader</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        );
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Set Up Your {getPlanTypeTitle()}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-grow">
          <div className="space-y-4 py-2 pr-4">
            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-200">
              <p>You're setting up a {plan.planType || 'group'} plan for up to {getMaxUsers()} users.</p>
              <p className="mt-1">
                <strong>Total price: ₹{plan.price}/month</strong>
                <span className="text-blue-600 dark:text-blue-300"> (₹{Math.round(plan.price / getMaxUsers())}/user)</span>
              </p>
              <p className="mt-1 text-xs">You can invite up to {maxInvites} users to join your group. You'll be charged after proceeding to payment.</p>
            </div>

            {/* Batch Name Input */}
            <div className="space-y-2">
              <Label htmlFor="batch-name">Batch Name</Label>
              <Input
                id="batch-name"
                placeholder="Enter a name for your batch"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
              />
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label>Your Role</Label>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-blue-500" />
                {getRoleOptions()}
              </div>
            </div>

            {/* Invite Method Tabs */}
            <Tabs defaultValue="email" onValueChange={(v) => setInviteMethod(v as 'email' | 'code')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="email" className="flex items-center gap-1">
                  <Mail size={14} /> Invite by Email
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-1">
                  <Share2 size={14} /> Manage Invite Codes
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email" className="mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Invite Members (Up to {maxInvites})</Label>
                      <span className="text-sm text-blue-600 dark:text-blue-400">
                        {remainingInvites} invite{remainingInvites !== 1 ? 's' : ''} remaining
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <Input
                        placeholder="friend@example.com"
                        value={currentEmail}
                        onChange={(e) => setCurrentEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={emails.length >= maxInvites}
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={addEmail}
                        disabled={emails.length >= maxInvites || !currentEmail.trim()}
                      >
                        <UserPlus size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2">
                    <AnimatePresence>
                      {emails.map((email, index) => (
                        <motion.div
                          key={email}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2"
                        >
                          <span className="text-sm truncate">{email}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeEmail(email)}
                          >
                            <X size={14} />
                          </Button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {emails.length === 0 && (
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-sm">
                      <AlertCircle size={16} />
                      <span>No members added yet. You can proceed with just yourself as the batch leader.</span>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-4">
                <div className="space-y-4">
                  <Label>Invitation Codes for Your Members</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Share these codes with your group members. They can use them during signup or activate from their profile.
                  </p>

                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {inviteCodes.slice(0, Math.max(5, emails.length)).map((code, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2 font-mono text-sm">
                          {code}
                        </div>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => copyInviteCode(code, index)}
                        >
                          {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                          {copiedIndex === index ? "Copied" : "Copy"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <div className="flex justify-between gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !batchName.trim()}
              className="min-w-[140px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Continue to Payment'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
