
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ContentFile } from '@/types/content';

export const useContentManagement = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<ContentFile[]>([]);
  const { toast } = useToast();

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (100MB limit)
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a file smaller than 100MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  }, [toast]);

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Complete upload
      setUploadProgress(100);
      
      // Add to uploaded files
      const newFile: ContentFile = {
        id: Date.now().toString(),
        name: selectedFile.name,
        type: 'study-material',
        subject: 'Physics', // This would come from form
        examType: 'IIT-JEE',
        uploadDate: new Date().toISOString(),
        size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
        tags: ['uploaded']
      };

      setUploadedFiles(prev => [newFile, ...prev]);
      
      toast({
        title: "Upload Successful",
        description: `${selectedFile.name} has been processed and added to the content library`,
      });

      // Reset form
      setSelectedFile(null);
      setUploadProgress(0);
      
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  }, [selectedFile, toast]);

  return {
    uploading,
    uploadProgress,
    selectedFile,
    uploadedFiles,
    handleFileSelect,
    handleFileRemove,
    handleUpload,
  };
};
