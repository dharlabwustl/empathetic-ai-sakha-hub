
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralTab } from './dialog/tabs/GeneralTab';
import { AccessLimitsTab } from './dialog/tabs/AccessLimitsTab';
import { AllowedPlansTab } from './dialog/tabs/AllowedPlansTab';
import { useFeatureEditForm } from './dialog/useFeatureEditForm';
import { FeatureEditDialogProps } from './dialog/types';

const FeatureEditDialog: React.FC<FeatureEditDialogProps> = ({ 
  isOpen, 
  onClose, 
  feature, 
  onSave 
}) => {
  const [activeTab, setActiveTab] = useState("general");
  const {
    editedFeature,
    handleChange,
    handleSaveFeature
  } = useFeatureEditForm(feature, onSave);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white dark:bg-gray-900 border shadow-lg dark:border-gray-700">
        <DialogHeader>
          <DialogTitle>Edit Feature</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="access">Free Access Limits</TabsTrigger>
            <TabsTrigger value="plans">Allowed Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <GeneralTab editedFeature={editedFeature} onChange={handleChange} />
          </TabsContent>

          <TabsContent value="access">
            <AccessLimitsTab editedFeature={editedFeature} onChange={handleChange} />
          </TabsContent>

          <TabsContent value="plans">
            <AllowedPlansTab editedFeature={editedFeature} onChange={handleChange} />
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSaveFeature}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeatureEditDialog;
