
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bookmark, BookmarkPlus, Share2, ThumbsUp, MessageCircle, Award, Brain, Calculator, BookOpen, Check } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

interface EnhancedConceptDetailProps {
  conceptId: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  content: string;
}

const EnhancedConceptDetail: React.FC<EnhancedConceptDetailProps> = ({
  conceptId,
  title,
  subject,
  topic,
  difficulty,
  content
}) => {
  const [activeTab, setActiveTab] = useState("content");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  
  // Split content into paragraphs for better readability
  const paragraphs = content.split('\n\n').filter(p => p.trim() !== '');
  
  const difficultyColor = {
    easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    hard: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const handleVote = () => {
    setHasVoted(!hasVoted);
  };
  
  // Mock related concepts
  const relatedConcepts = [
    { id: "rc-1", title: "Cell Cycle Regulation", difficulty: "medium" },
    { id: "rc-2", title: "Mitosis vs. Meiosis", difficulty: "easy" },
    { id: "rc-3", title: "DNA Replication", difficulty: "hard" }
  ];
  
  // Mock concept mastery data
  const masteryData = {
    overall: 65,
    concepts: 70,
    applications: 60,
    related: 65
  };
  
  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge 
            variant="outline" 
            className={`${difficultyColor[difficulty]} font-medium uppercase text-xs px-2 py-0.5 mb-2`}
          >
            {difficulty}
          </Badge>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 font-medium">
              {subject}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 font-medium">
              {topic}
            </Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm" 
            className="flex gap-1 items-center" 
            onClick={handleBookmarkToggle}
          >
            {isBookmarked ? (
              <Bookmark className="h-4 w-4 fill-current" />
            ) : (
              <BookmarkPlus className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </span>
          </Button>
          
          <Button 
            variant="outline"
            size="sm"
            className="flex gap-1 items-center"
          >
            <Share2 className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
        </div>
      </div>
      
      {/* Concept mastery indicators */}
      <Card className="border-blue-100 dark:border-blue-800/40 bg-blue-50/50 dark:bg-blue-900/10">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium mb-3 flex items-center">
            <Award className="h-4 w-4 mr-1.5 text-blue-600 dark:text-blue-400" />
            Concept Mastery
          </h3>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span>Overall Understanding</span>
                <span>{masteryData.overall}%</span>
              </div>
              <Progress value={masteryData.overall} className="h-1.5" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span>Concept Recall</span>
                <span>{masteryData.concepts}%</span>
              </div>
              <Progress value={masteryData.concepts} className="h-1.5" />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-xs">
                <span>Application</span>
                <span>{masteryData.applications}%</span>
              </div>
              <Progress value={masteryData.applications} className="h-1.5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Main content tabs */}
      <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="content">
            <BookOpen className="h-4 w-4 mr-1.5 inline-block" />
            <span className="hidden sm:inline">Content</span>
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Brain className="h-4 w-4 mr-1.5 inline-block" />
            <span className="hidden sm:inline">Quiz</span>
          </TabsTrigger>
          <TabsTrigger value="calculator">
            <Calculator className="h-4 w-4 mr-1.5 inline-block" />
            <span className="hidden sm:inline">Calculator</span>
          </TabsTrigger>
          <TabsTrigger value="notes">
            <MessageCircle className="h-4 w-4 mr-1.5 inline-block" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Content tab */}
        <TabsContent value="content" className="pt-4">
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="mb-4 text-base leading-relaxed">{paragraph}</p>
            ))}
            
            {/* Quick navigation */}
            <div className="mt-8 mb-4">
              <h3 className="text-lg font-semibold mb-2">Concept Map</h3>
              <div className="flex flex-wrap gap-2">
                {["Interphase", "Prophase", "Metaphase", "Anaphase", "Telophase", "Cytokinesis"].map((phase) => (
                  <Badge key={phase} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    {phase}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Was this helpful section */}
            <div className="mt-8 pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Was this concept explanation helpful?</h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex items-center gap-1 ${hasVoted ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/40' : ''}`}
                  onClick={handleVote}
                >
                  <ThumbsUp className={`h-4 w-4 ${hasVoted ? 'fill-green-500 text-green-500 dark:fill-green-400 dark:text-green-400' : ''}`} />
                  Yes, it helped me
                </Button>
              </div>
            </div>
          </div>
          
          {/* Related concepts */}
          <div className="mt-8 pt-6 border-t border-border/60">
            <h3 className="text-lg font-semibold mb-3">Related Concepts</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedConcepts.map((concept) => (
                <Card key={concept.id} className="hover:border-primary/50 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <Badge 
                        variant="outline" 
                        className={`${difficultyColor[concept.difficulty as "easy" | "medium" | "hard"]} text-xs`}
                      >
                        {concept.difficulty}
                      </Badge>
                      {Math.random() > 0.5 && (
                        <Badge variant="outline" className="text-xs flex items-center gap-0.5">
                          <Check className="h-3 w-3" />
                          Learned
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-medium hover:text-primary transition-colors">{concept.title}</h4>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Quiz tab */}
        <TabsContent value="quiz" className="pt-4">
          <div className="text-center py-8">
            <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Test your knowledge</h3>
            <p className="text-muted-foreground mb-4">Take a quick quiz to strengthen your understanding of this concept</p>
            <Button>Start Quiz</Button>
          </div>
        </TabsContent>
        
        {/* Calculator tab */}
        <TabsContent value="calculator" className="pt-4">
          <div className="text-center py-8">
            <Calculator className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Cell Division Calculator</h3>
            <p className="text-muted-foreground mb-4">Calculate cell count after multiple divisions</p>
            <Button>Open Calculator</Button>
          </div>
        </TabsContent>
        
        {/* Notes tab */}
        <TabsContent value="notes" className="pt-4">
          <div className="text-center py-8">
            <MessageCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your Notes</h3>
            <p className="text-muted-foreground mb-4">Add personal notes about this concept for later review</p>
            <Button>Add Notes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedConceptDetail;
