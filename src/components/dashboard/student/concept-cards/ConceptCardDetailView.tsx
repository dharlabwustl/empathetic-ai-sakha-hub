import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, ChevronLeft, Book, Clock, Tag, Star, Bookmark, BookmarkCheck, Play, Pause,
  PencilRuler, AlertTriangle, FileText, VolumeX, Volume2, Brain
} from 'lucide-react';
import { ConceptCard } from '@/hooks/useUserStudyPlan';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { formatDate } from '@/utils/dateUtils';
import { Progress } from '@/components/ui/progress';

interface ExplanationTabsProps {
  content: {
    basic: string;
    detailed: string;
    simplified: string;
    advanced: string;
  }
}

interface ConceptCardDetailViewProps {
  concept: any;
  onMarkCompleted: () => void;
}

const ExplanationTabs: React.FC<ExplanationTabsProps> = ({ content }) => {
  return (
    <Tabs defaultValue="basic" className="mt-4">
      <TabsList className="grid grid-cols-4">
        <TabsTrigger value="basic">Basic</TabsTrigger>
        <TabsTrigger value="detailed">Detailed</TabsTrigger>
        <TabsTrigger value="simplified">Simplified</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      
      <TabsContent value="basic" className="p-4 bg-white rounded-md mt-2">
        <p>{content.basic}</p>
      </TabsContent>
      
      <TabsContent value="detailed" className="p-4 bg-white rounded-md mt-2">
        <p>{content.detailed}</p>
      </TabsContent>
      
      <TabsContent value="simplified" className="p-4 bg-white rounded-md mt-2">
        <p>{content.simplified}</p>
      </TabsContent>
      
      <TabsContent value="advanced" className="p-4 bg-white rounded-md mt-2">
        <p>{content.advanced}</p>
      </TabsContent>
    </Tabs>
  );
};

const ConceptCardDetailView: React.FC<ConceptCardDetailViewProps> = ({ concept, onMarkCompleted }) => {
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("explanation");
  const [relatedContent, setRelatedContent] = useState({
    concepts: concept.relatedConcepts || [],
    flashcards: concept.relatedFlashcards || [],
    practiceExams: concept.relatedExams || []
  });

  const toggleVoice = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-50 text-green-600 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link to="/dashboard/student/concepts/all" className="flex items-center text-blue-600 hover:text-blue-800">
          <ChevronLeft size={16} className="mr-1" />
          Back to Concepts
        </Link>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleVoice}
            className={`${isVoiceEnabled ? 'bg-blue-50 text-blue-600' : ''}`}
          >
            {isVoiceEnabled ? <Volume2 size={16} className="mr-2" /> : <VolumeX size={16} className="mr-2" />}
            {isVoiceEnabled ? 'Voice Enabled' : 'Enable Voice'}
          </Button>
          
          <Button
            variant={isBookmarked ? "default" : "outline"}
            size="sm"
            onClick={toggleBookmark}
          >
            {isBookmarked ? <BookmarkCheck size={16} className="mr-2" /> : <Bookmark size={16} className="mr-2" />}
            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          
          {!concept.completed && (
            <Button
              size="sm"
              onClick={onMarkCompleted}
            >
              Mark as Complete
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
              {concept.difficulty}
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
              <Book size={12} className="mr-1" /> {concept.subject}
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
              <Clock size={12} className="mr-1" /> {concept.estimatedTime} min
            </Badge>
            <Badge variant={concept.completed ? "secondary" : "default"}>
              {concept.completed ? "Completed" : "Not Completed"}
            </Badge>
          </div>
          
          <CardTitle className="text-2xl font-bold">{concept.title}</CardTitle>
          <p className="text-gray-500">{concept.chapter}</p>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {isVoiceEnabled && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={togglePlayPause}
                  className="flex items-center gap-1"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
              )}
            </div>

            {concept.completed && (
              <div className="text-sm text-gray-500">
                Completed on {formatDate(new Date().toISOString())}
              </div>
            )}
          </div>

          <Tabs defaultValue="explanation" className="mt-4">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto">
              <TabsTrigger value="explanation" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Explanation</span>
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Examples</span>
              </TabsTrigger>
              <TabsTrigger value="mistakes" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Common Mistakes</span>
              </TabsTrigger>
              <TabsTrigger value="relevance" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                <span>Exam Relevance</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="explanation" className="pt-4">
              <ExplanationTabs content={concept.content} />
            </TabsContent>
            
            <TabsContent value="examples" className="pt-4">
              <div className="space-y-4">
                {concept.examples.map((example: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <PencilRuler className="text-blue-500 mt-1" size={18} />
                        <p>{example}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mistakes" className="pt-4">
              <div className="space-y-4">
                {concept.commonMistakes.map((mistake: string, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="text-amber-500 mt-1" size={18} />
                        <p>{mistake}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="relevance" className="pt-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <FileText className="text-indigo-500 mt-1" size={18} />
                    <p>{concept.examRelevance}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        {relatedContent.concepts.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Related Concepts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedContent.concepts.map((relatedConcept) => (
                <Link key={relatedConcept.id} to={`/dashboard/student/concepts/${relatedConcept.id}`}>
                  <Card className="hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Book className="text-blue-500" size={16} />
                        <span className="text-sm text-gray-500">Related Concept</span>
                      </div>
                      <h4 className="font-medium">{relatedConcept.title}</h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedContent.flashcards.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Related Flashcards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedContent.flashcards.map((flashcard) => (
                <Link key={flashcard.id} to={`/dashboard/student/flashcards/${flashcard.id}`}>
                  <Card className="hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="text-violet-500" size={16} />
                        <span className="text-sm text-gray-500">Flashcard Set</span>
                      </div>
                      <h4 className="font-medium">{flashcard.title}</h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {relatedContent.practiceExams.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Related Practice Exams</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedContent.practiceExams.map((exam) => (
                <Link key={exam.id} to={`/dashboard/student/practice-exams/${exam.id}`}>
                  <Card className="hover:shadow-md transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="text-green-500" size={16} />
                        <span className="text-sm text-gray-500">Practice Exam</span>
                      </div>
                      <h4 className="font-medium">{exam.title}</h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Concept Understanding</span>
                <span>{concept.completed ? '100%' : '65%'}</span>
              </div>
              <Progress value={concept.completed ? 100 : 65} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Related Flashcards</span>
                <span>3/12 Completed</span>
              </div>
              <Progress value={25} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1 text-sm">
                <span>Practice Questions</span>
                <span>2/8 Solved</span>
              </div>
              <Progress value={25} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2 w-full">
            <Button variant="outline" className="flex-1">Go to Flashcards</Button>
            <Button variant="outline" className="flex-1">Practice Questions</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConceptCardDetailView;
