import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, MessageSquare, Beaker, Lightbulb } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import VideoContentTab from './tabs/VideoContentTab';
import NotesTab from './tabs/NotesTab';
import DoubtsTab from './tabs/DoubtsTab';
import ResourcesTab from './tabs/ResourcesTab';
import ReviewTab from './tabs/ReviewTab';
import FormulaTabContent from './tabs/FormulaTabContent';
import FormulaLabPage from './FormulaLabPage';

interface ConceptCardViewProps {
  conceptId: string;
  conceptTitle: string;
  subject: string;
}

const ConceptCardView: React.FC<ConceptCardViewProps> = ({
  conceptId,
  conceptTitle,
  subject
}) => {
  const [activeTab, setActiveTab] = useState('video');
  const [showFormulaLab, setShowFormulaLab] = useState(false);
  const { toast } = useToast();
  
  const handleOpenFormulaLab = () => {
    setShowFormulaLab(true);
  };
  
  const handleCloseFormulaLab = () => {
    setShowFormulaLab(false);
  };
  
  if (showFormulaLab) {
    return <FormulaLabPage onClose={handleCloseFormulaLab} conceptTitle={conceptTitle} />;
  }

  return (
    <Card className="border-gray-200 dark:border-gray-700 shadow-sm">
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">{conceptTitle}</CardTitle>
          <Button variant="default" size="sm" className="gap-1">
            <Lightbulb className="h-4 w-4" />
            Practice Quiz
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs 
          defaultValue="video" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="border-b">
            <TabsList className="h-12 w-full justify-start rounded-none bg-transparent p-0">
              <TabsTrigger 
                value="video" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Video className="h-4 w-4 mr-2" />
                Video
              </TabsTrigger>
              <TabsTrigger 
                value="notes" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Notes
              </TabsTrigger>
              <TabsTrigger 
                value="formulas" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Beaker className="h-4 w-4 mr-2" />
                Formulas
              </TabsTrigger>
              <TabsTrigger 
                value="resources" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <FileText className="h-4 w-4 mr-2" />
                Resources
              </TabsTrigger>
              <TabsTrigger 
                value="doubts" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Doubts
              </TabsTrigger>
              <TabsTrigger 
                value="review" 
                className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Review
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6">
            <TabsContent value="video" className="mt-0">
              <VideoContentTab conceptId={conceptId} conceptTitle={conceptTitle} />
            </TabsContent>
            
            <TabsContent value="notes" className="mt-0">
              <NotesTab conceptId={conceptId} conceptTitle={conceptTitle} />
            </TabsContent>
            
            <TabsContent value="formulas" className="mt-0">
              <FormulaTabContent 
                conceptId={conceptId} 
                conceptTitle={conceptTitle}
                handleOpenFormulaLab={handleOpenFormulaLab}
              />
            </TabsContent>
            
            <TabsContent value="resources" className="mt-0">
              <ResourcesTab conceptId={conceptId} conceptTitle={conceptTitle} />
            </TabsContent>
            
            <TabsContent value="doubts" className="mt-0">
              <DoubtsTab conceptId={conceptId} conceptTitle={conceptTitle} />
            </TabsContent>
            
            <TabsContent value="review" className="mt-0">
              <ReviewTab conceptId={conceptId} conceptTitle={conceptTitle} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConceptCardView;
