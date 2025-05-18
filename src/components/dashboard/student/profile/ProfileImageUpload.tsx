
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Upload, Camera, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  userName?: string;
  onImageUpload?: (imageUrl: string) => void;
  currentImage?: string;
  onUpdate?: (imageUrl: string) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImageUrl,
  currentImage,
  userName = 'User',
  onImageUpload,
  onUpdate
}) => {
  // Use currentImage prop if provided, otherwise fall back to currentImageUrl
  const initialImage = currentImage || currentImageUrl;
  const [imagePreview, setImagePreview] = useState<string | undefined>(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Load image from localStorage if available
  useEffect(() => {
    const savedImage = localStorage.getItem('user_profile_image');
    
    if (savedImage && !imagePreview) {
      setImagePreview(savedImage);
      // Call onImageUpload to update parent components
      if (onImageUpload) {
        onImageUpload(savedImage);
      }
      if (onUpdate) {
        onUpdate(savedImage);
      }
    } else if ((currentImage || currentImageUrl) && (currentImage || currentImageUrl) !== imagePreview) {
      setImagePreview(currentImage || currentImageUrl);
    }
  }, [currentImageUrl, currentImage, imagePreview, onImageUpload, onUpdate]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an image file (JPEG, PNG, etc.)',
        variant: 'destructive'
      });
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please select an image smaller than 5MB',
        variant: 'destructive'
      });
      return;
    }
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
      handleUpload(file, result);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = (file: File, previewUrl: string) => {
    setIsUploading(true);
    
    // Simulate file upload with delay
    setTimeout(() => {
      // In a real app, this would be an API call to upload the file
      // For now, we'll just use the preview URL
      
      // Save to localStorage for persistence
      localStorage.setItem('user_profile_image', previewUrl);
      
      if (onImageUpload) {
        onImageUpload(previewUrl);
      }
      
      if (onUpdate) {
        onUpdate(previewUrl);
      }
      
      toast({
        title: 'Profile picture updated',
        description: 'Your profile picture has been successfully updated'
      });
      
      setIsUploading(false);
    }, 1000);
  };

  const handleRemoveImage = () => {
    setImagePreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Remove from localStorage
    localStorage.removeItem('user_profile_image');
    
    if (onImageUpload) {
      onImageUpload('');
    }
    
    if (onUpdate) {
      onUpdate('');
    }
    
    toast({
      title: 'Profile picture removed',
      description: 'Your profile picture has been removed'
    });
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow-md">
          <AvatarImage src={imagePreview} alt={userName} />
          <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
            {getInitials(userName)}
          </AvatarFallback>
        </Avatar>
        
        <div className="absolute bottom-0 right-0 flex gap-1">
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Camera size={16} />
          </Button>
          
          {imagePreview && (
            <Button
              size="icon"
              variant="destructive"
              className="h-8 w-8 rounded-full"
              onClick={handleRemoveImage}
              disabled={isUploading}
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          {imagePreview 
            ? 'Click the camera icon to change your profile picture'
            : 'Upload a profile picture'}
        </p>
        
        {!imagePreview && (
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
          >
            <Upload size={16} className="mr-2" />
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUpload;
