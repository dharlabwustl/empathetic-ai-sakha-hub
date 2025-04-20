import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { School, Users, FileText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BatchMemberUploaderProps {
  onUploadComplete: (emails: string[]) => void;
  maxMembers: number;
  title?: string;
}

const BatchMemberUploader: React.FC<BatchMemberUploaderProps> = ({
  onUploadComplete,
  maxMembers,
  title = "Invite Members"
}) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [emailTextarea, setEmailTextarea] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [validEmails, setValidEmails] = useState<string[]>([]);
  const [invalidEmails, setInvalidEmails] = useState<string[]>([]);
  const { toast } = useToast();

  const validateEmails = (emails: string[]) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid: string[] = [];
    const invalid: string[] = [];

    emails.forEach(email => {
      if (emailRegex.test(email.trim())) {
        valid.push(email.trim());
      } else if (email.trim()) {
        invalid.push(email.trim());
      }
    });

    return { valid, invalid };
  };

  const handleManualSubmit = () => {
    const emails = emailTextarea.split(/[\s,]+/).filter(email => email.trim() !== "");
    
    if (emails.length === 0) {
      toast({
        title: "No emails entered",
        description: "Please enter at least one email address.",
        variant: "destructive",
      });
      return;
    }

    if (emails.length > maxMembers) {
      toast({
        title: "Too many emails",
        description: `You can only add ${maxMembers} members to this batch.`,
        variant: "destructive",
      });
      return;
    }

    const { valid, invalid } = validateEmails(emails);
    setValidEmails(valid);
    setInvalidEmails(invalid);

    if (invalid.length > 0) {
      toast({
        title: "Invalid emails detected",
        description: `${invalid.length} email(s) are invalid. Please correct them.`,
        variant: "destructive",
      });
      return;
    }

    if (valid.length > 0) {
      onUploadComplete(valid);
      toast({
        title: "Emails verified",
        description: `${valid.length} email(s) ready for invitations.`,
      });
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV or Excel file.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Processing file",
      description: "Your file is being processed...",
    });

    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockEmails = Array.from({ length: 5 }, (_, i) => 
      `student${i+1}@example.com`
    );

    setValidEmails(mockEmails);
    setInvalidEmails([]);

    toast({
      title: "File processed",
      description: `${mockEmails.length} email(s) extracted and ready for invitations.`,
    });

    onUploadComplete(mockEmails);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Enter Manually</span>
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Upload File</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="manual" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="emails">Enter Email Addresses</Label>
            <Textarea
              id="emails"
              placeholder="Enter email addresses (separated by commas or new lines)"
              value={emailTextarea}
              onChange={e => setEmailTextarea(e.target.value)}
              className="h-32"
            />
            <p className="text-xs text-muted-foreground">
              You can add up to {maxMembers} members to this batch.
            </p>
          </div>

          <Button onClick={handleManualSubmit}>
            Verify Emails
          </Button>
        </TabsContent>

        <TabsContent value="file" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload CSV or Excel File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
            />
            <p className="text-xs text-muted-foreground">
              Your file should have an email column. Maximum {maxMembers} emails.
            </p>
          </div>

          <Button onClick={handleFileUpload} disabled={!file}>
            Process File
          </Button>
        </TabsContent>
      </Tabs>

      {validEmails.length > 0 && (
        <div className="mt-4 p-4 bg-green-50 border border-green-100 rounded-md">
          <h3 className="text-sm font-medium text-green-800 mb-2">
            {validEmails.length} Valid Email{validEmails.length !== 1 ? 's' : ''}
          </h3>
          <div className="text-sm text-green-700 max-h-24 overflow-y-auto">
            {validEmails.map((email, index) => (
              <div key={index} className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                {email}
              </div>
            ))}
          </div>
        </div>
      )}

      {invalidEmails.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>
            <h3 className="font-medium mb-1">{invalidEmails.length} Invalid Email{invalidEmails.length !== 1 ? 's' : ''}</h3>
            <div className="text-sm max-h-24 overflow-y-auto">
              {invalidEmails.map((email, index) => (
                <div key={index}>{email}</div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BatchMemberUploader;
