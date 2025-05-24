
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Settings, Trash2, Check, X } from 'lucide-react';

interface ActionDialogProps {
  type: 'view' | 'edit' | 'settings' | 'delete' | 'approve' | 'reject';
  title: string;
  data: any;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (data: any) => void;
  onConfirm?: () => void;
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  type,
  title,
  data,
  isOpen,
  onClose,
  onSave,
  onConfirm
}) => {
  const [editData, setEditData] = useState(data);

  const handleSave = () => {
    if (onSave) {
      onSave(editData);
    }
    onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const getIcon = () => {
    switch (type) {
      case 'view': return <Eye className="h-5 w-5" />;
      case 'edit': return <Edit className="h-5 w-5" />;
      case 'settings': return <Settings className="h-5 w-5" />;
      case 'delete': return <Trash2 className="h-5 w-5" />;
      case 'approve': return <Check className="h-5 w-5" />;
      case 'reject': return <X className="h-5 w-5" />;
    }
  };

  const getDialogTitle = () => {
    switch (type) {
      case 'view': return `View ${title}`;
      case 'edit': return `Edit ${title}`;
      case 'settings': return `${title} Settings`;
      case 'delete': return `Delete ${title}`;
      case 'approve': return `Approve ${title}`;
      case 'reject': return `Reject ${title}`;
    }
  };

  if (type === 'delete' || type === 'approve' || type === 'reject') {
    return (
      <AlertDialog open={isOpen} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {getIcon()}
              {getDialogTitle()}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {type === 'delete' && `Are you sure you want to delete "${title}"? This action cannot be undone.`}
              {type === 'approve' && `Are you sure you want to approve "${title}"? This will make it live.`}
              {type === 'reject' && `Are you sure you want to reject "${title}"? This will move it to drafts.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {type === 'delete' ? 'Delete' : type === 'approve' ? 'Approve' : 'Reject'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getDialogTitle()}
          </DialogTitle>
          <DialogDescription>
            {type === 'view' && `Viewing details for ${title}`}
            {type === 'edit' && `Make changes to ${title}`}
            {type === 'settings' && `Configure settings for ${title}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {type === 'view' && (
            <div className="space-y-3">
              {Object.entries(data || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-sm">
                    {typeof value === 'boolean' ? (
                      <Badge variant={value ? 'default' : 'secondary'}>
                        {value ? 'Yes' : 'No'}
                      </Badge>
                    ) : Array.isArray(value) ? (
                      <div className="flex flex-wrap gap-1">
                        {value.map((item, idx) => (
                          <Badge key={idx} variant="outline">{item}</Badge>
                        ))}
                      </div>
                    ) : (
                      String(value)
                    )}
                  </span>
                </div>
              ))}
            </div>
          )}

          {type === 'edit' && (
            <div className="space-y-4">
              {Object.entries(editData || {}).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </Label>
                  {typeof value === 'boolean' ? (
                    <select
                      id={key}
                      value={String(value)}
                      onChange={(e) => setEditData({...editData, [key]: e.target.value === 'true'})}
                      className="w-full p-2 border rounded"
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : typeof value === 'string' && value.length > 50 ? (
                    <Textarea
                      id={key}
                      value={String(value)}
                      onChange={(e) => setEditData({...editData, [key]: e.target.value})}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={key}
                      value={String(value)}
                      onChange={(e) => setEditData({...editData, [key]: e.target.value})}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {type === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
                <h4 className="font-semibold mb-2">Configuration Options</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Configure advanced settings and permissions for {title}.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Active Status</Label>
                  <select className="p-2 border rounded">
                    <option>Active</option>
                    <option>Inactive</option>
                    <option>Pending</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Permissions</Label>
                  <select className="p-2 border rounded">
                    <option>Full Access</option>
                    <option>Limited Access</option>
                    <option>Read Only</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <Label>Notifications</Label>
                  <select className="p-2 border rounded">
                    <option>Enabled</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {(type === 'edit' || type === 'settings') && (
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
