
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FeatureEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feature: any;
  onSave: (editedFeature: any) => void;
}

const FeatureEditDialog: React.FC<FeatureEditDialogProps> = ({ isOpen, onClose, feature, onSave }) => {
  const [editedFeature, setEditedFeature] = useState(feature);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedFeature(prev => ({ ...prev, [name]: value }));
  };

  const handleTogglePremium = (checked: boolean) => {
    setEditedFeature(prev => ({ ...prev, isPremium: checked }));
  };

  const handleSave = () => {
    onSave(editedFeature);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Feature</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">Title</Label>
            <Input
              id="title"
              name="title"
              value={editedFeature.title}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={editedFeature.description}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="path" className="text-right">Path</Label>
            <Input
              id="path"
              name="path"
              value={editedFeature.path}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subscription" className="text-right">Subscription</Label>
            <div className="flex items-center gap-2 col-span-3">
              <Switch
                id="subscription"
                checked={editedFeature.isPremium}
                onCheckedChange={handleTogglePremium}
              />
              <span>{editedFeature.isPremium ? 'Premium' : 'Basic'}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureEditDialog;
