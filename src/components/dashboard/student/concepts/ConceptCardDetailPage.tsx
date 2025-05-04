
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Check, Clock, Lightbulb, BookOpen, ExternalLink, Heart, MessageSquare, Bookmark, Share2, BarChart, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import RelatedConcepts from './RelatedConcepts';
import ConceptQuiz from './ConceptQuiz';
import { useConcepts } from '../hooks/useConcepts';
import BackButton from '@/components/dashboard/student/BackButton';

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [progress, setProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const { concept, isLoading, relatedConcepts } = useConcepts(conceptId);

  useEffect(() => {
    // Simulate loading progress
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500);
    return () => clearTimeout(timer);
  }, [conceptId]);

  const handleStudyNow = () => {
    if (concept) {
      navigate(`/dashboard/student/concepts/study/${concept.id}`);
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast({
      title: bookmarked ? "Bookmark removed" : "Bookmarked for later",
      description: bookmarked 
        ? "This concept has been removed from your bookmarks." 
        : "This concept has been added to your bookmarks.",
    });
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Like removed" : "Concept liked",
      description: liked 
        ? "You have removed your like from this concept." 
        : "Thanks for liking this concept!",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Concept link copied to clipboard.",
    });
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading concept...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!concept) {
    return (
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Concept Not Found</h2>
          <p className="text-gray-500 mb-6">The concept you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/dashboard/student/concepts')}>Back to Concepts</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <BackButton to="/dashboard/student/concepts" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4"
      >
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex gap-2 mb-2">
                    {concept.tags?.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl">{concept.title}</CardTitle>
                  <CardDescription className="mt-1">{concept.subtitle}</CardDescription>
                </div>
                <Badge className={`${concept.difficulty === 'easy' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                                    concept.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100' : 
                                    'bg-red-100 text-red-800 hover:bg-red-100'} text-xs`}>
                  {concept.difficulty.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="quiz">Quiz</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <ReactMarkdown>{concept.content}</ReactMarkdown>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Key Takeaways</h4>
                    <ul className="space-y-2">
                      {concept.keyPoints?.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-500 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="quiz" className="mt-0">
                  <ConceptQuiz concept={concept} />
                </TabsContent>
                
                <TabsContent value="notes" className="mt-0">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3>Your Notes</h3>
                    <p>You haven't added any notes for this concept yet. Use this space to jot down important points, questions, and insights.</p>
                    <textarea 
                      className="w-full h-40 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Start typing your notes here..."
                    ></textarea>
                    <Button className="mt-3">Save Notes</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div className="flex gap-3">
                <Button variant="outline" size="sm" onClick={handleLike} className={liked ? "text-red-500" : ""}>
                  <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-current text-red-500" : ""}`} />
                  {liked ? "Liked" : "Like"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleBookmark} className={bookmarked ? "text-blue-500" : ""}>
                  <Bookmark className={`h-4 w-4 mr-1 ${bookmarked ? "fill-current text-blue-500" : ""}`} />
                  {bookmarked ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
              <Button size="sm" onClick={handleStudyNow}>
                <BookOpen className="h-4 w-4 mr-1" />
                Study Now
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span className="font-semibold">{concept.progress || progress}%</span>
                  </div>
                  <Progress value={concept.progress || progress} className="h-2" />
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Estimated time</span>
                    </div>
                    <span className="text-sm">{concept.estimatedTime || '15 mins'}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm">
                      <Lightbulb className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Complexity</span>
                    </div>
                    <span className="text-sm capitalize">{concept.difficulty}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center text-sm">
                      <BarChart className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span>Quiz score</span>
                    </div>
                    <span className="text-sm">Not attempted</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline" className="w-full" asChild>
                <a href={concept.externalResources?.[0]?.url || "#"} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Additional Resources
                </a>
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mb-6">
            <h3 className="font-medium mb-4">Related Concepts</h3>
            <RelatedConcepts conceptId={conceptId as string} concepts={relatedConcepts || []} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConceptCardDetailPage;
