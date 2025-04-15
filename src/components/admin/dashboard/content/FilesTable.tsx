
import React from "react";
import { FileRowProps, FilesTableProps } from "@/types/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { FileText, Edit, Trash2 } from "lucide-react";

export const FileRow: React.FC<FileRowProps> = ({
  file,
  isSelected,
  onSelect,
  onDelete,
  onEdit
}) => {
  // Format file size to readable format
  const formatFileSize = (bytes: number = 0) => {
    if (bytes < 1024) return `${bytes} B`;
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <tr
      className={`${
        isSelected ? "bg-primary/5" : "hover:bg-muted/50"
      } cursor-pointer transition-colors`}
      onClick={() => onSelect(file)}
    >
      <td className="p-2 pl-4">
        <div className="flex items-center">
          <FileText size={16} className="mr-2 text-primary" />
          <span className="font-medium">{file.title}</span>
        </div>
      </td>
      <td className="p-2">
        <Badge variant="outline" className="capitalize">
          {file.type.replace("_", " ")}
        </Badge>
      </td>
      <td className="p-2">
        {file.subject || "-"}
      </td>
      <td className="p-2">
        {file.examGoal || "-"}
      </td>
      <td className="p-2 whitespace-nowrap text-sm">
        {formatDistanceToNow(new Date(file.createdAt), { addSuffix: true })}
      </td>
      <td className="p-2 text-right whitespace-nowrap text-xs text-muted-foreground">
        {file.fileSize ? formatFileSize(file.fileSize) : "-"}
      </td>
      <td className="p-2">
        <div className="flex justify-end space-x-1" onClick={(e) => e.stopPropagation()}>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onEdit(file)}
            >
              <Edit size={14} />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => onDelete(file)}
            >
              <Trash2 size={14} />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export const FilesTable: React.FC<FilesTableProps> = ({
  files,
  onSelect,
  onDelete,
  onEdit,
  selectedFile
}) => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-2 pl-4 text-left font-medium">Title</th>
              <th className="p-2 text-left font-medium">Type</th>
              <th className="p-2 text-left font-medium">Subject</th>
              <th className="p-2 text-left font-medium">Exam</th>
              <th className="p-2 text-left font-medium">Created</th>
              <th className="p-2 text-right font-medium">Size</th>
              <th className="p-2 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};
