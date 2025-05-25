
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ContentType, ContentFile, ContentManagementHookReturn, ContentOverviewStats } from "@/types/content";

export const useContentManagement = (): ContentManagementHookReturn => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [currentTab, setCurrentTab] = useState<ContentType>("concept-card");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [uploadedFiles, setUploadedFiles] = useState<ContentFile[]>([
    {
      id: "file1",
      name: "NEET Biology Notes.pdf",
      type: "concept-card",
      subject: "Biology",
      examType: "NEET",
      uploadDate: "2025-03-31",
      size: "4.2 MB",
      tags: ["notes", "biology", "neet"],
      format: "text-summary",
      generatedContent: {
        textSummary: true,
        visualDiagram: false,
        threeDModel: false,
        interactiveLab: false,
        video: false,
        examMistakes: true,
        audioAnalysis: false,
        createdAt: "2025-03-31T10:00:00Z",
        processingTime: 45
      }
    },
    {
      id: "file2",
      name: "Physics Mechanics Concepts",
      type: "concept-card",
      subject: "Physics",
      examType: "JEE Advanced",
      uploadDate: "2025-03-29",
      size: "2.1 MB",
      tags: ["mechanics", "physics", "jee"],
      format: "visual-diagram",
      generatedContent: {
        textSummary: true,
        visualDiagram: true,
        threeDModel: false,
        interactiveLab: false,
        video: false,
        examMistakes: false,
        audioAnalysis: true,
        createdAt: "2025-03-29T14:30:00Z",
        processingTime: 120
      }
    },
    {
      id: "file3",
      name: "Chemistry Molecular Models",
      type: "concept-card",
      subject: "Chemistry",
      examType: "NEET",
      uploadDate: "2025-03-25",
      size: "8.7 MB",
      tags: ["molecules", "chemistry", "3d"],
      format: "3d-model",
      generatedContent: {
        textSummary: true,
        visualDiagram: false,
        threeDModel: true,
        interactiveLab: true,
        video: false,
        examMistakes: false,
        audioAnalysis: true,
        createdAt: "2025-03-25T09:15:00Z",
        processingTime: 180
      }
    }
  ]);

  // Calculate overview stats
  const overviewStats: ContentOverviewStats = {
    totalGenerated: uploadedFiles.length,
    byFormat: uploadedFiles.reduce((acc, file) => {
      if (file.format) {
        acc[file.format] = (acc[file.format] || 0) + 1;
      }
      return acc;
    }, {} as Record<any, number>),
    bySubject: uploadedFiles.reduce((acc, file) => {
      acc[file.subject] = (acc[file.subject] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    byExam: uploadedFiles.reduce((acc, file) => {
      acc[file.examType] = (acc[file.examType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    recentActivity: {
      today: 2,
      thisWeek: 8,
      thisMonth: 24
    },
    qualityMetrics: {
      averageProcessingTime: 115,
      successRate: 94,
      userSatisfaction: 4.6
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileRemove = () => {
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    setSelectedFile(null);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          const newFile: ContentFile = {
            id: `file${uploadedFiles.length + 1}`,
            name: selectedFile.name,
            type: currentTab,
            subject: "Subject",
            examType: "Exam Type",
            uploadDate: new Date().toISOString().split('T')[0],
            size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
            tags: ["new"],
            format: "text-summary",
            generatedContent: {
              textSummary: true,
              visualDiagram: false,
              threeDModel: false,
              interactiveLab: false,
              video: false,
              examMistakes: false,
              audioAnalysis: false,
              createdAt: new Date().toISOString(),
              processingTime: Math.floor(Math.random() * 120) + 30
            }
          };
          
          setUploadedFiles(prev => [newFile, ...prev]);
          setSelectedFile(null);
          
          toast({
            title: "File uploaded successfully",
            description: `${selectedFile.name} has been uploaded and concept cards generated.`,
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const filteredFiles = uploadedFiles.filter(file => 
    (currentTab === "all" || file.type === currentTab) && 
    (file.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     file.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return {
    uploading,
    uploadProgress,
    selectedFile,
    uploadedFiles,
    searchTerm,
    currentTab,
    filteredFiles,
    overviewStats,
    handleFileSelect,
    handleFileRemove,
    handleUpload,
    setSearchTerm,
    setCurrentTab
  };
};
