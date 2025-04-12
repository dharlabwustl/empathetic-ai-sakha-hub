import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import { ContentUploaderProps } from "@/types/content";

const ContentUploader = ({ 
  handleFileSelect, 
  handleUpload, 
  selectedFile, 
  onFileRemove,
  uploading, 
  uploadProgress 
}: ContentUploaderProps) => {
  return (
    <div className="mb-6 p-6 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700">
      <div className="text-center mb-4">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-semibold">Upload Content</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Drag and drop files or click to browse
        </p>
      </div>
      
      <div className="mt-4">
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          onChange={handleFileSelect}
        />
        <label 
          htmlFor="fileUpload" 
          className="block w-full cursor-pointer mb-3 bg-gray-100 dark:bg-gray-800 p-3 rounded text-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Browse Files
        </label>
        
        {selectedFile && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded mb-3 flex justify-between items-center">
            <div className="truncate">
              <p className="font-medium truncate">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={onFileRemove}
            >
              Remove
            </Button>
          </div>
        )}
        
        {uploading && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
            <div 
              className="bg-primary h-2.5 rounded-full" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={handleUpload} 
            className="w-full" 
            disabled={!selectedFile || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
          <Button variant="outline" className="w-full">
            Add Metadata
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentUploader;
