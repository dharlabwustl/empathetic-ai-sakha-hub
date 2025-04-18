
import React from 'react';
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

const WizardHeader: React.FC = () => (
  <DialogHeader className="bg-gradient-to-r from-purple-600 to-indigo-700 -m-6 mb-6 p-6 text-white rounded-t-lg">
    <DialogTitle className="text-xl font-bold text-white">Create New Study Plan</DialogTitle>
  </DialogHeader>
);

export default WizardHeader;
