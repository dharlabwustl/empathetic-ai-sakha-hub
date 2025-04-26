
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Plus, Trash2, ArrowLeft, UserCheck, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BatchMemberUploaderProps {
  onUploadComplete: (emails: string[]) => void;
  maxMembers: number;
  currentMemberCount?: number;
}

const BatchMemberUploader: React.FC<BatchMemberUploaderProps> = ({
  onUploadComplete,
  maxMembers,
  currentMemberCount = 1
}) => {
  const { toast } = useToast();
  const [emails, setEmails] = useState<string[]>(['']);
  const [uploading, setUploading] = useState(false);
  
  const validateEmail = (email: string): boolean => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email.toLowerCase());
  };
  
  const handleEmailChange = (index: number, value: string) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };
  
  const addEmailField = () => {
    if (currentMemberCount + emails.length >= maxMembers) {
      toast({
        title: "Member limit reached",
        description: `You can only have ${maxMembers} members in your batch.`,
        variant: "destructive",
      });
      return;
    }
    setEmails([...emails, '']);
  };
  
  const removeEmailField = (index: number) => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    setEmails(updatedEmails);
  };
  
  const handleSubmit = async () => {
    // Validate emails
    const invalidEmails = emails.filter(email => email.trim() !== '' && !validateEmail(email));
    if (invalidEmails.length > 0) {
      toast({
        title: "Invalid email format",
        description: "Please enter valid email addresses.",
        variant: "destructive",
      });
      return;
    }
    
    // Filter out empty emails
    const validEmails = emails.filter(email => email.trim() !== '');
    if (validEmails.length === 0) {
      toast({
        title: "No emails to invite",
        description: "Please enter at least one email address.",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    try {
      // In a real app, this would call an API to send invitations
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      onUploadComplete(validEmails);
      setEmails(['']);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleBulkUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedEmails = content
          .split(/[\n,;]/) // Split by newline, comma, or semicolon
          .map(email => email.trim())
          .filter(email => email !== '' && validateEmail(email));
        
        if (parsedEmails.length === 0) {
          toast({
            title: "No valid emails found",
            description: "The file doesn't contain any valid email addresses.",
            variant: "destructive",
          });
          return;
        }
        
        if (currentMemberCount + parsedEmails.length > maxMembers) {
          toast({
            title: "Too many members",
            description: `You can only invite ${maxMembers - currentMemberCount} more members.`,
            variant: "destructive",
          });
          return;
        }
        
        setEmails(parsedEmails);
        
        toast({
          title: "Emails uploaded",
          description: `${parsedEmails.length} email addresses loaded.`,
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to parse email addresses. Please check the file format.",
          variant: "destructive",
        });
      }
    };
    
    reader.readAsText(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Invite Batch Members
        </CardTitle>
        <CardDescription>
          Enter the email addresses of students you want to invite to your batch.
          They will receive an email with instructions to join.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {currentMemberCount + emails.filter(e => e.trim() !== '').length - 1} of {maxMembers} members used
            </p>
            <div className="flex gap-2">
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
                  <Upload size={14} />
                  <span>Upload CSV</span>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  accept=".csv,.txt"
                  className="hidden"
                  onChange={handleBulkUpload}
                />
              </label>
            </div>
          </div>
          
          <div className="space-y-2">
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-grow">
                  <Label htmlFor={`email-${index}`} className="sr-only">
                    Email {index + 1}
                  </Label>
                  <Input
                    id={`email-${index}`}
                    type="email"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => removeEmailField(index)}
                  disabled={emails.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            type="button"
            className="w-full flex items-center justify-center"
            onClick={addEmailField}
            disabled={currentMemberCount + emails.length > maxMembers}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Another Email
          </Button>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md text-sm text-blue-700 dark:text-blue-300">
            <p>
              <strong>Note:</strong> Invitees will receive an email with a unique invitation code 
              and instructions to join your batch.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          type="button"
          className="flex items-center"
          onClick={() => onUploadComplete([])}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button
          type="button"
          className="flex items-center"
          disabled={emails.every(email => email.trim() === '') || uploading}
          onClick={handleSubmit}
        >
          {uploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending Invitations...
            </>
          ) : (
            <>
              <UserCheck className="mr-2 h-4 w-4" /> Send Invitations
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BatchMemberUploader;
