
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ShareIcon, BookmarkIcon, PencilIcon, ChevronLeftIcon, Bookmark, Play, BookOpen, CheckCircle, HelpCircle, MessageSquare } from 'lucide-react';
import { cn } from "@/lib/utils";
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";

// Mock data for a concept
const mockConcept = {
  id: "c1",
  title: "Newton's Third Law of Motion",
  subject: "Physics",
  chapter: "Laws of Motion",
  difficulty: "Medium",
  tags: ["mechanics", "forces", "newton's laws"],
  simpleExplanation: "Newton's third law states that for every action, there is an equal and opposite reaction. When one body exerts a force on a second body, the second body exerts a force equal in magnitude and opposite in direction on the first body.",
  detailedExplanation: "Newton's third law of motion is one of the fundamental principles of classical mechanics. It states that when one body exerts a force on another body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body. This principle is often summarized as 'action equals reaction.'\n\nMathematically, if body A exerts a force F₁ on body B, then body B exerts a force F₂ on body A, where F₁ = -F₂.\n\nThis law explains many everyday phenomena, from why rockets can propel forward (by pushing gas backward) to why we can walk (by pushing the ground backward).",
  examples: [
    "A person swimming pushes water backward, and the water pushes the swimmer forward.",
    "When a gun is fired, it exerts a forward force on the bullet, and the bullet exerts an equal backward force on the gun (recoil).",
    "A bird flies by pushing air downward with its wings, and the air pushes the bird upward.",
    "When you stand on Earth, your weight is the force you exert on the ground, and the ground pushes back with an equal force (normal force) to support you."
  ],
  commonMistakes: [
    "Thinking that the 'action' and 'reaction' forces act on the same body. They always act on different bodies.",
    "Believing that the action-reaction pair must cause equal accelerations. The accelerations depend on the masses of the objects.",
    "Assuming that action-reaction forces 'cancel out'. They act on different bodies, so they don't cancel."
  ],
  examPerspective: "This concept frequently appears in JEE/NEET exams, often in problems involving rocket propulsion, collisions, or systems with multiple interacting objects. You might be asked to identify action-reaction pairs, or solve problems where the consequences of these equal and opposite forces are key to finding the solution.",
  relatedConcepts: [
    { id: "c101", title: "Newton's First Law of Motion" },
    { id: "c102", title: "Newton's Second Law of Motion" },
    { id: "c103", title: "Conservation of Momentum" }
  ],
  videoUrl: "https://www.youtube.com/embed/8bTdMmNZm2M",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Third_law_of_action_and_reaction.svg/1200px-Third_law_of_action_and_reaction.svg.png",
  progress: 60,
  isBookmarked: false
};

const ConceptStudyPage = () => {
  const { conceptId } = useParams<{conceptId: string}>();
  const [concept, setConcept] = useState(mockConcept);
  const [activeTab, setActiveTab] = useState("simple");
  const [isBookmarked, setIsBookmarked] = useState(concept.isBookmarked);
  
  // Toggle bookmark status
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you'd save this to the backend
  };
  
  // Add a note (this would open a dialog in a real app)
  const handleAddNote = () => {
    console.log("Add note functionality would open here");
  };
  
  // Share the concept (this would open a share dialog in a real app)
  const handleShare = () => {
    console.log("Share functionality would open here");
  };

  return (
    <SharedPageLayout
      title="Concept Study"
      subtitle="Mastering key concepts through interactive learning"
      showBackLink={true}
      backLinkText="Back to Concepts"
      backLinkUrl="/dashboard/student/concepts"
    >
      <div className="space-y-6">
        <Card className="border-t-4 border-blue-500">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <Link to="/dashboard/student/concepts" className="text-sm text-blue-600 hover:underline inline-flex items-center mb-2">
                  <ChevronLeftIcon size={16} className="mr-1" />
                  Back to Concepts
                </Link>
                <h1 className="text-2xl font-bold">{concept.title}</h1>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">{concept.subject}</Badge>
                  <Badge variant="outline" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300">{concept.chapter}</Badge>
                  <Badge variant="outline" className={cn(
                    "bg-opacity-10",
                    concept.difficulty === "Easy" ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" :
                    concept.difficulty === "Medium" ? "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300" :
                    "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                  )}>{concept.difficulty}</Badge>
                </div>
              </div>
              
              <div className="flex items-center mt-4 md:mt-0 space-x-2">
                <Button variant="outline" size="sm" onClick={handleBookmarkToggle}>
                  {isBookmarked ? 
                    <Bookmark className="mr-1 h-4 w-4 fill-current" /> :
                    <BookmarkIcon className="mr-1 h-4 w-4" />
                  }
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button variant="outline" size="sm" onClick={handleAddNote}>
                  <PencilIcon className="mr-1 h-4 w-4" />
                  Add Note
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <ShareIcon className="mr-1 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 mb-6">
                <TabsTrigger value="simple" className="text-xs sm:text-sm">
                  Simple
                </TabsTrigger>
                <TabsTrigger value="detailed" className="text-xs sm:text-sm">
                  Detailed
                </TabsTrigger>
                <TabsTrigger value="examples" className="text-xs sm:text-sm">
                  Examples
                </TabsTrigger>
                <TabsTrigger value="exam" className="text-xs sm:text-sm">
                  Exam Prep
                </TabsTrigger>
                <TabsTrigger value="video" className="text-xs sm:text-sm">
                  Video
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="simple" className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <p>{concept.simpleExplanation}</p>
                  
                  {concept.imageUrl && (
                    <div className="my-6">
                      <img 
                        src={concept.imageUrl} 
                        alt={concept.title} 
                        className="rounded-lg max-h-64 mx-auto"
                      />
                      <p className="text-sm text-center text-gray-500 mt-2">Visual representation of {concept.title}</p>
                    </div>
                  )}
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800/50 mt-4">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
                    <CheckCircle size={16} className="mr-2" />
                    Key Takeaway
                  </h3>
                  <p className="text-blue-700 dark:text-blue-300 mt-1">
                    Remember that action and reaction forces are equal in magnitude, opposite in direction, and act on different bodies.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="detailed">
                <div className="prose dark:prose-invert max-w-none">
                  <p className="whitespace-pre-line">{concept.detailedExplanation}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="examples">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">Real-World Examples</h3>
                  <ul className="space-y-3">
                    {concept.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 bg-blue-100 dark:bg-blue-900/40 rounded-full p-1 text-blue-600 dark:text-blue-300">
                          <CheckCircle size={16} />
                        </div>
                        <p>{example}</p>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="font-medium text-lg mt-6">Common Mistakes</h3>
                  <ul className="space-y-3">
                    {concept.commonMistakes.map((mistake, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="mt-1 bg-red-100 dark:bg-red-900/40 rounded-full p-1 text-red-600 dark:text-red-300">
                          <HelpCircle size={16} />
                        </div>
                        <p>{mistake}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="exam">
                <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800/50">
                    <h3 className="font-medium text-purple-800 dark:text-purple-300">Exam Perspective</h3>
                    <p className="mt-2 text-purple-700 dark:text-purple-300">{concept.examPerspective}</p>
                  </div>
                  
                  <h3 className="font-medium text-lg">Related Concepts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {concept.relatedConcepts.map((related) => (
                      <Link 
                        key={related.id} 
                        to={`/dashboard/student/concepts/study/${related.id}`} 
                        className="p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 flex items-center gap-2"
                      >
                        <BookOpen size={16} className="text-blue-500" />
                        <span>{related.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="video">
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={concept.videoUrl}
                      title={`Video explanation for ${concept.title}`}
                      className="w-full h-full"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" className="gap-2">
                      <Play size={16} />
                      Open Full Screen
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="flex justify-between items-center">
          <Button variant="outline" className="gap-2">
            <ChevronLeftIcon size={16} />
            Previous Concept
          </Button>
          <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600">
            <MessageSquare size={16} />
            Ask AI Tutor
          </Button>
          <Button variant="outline" className="gap-2">
            Next Concept
            <ChevronLeftIcon size={16} className="rotate-180" />
          </Button>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptStudyPage;
