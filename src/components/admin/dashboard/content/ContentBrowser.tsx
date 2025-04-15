
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, FolderOpen, Filter } from "lucide-react";
import {
  ContentBrowserProps,
  EmptyStateProps,
  FilesTableProps,
  FileRowProps,
  ContentItem
} from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Empty state component for when no files are found
const EmptyState = ({ message, icon, actionLabel, onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
      {icon || <FolderOpen className="h-6 w-6 text-gray-400" />}
    </div>
    <h3 className="mb-2 text-xl font-medium">{message || "No files found"}</h3>
    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Upload or create content to get started
    </p>
    {actionLabel && onAction && (
      <Button onClick={onAction}>{actionLabel}</Button>
    )}
  </div>
);

// File row component
const FileRow = ({ 
  file, 
  isSelected, 
  onSelect, 
  onDelete, 
  onEdit 
}: FileRowProps) => (
  <TableRow className={isSelected ? "bg-blue-50 dark:bg-blue-900/20" : ""}>
    <TableCell>
      <Checkbox
        checked={isSelected}
        onCheckedChange={() => onSelect(file)}
      />
    </TableCell>
    <TableCell className="font-medium">{file.title}</TableCell>
    <TableCell>
      <Badge variant="outline" className="capitalize">
        {file.type.replace("_", " ")}
      </Badge>
    </TableCell>
    <TableCell>{file.subject}</TableCell>
    <TableCell>{file.examGoal}</TableCell>
    <TableCell className="text-gray-500 text-sm">
      {new Date(file.updatedAt).toLocaleDateString()}
    </TableCell>
    <TableCell>
      <div className="flex items-center gap-2">
        {onEdit && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => onEdit(file)}
          >
            Edit
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-red-600 hover:text-red-700 hover:bg-red-100"
            onClick={() => onDelete(file)}
          >
            Delete
          </Button>
        )}
      </div>
    </TableCell>
  </TableRow>
);

// Files table component
const FilesTable = ({ 
  files, 
  onSelect, 
  onDelete, 
  onEdit, 
  selectedFile 
}: FilesTableProps) => (
  <div className="rounded-md border overflow-hidden">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Exam Goal</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {files.map((file) => (
          <FileRow
            key={file.id}
            file={file}
            isSelected={selectedFile?.id === file.id}
            onSelect={onSelect}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </TableBody>
    </Table>
  </div>
);

// Main content browser component
const ContentBrowser = ({ 
  contentType, 
  onSelect, 
  selectedContent 
}: ContentBrowserProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [files, setFiles] = useState<ContentItem[]>([
    {
      id: "1",
      title: "Physics Formula Cheat Sheet",
      type: "study_material",
      subject: "Physics",
      examGoal: "JEE",
      createdAt: "2025-03-15T10:30:00Z",
      updatedAt: "2025-04-10T08:45:00Z",
      tags: ["formulas", "quick-reference"]
    },
    {
      id: "2",
      title: "NEET Biology Flash Cards",
      type: "flashcard",
      subject: "Biology",
      examGoal: "NEET",
      createdAt: "2025-03-20T14:20:00Z",
      updatedAt: "2025-04-09T16:30:00Z",
      tags: ["flashcards", "spaced-repetition"]
    },
    {
      id: "3",
      title: "Mock Test Series - JEE Advanced",
      type: "practice_exam",
      subject: "Mathematics",
      examGoal: "JEE Advanced",
      createdAt: "2025-03-25T09:15:00Z",
      updatedAt: "2025-04-12T11:10:00Z",
      tags: ["mock-test", "timed"]
    }
  ]);
  
  // Filter files by search term and contentType
  const filteredFiles = files.filter(file => {
    const matchesType = contentType === file.type || contentType === 'all';
    const matchesSearch = file.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (file.subject && file.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (file.examGoal && file.examGoal.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesSearch;
  });
  
  const handleDelete = (file: ContentItem) => {
    setFiles(files.filter(f => f.id !== file.id));
  };
  
  const handleEdit = (file: ContentItem) => {
    console.log("Edit file:", file);
    // Would open edit modal or navigate to edit view
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search content..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          <span>Filters</span>
        </Button>
      </div>
      
      {filteredFiles.length > 0 ? (
        <FilesTable
          files={filteredFiles}
          onSelect={onSelect}
          onDelete={handleDelete}
          onEdit={handleEdit}
          selectedFile={selectedContent}
        />
      ) : (
        <EmptyState
          message="No files match your search"
          actionLabel="Clear Filters"
          onAction={() => setSearchTerm("")}
        />
      )}
    </div>
  );
};

export default ContentBrowser;
