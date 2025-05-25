
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, Tag } from 'lucide-react';
import { ContentBrowserProps, FilesTableProps, FileRowProps, EmptyStateProps } from "@/types/content";

const FileRow: React.FC<FileRowProps> = ({ file, onDownload, onView, onTagFile }) => (
  <tr className="border-b">
    <td className="px-4 py-2 font-medium">{file.name}</td>
    <td className="px-4 py-2">{file.subject}</td>
    <td className="px-4 py-2">{file.examType}</td>
    <td className="px-4 py-2">{file.uploadDate}</td>
    <td className="px-4 py-2">{file.size}</td>
    <td className="px-4 py-2">
      <div className="flex flex-wrap gap-1">
        {file.tags.map(tag => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </td>
    <td className="px-4 py-2">
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={() => onView(file.id)}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => onDownload(file.name)}>
          <Download className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={() => onTagFile(file.id)}>
          <Tag className="h-4 w-4" />
        </Button>
      </div>
    </td>
  </tr>
);

const FilesTable: React.FC<FilesTableProps> = ({ files, onDownload, onView, onTagFile }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-2 text-left">File Name</th>
          <th className="px-4 py-2 text-left">Subject</th>
          <th className="px-4 py-2 text-left">Exam Type</th>
          <th className="px-4 py-2 text-left">Upload Date</th>
          <th className="px-4 py-2 text-left">Size</th>
          <th className="px-4 py-2 text-left">Tags</th>
          <th className="px-4 py-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {files.map(file => (
          <FileRow
            key={file.id}
            file={file}
            onDownload={onDownload}
            onView={onView}
            onTagFile={onTagFile}
          />
        ))}
      </tbody>
    </table>
  </div>
);

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm }) => (
  <div className="text-center py-8">
    <p className="text-gray-500">
      {searchTerm ? `No files found matching "${searchTerm}"` : 'No files uploaded yet'}
    </p>
  </div>
);

const ContentBrowser: React.FC<ContentBrowserProps> = ({ 
  files, 
  searchTerm, 
  setSearchTerm 
}) => {
  const handleDownload = (fileName: string) => {
    console.log('Downloading:', fileName);
  };

  const handleView = (fileId: string) => {
    console.log('Viewing:', fileId);
  };

  const handleTagFile = (fileId: string) => {
    console.log('Tagging:', fileId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Browser</CardTitle>
        <Input
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <EmptyState searchTerm={searchTerm} />
        ) : (
          <FilesTable
            files={files}
            onDownload={handleDownload}
            onView={handleView}
            onTagFile={handleTagFile}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ContentBrowser;
