
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter } from "lucide-react";
import { ContentType, ContentItem, ContentBrowserProps } from "@/types/content";
import { EmptyState } from "./EmptyState";
import { FilesTable } from "./FilesTable";

export const ContentBrowser: React.FC<ContentBrowserProps> = ({
  contentType = "concept_card",
  onSelect,
  selectedContent
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [subject, setSubject] = useState<string>("all");
  const [examGoal, setExamGoal] = useState<string>("all");
  const [currentTab, setCurrentTab] = useState<ContentType | "all">("all");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "a-z" | "z-a">("newest");
  
  // Mock content items for demonstration
  const contentItems: ContentItem[] = [
    {
      id: "1",
      title: "Periodic Table Concepts",
      type: "concept_card",
      subject: "Chemistry",
      examGoal: "NEET",
      difficultyLevel: "intermediate",
      createdAt: "2025-04-10T09:00:00",
      updatedAt: "2025-04-10T09:00:00",
      tags: ["chemistry", "periodic table", "elements"],
      fileUrl: "/content/periodic-table.pdf",
      fileSize: "1250000",
      fileName: "periodic-table.pdf"
    },
    {
      id: "2",
      title: "Newton's Laws of Motion",
      type: "flashcard",
      subject: "Physics",
      examGoal: "JEE",
      difficultyLevel: "advanced",
      createdAt: "2025-04-09T14:30:00",
      updatedAt: "2025-04-09T14:30:00",
      tags: ["physics", "newton", "motion"],
      fileUrl: "/content/newtons-laws.pdf",
      fileSize: "850000",
      fileName: "newtons-laws.pdf"
    },
    {
      id: "3",
      title: "Calculus Integration Formulas",
      type: "study_material",
      subject: "Mathematics",
      examGoal: "JEE Advanced",
      difficultyLevel: "advanced",
      createdAt: "2025-04-08T11:15:00",
      updatedAt: "2025-04-08T16:45:00",
      tags: ["mathematics", "calculus", "integration"],
      fileUrl: "/content/calculus.pdf",
      fileSize: "1450000",
      fileName: "calculus.pdf"
    },
    {
      id: "4",
      title: "Cell Biology Structures",
      type: "concept_card",
      subject: "Biology",
      examGoal: "NEET",
      difficultyLevel: "intermediate",
      createdAt: "2025-04-07T10:20:00",
      updatedAt: "2025-04-07T10:20:00",
      tags: ["biology", "cell", "organelles"],
      fileUrl: "/content/cell-biology.pdf",
      fileSize: "2250000",
      fileName: "cell-biology.pdf"
    },
    {
      id: "5",
      title: "Chemical Bonding Practice Questions",
      type: "practice_exam",
      subject: "Chemistry",
      examGoal: "JEE Main",
      difficultyLevel: "intermediate",
      createdAt: "2025-04-06T15:45:00",
      updatedAt: "2025-04-06T15:45:00",
      tags: ["chemistry", "bonding", "practice"],
      fileUrl: "/content/chemical-bonding.pdf",
      fileSize: "1850000",
      fileName: "chemical-bonding.pdf"
    }
  ];
  
  // Filter content based on selections
  const filteredContent = contentItems.filter(item => {
    // Filter by content type
    if (currentTab !== "all" && item.type !== currentTab) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filter by subject
    if (subject !== "all" && item.subject !== subject) {
      return false;
    }
    
    // Filter by exam goal
    if (examGoal !== "all" && item.examGoal !== examGoal) {
      return false;
    }
    
    return true;
  });
  
  // Sort content
  const sortedContent = [...filteredContent].sort((a, b) => {
    switch (sortOrder) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "a-z":
        return a.title.localeCompare(b.title);
      case "z-a":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value as ContentType | "all");
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="font-medium">Content Browser</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search content..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" value={currentTab} onValueChange={handleTabChange}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="concept_card">Concepts</TabsTrigger>
            <TabsTrigger value="flashcard">Flashcards</TabsTrigger>
            <TabsTrigger value="study_material">Notes</TabsTrigger>
            <TabsTrigger value="practice_exam">Practice</TabsTrigger>
          </TabsList>
          
          <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="a-z">A-Z</SelectItem>
              <SelectItem value="z-a">Z-A</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div>
            <Label className="mb-2 block">Subject</Label>
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2 block">Exam Goal</Label>
            <Select value={examGoal} onValueChange={setExamGoal}>
              <SelectTrigger>
                <SelectValue placeholder="Select exam goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Exams</SelectItem>
                <SelectItem value="JEE">JEE</SelectItem>
                <SelectItem value="NEET">NEET</SelectItem>
                <SelectItem value="JEE Main">JEE Main</SelectItem>
                <SelectItem value="JEE Advanced">JEE Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" className="w-full" onClick={() => {
              setSearchTerm("");
              setSubject("all");
              setExamGoal("all");
              setCurrentTab("all");
            }}>
              <Filter className="mr-2 h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="m-0">
          {sortedContent.length > 0 ? (
            <FilesTable
              files={sortedContent}
              onSelect={onSelect}
              selectedFile={selectedContent}
            />
          ) : (
            <EmptyState
              icon={<FileText size={48} className="text-muted-foreground" />}
              message="No content found matching your filters"
              actionLabel="Modify filters"
            />
          )}
        </TabsContent>
        
        {["concept_card", "flashcard", "study_material", "practice_exam", "quiz"].map((type) => (
          <TabsContent key={type} value={type} className="m-0">
            {sortedContent.filter(item => item.type === type).length > 0 ? (
              <FilesTable
                files={sortedContent.filter(item => item.type === type)}
                onSelect={onSelect}
                selectedFile={selectedContent}
              />
            ) : (
              <EmptyState 
                icon={<FileText size={48} className="text-muted-foreground" />} 
                message={`No ${type.replace('_', ' ')} content found`}
                actionLabel="Modify filters" 
              />
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContentBrowser;
