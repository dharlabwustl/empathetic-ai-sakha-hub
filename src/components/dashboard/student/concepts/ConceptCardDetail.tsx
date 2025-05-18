
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Share2, MessageSquare, Volume, CheckCircle, ArrowRightIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface ConceptCardDetailProps {
  concept: any;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ concept }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('learn');
  const [isReading, setIsReading] = useState(false);
  
  // Function to read the content aloud
  const handleReadAloud = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    // If concept content exists, read it
    if (concept && concept.content) {
      const contentToRead = typeof concept.content === 'string' ? 
        concept.content : 
        concept.content.join(' ');
        
      const utterance = new SpeechSynthesisUtterance(contentToRead);
      utterance.rate = 0.9;
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };
  
  // Function to navigate to practice page
  const handlePractice = () => {
    navigate(`/dashboard/student/concept-study/${concept.id}`);
  };
  
  // Prepare content for display
  const formatContent = (content: string | string[]) => {
    if (typeof content === 'string') {
      return (
        <div className="space-y-4">
          {content.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      );
    } else if (Array.isArray(content)) {
      return (
        <div className="space-y-4">
          {content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      );
    }
    return null;
  };
  
  // Function to handle download as PDF
  const handleDownload = () => {
    // Create a blob from the concept content
    const contentText = typeof concept.content === 'string' ? 
      concept.content : 
      concept.content.join('\n\n');
    
    const blob = new Blob([contentText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${concept.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            {/* Left Side: Content */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{concept.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {concept.subject || "Physics"}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                      {concept.chapter || "Chapter 1"}
                    </Badge>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      {concept.difficulty || "Medium"}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={handleReadAloud}
                  >
                    <Volume className={isReading ? "text-green-500" : ""} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 />
                  </Button>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {concept.description || "This concept explores fundamental principles and applications."}
              </p>
              
              <div className="space-y-6">
                {/* Key Learning Outcomes */}
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Key Learning Outcomes
                  </h2>
                  <ul className="space-y-1 list-disc pl-5">
                    {concept.keyPoints ? (
                      concept.keyPoints.map((point: string, i: number) => (
                        <li key={i}>{point}</li>
                      ))
                    ) : (
                      <>
                        <li>Understand the fundamental principles of this concept</li>
                        <li>Apply theoretical knowledge to solve practical problems</li>
                        <li>Analyze relationships between different variables</li>
                      </>
                    )}
                  </ul>
                </div>
                
                {/* Study Time */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Estimated study time:</span>
                  <Badge variant="outline">
                    {concept.estimatedTime || 45} min
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Right Side: Actions */}
            <div className="w-full lg:w-64 space-y-4">
              <Card className="overflow-hidden border-t-4 border-t-blue-500">
                <CardHeader className="bg-blue-50 dark:bg-blue-900/20 py-3">
                  <CardTitle className="text-sm font-medium">Your Progress</CardTitle>
                </CardHeader>
                <CardContent className="p-4 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center border-4 border-blue-200">
                      <div>
                        <div className="text-2xl font-bold text-blue-700">{concept.progress || 0}%</div>
                        <div className="text-xs text-blue-600">Complete</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={handlePractice}
                    >
                      Continue Learning
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleDownload}
                    >
                      Download Notes
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Related Concepts */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm font-medium">Related Concepts</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <ul className="space-y-3">
                    <li>
                      <Button variant="link" className="h-auto p-0 text-left justify-start">
                        Conservation of Energy
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-left justify-start">
                        Conservation of Momentum
                      </Button>
                    </li>
                    <li>
                      <Button variant="link" className="h-auto p-0 text-left justify-start">
                        Newton's Laws of Motion
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Content Tabs */}
      <Tabs defaultValue="learn" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        {/* Learn Tab */}
        <TabsContent value="learn" className="space-y-6">
          <Card>
            <div className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                <h2>Content</h2>
                {formatContent(concept.content || "Content not available for this concept.")}
                
                {/* Examples if available */}
                {concept.examples && concept.examples.length > 0 && (
                  <>
                    <h3>Examples</h3>
                    <div className="space-y-4">
                      {concept.examples.map((example: string, i: number) => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-900 p-4 rounded-md">
                          {example}
                        </div>
                      ))}
                    </div>
                  </>
                )}
                
                {/* Video content */}
                {concept.videos && concept.videos.length > 0 && (
                  <>
                    <h3>Video Explanation</h3>
                    <div className="my-4">
                      <AspectRatio ratio={16 / 9}>
                        <iframe 
                          src={concept.videos[0].url}
                          title={concept.videos[0].title}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </AspectRatio>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Practice Tab */}
        <TabsContent value="practice" className="space-y-6">
          <Card>
            <div className="p-6 text-center">
              <div className="mb-6">
                <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-medium mb-2">Ready to test your knowledge?</h3>
                <p className="text-muted-foreground mb-6">
                  Practice with questions related to this concept to strengthen your understanding.
                </p>
              </div>
              
              <Button 
                className="mx-auto"
                onClick={handlePractice}
              >
                Start Practice Questions
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-medium mb-4">Additional Resources</h3>
              
              {concept.resources && concept.resources.length > 0 ? (
                <div className="space-y-4">
                  {concept.resources.map((resource: any, i: number) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="p-4 flex items-center gap-4">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <MessageSquare className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{resource.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {resource.source || "External resource"}
                          </div>
                        </div>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(resource.url, "_blank")}
                        >
                          View
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No additional resources available for this concept.
                </div>
              )}
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Common Mistakes</h3>
                
                {concept.commonMistakes && concept.commonMistakes.length > 0 ? (
                  <ul className="space-y-2 list-disc pl-5">
                    {concept.commonMistakes.map((mistake: string, i: number) => (
                      <li key={i}>{mistake}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No common mistakes listed for this concept.</p>
                )}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptCardDetail;
