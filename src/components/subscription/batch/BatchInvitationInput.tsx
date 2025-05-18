
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { subscriptionService } from '@/services/api/apiServices';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Users, Check, Loader2 } from "lucide-react";
import InvitationCodeDisplay from './InvitationCodeDisplay';

interface BatchInvitationInputProps {
  planId: string;
  maxMembers: number;
}

const BatchInvitationInput: React.FC<BatchInvitationInputProps> = ({ planId, maxMembers }) => {
  const [emails, setEmails] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [inviteCode, setInviteCode] = useState<string>("");
  const { toast } = useToast();

  const validateEmails = (emailsString: string): boolean => {
    const emailList = emailsString.split(",").map(e => e.trim());
    
    if (emailList.length > maxMembers) {
      toast({
        title: "Too many emails",
        description: `You can invite up to ${maxMembers} members with this plan.`,
        variant: "destructive"
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = emailList.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      toast({
        title: "Invalid email(s)",
        description: `These emails are invalid: ${invalidEmails.join(", ")}`,
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handleCreateInvitation = async () => {
    if (!validateEmails(emails)) return;
    
    setLoading(true);
    
    try {
      const emailList = emails.split(",").map(e => e.trim());
      
      // In a real app, this would create a batch invitation and send emails
      // For demo, we'll simulate a response
      
      // Example API call (replace with actual implementation)
      const response = await subscriptionService.createBatchInvitation({
        planId,
        emails: emailList
      });
      
      if (response.success) {
        // Generate a mock invite code for demonstration
        const mockInviteCode = `BATCH-${planId.substring(0, 4)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        setInviteCode(mockInviteCode);
        
        toast({
          title: "Invitation created!",
          description: "Invitation code generated successfully."
        });
      } else {
        toast({
          title: "Failed to create invitation",
          description: response.error || "Unknown error occurred",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error creating batch invitation:", error);
      toast({
        title: "Error",
        description: "Failed to create invitation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-medium">Invite Team Members</h3>
          </div>
          
          {!inviteCode ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="emails">Email Addresses (comma-separated)</Label>
                <Input
                  id="emails"
                  placeholder="user1@example.com, user2@example.com"
                  value={emails}
                  onChange={(e) => setEmails(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  You can invite up to {maxMembers} members with this plan.
                </p>
              </div>
              
              <Button 
                className="w-full" 
                onClick={handleCreateInvitation}
                disabled={loading || !emails.trim()}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Invitation Code
                  </>
                )}
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-900/40">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Check className="h-5 w-5" />
                  <p className="font-medium">Invitation created successfully!</p>
                </div>
                <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                  Share this code with your team members or copy their email addresses above to send invitations.
                </p>
              </div>
              
              <InvitationCodeDisplay inviteCode={inviteCode} />
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setInviteCode("");
                  setEmails("");
                }}
              >
                Create Another Invitation
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Team members will need to create an account and enter this invitation code to join your subscription.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BatchInvitationInput;
