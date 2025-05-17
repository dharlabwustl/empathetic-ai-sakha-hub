
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { 
  BookOpen, Star, CheckSquare, Volume2, VolumeX, 
  BarChart2, Lightbulb, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { ConceptCard } from '@/types/user/conceptCard';

// Sample concept data - in a real app, this would come from an API
const sampleConcepts: Record<string, ConceptCard> = {
  'concept-1': {
    id: 'concept-1',
    title: 'Newton\'s Laws of Motion',
    description: 'The fundamental principles describing the relationship between force, mass, and motion.',
    subject: 'Physics',
    chapter: 'Mechanics',
    topic: 'Classical Mechanics',
    difficulty: 'medium',
    completed: false,
    progress: 65,
    content: `
      <h3>First Law (Law of Inertia)</h3>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced force.</p>
      <p>This means that objects resist changes in their state of motion. In the absence of an unbalanced force, an object in motion will maintain that motion, and an object at rest will remain at rest.</p>
      
      <h3>Second Law (F = ma)</h3>
      <p>The acceleration of an object depends on the mass of the object and the amount of force applied.</p>
      <p>The relationship is: Force = mass × acceleration (F = ma)</p>
      <p>This law explains how velocity changes when a force acts on an object. The greater the mass, the greater the force needed to achieve the same acceleration.</p>
      
      <h3>Third Law (Action-Reaction)</h3>
      <p>For every action, there is an equal and opposite reaction.</p>
      <p>This means that when one object exerts a force on a second object, the second object exerts an equal force in the opposite direction on the first object.</p>
      <p>Examples include: a swimmer pushing water backward to move forward, a rocket expelling gas to propel upward, and the Earth and moon pulling on each other with gravity.</p>
      
      <h3>Applications in Real Life</h3>
      <p>Newton's Laws form the foundation of classical mechanics and have countless applications in everyday life, from the design of vehicles and structures to the understanding of planetary motion.</p>
    `,
    examples: [
      'A book lying on a table remains at rest due to the first law.',
      'A car accelerating due to the force of its engine demonstrates the second law.',
      'The recoil of a gun when fired is an example of the third law.'
    ],
    commonMistakes: [
      'Confusing the absence of motion with the absence of forces (in the first law).',
      'Forgetting that F = ma requires consistent units.',
      'Misidentifying action-reaction force pairs.'
    ],
    examRelevance: 'Very high. Newton\'s Laws appear in multiple choice, numerical problems, and theory questions.',
    recallAccuracy: 78,
    quizScore: 72,
    lastPracticed: '2023-08-15',
    timeSuggestion: 45,
    flashcardsTotal: 15,
    flashcardsCompleted: 10,
    examReady: false,
    relatedConcepts: ['concept-2', 'concept-3', 'concept-4']
  },
  'concept-2': {
    id: 'concept-2',
    title: 'Conservation of Momentum',
    description: 'Principle stating that the total momentum of isolated objects remains constant.',
    subject: 'Physics',
    difficulty: 'hard',
    content: 'Detailed explanation of momentum conservation principles...'
  },
  'concept-3': {
    id: 'concept-3',
    title: 'Work and Energy',
    description: 'Relationship between work done and energy transfer.',
    subject: 'Physics',
    difficulty: 'medium',
    content: 'Detailed explanation of work and energy concepts...'
  },
  'concept-4': {
    id: 'concept-4',
    title: 'Circular Motion',
    description: 'Motion of objects in circular paths and the forces involved.',
    subject: 'Physics',
    difficulty: 'medium',
    content: 'Detailed explanation of circular motion dynamics...'
  }
};

// Analytics data - would come from user study history in a real app
const sampleAnalytics = {
  masteryLevel: 72,
  recallStrength: 78,
  studySessions: 14,
  averageScore: 75,
  weakAreas: ['Third Law Applications', 'Vector Analysis'],
  strongAreas: ['First Law Concepts', 'Second Law Calculations'],
  progressOverTime: [
    { date: '2023-07-01', score: 45 },
    { date: '2023-07-15', score: 58 },
    { date: '2023-08-01', score: 65 },
    { date: '2023-08-15', score: 72 }
  ],
  attemptHistory: [
    { date: '2023-07-01', type: 'Quiz', score: 62 },
    { date: '2023-07-10', type: 'Flashcards', score: 70 },
    { date: '2023-07-25', type: 'Practice Exam', score: 75 },
    { date: '2023-08-05', type: 'Flashcards', score: 80 },
    { date: '2023-08-15', type: 'Quiz', score: 85 }
  ]
};

// AI insights - would be generated by an AI model in a real app
const sampleAIInsights = {
  weakLinks: [
    'Connection between Newton\'s First Law and the concept of inertial reference frames',
    'Relationship between the Third Law and conservation of momentum',
    'Application of Newton\'s Second Law in non-inertial reference frames'
  ],
  revisionSuggestions: [
    'Review centripetal force in circular motion',
    'Practice numerical problems involving variable forces',
    'Study the limitations of Newton\'s Laws in quantum and relativistic scenarios'
  ],
  conceptConnections: [
    { from: 'Newton\'s Second Law', to: 'Work-Energy Theorem', strength: 'strong' },
    { from: 'Newton\'s Third Law', to: 'Conservation of Momentum', strength: 'very strong' },
    { from: 'Newton\'s First Law', to: 'Galilean Relativity', strength: 'moderate' }
  ]
};

const ConceptCardDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<ConceptCard | null>(null);
  const [isReading, setIsReading] = useState(false);
  const [notes, setNotes] = useState<string>('');
  const [activeTab, setActiveTab] = useState('content');
  const { speakMessage, toggleMute } = useVoiceAnnouncer();

  useEffect(() => {
    // In a real app, this would fetch data from an API
    if (conceptId && sampleConcepts[conceptId]) {
      setConcept(sampleConcepts[conceptId]);
      
      // Load saved notes from localStorage
      const savedNotes = localStorage.getItem(`concept-notes-${conceptId}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
    } else {
      // Handle concept not found
      console.error(`Concept with ID ${conceptId} not found`);
    }
  }, [conceptId]);

  const handleReadAloud = () => {
    if (!concept) return;
    
    // Extract text content from HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = concept.content || '';
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    if (isReading) {
      // Stop reading
      toggleMute(true);
      setIsReading(false);
      toast.info('Reading stopped');
    } else {
      // Start reading
      speakMessage(`${concept.title}. ${textContent}`, true);
      setIsReading(true);
      toast.info('Reading content aloud');
    }
  };

  const handleSaveNotes = () => {
    if (!conceptId) return;
    
    // Save notes to localStorage
    localStorage.setItem(`concept-notes-${conceptId}`, notes);
    toast.success('Notes saved successfully');
  };

  const handleNavigation = (type: string) => {
    if (!concept) return;
    
    switch(type) {
      case 'linked':
        if (concept.relatedConcepts && concept.relatedConcepts.length > 0) {
          navigate(`/dashboard/student/concepts/${concept.relatedConcepts[0]}`);
        } else {
          toast.info('No linked concepts available');
        }
        break;
      case 'flashcards':
        navigate(`/dashboard/student/flashcards/${conceptId}`);
        break;
      case 'practice':
        navigate(`/dashboard/student/practice-exam`);
        break;
      default:
        break;
    }
  };

  if (!concept) {
    return (
      <SharedPageLayout 
        title="Concept Details" 
        subtitle="Loading concept details..."
        backButtonUrl="/dashboard/student/concepts"
      >
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </SharedPageLayout>
    );
  }

  return (
    <SharedPageLayout 
      title={concept.title} 
      subtitle={`${concept.subject} > ${concept.chapter || ''} > ${concept.topic || ''}`}
      backButtonUrl="/dashboard/student/concepts"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Read Aloud Button and Difficulty Badge */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                size="sm"
                onClick={handleReadAloud}
                className="flex items-center gap-2"
              >
                {isReading ? (
                  <>
                    <VolumeX className="h-4 w-4" />
                    Stop Reading
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    Read Aloud
                  </>
                )}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                concept.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                concept.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                (concept.progress || 0) > 80 ? 'bg-green-100 text-green-800' :
                (concept.progress || 0) > 50 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {concept.progress || 0}% Complete
              </span>
            </div>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="content" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
              <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
              <TabsTrigger value="exam">Exam Relevance</TabsTrigger>
              <TabsTrigger value="notes">My Notes</TabsTrigger>
            </TabsList>
            
            {/* Content Tab */}
            <TabsContent value="content" className="bg-white p-4 rounded-md shadow-sm">
              <div
                dangerouslySetInnerHTML={{ __html: concept.content || 'No content available' }}
                className="prose max-w-none dark:prose-invert"
              />
            </TabsContent>
            
            {/* Examples Tab */}
            <TabsContent value="examples" className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-medium mb-4">Examples</h3>
              {concept.examples && concept.examples.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                  {concept.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No examples available</p>
              )}
            </TabsContent>
            
            {/* Common Mistakes Tab */}
            <TabsContent value="mistakes" className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-medium mb-4">Common Mistakes</h3>
              {concept.commonMistakes && concept.commonMistakes.length > 0 ? (
                <ul className="list-disc list-inside space-y-2">
                  {concept.commonMistakes.map((mistake, index) => (
                    <li key={index} className="text-red-600 dark:text-red-400">{mistake}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">No common mistakes listed</p>
              )}
            </TabsContent>
            
            {/* Exam Relevance Tab */}
            <TabsContent value="exam" className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-medium mb-4">Exam Relevance</h3>
              <p>{concept.examRelevance || 'No exam relevance information available'}</p>
            </TabsContent>
            
            {/* Notes Tab */}
            <TabsContent value="notes" className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="text-lg font-medium mb-4">My Study Notes</h3>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your personal notes here..."
                className="min-h-[200px] w-full mb-4"
              />
              <Button onClick={handleSaveNotes} className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Save Notes
              </Button>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Study Tools */}
          <Card>
            <CardHeader>
              <CardTitle>Study Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-start gap-2"
                onClick={() => handleNavigation('linked')}
              >
                <BookOpen className="h-4 w-4" />
                Linked Concept Cards
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-start gap-2"
                onClick={() => handleNavigation('flashcards')}
              >
                <Star className="h-4 w-4" />
                Practice Flashcards
              </Button>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-start gap-2"
                onClick={() => handleNavigation('practice')}
              >
                <CheckSquare className="h-4 w-4" />
                Take Practice Exam
              </Button>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Mastery Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall Mastery</span>
                  <span className="text-sm font-medium">{sampleAnalytics.masteryLevel}%</span>
                </div>
                <Progress value={sampleAnalytics.masteryLevel} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Recall Strength</span>
                  <span className="text-sm font-medium">{sampleAnalytics.recallStrength}%</span>
                </div>
                <Progress value={sampleAnalytics.recallStrength} className="h-2" />
              </div>

              <div className="border-t pt-3">
                <h4 className="text-sm font-medium mb-2">Recent Attempts</h4>
                <div className="space-y-2 max-h-[150px] overflow-y-auto">
                  {sampleAnalytics.attemptHistory.map((attempt, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span>{attempt.date} ({attempt.type})</span>
                      <span className={`font-medium ${
                        attempt.score > 80 ? 'text-green-600' : 
                        attempt.score > 60 ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {attempt.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Weak Knowledge Links</h4>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  {sampleAIInsights.weakLinks.map((link, index) => (
                    <li key={index} className="text-red-600">{link}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-3">
                <h4 className="text-sm font-medium mb-2">Revision Suggestions</h4>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  {sampleAIInsights.revisionSuggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t pt-3">
                <h4 className="text-sm font-medium mb-2">Concept Connections</h4>
                <div className="space-y-2 text-xs">
                  {sampleAIInsights.conceptConnections.map((connection, index) => (
                    <div key={index}>
                      <span className="font-medium">{connection.from}</span> → {connection.to}
                      <span className={`ml-2 px-1.5 py-0.5 rounded text-[10px] ${
                        connection.strength === 'very strong' ? 'bg-green-100 text-green-800' :
                        connection.strength === 'strong' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {connection.strength}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardDetailPage;
