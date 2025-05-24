
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, 
  X, 
  Check, 
  UserPlus, 
  Upload, 
  FileText, 
  Plus,
  Eye,
  Edit,
  Settings,
  Trash2
} from 'lucide-react';

interface ActionDialogProps {
  type: 'view' | 'edit' | 'settings' | 'delete' | 'approve' | 'reject' | 'add' | 'create' | 'upload';
  title: string;
  data?: any;
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, file: file.name }));
    }
  };

  const renderContent = () => {
    switch (type) {
      case 'view':
        return (
          <div className="space-y-4">
            {Object.entries(data || {}).map(([key, value]) => (
              <div key={key} className="grid grid-cols-3 gap-4">
                <Label className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                <div className="col-span-2">
                  {typeof value === 'boolean' ? (
                    <Badge variant={value ? 'default' : 'secondary'}>
                      {value ? 'Yes' : 'No'}
                    </Badge>
                  ) : Array.isArray(value) ? (
                    <div className="flex flex-wrap gap-1">
                      {value.map((item, index) => (
                        <Badge key={index} variant="outline">{item}</Badge>
                      ))}
                    </div>
                  ) : (
                    <span>{String(value)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );

      case 'edit':
        return (
          <div className="space-y-4">
            {Object.entries(data || {}).map(([key, value]) => {
              if (key === 'id') return null;
              return (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </Label>
                  {typeof value === 'boolean' ? (
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={key}
                        checked={formData[key] || false}
                        onCheckedChange={(checked) => handleInputChange(key, checked)}
                      />
                      <Label htmlFor={key}>{formData[key] ? 'Enabled' : 'Disabled'}</Label>
                    </div>
                  ) : key.toLowerCase().includes('description') ? (
                    <Textarea
                      id={key}
                      value={formData[key] || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    />
                  ) : (
                    <Input
                      id={key}
                      value={formData[key] || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.activeStatus || false}
                  onCheckedChange={(checked) => handleInputChange('activeStatus', checked)}
                />
                <Label htmlFor="status">{formData.activeStatus ? 'Active' : 'Inactive'}</Label>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="permissions">Permissions</Label>
              <Select value={formData.permissions || 'Standard Access'} onValueChange={(value) => handleInputChange('permissions', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select permissions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Standard Access">Standard Access</SelectItem>
                  <SelectItem value="Limited Access">Limited Access</SelectItem>
                  <SelectItem value="Full Access">Full Access</SelectItem>
                  <SelectItem value="Admin Access">Admin Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notifications">Notifications</Label>
              <Select value={formData.notifications || 'Enabled'} onValueChange={(value) => handleInputChange('notifications', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select notification preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Enabled">Enabled</SelectItem>
                  <SelectItem value="Disabled">Disabled</SelectItem>
                  <SelectItem value="Email Only">Email Only</SelectItem>
                  <SelectItem value="Push Only">Push Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'add':
      case 'create':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={formData.role || 'Student'} onValueChange={(value) => handleInputChange('role', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Teacher">Teacher</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.active || true}
                  onCheckedChange={(checked) => handleInputChange('active', checked)}
                />
                <Label htmlFor="status">{formData.active ? 'Active' : 'Inactive'}</Label>
              </div>
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Content Title</Label>
              <Input
                id="title"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter content title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter content description"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category || 'Study Material'} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Study Material">Study Material</SelectItem>
                  <SelectItem value="Concept Card">Concept Card</SelectItem>
                  <SelectItem value="Flashcard">Flashcard</SelectItem>
                  <SelectItem value="Practice Exam">Practice Exam</SelectItem>
                  <SelectItem value="3D Model">3D Model</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file">File Upload</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.mp3"
                />
                <label htmlFor="file" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOC, PPT, Images, Videos up to 50MB
                  </p>
                </label>
              </div>
            </div>
          </div>
        );

      case 'delete':
        return (
          <div className="text-center py-4">
            <Trash2 className="mx-auto h-12 w-12 text-red-500 mb-4" />
            <p className="text-lg font-medium mb-2">Are you sure?</p>
            <p className="text-gray-600">
              This action cannot be undone. This will permanently delete "{title}" and all associated data.
            </p>
          </div>
        );

      case 'approve':
        return (
          <div className="text-center py-4">
            <Check className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-medium mb-2">Approve Content</p>
            <p className="text-gray-600">
              Are you sure you want to approve "{title}"? This will make it available to all users.
            </p>
          </div>
        );

      case 'reject':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <X className="mx-auto h-12 w-12 text-red-500 mb-4" />
              <p className="text-lg font-medium mb-2">Reject Content</p>
              <p className="text-gray-600">
                Please provide a reason for rejecting "{title}".
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                value={formData.reason || ''}
                onChange={(e) => handleInputChange('reason', e.target.value)}
                placeholder="Enter reason for rejection..."
                required
              />
            </div>
          </div>
        );

      default:
        return <div>Unknown dialog type</div>;
    }
  };

  const getDialogIcon = () => {
    switch (type) {
      case 'view': return <Eye className="h-5 w-5" />;
      case 'edit': return <Edit className="h-5 w-5" />;
      case 'settings': return <Settings className="h-5 w-5" />;
      case 'add':
      case 'create': return <UserPlus className="h-5 w-5" />;
      case 'upload': return <Upload className="h-5 w-5" />;
      case 'delete': return <Trash2 className="h-5 w-5 text-red-500" />;
      case 'approve': return <Check className="h-5 w-5 text-green-500" />;
      case 'reject': return <X className="h-5 w-5 text-red-500" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getActionButtons = () => {
    switch (type) {
      case 'view':
        return (
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        );

      case 'edit':
      case 'settings':
      case 'add':
      case 'create':
      case 'upload':
        return (
          <>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </>
        );

      case 'delete':
        return (
          <>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </>
        );

      case 'approve':
        return (
          <>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleConfirm} className="bg-green-600 hover:bg-green-700">
              <Check className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </>
        );

      case 'reject':
        return (
          <>
            <Button onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleConfirm} variant="destructive">
              <X className="h-4 w-4 mr-2" />
              Reject
            </Button>
          </>
        );

      default:
        return (
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getDialogIcon()}
            {type.charAt(0).toUpperCase() + type.slice(1)} {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {renderContent()}
        </div>
        
        <DialogFooter>
          {getActionButtons()}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
