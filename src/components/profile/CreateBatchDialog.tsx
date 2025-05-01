
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BatchCreationData } from "@/types/user/batch";

interface CreateBatchDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateBatch: (batchData: BatchCreationData) => void;
  memberLimit: number;
}

export const CreateBatchDialog = ({
  open,
  onClose,
  onCreateBatch,
  memberLimit = 5
}: CreateBatchDialogProps) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState<BatchCreationData>({
    batchName: "",
    examGoal: "",
    targetYear: new Date().getFullYear() + 1,
    allowProgressVisibility: true,
    allowLeadershipTransfer: false,
    invites: []
  });
  
  const [currentInvite, setCurrentInvite] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSwitchChange = (name: string) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };
  
  const handleSelectChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInviteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentInvite(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddInvite = () => {
    if (!currentInvite.email.trim() || !currentInvite.name.trim()) return;
    
    setFormData(prev => ({
      ...prev,
      invites: [...prev.invites, { ...currentInvite }]
    }));
    
    setCurrentInvite({
      name: "",
      email: "",
      phone: ""
    });
  };
  
  const handleRemoveInvite = (email: string) => {
    setFormData(prev => ({
      ...prev,
      invites: prev.invites.filter(invite => invite.email !== email)
    }));
  };
  
  const handleSubmit = () => {
    // Basic validation
    if (!formData.batchName || !formData.examGoal || !formData.targetYear) {
      // In a real app, show errors
      return;
    }
    
    onCreateBatch(formData);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddInvite();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Create New Batch</DialogTitle>
          <DialogDescription>
            Create a study batch to invite students and learn together
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="invites">Invite Members</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="batchName">Batch Name</Label>
              <Input
                id="batchName"
                name="batchName"
                placeholder="Enter a name for your batch"
                value={formData.batchName}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="examGoal">Exam Goal</Label>
              <Select
                value={formData.examGoal}
                onValueChange={(value) => handleSelectChange("examGoal", value)}
              >
                <SelectTrigger id="examGoal">
                  <SelectValue placeholder="Select exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JEE">JEE</SelectItem>
                  <SelectItem value="NEET">NEET</SelectItem>
                  <SelectItem value="UPSC">UPSC</SelectItem>
                  <SelectItem value="CAT">CAT</SelectItem>
                  <SelectItem value="GATE">GATE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="targetYear">Target Year</Label>
              <Select
                value={formData.targetYear.toString()}
                onValueChange={(value) => handleSelectChange("targetYear", parseInt(value))}
              >
                <SelectTrigger id="targetYear">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Separator className="my-4" />
            
            <h3 className="text-sm font-medium">Batch Settings</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allowProgressVisibility">Allow Progress Visibility</Label>
                <p className="text-xs text-muted-foreground">
                  Let members see each other's study progress
                </p>
              </div>
              <Switch
                id="allowProgressVisibility"
                checked={formData.allowProgressVisibility}
                onCheckedChange={() => handleSwitchChange("allowProgressVisibility")}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allowLeadershipTransfer">Allow Leadership Transfer</Label>
                <p className="text-xs text-muted-foreground">
                  Let you transfer batch leadership to another member
                </p>
              </div>
              <Switch
                id="allowLeadershipTransfer"
                checked={formData.allowLeadershipTransfer}
                onCheckedChange={() => handleSwitchChange("allowLeadershipTransfer")}
              />
            </div>
            
            <div className="pt-2 flex justify-between items-center">
              <div className="text-sm">
                <span className="font-medium">Member Limit: </span>
                <span className="text-muted-foreground">{memberLimit} students</span>
              </div>
              
              <Button onClick={() => setActiveTab("invites")}>Next: Invite Members</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="invites" className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Invite Members</h3>
              <p className="text-xs text-muted-foreground mb-4">
                You can invite up to {memberLimit} members to your batch. You can also add more members later.
              </p>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="inviteName" className="text-xs">Name</Label>
                    <Input
                      id="inviteName"
                      name="name"
                      placeholder="Student name"
                      value={currentInvite.name}
                      onChange={handleInviteInputChange}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="inviteEmail" className="text-xs">Email</Label>
                    <Input
                      id="inviteEmail"
                      name="email"
                      placeholder="student@example.com"
                      type="email"
                      value={currentInvite.email}
                      onChange={handleInviteInputChange}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="invitePhone" className="text-xs">Phone (optional)</Label>
                    <Input
                      id="invitePhone"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={currentInvite.phone}
                      onChange={handleInviteInputChange}
                      onKeyDown={handleKeyPress}
                    />
                  </div>
                  <Button
                    type="button"
                    className="mt-auto"
                    onClick={handleAddInvite}
                  >
                    Add
                  </Button>
                </div>
              </div>
              
              {formData.invites.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Invited Members ({formData.invites.length}/{memberLimit})</h4>
                  
                  <div className="border rounded-md divide-y">
                    {formData.invites.map((invite, idx) => (
                      <div key={idx} className="flex justify-between items-center p-2">
                        <div>
                          <div className="font-medium text-sm">{invite.name}</div>
                          <div className="text-xs text-muted-foreground">{invite.email}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 h-8 px-2"
                          onClick={() => handleRemoveInvite(invite.email)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="pt-2 flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>Back</Button>
              <Button onClick={handleSubmit}>Create Batch</Button>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="pt-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
