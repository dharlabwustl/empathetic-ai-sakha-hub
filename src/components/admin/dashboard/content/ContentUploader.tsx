
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Upload, X, FileText } from 'lucide-react';

interface ContentUploaderProps {
  handleFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  selectedFile: File | null;
  onFileRemove: () => void;
  uploading: boolean;
  uploadProgress: number;
}

const ContentUploader: React.FC<ContentUploaderProps> = ({
  handleFileSelect,
  handleUpload,
  selectedFile,
  onFileRemove,
  uploading,
  uploadProgress
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Resources
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Resource Title</Label>
            <Input id="title" placeholder="Enter resource title" />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concepts">Concept Cards</SelectItem>
                <SelectItem value="flashcards">Flashcards</SelectItem>
                <SelectItem value="exams">Practice Exams</SelectItem>
                <SelectItem value="formulas">Formula Sheets</SelectItem>
                <SelectItem value="study-materials">Study Materials</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Enter resource description" />
        </div>

        <div>
          <Label htmlFor="file">Upload File</Label>
          <div className="mt-2">
            {selectedFile ? (
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span className="text-sm">{selectedFile.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={onFileRemove}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Upload a file
                    </span>
                    <span className="text-sm text-gray-500"> or drag and drop</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  PDF, DOC, PPT, XLS up to 10MB
                </p>
              </div>
            )}
          </div>
        </div>

        {uploading && (
          <div>
            <Label>Upload Progress</Label>
            <Progress value={uploadProgress} className="mt-2" />
            <p className="text-sm text-gray-500 mt-1">{uploadProgress}% uploaded</p>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
            {uploading ? 'Uploading...' : 'Upload Resource'}
          </Button>
          <Button variant="outline" onClick={onFileRemove}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentUploader;
