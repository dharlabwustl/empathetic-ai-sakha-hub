
import { useState } from 'react';

export type DialogType = 'view' | 'edit' | 'settings' | 'delete' | 'approve' | 'reject' | 'add' | 'create' | 'upload' | 'batch-create' | 'ai-settings' | 'content-upload' | 'feature-settings' | 'complete-profile';

interface DialogState {
  isOpen: boolean;
  type: DialogType | null;
  title: string;
  data: any;
}

export const useActionDialog = () => {
  const [dialogState, setDialogState] = useState<DialogState>({
    isOpen: false,
    type: null,
    title: '',
    data: null
  });

  const openDialog = (type: DialogType, title: string, data: any = {}) => {
    setDialogState({
      isOpen: true,
      type,
      title,
      data
    });
  };

  const closeDialog = () => {
    setDialogState({
      isOpen: false,
      type: null,
      title: '',
      data: null
    });
  };

  return {
    dialogState,
    openDialog,
    closeDialog
  };
};
