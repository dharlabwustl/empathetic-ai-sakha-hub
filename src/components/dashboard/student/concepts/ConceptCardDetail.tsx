import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  FileText, 
  ChartBar, 
  Layers3, 
  VolumeUp,
  Lightbulb,
  Bookmark,
  Save
} from 'lucide-react';
import useVoiceAnnouncer from '@/hooks/useVoiceAnnouncer';

export interface ConceptCardDetailProps {
  concept: {
    id: string;
    title: string;
    description: string;
    content: string;
    difficulty: 'easy' | 'medium' | 'hard';
    category: string;
    subCategory?: string;
    imageUrl?: string;
    relatedConcepts?: Array<{
      id: string;
      title: string;
    }>;
    formulaIds?: string[];
  };
  onBack?: () => void;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ 
  concept,
  onBack
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [userNotes, setUserNotes] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const { speakMessage, isSpeaking, stopSpeaking } = useVoiceAnnouncer({});
  
  // Simulated analytics data
  const analytics = {
    masteryScore: 72,
    attemptHistory: [
      { date: '2023-05-10', score: 60 },
      { date: '2023-05-15', score: 65 },
      { date: '2023-05-22', score: 72 }
    ],
    recallStrength: 'medium',
    weakPoints: ['Application in complex scenarios', 'Integration with related concepts'],
    timeSpent: '1.5 hours',
    recommendedRevision: 'May 29, 2023'
  };
  
  // Simulated related resources
  const relatedResources = {
    flashcards: [
      { id: 'fc1', title: 'Key Definitions' },
      { id: 'fc2', title: 'Core Principles' }
    ],
    practiceExams: [
      { id: 'pe1', title: 'Application Test' },
      { id: 'pe2', title: 'Comprehensive Review' }
    ]
  };
  
  // Simulated AI insights
  const aiInsights = {
    weakLinkDetection: [
      'Connection with Concept X needs strengthening',
      'Application in real-world scenarios requires practice'
    ],
    revisionSuggestions: [
      'Review again in 3 days using spaced repetition',
      'Try explaining this concept to someone else',
      'Complete the practice exam to reinforce understanding'
    ],
    masteryTips: [
      'Create visual mnemonics for key formulas',
      'Connect this concept with previously mastered ones'
    ]
  };
  
  useEffect(() => {
    // Load saved notes (in a real app, this would be from an API)
    const savedNotes = localStorage.getItem(`conceptNotes-${concept.id}`);
    if (savedNotes) {
      setUserNotes(savedNotes);
    }
  }, [concept.id]);
  
  const handleReadAloud = () => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    
    speakMessage(concept.content);
    
    toast({
      title: "Reading Content Aloud",
      description: "You can stop the reading at any time by clicking the button again.",
      duration: 3000,
    });
  };
  
  const saveNotes = () => {
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem(`conceptNotes-${concept.id}`, userNotes);
      setSaveStatus('saved');
      
      toast({
        title: "Notes saved",
        description: "Your notes have been saved successfully.",
        duration: 3000,
      });
      
      // Reset status after 2 seconds
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 800);
  };
  
  const navigateToResource = (type: string, id: string) => {
    toast({
      title: `Navigating to ${type}`,
      description: `Opening ${type} with ID: ${id}`,
      duration: 3000,
    });
  };
  
  // Map difficulty to color
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with navigation */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{concept.title}</h1>
          <p className="text-muted-foreground">{concept.category} {concept.subCategory && `/ ${concept.subCategory}`}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${getDifficultyColor(concept.difficulty)}`}></span>
            <span className="text-sm capitalize">{concept.difficulty}</span>
          </div>
          {onBack && (
            <Button variant="outline" onClick={onBack}>
              Back to List
            </Button>
          )}
        </div>
      </div>

      {/* Main content area with tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left side - Content and Notes */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
              <TabsTrigger value="formulas">Formulas</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="p-4 border rounded-md mt-2">
              {/* Read Aloud button */}
              <div className="mb-4 flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReadAloud}
                  className="flex items-center gap-2"
                >
                  <VolumeUp size={16} />
                  {isSpeaking ? "Stop Reading" : "Read Aloud"}
                </Button>
              </div>
              
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p>{concept.description}</p>
                <div dangerouslySetInnerHTML={{ __html: concept.content }} />
              </div>
            </TabsContent>
            
            <TabsContent value="notes" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Your Notes</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={saveNotes}
                    disabled={saveStatus === 'saving'}
                    className="flex items-center gap-2"
                  >
                    <Save size={16} />
                    {saveStatus === 'idle' && 'Save Notes'}
                    {saveStatus === 'saving' && 'Saving...'}
                    {saveStatus === 'saved' && 'Saved!'}
                  </Button>
                </div>
                <Textarea 
                  value={userNotes}
                  onChange={(e) => {
                    setUserNotes(e.target.value);
                    setSaveStatus('idle');
                  }}
                  placeholder="Take your notes here..."
                  className="min-h-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                  Notes are saved to your account and can be accessed anytime.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="formulas" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <h3 className="font-medium">Related Formulas</h3>
                {concept.formulaIds && concept.formulaIds.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {concept.formulaIds.map((formulaId) => (
                      <Card key={formulaId} className="overflow-hidden">
                        <CardHeader className="p-3 bg-muted">
                          <CardTitle className="text-sm">Formula {formulaId}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-3">
                          <div className="text-center p-2 font-mono bg-muted/50 rounded">
                            E = mc<sup>2</sup>
                          </div>
                          <p className="text-xs mt-2 text-muted-foreground">
                            Einstein's mass-energy equivalence formula
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No formulas associated with this concept.</p>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="insights" className="p-4 border rounded-md mt-2">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <Lightbulb size={18} />
                    Weak Link Detection
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {aiInsights.weakLinkDetection.map((insight, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <BookOpen size={18} />
                    Revision Suggestions
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {aiInsights.revisionSuggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium flex items-center gap-2 text-green-600 dark:text-green-400">
                    <Bookmark size={18} />
                    Mastery Tips
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {aiInsights.masteryTips.map((tip, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right side - Related Resources and Analytics */}
        <div className="space-y-6">
          {/* Mastery Analytics */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <ChartBar className="w-4 h-4" />
                Mastery Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Mastery Score</span>
                  <span className="font-medium text-sm">{analytics.masteryScore}%</span>
                </div>
                <Progress value={analytics.masteryScore} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Recall Strength</p>
                  <p className="font-medium capitalize">{analytics.recallStrength}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time Spent</p>
                  <p className="font-medium">{analytics.timeSpent}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Attempts</p>
                  <p className="font-medium">{analytics.attemptHistory.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Next Review</p>
                  <p className="font-medium">{analytics.recommendedRevision}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Related Concept Cards */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Related Concepts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {concept.relatedConcepts && concept.relatedConcepts.length > 0 ? (
                concept.relatedConcepts.map(related => (
                  <Button 
                    key={related.id}
                    variant="outline" 
                    className="w-full justify-start mb-2 text-left"
                    onClick={() => navigateToResource('concept', related.id)}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    {related.title}
                  </Button>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No related concepts available.</p>
              )}
            </CardContent>
          </Card>
          
          {/* Related Resources */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium">Study Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Flashcards */}
              <div>
                <h4 className="text-sm font-medium mb-2">Interactive Flashcards</h4>
                {relatedResources.flashcards.map(flashcard => (
                  <Button 
                    key={flashcard.id}
                    variant="outline" 
                    className="w-full justify-start mb-2 text-left"
                    onClick={() => navigateToResource('flashcard', flashcard.id)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {flashcard.title}
                  </Button>
                ))}
              </div>
              
              {/* Practice Exams */}
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Practice Exams</h4>
                {relatedResources.practiceExams.map(exam => (
                  <Button 
                    key={exam.id}
                    variant="outline" 
                    className="w-full justify-start mb-2 text-left"
                    onClick={() => navigateToResource('exam', exam.id)}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    {exam.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-medium flex items-center gap-2">
                <Layers3 className="w-4 h-4" />
                Learning Path
              </CardTitle>
              <CardDescription>Next steps in your learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span>Learn concept fundamentals</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-blue-500">→</span>
                  <span>Practice with flashcards</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-blue-500">→</span>
                  <span>Apply in practice exams</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-blue-500">→</span>
                  <span>Connect with related concepts</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ConceptCardDetail;
