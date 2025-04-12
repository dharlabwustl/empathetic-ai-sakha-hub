
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  FileText,
  Upload,
  Book,
  FlashCard,
  MoveRight,
  CheckCircle2,
  Tag,
  Search,
  Download,
  Filter,
  PlusCircle,
  Loader2,
  GraduationCap,
  BookOpen
} from "lucide-react";

const ContentManagementTab = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: "file1",
      name: "NEET Biology Notes.pdf",
      type: "study-material",
      subject: "Biology",
      examType: "NEET",
      uploadDate: "2025-03-31",
      size: "4.2 MB",
      tags: ["notes", "biology", "neet"]
    },
    {
      id: "file2",
      name: "JEE Advanced Physics Formula Sheet.pdf",
      type: "syllabus",
      subject: "Physics",
      examType: "JEE Advanced",
      uploadDate: "2025-03-29",
      size: "2.1 MB",
      tags: ["formulas", "physics", "jee"]
    },
    {
      id: "file3",
      name: "CAT Quantitative Aptitude Question Bank.pdf",
      type: "practice",
      subject: "Mathematics",
      examType: "CAT",
      uploadDate: "2025-03-25",
      size: "8.7 MB",
      tags: ["questions", "mathematics", "cat"]
    },
    {
      id: "file4",
      name: "UPSC Previous Year Papers (2024).pdf",
      type: "exam-material",
      subject: "General Studies",
      examType: "UPSC",
      uploadDate: "2025-03-20",
      size: "12.4 MB",
      tags: ["previous-papers", "upsc"]
    }
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("study-material");

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Simulate file upload
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

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // Add the new file to the list
          const newFile = {
            id: `file${uploadedFiles.length + 1}`,
            name: selectedFile.name,
            type: currentTab,
            subject: "Subject",
            examType: "Exam Type",
            uploadDate: new Date().toISOString().split('T')[0],
            size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
            tags: ["new"]
          };
          
          setUploadedFiles(prev => [newFile, ...prev]);
          setSelectedFile(null);
          
          toast({
            title: "File uploaded successfully",
            description: `${selectedFile.name} has been uploaded.`,
          });
          
          return 0;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleTagManagement = () => {
    toast({
      title: "Tag Management",
      description: "Tag management feature opened."
    });
  };

  const handlePromptTuning = () => {
    toast({
      title: "Prompt Tuning",
      description: "GPT Prompt tuning dialog opened."
    });
  };

  const handleContentGeneration = () => {
    toast({
      title: "Content Generation",
      description: "AI content generation initialized."
    });
  };

  // Filter the uploaded files based on type and search term
  const filteredFiles = uploadedFiles.filter(file => 
    (currentTab === "all" || file.type === currentTab) && 
    (file.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     file.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Content Management System</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Manage study materials, syllabi, practice exams, and other content resources
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleTagManagement}>
            <Tag size={16} className="mr-2" />
            Manage Tags
          </Button>
          <Button variant="outline" onClick={handlePromptTuning}>
            <MoveRight size={16} className="mr-2" />
            Tune GPT Prompts
          </Button>
          <Button onClick={handleContentGeneration}>
            <PlusCircle size={16} className="mr-2" />
            Generate Content
          </Button>
        </div>
      </div>

      <Tabs defaultValue="study-material" onValueChange={setCurrentTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="study-material" className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>Study Materials</span>
            </TabsTrigger>
            <TabsTrigger value="syllabus" className="flex items-center gap-1">
              <Book size={16} />
              <span>Syllabus</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex items-center gap-1">
              <FlashCard size={16} />
              <span>Practice</span>
            </TabsTrigger>
            <TabsTrigger value="exam-material" className="flex items-center gap-1">
              <GraduationCap size={16} />
              <span>Exam Material</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <FileText size={16} />
              <span>All</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Content for all tabs */}
        <TabsContent value="study-material" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Study Materials</CardTitle>
              <CardDescription>Upload and manage study notes, reference materials, and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentUploader 
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                selectedFile={selectedFile}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="syllabus" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Syllabus</CardTitle>
              <CardDescription>Upload and manage exam syllabi and curriculum materials</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentUploader 
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                selectedFile={selectedFile}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Practice Materials</CardTitle>
              <CardDescription>Upload and manage practice tests, question banks, and worksheets</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentUploader 
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                selectedFile={selectedFile}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exam-material" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Exam Materials</CardTitle>
              <CardDescription>Upload and manage previous year papers, sample papers, and exam resources</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentUploader 
                handleFileSelect={handleFileSelect}
                handleUpload={handleUpload}
                selectedFile={selectedFile}
                uploading={uploading}
                uploadProgress={uploadProgress}
              />
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>All Content</CardTitle>
              <CardDescription>View and manage all uploaded content</CardDescription>
            </CardHeader>
            <CardContent>
              <ContentBrowser 
                files={filteredFiles}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Content Uploader Component
interface ContentUploaderProps {
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpload: () => void;
  selectedFile: File | null;
  uploading: boolean;
  uploadProgress: number;
}

const ContentUploader = ({ 
  handleFileSelect, 
  handleUpload, 
  selectedFile, 
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
              onClick={() => document.getElementById('fileUpload')!.value = ''}
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

// Content Browser Component
interface ContentBrowserProps {
  files: any[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ContentBrowser = ({ files, searchTerm, setSearchTerm }: ContentBrowserProps) => {
  const { toast } = useToast();
  
  const handleDownload = (fileName: string) => {
    toast({
      title: "Download started",
      description: `Downloading ${fileName}...`
    });
  };
  
  const handleView = (fileId: string) => {
    toast({
      title: "File viewer opened",
      description: `Viewing file ID: ${fileId}`
    });
  };
  
  const handleTagFile = (fileId: string) => {
    toast({
      title: "Tag editor opened",
      description: `Add or edit tags for file ID: ${fileId}`
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by file name, subject, or tag"
            className="w-full pl-10 pr-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>
      
      {files.length === 0 ? (
        <div className="text-center py-8">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 font-semibold">No files found</h3>
          <p className="text-sm text-gray-500">
            {searchTerm 
              ? "Try changing your search terms" 
              : "Upload files to get started"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">File Name</th>
                <th className="text-left py-3 px-4 font-medium">Subject</th>
                <th className="text-left py-3 px-4 font-medium">Exam Type</th>
                <th className="text-left py-3 px-4 font-medium">Upload Date</th>
                <th className="text-left py-3 px-4 font-medium">Size</th>
                <th className="text-left py-3 px-4 font-medium">Tags</th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                  <td className="py-3 px-4">{file.name}</td>
                  <td className="py-3 px-4">{file.subject}</td>
                  <td className="py-3 px-4">{file.examType}</td>
                  <td className="py-3 px-4">{file.uploadDate}</td>
                  <td className="py-3 px-4">{file.size}</td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {file.tags.map((tag: string, i: number) => (
                        <span 
                          key={i} 
                          className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleView(file.id)}
                      >
                        <Search size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDownload(file.name)}
                      >
                        <Download size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleTagFile(file.id)}
                      >
                        <Tag size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContentManagementTab;
