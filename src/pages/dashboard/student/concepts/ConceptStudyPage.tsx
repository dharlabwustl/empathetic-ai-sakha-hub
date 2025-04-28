
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookmarkIcon, Share2, Mic, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const ConceptStudyPage = () => {
  const { conceptId } = useParams();
  const [loading, setLoading] = useState(true);
  const [conceptCard, setConceptCard] = useState<any>(null);
  const [isReading, setIsReading] = useState(false);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('simple');

  useEffect(() => {
    // Mock fetch concept card data
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setConceptCard({
          id: conceptId,
          title: "Newton's Laws of Motion",
          content: "Newton's laws of motion are three physical laws that form the foundation for classical mechanics. They describe the relationship between the motion of an object and the forces acting on it.",
          examples: [
            "A rocket launches due to Newton's third law: the engine pushes gases downward, and the gases push the rocket upward.",
            "A book resting on a table: the table exerts an upward force equal to the book's weight."
          ],
          diagrams: [
            "https://example.com/newtons_laws_diagram.jpg"
          ],
          examRelevance: "Newton's laws appear in 30% of mechanics questions in JEE. Focus on applications of all three laws, particularly for problems involving connected objects.",
          commonMistakes: [
            "Forgetting to include all forces acting on a body when applying the second law.",
            "Mixing up the action and reaction pairs in the third law."
          ],
          relatedConcepts: [
            "Conservation of Momentum",
            "Work and Energy",
            "Circular Motion",
            "Gravitation"
          ]
        });
        setLoading(false);
      }, 500);
    };

    fetchData();
  }, [conceptId]);

  const toggleVoiceRead = () => {
    setIsReading(!isReading);
    toast({
      title: isReading ? "Voice Read Stopped" : "Voice Read Started",
      duration: 2000
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!conceptCard) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-center text-muted-foreground">Concept not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl">{conceptCard.title}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => toast({ title: "Bookmark added!", duration: 2000 })}>
                <BookmarkIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => toast({ title: "Link copied!", duration: 2000 })}>
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
        <CardContent>
          <Tabs defaultValue="simple" className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <TabsTrigger value="simple">Simple</TabsTrigger>
              <TabsTrigger value="detailed">Detailed</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="diagrams">Diagrams</TabsTrigger>
              <TabsTrigger value="exam">Exam Tips</TabsTrigger>
              <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
            </TabsList>

            <TabsContent value="simple" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <p>{conceptCard.content}</p>
              </div>
            </TabsContent>

            <TabsContent value="detailed" className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Detailed Explanation</h3>
                <p>{conceptCard.content}</p>
                <p>Newton's First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.</p>
                <p>Newton's Second Law states that the rate of change of momentum of a body is directly proportional to the force applied, and this change in momentum takes place in the direction of the applied force.</p>
                <p>Newton's Third Law states that for every action, there is an equal and opposite reaction.</p>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <div className="space-y-4">
                {conceptCard.examples?.map((example: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <p>{example}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="diagrams" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {conceptCard.diagrams?.map((diagram: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gray-100 flex items-center justify-center rounded-lg">
                        <p className="text-gray-500">Diagram {index + 1}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="exam" className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Exam Relevance</h3>
                  <p>{conceptCard.examRelevance}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mistakes" className="space-y-4">
              <div className="space-y-4">
                {conceptCard.commonMistakes?.map((mistake: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <p>{mistake}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Related Concepts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Related Concepts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conceptCard.relatedConcepts?.map((related: string, index: number) => (
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
  );
};

export default ConceptStudyPage;
