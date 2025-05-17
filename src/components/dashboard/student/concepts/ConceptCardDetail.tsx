
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Award, 
  Share2, 
  MessageSquare, 
  ThumbsUp, 
  BookMarked, 
  UserPlus, 
  Volume2, 
  BrainCircuit,
  PencilLine,
  Bookmark,
  CheckCircle,
  CalendarClock,
  Users
} from 'lucide-react';

// Mock concept data for demonstration
const mockConcepts = {
  'concept-1': {
    id: 'concept-1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'medium' as const,
    estimatedTime: '45 minutes',
    progress: 75,
    masteryLevel: 68,
    description: 'Understanding the fundamental principles that govern the motion of physical objects and systems.',
    content: `
      <h2>Newton's Three Laws of Motion</h2>
      <p>Sir Isaac Newton's three laws of motion are fundamental principles that form the foundation of classical mechanics.</p>
      
      <h3>First Law (Law of Inertia)</h3>
      <p>An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an external force.</p>
      
      <h3>Second Law (F = ma)</h3>
      <p>The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.</p>
      
      <h3>Third Law (Action-Reaction)</h3>
      <p>For every action, there is an equal and opposite reaction.</p>
    `,
    isPremium: false,
    isRecommended: true,
    averageCompletionTime: '35 minutes',
    readCount: 1287,
    upvotes: 432,
    completionRate: 78,
    relatedConcepts: ['concept-2', 'concept-3'],
    confidenceRating: 4.2,
    lastStudied: '2023-05-12T10:30:00Z'
  },
  'concept-2': {
    id: 'concept-2',
    title: 'Quantum Mechanics Basics',
    subject: 'Physics',
    topic: 'Quantum Physics',
    difficulty: 'hard' as const,
    estimatedTime: '75 minutes',
    progress: 45,
    masteryLevel: 40,
    description: 'Introduction to the fundamental principles of quantum mechanics and wave-particle duality.',
    content: `
      <h2>Introduction to Quantum Mechanics</h2>
      <p>Quantum mechanics is the branch of physics relating to the very small. It describes nature at the smallest scales of energy levels of atoms and subatomic particles.</p>
      
      <h3>Wave-Particle Duality</h3>
      <p>All particles exhibit both wave and particle properties. This is a central concept of quantum mechanics.</p>
      
      <h3>Heisenberg's Uncertainty Principle</h3>
      <p>It is impossible to simultaneously know the exact position and momentum of a particle.</p>
      
      <h3>Schrödinger's Wave Equation</h3>
      <p>The fundamental equation that describes how the quantum state of a physical system changes over time.</p>
    `,
    isPremium: true,
    isRecommended: false,
    averageCompletionTime: '65 minutes',
    readCount: 876,
    upvotes: 312,
    completionRate: 62,
    relatedConcepts: ['concept-1', 'concept-3'],
    confidenceRating: 3.8,
    lastStudied: '2023-04-28T14:15:00Z'
  }
};

const ConceptCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [concept, setConcept] = useState(mockConcepts[id as keyof typeof mockConcepts]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [confidenceRating, setConfidenceRating] = useState(concept?.confidenceRating || 0);
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState('');
  
  // Handle case when concept is not found
  if (!concept) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Concept not found</h2>
        <p className="mb-8">The concept you're looking for couldn't be found.</p>
        <Link to="/dashboard/student/concepts">
          <Button>Return to Concepts</Button>
        </Link>
      </div>
    );
  }
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const handleReadAloud = () => {
    // Read aloud implementation would go here
    alert('Reading content aloud...');
  };
  
  const handleShare = () => {
    // Share implementation would go here
    alert('Sharing concept...');
  };

  // Determine mastery indicator color
  const getMasteryColor = () => {
    if (concept.masteryLevel >= 80) return 'from-emerald-500 to-green-600';
    if (concept.masteryLevel >= 60) return 'from-yellow-400 to-amber-500';
    if (concept.masteryLevel >= 40) return 'from-blue-400 to-blue-600';
    return 'from-gray-400 to-gray-500';
  };

  // Determine difficulty color
  const getDifficultyColor = () => {
    switch (concept.difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link to="/dashboard/student/concepts" className="flex items-center text-blue-600 mb-4 hover:underline">
        <BookOpen className="mr-2 h-4 w-4" /> Back to Concepts
      </Link>
      
      <Card className="border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{concept.subject} &rsaquo; {concept.topic}</p>
              <CardTitle className="text-2xl font-bold mt-1 mb-2 bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">
                {concept.title}
              </CardTitle>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={getDifficultyColor()}>
                  {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                </Badge>
                
                {concept.isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-0">
                    <Star className="h-3 w-3 mr-1 fill-white" /> Premium
                  </Badge>
                )}
                
                {concept.isRecommended && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                    <BookMarked className="h-3 w-3 mr-1" /> Recommended
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                {isBookmarked ? <Bookmark className="h-4 w-4 fill-yellow-400 stroke-yellow-400" /> : <Bookmark className="h-4 w-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={handleReadAloud}>
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-6 mb-6">
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700 dark:text-gray-300">{concept.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Content</h3>
                <div 
                  className="prose prose-slate dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: concept.content }}
                />
              </div>
              
              <div className="pt-4">
                <Button 
                  onClick={() => setShowNotes(!showNotes)} 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <PencilLine className="h-4 w-4" />
                  {showNotes ? 'Hide Notes' : 'Add Notes'}
                </Button>
                
                {showNotes && (
                  <div className="mt-4">
                    <textarea
                      className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                      rows={5}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Write your notes here..."
                    />
                    <Button className="mt-2" size="sm">Save Notes</Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-72 space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-3">Your Progress</h3>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Study Progress</span>
                    <span className="font-medium">{concept.progress}%</span>
                  </div>
                  <Progress 
                    value={concept.progress} 
                    className="h-2 mb-4" 
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <BrainCircuit className="h-3 w-3" /> Mastery
                    </span>
                    <span className="font-medium">{concept.masteryLevel}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                    <div 
                      className={`h-full bg-gradient-to-r ${getMasteryColor()} rounded-full`}
                      style={{ width: `${concept.masteryLevel}%` }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Est. Time
                    </span>
                    <span>{concept.estimatedTime}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Completion Rate
                    </span>
                    <span>{concept.completionRate}%</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <CalendarClock className="w-3 h-3" /> Last Studied
                    </span>
                    <span>{new Date(concept.lastStudied).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium mb-2">Rate your confidence</h4>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        variant={confidenceRating >= rating ? "default" : "outline"}
                        size="sm"
                        className={confidenceRating >= rating ? "bg-blue-600 hover:bg-blue-700" : ""}
                        onClick={() => setConfidenceRating(rating)}
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h3 className="font-semibold mb-3">Social Proof</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Students
                    </span>
                    <span>{concept.readCount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> Upvotes
                    </span>
                    <span>{concept.upvotes.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> Comments
                    </span>
                    <span>24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="w-full flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Award className="h-4 w-4 mr-2" /> Quiz Yourself
              </Button>
              <Button variant="outline" size="sm">
                <UserPlus className="h-4 w-4 mr-2" /> Study Together
              </Button>
            </div>
            
            <Link to={`/dashboard/student/concepts/${id}/formula-lab`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Continue Learning
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ConceptCardDetail;
