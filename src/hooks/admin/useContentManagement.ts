
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ContentFile {
  file: File;
  name: string;
  size: number;
  type: string;
}

export const useContentManagement = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<ContentFile | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive"
      });
      return;
    }

    const contentFile: ContentFile = {
      file,
      name: file.name,
      size: file.size,
      type: file.type
    };

    setSelectedFile(contentFile);
    toast({
      title: "File selected",
      description: `${file.name} is ready for upload`,
      variant: "default"
    });
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setUploadProgress(100);

      toast({
        title: "Upload successful",
        description: `${selectedFile.name} has been uploaded successfully`,
        variant: "default"
      });

      // Reset state
      setTimeout(() => {
        setSelectedFile(null);
        setUploadProgress(0);
        setUploading(false);
      }, 1000);

    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file",
        variant: "destructive"
      });
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return {
    uploading,
    uploadProgress,
    selectedFile,
    handleFileSelect,
    handleFileRemove,
    handleUpload
  };
};
