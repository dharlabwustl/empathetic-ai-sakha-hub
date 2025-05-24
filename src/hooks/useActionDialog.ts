
import { useState } from 'react';

interface DialogState {
  type: 'view' | 'edit' | 'settings' | 'delete' | 'approve' | 'reject' | 'add' | 'create' | 'upload' | null;
  title: string;
  data: any;
  isOpen: boolean;
}

export const useActionDialog = () => {
  const [dialogState, setDialogState] = useState<DialogState>({
    type: null,
    title: '',
    data: null,
    isOpen: false
  });

  const openDialog = (type: DialogState['type'], title: string, data: any) => {
    setDialogState({
      type,
      title,
      data,
      isOpen: true
    });
  };

  const closeDialog = () => {
    setDialogState({
      type: null,
      title: '',
      data: null,
      isOpen: false
    });
  };

  return {
    dialogState,
    openDialog,
    closeDialog
  };
};
