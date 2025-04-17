
import React from "react";
import { FileText, FileVideo, ExternalLink } from "lucide-react";
import { File } from "lucide-react"; // Using File instead of FilePdf
import { Button } from "@/components/ui/button";

type ResourceType = "Video" | "Text" | "PDF";

interface ResourceDisplayProps {
  resourceType: ResourceType;
  resourceUrl: string;
  title: string;
}

/**
 * Get the appropriate icon based on resource type
 */
export const getResourceIcon = (resourceType: ResourceType) => {
  switch (resourceType) {
    case "Video":
      return <FileVideo className="h-4 w-4 mr-2" />;
    case "PDF":
      return <File className="h-4 w-4 mr-2" />; // Changed from FilePdf to File
    case "Text":
    default:
      return <FileText className="h-4 w-4 mr-2" />;
  }
};

/**
 * Get color scheme for resource type
 */
export const getResourceColors = (resourceType: ResourceType) => {
  switch (resourceType) {
    case "Video":
      return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
    case "PDF":
      return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
    case "Text":
    default:
      return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
  }
};

/**
 * Get display text for the resource button
 */
export const getResourceText = (resourceType: ResourceType) => {
  switch (resourceType) {
    case "Video":
      return "Watch Video";
    case "PDF":
      return "View PDF";
    case "Text":
    default:
      return "Read Article";
  }
};

/**
 * Component that renders a resource button based on type
 */
export const ResourceButton: React.FC<ResourceDisplayProps> = ({
  resourceType,
  resourceUrl,
  title
}) => {
  const colorClasses = getResourceColors(resourceType);
  const icon = getResourceIcon(resourceType);
  const buttonText = getResourceText(resourceType);
  
  return (
    <Button
      variant="outline"
      size="sm"
      className={`${colorClasses} flex items-center`}
      onClick={() => window.open(resourceUrl, "_blank")}
    >
      {icon}
      {buttonText}
      <ExternalLink className="h-3 w-3 ml-1" />
    </Button>
  );
};

/**
 * Component that displays additional resource information
 */
export const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
  resourceType,
  resourceUrl,
  title
}) => {
  return (
    <div className="mt-4 border rounded-lg p-4">
      <h3 className="text-sm font-medium mb-2">Additional Resources</h3>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {getResourceIcon(resourceType)}
          <span className="text-sm">{title}</span>
        </div>
        <ResourceButton
          resourceType={resourceType}
          resourceUrl={resourceUrl}
          title={title}
        />
      </div>
    </div>
  );
};
