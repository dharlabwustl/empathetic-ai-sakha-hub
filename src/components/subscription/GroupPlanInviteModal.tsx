
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Mail, Share2, UserPlus, X, Copy, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface Plan {
  id: string;
  name: string;
  price: number;
  userCount?: number;
}

interface GroupPlanInviteModalProps {
  plan: Plan;
  onClose: () => void;
  onComplete: (emails: string[], inviteCodes: string[]) => void;
}

export default function GroupPlanInviteModal({ plan, onClose, onComplete }: GroupPlanInviteModalProps) {
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteMethod, setInviteMethod] = useState<'email' | 'code'>('email');
  const { toast } = useToast();
  
  // Generate unique invite codes for each potential user in the group
  const [inviteCodes, setInviteCodes] = useState<string[]>(
    Array(5).fill(0).map(() => 'SAKHA-' + Math.random().toString(36).substring(2, 8).toUpperCase())
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
    if (inviteMethod === 'email' && emails.length === 0) {
      toast({
        title: "No Emails Added",
        description: "Please add at least one email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // For the actual implementation, we'll pass the emails and invite codes
    // to the parent component to continue the checkout process
    setTimeout(() => {
      onComplete(emails, inviteCodes.slice(0, Math.max(emails.length, 1)));
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
  const maxInvites = (plan.userCount || 5) - 1; // -1 for the plan owner
  const remainingInvites = maxInvites - emails.length;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Set Up Your {plan.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-2">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-200">
            <p>You're setting up a group plan for {plan.userCount} users.</p>
            <p className="mt-1">
              <strong>Total price: ₹{plan.price}/month</strong> 
              <span className="text-blue-600 dark:text-blue-300"> (₹{Math.round(plan.price / (plan.userCount || 5))}/user)</span>
            </p>
            <p className="mt-1 text-xs">You can invite up to {maxInvites} users to join your group. You'll be charged only after proceeding to payment.</p>
          </div>
          
          <Tabs defaultValue="email" onValueChange={(v) => setInviteMethod(v as 'email' | 'code')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="email" className="flex items-center gap-1">
                <Mail size={14} /> Invite by Email
              </TabsTrigger>
              <TabsTrigger value="code" className="flex items-center gap-1">
                <Share2 size={14} /> Manage Invite Codes
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="email" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>Invite Friends (Up to {maxInvites})</Label>
                <div className="flex justify-between items-center">
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
                
                {emails.length >= maxInvites && (
                  <p className="text-amber-600 dark:text-amber-400 text-xs">
                    You've reached the maximum number of invitations for this plan.
                  </p>
                )}
                
                <div className="mt-2">
                  <AnimatePresence>
                    {emails.map((email, index) => (
                      <motion.div
                        key={email}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2 mb-2"
                      >
                        <span className="text-sm truncate">{email}</span>
                        <div className="flex items-center gap-2">
                          <div className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
                            {inviteCodes[index] || "Code pending"}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0" 
                            onClick={() => removeEmail(email)}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  You'll proceed to payment after selecting your group members. Each person will receive
                  a unique activation code to access premium features.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="code" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>Invitation Codes for Your Group Members</Label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  Share these codes with your group members. They can use them during signup or activate from their profile page.
                </p>
                
                <div className="space-y-2">
                  {inviteCodes.map((code, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2 font-mono text-sm">
                        {code}
                      </div>
                      <Button 
                        type="button" 
                        size="sm" 
                        variant="outline"
                        className="flex items-center gap-1"
                        onClick={() => copyInviteCode(code, index)}
                      >
                        {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                        {copiedIndex === index ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md text-sm text-amber-700 dark:text-amber-200 mt-4">
                  <p className="flex items-start">
                    <span className="mr-2">ℹ️</span>
                    <span>
                      You'll be able to manage and view these codes in your profile after payment. 
                      These codes will only activate after you complete the payment.
                    </span>
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              'Continue to Payment'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
