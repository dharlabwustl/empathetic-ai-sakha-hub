
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useContentManagement = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleFileRemove = () => {
    setSelectedFile(null);
    // Reset the file input
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "No file selected",
        variant: "destructive",
      });
      return;
    }
    
    setUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        
        toast({
          title: "Upload Success",
          description: `${selectedFile.name} has been uploaded successfully.`,
          variant: "default",
        });
        
        // Reset after successful upload
        handleFileRemove();
      }
    }, 300);
  };
  
  return {
    uploading,
    uploadProgress,
    selectedFile,
    handleFileSelect,
    handleFileRemove,
    handleUpload,
  };
};
