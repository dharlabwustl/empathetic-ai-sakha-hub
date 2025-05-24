
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
  type: 'view' | 'edit' | 'settings' | 'delete' | 'approve' | 'reject' | 'add' | 'create' | 'upload' | 'batch-create' | 'ai-settings' | 'content-upload';
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
    <div className="space-y-4 max-h-96 overflow-y-auto">
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

  const renderUserFormContent = () => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter full name"
        />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email || ''}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter email address"
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          type="tel"
          value={formData.phoneNumber || ''}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          placeholder="Enter phone number"
        />
      </div>
      <div>
        <Label htmlFor="examPrep">Exam Preparation</Label>
        <Select value={formData.examPrep || ''} onValueChange={(value) => setFormData({ ...formData, examPrep: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select exam type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JEE Main">JEE Main</SelectItem>
            <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
            <SelectItem value="NEET">NEET</SelectItem>
            <SelectItem value="CAT">CAT</SelectItem>
            <SelectItem value="UPSC">UPSC</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="subjects">Subjects</Label>
        <Input
          id="subjects"
          value={formData.subjects || ''}
          onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
          placeholder="Enter subjects (comma separated)"
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
        <Label htmlFor="active">Active Status</Label>
        <Switch
          id="active"
          checked={formData.active || false}
          onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
        />
      </div>
    </div>
  );

  const renderBatchFormContent = () => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div>
        <Label htmlFor="batchName">Batch Name *</Label>
        <Input
          id="batchName"
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter batch name"
        />
      </div>
      <div>
        <Label htmlFor="examGoal">Exam Goal *</Label>
        <Select value={formData.examGoal || ''} onValueChange={(value) => setFormData({ ...formData, examGoal: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select exam goal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JEE Main">JEE Main</SelectItem>
            <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
            <SelectItem value="NEET">NEET</SelectItem>
            <SelectItem value="CAT">CAT</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="leader">Batch Leader *</Label>
        <Input
          id="leader"
          value={formData.leader || ''}
          onChange={(e) => setFormData({ ...formData, leader: e.target.value })}
          placeholder="Enter leader name"
        />
      </div>
      <div>
        <Label htmlFor="maxMembers">Maximum Members</Label>
        <Input
          id="maxMembers"
          type="number"
          value={formData.maxMembers || 10}
          onChange={(e) => setFormData({ ...formData, maxMembers: parseInt(e.target.value) })}
          min="2"
          max="50"
        />
      </div>
      <div>
        <Label htmlFor="planType">Plan Type</Label>
        <Select value={formData.planType || ''} onValueChange={(value) => setFormData({ ...formData, planType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select plan type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="group">Group Plan</SelectItem>
            <SelectItem value="premium">Premium Plan</SelectItem>
            <SelectItem value="corporate">Corporate Plan</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderContentUploadForm = () => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div>
        <Label htmlFor="title">Content Title *</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter content title"
        />
      </div>
      <div>
        <Label htmlFor="subject">Subject *</Label>
        <Select value={formData.subject || ''} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Physics">Physics</SelectItem>
            <SelectItem value="Chemistry">Chemistry</SelectItem>
            <SelectItem value="Mathematics">Mathematics</SelectItem>
            <SelectItem value="Biology">Biology</SelectItem>
            <SelectItem value="English">English</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="topic">Topic</Label>
        <Input
          id="topic"
          value={formData.topic || ''}
          onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          placeholder="Enter topic name"
        />
      </div>
      <div>
        <Label htmlFor="exam">Exam Type</Label>
        <Select value={formData.exam || ''} onValueChange={(value) => setFormData({ ...formData, exam: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select exam type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="JEE Main">JEE Main</SelectItem>
            <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
            <SelectItem value="NEET">NEET</SelectItem>
            <SelectItem value="CAT">CAT</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="difficulty">Difficulty Level</Label>
        <Select value={formData.difficulty || ''} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
            <SelectItem value="Expert">Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="formatType">Format Type</Label>
        <Select value={formData.formatType || ''} onValueChange={(value) => setFormData({ ...formData, formatType: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PDF">PDF</SelectItem>
            <SelectItem value="Video">Video</SelectItem>
            <SelectItem value="Interactive">Interactive</SelectItem>
            <SelectItem value="Text">Text</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={formData.tags || ''}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="Enter tags separated by commas"
        />
      </div>
      <div>
        <Label htmlFor="sections">Number of Sections</Label>
        <Input
          id="sections"
          type="number"
          value={formData.sections || 1}
          onChange={(e) => setFormData({ ...formData, sections: parseInt(e.target.value) })}
          min="1"
          max="20"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter content description"
        />
      </div>
      <div>
        <Label htmlFor="file">Upload File</Label>
        <Input
          id="file"
          type="file"
          onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] })}
          accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mov"
        />
      </div>
    </div>
  );

  const renderAISettingsForm = () => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div>
        <Label htmlFor="modelName">AI Model Name</Label>
        <Select value={formData.modelName || ''} onValueChange={(value) => setFormData({ ...formData, modelName: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select AI model" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GPT-4">GPT-4</SelectItem>
            <SelectItem value="GPT-3.5">GPT-3.5</SelectItem>
            <SelectItem value="Claude-3">Claude-3</SelectItem>
            <SelectItem value="Gemini-Pro">Gemini Pro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="temperature">Temperature (0-2)</Label>
        <Input
          id="temperature"
          type="number"
          step="0.1"
          min="0"
          max="2"
          value={formData.temperature || 0.7}
          onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
        />
      </div>
      <div>
        <Label htmlFor="maxTokens">Max Tokens</Label>
        <Input
          id="maxTokens"
          type="number"
          value={formData.maxTokens || 1000}
          onChange={(e) => setFormData({ ...formData, maxTokens: parseInt(e.target.value) })}
          min="100"
          max="4000"
        />
      </div>
      <div>
        <Label htmlFor="systemPrompt">System Prompt</Label>
        <Textarea
          id="systemPrompt"
          value={formData.systemPrompt || ''}
          onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
          placeholder="Enter system prompt for AI model"
          rows={4}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="enableLogging">Enable Logging</Label>
        <Switch
          id="enableLogging"
          checked={formData.enableLogging || false}
          onCheckedChange={(checked) => setFormData({ ...formData, enableLogging: checked })}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="enableCache">Enable Cache</Label>
        <Switch
          id="enableCache"
          checked={formData.enableCache || false}
          onCheckedChange={(checked) => setFormData({ ...formData, enableCache: checked })}
        />
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
        return renderUserFormContent();
      case 'settings':
        return renderSettingsContent();
      case 'add':
      case 'create':
        return renderUserFormContent();
      case 'batch-create':
        return renderBatchFormContent();
      case 'upload':
      case 'content-upload':
        return renderContentUploadForm();
      case 'ai-settings':
        return renderAISettingsForm();
      case 'delete':
        return renderDeleteContent();
      default:
        return <div>Content not available</div>;
    }
  };

  const getDialogTitle = () => {
    switch (type) {
      case 'view': return `View ${title}`;
      case 'edit': return `Edit ${title}`;
      case 'settings': return `${title} Settings`;
      case 'add': return 'Add New User';
      case 'create': return 'Create New User';
      case 'batch-create': return 'Create New Batch';
      case 'upload': return 'Upload Resource';
      case 'content-upload': return 'Upload Content';
      case 'ai-settings': return 'AI Model Settings';
      case 'delete': return `Delete ${title}`;
      default: return title;
    }
  };

  const getDialogDescription = () => {
    switch (type) {
      case 'view': return 'View details and information.';
      case 'edit': return 'Make changes to the information below.';
      case 'settings': return 'Manage settings and preferences.';
      case 'add':
      case 'create': return 'Fill in the details to add a new user.';
      case 'batch-create': return 'Create a new batch for students.';
      case 'upload':
      case 'content-upload': return 'Upload new educational content.';
      case 'ai-settings': return 'Configure AI model parameters.';
      case 'delete': return 'This action is permanent and cannot be undone.';
      default: return '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
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
              {type === 'add' || type === 'create' || type === 'batch-create' ? 'Create' : 'Save Changes'}
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
