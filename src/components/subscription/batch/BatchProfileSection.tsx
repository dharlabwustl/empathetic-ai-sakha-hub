
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BatchMemberUploader from './BatchMemberUploader';
import { useToast } from "@/hooks/use-toast";
import { BatchDetails } from './types';

interface BatchProfileSectionProps {
  userBatches?: BatchDetails[];
  onInviteMembers: (emails: string[]) => void;
}

const BatchProfileSection: React.FC<BatchProfileSectionProps> = ({
  userBatches = [],
  onInviteMembers
}) => {
  const { toast } = useToast();
  
  const handleUploadComplete = (emails: string[]) => {
    toast({
      title: "Processing invitations",
      description: `${emails.length} email(s) will be invited to join your batch.`
    });
    onInviteMembers(emails);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Batch Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="manage">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manage">Manage Batches</TabsTrigger>
            <TabsTrigger value="invite">Invite Members</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manage">
            {userBatches.length > 0 ? (
              <div className="space-y-4">
                {userBatches.map(batch => (
                  <Card key={batch.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{batch.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-muted-foreground">
                        <p>Members: {batch.members.length} / {batch.maxMembers}</p>
                        <p>Active until: {new Date(batch.expiryDate || "").toLocaleDateString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No batches found. Start by inviting members to create a batch.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="invite">
            <BatchMemberUploader
              onUploadComplete={handleUploadComplete}
              maxMembers={50}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BatchProfileSection;
