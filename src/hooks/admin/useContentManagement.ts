
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useContentManagement = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} ready for upload`,
      });
    }
  }, [toast]);

  const handleFileRemove = useCallback(() => {
    setSelectedFile(null);
    setUploadProgress(0);
  }, []);

  const handleUpload = useCallback(() => {
    if (!selectedFile) return;

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          toast({
            title: "Upload Complete",
            description: "File uploaded and processed successfully!",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  }, [selectedFile, toast]);

  return {
    uploading,
    uploadProgress,
    selectedFile,
    handleFileSelect,
    handleFileRemove,
    handleUpload,
  };
};
