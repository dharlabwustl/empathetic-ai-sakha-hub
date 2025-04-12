import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

interface ContentUploaderProps {
  onContentUploaded: (url: string) => void;
}

const ContentUploader: React.FC<ContentUploaderProps> = ({ onContentUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const storageRef = ref(storage, `content/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setIsUploading(false);
        toast({
          title: "Upload Error",
          description: error.message,
          variant: "destructive",
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setIsUploading(false);
          setUploadProgress(0);
          setFile(null);
          onContentUploaded(downloadURL);
          toast({
            title: "Success",
            description: "File uploaded successfully",
            variant: "success"
          });
        });
      }
    );
  };

  return (
    <div>
      <Label htmlFor="content-file">Upload Content File</Label>
      <Input
        type="file"
        id="content-file"
        onChange={handleFileChange}
        disabled={isUploading}
        className="mb-2"
      />
      {file && (
        <div className="mb-2">
          Selected file: {file.name} ({file.size} bytes)
        </div>
      )}
      {uploadProgress > 0 && (
        <Progress value={uploadProgress} className="mb-2" />
      )}
      <Button onClick={handleUpload} disabled={isUploading || !file}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
};

export default ContentUploader;
