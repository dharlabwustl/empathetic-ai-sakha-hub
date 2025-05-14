
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Video, HelpCircle, FileText, Star } from "lucide-react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import VideoContentTab from './tabs/VideoContentTab';
import NotesTab from './tabs/NotesTab';
import DoubtsTab from './tabs/DoubtsTab';
import ResourcesTab from './tabs/ResourcesTab';
import ReviewTab from './tabs/ReviewTab';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface ConceptCardDetailProps {
  id?: string;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ id }) => {
  const navigate = useNavigate();
  const params = useParams();
  const conceptId = id || params.id || "1";
  const [activeTab, setActiveTab] = useState("video");
  
  // Mock concept data
  const concept = {
    id: conceptId,
    title: "Newton's Laws of Motion",
    description: "Understanding the fundamental principles that govern the motion of objects.",
    subject: "Physics",
    difficulty: "Medium",
    progress: 65,
    importance: "High",
    lastAccessed: "2 days ago"
  };
  
  // Check if ReviewTab is a missing component
  const ReviewTabComponent = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Review & Rating</h3>
      <p>This is the review tab content.</p>
    </div>
  );
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/student/concepts')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Concepts
        </Button>
        
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{concept.title}</h1>
              <Badge variant="outline">{concept.difficulty}</Badge>
              {concept.importance === "High" && (
                <Badge className="bg-amber-500 text-white">High Priority</Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">{concept.description}</p>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center gap-1">
              <p className="text-sm font-medium">Progress:</p>
              <p className="text-sm">{concept.progress}%</p>
            </div>
            <Progress value={concept.progress} className="w-32 h-2" />
            <p className="text-xs text-muted-foreground">Last accessed: {concept.lastAccessed}</p>
          </div>
        </div>
      </div>
      
      <Card className="mt-4 border shadow-md rounded-lg overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="bg-muted/40 border-b border-border">
            <div className="container px-4 py-2">
              <TabsList className="grid grid-cols-5 w-full bg-transparent">
                <TabsTrigger value="video" className="data-[state=active]:shadow-md data-[state=active]:bg-background">
                  <Video className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Video</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:shadow-md data-[state=active]:bg-background">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Notes</span>
                </TabsTrigger>
                <TabsTrigger value="doubts" className="data-[state=active]:shadow-md data-[state=active]:bg-background">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Doubts</span>
                </TabsTrigger>
                <TabsTrigger value="resources" className="data-[state=active]:shadow-md data-[state=active]:bg-background">
                  <FileText className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Resources</span>
                </TabsTrigger>
                <TabsTrigger value="review" className="data-[state=active]:shadow-md data-[state=active]:bg-background">
                  <Star className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Review</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <CardContent className="p-6">
            <TabsContent value="video" className="mt-0">
              <VideoContentTab />
            </TabsContent>
            
            <TabsContent value="notes" className="mt-0">
              <NotesTab />
            </TabsContent>
            
            <TabsContent value="doubts" className="mt-0">
              <DoubtsTab />
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <ResourcesTab />
            </TabsContent>
            
            <TabsContent value="review" className="mt-0">
              <ReviewTabComponent />
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default ConceptCardDetail;
