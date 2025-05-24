
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface ActionDialogProps {
  type: 'view' | 'edit' | 'settings' | 'delete' | 'approve' | 'reject' | 'add' | 'create' | 'upload';
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
  const [formData, setFormData] = useState(data || {});

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    onClose();
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const renderViewContent = () => (
    <div className="space-y-4">
      {Object.entries(data || {}).map(([key, value]) => (
        <div key={key} className="grid grid-cols-3 gap-4">
          <Label className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
          <div className="col-span-2">
            {Array.isArray(value) ? (
              <div className="flex flex-wrap gap-1">
                {value.map((item, index) => (
                  <Badge key={index} variant="outline">{item}</Badge>
                ))}
              </div>
            ) : (
              <span className="text-sm">{String(value)}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderEditContent = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={formData.status || ''} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderSettingsContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="active">Active Status</Label>
        <Switch
          id="active"
          checked={formData.activeStatus || false}
          onCheckedChange={(checked) => setFormData({ ...formData, activeStatus: checked })}
        />
      </div>
      <div>
        <Label htmlFor="permissions">Permissions</Label>
        <Select value={formData.permissions || ''} onValueChange={(value) => setFormData({ ...formData, permissions: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select permissions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="read">Read Only</SelectItem>
            <SelectItem value="write">Read & Write</SelectItem>
            <SelectItem value="admin">Administrator</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="notifications">Notifications</Label>
        <Switch
          id="notifications"
          checked={formData.notifications === 'Enabled'}
          onCheckedChange={(checked) => setFormData({ ...formData, notifications: checked ? 'Enabled' : 'Disabled' })}
        />
      </div>
    </div>
  );

  const renderAddContent = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter name"
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email"
        />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <Select value={formData.role || ''} onValueChange={(value) => setFormData({ ...formData, role: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="active">Active</Label>
        <Switch
          id="active"
          checked={formData.active || false}
          onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
        />
      </div>
    </div>
  );

  const renderUploadContent = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="file">Upload File</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] })}
        />
      </div>
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter title"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter description"
        />
      </div>
    </div>
  );

  const renderDeleteContent = () => (
    <div className="text-center py-4">
      <p className="text-sm text-gray-600 mb-4">
        Are you sure you want to delete <strong>{title}</strong>? This action cannot be undone.
      </p>
    </div>
  );

  const renderContent = () => {
    switch (type) {
      case 'view':
        return renderViewContent();
      case 'edit':
        return renderEditContent();
      case 'settings':
        return renderSettingsContent();
      case 'add':
      case 'create':
        return renderAddContent();
      case 'upload':
        return renderUploadContent();
      case 'delete':
        return renderDeleteContent();
      default:
        return <div>Content not available</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {type === 'view' && `View ${title}`}
            {type === 'edit' && `Edit ${title}`}
            {type === 'settings' && `${title} Settings`}
            {type === 'add' && 'Add New Item'}
            {type === 'create' && `Create ${title}`}
            {type === 'upload' && 'Upload Resource'}
            {type === 'delete' && `Delete ${title}`}
          </DialogTitle>
          <DialogDescription>
            {type === 'view' && 'View details and information.'}
            {type === 'edit' && 'Make changes to the information below.'}
            {type === 'settings' && 'Manage settings and preferences.'}
            {type === 'add' && 'Fill in the details to add a new item.'}
            {type === 'create' && 'Fill in the details to create a new item.'}
            {type === 'upload' && 'Upload a new resource file.'}
            {type === 'delete' && 'This action is permanent and cannot be undone.'}
          </DialogDescription>
        </DialogHeader>

        {renderContent()}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {type === 'delete' ? (
            <Button variant="destructive" onClick={handleConfirm}>
              Delete
            </Button>
          ) : type !== 'view' ? (
            <Button onClick={handleSave}>
              {type === 'add' || type === 'create' ? 'Create' : 'Save Changes'}
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
