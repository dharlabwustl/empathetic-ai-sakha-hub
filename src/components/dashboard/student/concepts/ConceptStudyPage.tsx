
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookmarkIcon, Share2, Mic, Volume2, ArrowLeft, MessageCircle, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface ConceptData {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  content: {
    simple: string;
    detailed: string;
    examples: string[];
    diagrams?: string[];
    examRelevance: string;
    commonMistakes: string[];
    videoUrl?: string;
  };
  relatedConcepts: {
    id: string;
    title: string;
  }[];
  isBookmarked: boolean;
}

const ConceptStudyPage = () => {
  const { conceptId } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('simple');
  const [isReading, setIsReading] = useState(false);
  const [concept, setConcept] = useState<ConceptData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcept = async () => {
      setLoading(true);
      try {
        // In a real application, fetch from API
        // For now, we're using mock data
        setTimeout(() => {
          setConcept({
            id: conceptId || '1',
            title: "Newton's Laws of Motion",
            subject: "Physics",
            chapter: "Classical Mechanics",
            content: {
              simple: "Newton's laws describe how forces affect motion. The first law states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force. The second law states that force equals mass times acceleration (F = ma). The third law states that for every action, there is an equal and opposite reaction.",
              detailed: "Sir Isaac Newton's three laws of motion form the foundation of classical mechanics. The first law, also known as the law of inertia, states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This contradicted the Aristotelian view that objects naturally come to rest.\n\nThe second law quantifies the relationship between force, mass, and acceleration: F = ma. This means that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.\n\nThe third law states that for every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body. This explains phenomena like rocket propulsion.",
              examples: [
                "A book resting on a table remains at rest due to the first law.",
                "Pushing a shopping cart (F = ma) demonstrates the second law.",
                "A rocket propelling forward by expelling gas backward shows the third law."
              ],
              examRelevance: "Newton's laws frequently appear in mechanics problems. Questions often involve calculating forces, accelerations, or predicting motion based on applied forces.",
              commonMistakes: [
                "Confusing mass and weight (weight is a force, mass is not)",
                "Forgetting about normal forces in equilibrium problems",
                "Misidentifying action-reaction pairs"
              ],
              videoUrl: "https://example.com/newtons-laws-video"
            },
            relatedConcepts: [
              { id: "2", title: "Force and Motion" },
              { id: "3", title: "Momentum and Impulse" },
              { id: "4", title: "Work and Energy" }
            ],
            isBookmarked: false
          });
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching concept:', error);
        toast({
          title: "Error",
          description: "Failed to load concept data",
          variant: "destructive"
        });
        setLoading(false);
      }
    };

    fetchConcept();
  }, [conceptId, toast]);

  const toggleVoiceRead = () => {
    setIsReading(!isReading);
    toast({
      title: isReading ? "Voice Read Stopped" : "Voice Read Started",
      description: isReading ? "Text-to-speech has been disabled" : "Reading content aloud",
      duration: 2000
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!concept) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold">Concept Not Found</h2>
        <p className="text-muted-foreground mt-2">The requested concept could not be found.</p>
        <Link to="/dashboard/student/concepts">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Concepts
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-4xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <Link to="/dashboard/student/concepts">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            {concept.subject}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {concept.chapter}
          </Badge>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{concept.title}</CardTitle>
              <CardDescription>Key concept explanation and study materials</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" title="Bookmark">
                <BookmarkIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" title="Share">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant={isReading ? "secondary" : "outline"} 
                size="icon"
                onClick={toggleVoiceRead}
                title={isReading ? "Stop reading" : "Read aloud"}
              >
                {isReading ? <Mic className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="simple" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="simple">Simple</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="exam">Exam Tips</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simple" className="prose dark:prose-invert max-w-none">
              <p>{concept.content.simple}</p>
            </TabsContent>
            
            <TabsContent value="detailed" className="prose dark:prose-invert max-w-none">
              <p className="whitespace-pre-line">{concept.content.detailed}</p>
            </TabsContent>
            
            <TabsContent value="examples" className="space-y-4">
              <h3 className="text-lg font-medium">Examples & Applications</h3>
              <ul className="space-y-2">
                {concept.content.examples.map((example, index) => (
                  <li key={index} className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                    {example}
                  </li>
                ))}
              </ul>
              
              {concept.content.videoUrl && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Video Explanation</h3>
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-md flex items-center justify-center">
                    <p className="text-center text-muted-foreground">Video tutorial would be embedded here</p>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="exam" className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Exam Relevance</h3>
                <p className="mt-2">{concept.content.examRelevance}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium">Common Mistakes to Avoid</h3>
                <ul className="mt-2 space-y-2">
                  {concept.content.commonMistakes.map((mistake, index) => (
                    <li key={index} className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md flex items-start">
                      <span className="inline-block h-5 w-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Related Concepts Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Related Concepts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {concept.relatedConcepts.map((related, index) => (
              <Link key={index} to={`/dashboard/student/concepts/study/${related.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button variant="outline" className="w-full justify-start text-left h-auto py-3">
                    <span>{related.title}</span>
                  </Button>
                </motion.div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Discussion and Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Questions & Discussion
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="secondary" className="w-full">
            Ask a Question About This Concept
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ConceptStudyPage;
