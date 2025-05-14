
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Video, BookOpen, MessageCircle, FileText, Download, Star, PlayCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import VideoContentTab from './tabs/VideoContentTab';
import NotesTab from './tabs/NotesTab';
import DoubtsTab from './tabs/DoubtsTab';
import ResourcesTab from './tabs/ResourcesTab';
import ContributorsTab from './tabs/ContributorsTab';

const ConceptCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('video');
  const [completionStatus, setCompletionStatus] = useState(45); // Example progress
  
  // Mock data for concept card
  const cardData = {
    id: id || '1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    chapter: 'Classical Mechanics',
    difficulty: 'medium',
    description: 'Comprehensive coverage of Newton\'s three laws of motion, including practical applications, problem-solving techniques, and conceptual understanding.',
    progress: 45,
    estimatedTime: '45 min',
    tags: ['Newton\'s Laws', 'Mechanics', 'Forces', 'Motion', 'NEET', 'JEE'],
    isPremium: true,
    totalVideos: 4,
    videoLength: '32 min',
    notesCount: 3,
    resourcesCount: 5,
    questionsCount: 27,
    doubtsCount: 8
  };

  const handleBackClick = () => {
    navigate(-1);
  };
  
  const markComplete = () => {
    setCompletionStatus(100);
    // In a real app, you would save this to the user's progress
  };
  
  return (
    <div className="container py-6 max-w-6xl mx-auto">
      {/* Back button and title */}
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center mb-2 hover:bg-transparent p-0" 
          onClick={handleBackClick}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span>Back to Concept Cards</span>
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{cardData.title}</h1>
              {cardData.isPremium && (
                <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white">
                  <Star className="h-3 w-3 mr-1" /> Premium
                </Badge>
              )}
            </div>
            <div className="flex items-center mt-1 text-sm text-muted-foreground">
              <Badge variant="outline" className="mr-2 bg-blue-50 dark:bg-blue-900/20">
                {cardData.subject}
              </Badge>
              <span className="mr-2">•</span>
              <span>{cardData.chapter}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{cardData.difficulty} difficulty</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Save Offline
            </Button>
            <Button size="sm">
              <PlayCircle className="h-4 w-4 mr-2" /> Continue Learning
            </Button>
          </div>
        </div>
      </div>
      
      {/* Progress card */}
      <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100 dark:border-purple-800/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Your Progress</h3>
              <p className="text-sm text-muted-foreground">Continue where you left off</p>
            </div>
            <div className="flex items-center">
              <div className="mr-4 text-right">
                <span className="text-lg font-bold">{completionStatus}%</span>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <Button 
                size="sm" 
                variant={completionStatus === 100 ? "outline" : "default"}
                onClick={markComplete}
                disabled={completionStatus === 100}
              >
                {completionStatus === 100 ? (
                  <><CheckCircle className="h-4 w-4 mr-2" /> Completed</>
                ) : (
                  <>Mark Complete</>
                )}
              </Button>
            </div>
          </div>
          <Progress value={completionStatus} className="mt-2 h-2" />
        </CardContent>
      </Card>
      
      {/* Description card */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <p>{cardData.description}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {cardData.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Content tabs */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-gray-200 dark:border-gray-800">
            <TabsList className="bg-transparent h-auto p-0">
              <TabsTrigger 
                value="video" 
                className={`flex items-center gap-2 px-6 py-3 h-auto rounded-none border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 ${
                  activeTab === 'video' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent'
                }`}
              >
                <Video className="h-4 w-4" />
                <span>Video</span>
                <Badge variant="outline" className="ml-1">{cardData.totalVideos}</Badge>
              </TabsTrigger>
              
              <TabsTrigger 
                value="notes" 
                className={`flex items-center gap-2 px-6 py-3 h-auto rounded-none border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 ${
                  activeTab === 'notes' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                <span>Notes</span>
                <Badge variant="outline" className="ml-1">{cardData.notesCount}</Badge>
              </TabsTrigger>
              
              <TabsTrigger 
                value="doubts" 
                className={`flex items-center gap-2 px-6 py-3 h-auto rounded-none border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 ${
                  activeTab === 'doubts' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent'
                }`}
              >
                <MessageCircle className="h-4 w-4" />
                <span>Doubts</span>
                <Badge variant="outline" className="ml-1">{cardData.doubtsCount}</Badge>
              </TabsTrigger>
              
              <TabsTrigger 
                value="resources" 
                className={`flex items-center gap-2 px-6 py-3 h-auto rounded-none border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 ${
                  activeTab === 'resources' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent'
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Resources</span>
                <Badge variant="outline" className="ml-1">{cardData.resourcesCount}</Badge>
              </TabsTrigger>
              
              <TabsTrigger 
                value="contributors" 
                className={`flex items-center gap-2 px-6 py-3 h-auto rounded-none border-b-2 data-[state=active]:border-purple-500 data-[state=active]:shadow-none data-[state=active]:text-purple-600 dark:data-[state=active]:text-purple-400 ${
                  activeTab === 'contributors' ? 'border-purple-500 text-purple-600 dark:text-purple-400' : 'border-transparent'
                }`}
              >
                <Star className="h-4 w-4" />
                <span>Contributors</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6">
            <TabsContent value="video" className="m-0">
              <VideoContentTab conceptId={id} />
            </TabsContent>
            
            <TabsContent value="notes" className="m-0">
              <NotesTab conceptId={id} />
            </TabsContent>
            
            <TabsContent value="doubts" className="m-0">
              <DoubtsTab conceptId={id} />
            </TabsContent>
            
            <TabsContent value="resources" className="m-0">
              <ResourcesTab conceptId={id} />
            </TabsContent>
            
            <TabsContent value="contributors" className="m-0">
              <ContributorsTab conceptId={id} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
