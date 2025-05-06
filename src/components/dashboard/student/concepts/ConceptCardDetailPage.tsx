import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Brain, FileText, Share, Bookmark, ThumbsUp, MessageSquare, Download } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { ConceptCard } from '@/types/concept';
import { fetchConceptCardById } from '@/services/conceptService';
import ConceptCardSkeleton from './ConceptCardSkeleton';
import ConceptCardContent from './ConceptCardContent';
import ConceptCardQuiz from './ConceptCardQuiz';
import ConceptCardExamples from './ConceptCardExamples';
import ConceptCardRelated from './ConceptCardRelated';
import ConceptCardDiscussion from './ConceptCardDiscussion';
import { useUserProgress } from '@/hooks/useUserProgress';

const ConceptCardDetailPage = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [conceptCard, setConceptCard] = useState<ConceptCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const { updateProgress, getProgressForConcept } = useUserProgress();
  
  // Fetch concept card data
  useEffect(() => {
    const loadConceptCard = async () => {
      if (!conceptId) return;
      
      setLoading(true);
      try {
        const data = await fetchConceptCardById(conceptId);
        setConceptCard(data);
        
        // Check if bookmarked or liked from local storage
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked_concepts') || '[]');
        const savedLikes = JSON.parse(localStorage.getItem('liked_concepts') || '[]');
        
        setBookmarked(savedBookmarks.includes(conceptId));
        setLiked(savedLikes.includes(conceptId));
      } catch (error) {
        console.error("Error fetching concept card:", error);
        toast({
          title: "Error",
          description: "Failed to load concept card. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadConceptCard();
  }, [conceptId, toast]);
  
  // Handle bookmark toggle
  const handleBookmark = () => {
    if (!conceptId) return;
    
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked_concepts') || '[]');
    let updatedBookmarks;
    
    if (bookmarked) {
      updatedBookmarks = savedBookmarks.filter((id: string) => id !== conceptId);
      toast({
        title: "Removed from bookmarks",
        description: "Concept card removed from your bookmarks.",
      });
    } else {
      updatedBookmarks = [...savedBookmarks, conceptId];
      toast({
        title: "Bookmarked!",
        description: "Concept card added to your bookmarks.",
      });
    }
    
    localStorage.setItem('bookmarked_concepts', JSON.stringify(updatedBookmarks));
    setBookmarked(!bookmarked);
  };
  
  // Handle like toggle
  const handleLike = () => {
    if (!conceptId) return;
    
    const savedLikes = JSON.parse(localStorage.getItem('liked_concepts') || '[]');
    let updatedLikes;
    
    if (liked) {
      updatedLikes = savedLikes.filter((id: string) => id !== conceptId);
    } else {
      updatedLikes = [...savedLikes, conceptId];
      toast({
        title: "Liked!",
        description: "Thanks for your feedback!",
      });
    }
    
    localStorage.setItem('liked_concepts', JSON.stringify(updatedLikes));
    setLiked(!liked);
  };
  
  // Handle share
  const handleShare = () => {
    if (navigator.share && conceptCard) {
      navigator.share({
        title: conceptCard.title,
        text: `Check out this concept: ${conceptCard.title}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Concept card link copied to clipboard.",
      });
    }
  };
  
  // Handle download
  const handleDownload = () => {
    if (!conceptCard) return;
    
    // Create a text version of the concept card
    const content = `
      ${conceptCard.title}
      ${conceptCard.subject} | ${conceptCard.topic}
      
      ${conceptCard.description}
      
      Key Points:
      ${conceptCard.keyPoints?.join('\n')}
      
      Examples:
      ${conceptCard.examples?.join('\n')}
    `;
    
    // Create a blob and download it
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${conceptCard.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Concept card saved as text file.",
    });
  };
  
  // Update progress when viewing the concept
  useEffect(() => {
    if (conceptCard && conceptId) {
      updateProgress({
        conceptId,
        action: 'view',
        timestamp: new Date().toISOString(),
      });
    }
  }, [conceptCard, conceptId, updateProgress]);
  
  // Get progress data for this concept
  const progress = conceptId ? getProgressForConcept(conceptId) : null;
  const progressPercentage = progress?.completionPercentage || 0;
  
  if (loading) {
    return <ConceptCardSkeleton />;
  }
  
  if (!conceptCard) {
    return (
      <SharedPageLayout
        title="Concept Not Found"
        subtitle="The concept card you're looking for doesn't exist or has been moved."
      >
        <div className="flex flex-col items-center justify-center py-12">
          <p className="mb-4 text-muted-foreground">
            We couldn't find the concept card you're looking for.
          </p>
          <Button onClick={() => navigate('/dashboard/student/concepts')}>
            Browse All Concepts
          </Button>
        </div>
      </SharedPageLayout>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Add Back Button */}
      <Button 
        variant="ghost" 
        className="mb-4" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <Card className="overflow-hidden border-none shadow-md">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                  {conceptCard.subject}
                </Badge>
                <Badge variant="outline" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400">
                  {conceptCard.topic}
                </Badge>
                {conceptCard.difficulty && (
                  <Badge variant="outline" className={
                    conceptCard.difficulty === 'Easy' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : conceptCard.difficulty === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                  }>
                    {conceptCard.difficulty}
                  </Badge>
                )}
              </div>
              
              <h1 className="text-2xl font-bold mb-2">{conceptCard.title}</h1>
              
              <p className="text-muted-foreground mb-4">
                {conceptCard.description}
              </p>
              
              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Your progress</span>
                  <span>{progressPercentage}% complete</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-row md:flex-col gap-2 justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                className={bookmarked ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400" : ""}
                onClick={handleBookmark}
              >
                <Bookmark className={`h-4 w-4 mr-2 ${bookmarked ? "fill-current" : ""}`} />
                {bookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className={liked ? "bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400" : ""}
                onClick={handleLike}
              >
                <ThumbsUp className={`h-4 w-4 mr-2 ${liked ? "fill-current" : ""}`} />
                {liked ? "Liked" : "Like"}
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
        
        {/* Tabs for different content sections */}
        <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="mb-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="content">
            <ConceptCardContent conceptCard={conceptCard} />
          </TabsContent>
          
          <TabsContent value="quiz">
            <ConceptCardQuiz conceptId={conceptId || ''} conceptTitle={conceptCard.title} />
          </TabsContent>
          
          <TabsContent value="examples">
            <ConceptCardExamples examples={conceptCard.examples || []} />
          </TabsContent>
          
          <TabsContent value="related">
            <ConceptCardRelated 
              relatedConcepts={conceptCard.relatedConcepts || []} 
              subject={conceptCard.subject} 
              topic={conceptCard.topic}
            />
          </TabsContent>
          
          <TabsContent value="discussion">
            <ConceptCardDiscussion conceptId={conceptId || ''} />
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* CTA buttons */}
      <div className="mt-6 flex flex-wrap gap-4">
        <Button 
          className="flex items-center gap-2" 
          onClick={() => navigate(`/dashboard/student/concepts/${conceptId}/study`)}
        >
          <BookOpen className="h-4 w-4" />
          Study This Concept
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => navigate(`/dashboard/student/flashcards/${conceptCard.relatedFlashcardId || 'default'}`)}
        >
          <Brain className="h-4 w-4" />
          Practice Flashcards
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => navigate(`/dashboard/student/practice-exam/${conceptCard.relatedExamId || 'default'}/start`)}
        >
          <FileText className="h-4 w-4" />
          Take Practice Quiz
        </Button>
        
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setActiveTab("discussion")}
        >
          <MessageSquare className="h-4 w-4" />
          Join Discussion
        </Button>
      </div>
      
      {/* Author and metadata */}
      <div className="mt-8">
        <Separator className="mb-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/avatars/teacher.png" alt="Author" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Created by Teaching Team</p>
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(conceptCard.updatedAt || Date.now()).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <span className="mr-4">Views: {conceptCard.views || 0}</span>
            <span>Bookmarks: {conceptCard.bookmarks || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetailPage;
