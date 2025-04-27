
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, Share2, Mic, Volume2, ArrowLeft, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import ConceptExplanationContent from '@/components/dashboard/student/concept-cards/ConceptExplanationContent';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const ConceptStudyPage = () => {
  const { topicName } = useParams<{ topicName: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isReading, setIsReading] = useState(false);
  const [activeTab, setActiveTab] = useState('simple');
  const [loading, setLoading] = useState(true);

  // Mock concept data based on topic name
  const [concept, setConcept] = useState<any>(null);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);
    
    setTimeout(() => {
      setConcept({
        id: topicName,
        title: formatTopicName(topicName || ''),
        subject: determineSubject(topicName || ''),
        content: {
          simple: `This is a simplified explanation of ${formatTopicName(topicName || '')}.`,
          detailed: `A detailed explanation of ${formatTopicName(topicName || '')} with thorough examples and applications.`,
          examples: ["Example 1", "Example 2", "Example 3"],
          diagrams: ["diagram1.png", "diagram2.png"],
          examRelevance: "Highly relevant for upcoming exams. Frequently asked in multiple formats.",
          commonMistakes: ["Conceptual misunderstanding", "Application error", "Formula misapplication"],
          videoUrl: "https://example.com/video"
        },
        relatedConcepts: ["Related Concept 1", "Related Concept 2", "Related Concept 3"],
        isBookmarked: false,
        notes: []
      });
      setLoading(false);
    }, 800);
  }, [topicName]);

  // Helper functions to format topic names
  const formatTopicName = (slug: string): string => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const determineSubject = (topic: string): string => {
    const topics = {
      physics: ["newton", "motion", "gravity", "force", "energy", "wave", "light", "optics", "electricity"],
      chemistry: ["acid", "base", "element", "compound", "reaction", "bond", "molecule", "periodic"],
      math: ["algebra", "calculus", "geometry", "trigonometry", "equation", "function", "matrix", "vector"],
      biology: ["cell", "gene", "evolution", "ecosystem", "protein", "dna", "organ", "tissue"]
    };

    for (const [subject, keywords] of Object.entries(topics)) {
      if (keywords.some(keyword => topic.toLowerCase().includes(keyword))) {
        return subject.charAt(0).toUpperCase() + subject.slice(1);
      }
    }
    return "General Science";
  };

  const toggleVoiceRead = () => {
    setIsReading(!isReading);
    toast({
      title: isReading ? "Voice Read Stopped" : "Voice Read Started",
      duration: 2000
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleMarkComplete = () => {
    toast({
      title: "Concept Marked as Complete",
      description: "Great job! Your progress has been updated.",
      duration: 3000
    });
  };

  if (loading) {
    return (
      <SharedPageLayout title="Loading Concept" subtitle="Please wait while we prepare your learning materials">
        <div className="space-y-6 animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg w-2/3 mx-auto"></div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </SharedPageLayout>
    );
  }

  if (!concept) {
    return (
      <SharedPageLayout title="Concept Not Found" subtitle="We couldn't find the requested concept">
        <Card className="text-center">
          <CardContent className="pt-6">
            <p>Sorry, the concept you're looking for doesn't seem to exist.</p>
            <Button onClick={handleGoBack} className="mt-4">Go Back</Button>
          </CardContent>
        </Card>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout
      title={concept.title}
      subtitle={`${concept.subject} | Learn at your own pace`}
      backButton={true}
      onBack={handleGoBack}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">{concept.title}</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => {
                  toast({
                    title: "Concept Bookmarked",
                    duration: 2000
                  });
                }}>
                  <BookmarkIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => {
                  toast({
                    title: "Share Link Copied",
                    duration: 2000
                  });
                }}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleVoiceRead}
                >
                  {isReading ? <Mic className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 md:grid-cols-5 mb-4">
                <TabsTrigger value="simple">Simple</TabsTrigger>
                <TabsTrigger value="detailed">Detailed</TabsTrigger>
                <TabsTrigger value="examples">Examples</TabsTrigger>
                <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
                <TabsTrigger value="exam" className="hidden md:inline-flex">Exam Notes</TabsTrigger>
              </TabsList>

              <TabsContent value="simple" className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-xl font-semibold mb-3">Simple Explanation</h3>
                <p className="text-gray-700">{concept.content.simple}</p>
              </TabsContent>

              <TabsContent value="detailed" className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-xl font-semibold mb-3">Detailed Explanation</h3>
                <p className="text-gray-700">{concept.content.detailed}</p>
              </TabsContent>

              <TabsContent value="examples" className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-xl font-semibold mb-3">Examples</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {concept.content.examples.map((example: string, i: number) => (
                    <li key={i} className="text-gray-700">{example}</li>
                  ))}
                </ul>
              </TabsContent>

              <TabsContent value="diagrams" className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-xl font-semibold mb-3">Visual Explanation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {concept.content.diagrams.map((diagram: string, i: number) => (
                    <div key={i} className="p-6 border border-dashed rounded-lg text-center bg-gray-100">
                      <p>[Diagram {i+1}: {diagram}]</p>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="exam" className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-xl font-semibold mb-3">Exam Relevance</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800">Importance</h4>
                    <p className="text-gray-700">{concept.content.examRelevance}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Common Mistakes</h4>
                    <ul className="list-disc pl-5">
                      {concept.content.commonMistakes.map((mistake: string, i: number) => (
                        <li key={i} className="text-gray-700">{mistake}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            {/* Video section */}
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-xl font-semibold mb-3">Video Explanation</h3>
              <div className="aspect-video bg-gray-200 flex items-center justify-center rounded-md">
                <p className="text-gray-500">Video content would be displayed here</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <Button variant="default" onClick={handleMarkComplete}>
              <Check className="h-4 w-4 mr-2" /> Mark as Complete
            </Button>
          </CardFooter>
        </Card>

        {/* Related Concepts Section */}
        <Card>
          <CardHeader>
            <CardTitle>Related Concepts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {concept.relatedConcepts.map((related: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button variant="outline" className="w-full justify-start">
                    {related}
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptStudyPage;
