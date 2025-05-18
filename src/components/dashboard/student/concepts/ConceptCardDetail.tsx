
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Book, 
  Bookmark, 
  BookmarkPlus, 
  ChevronLeft, 
  Download,
  FileText,
  Info,
  Lightbulb,
  ListChecks,
  Play,
  Paperclip,
  Share2,
  Zap,
  Hash
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useExamData } from '@/hooks/useExamData';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';
import { useQuery } from '@tanstack/react-query';
import { handleError } from '@/utils/error';

interface ConceptCardDetailProps {
  onClose?: () => void;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ onClose }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [conceptProgress, setConceptProgress] = useState(68);
  const [showTranscript, setShowTranscript] = useState(false);
  const [markdown, setMarkdown] = useState<string | string[]>('');
  const { setGlobalLoading } = useGlobalLoading();
  const { getExamById } = useExamData();

  const conceptData = {
    id: id || '1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    chapter: 'Classical Mechanics',
    difficulty: 'Medium',
    description: 'Foundational principles describing the relationship between the motion of an object and the forces acting on it.',
    tags: ['mechanics', 'forces', 'motion', 'acceleration', 'NEET', 'JEE'],
    estimatedTime: '15 mins',
    author: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      role: 'Physics Professor'
    },
    lastUpdated: '2023-10-15',
    viewCount: 1245,
    content: `
# Newton's Laws of Motion

## Introduction
Newton's laws of motion are three physical laws that together laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to said forces.

## First Law: Law of Inertia
**An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an unbalanced force.**

This law states that if the net force (the sum of all forces acting on an object) is zero, then the velocity of the object is constant. The object is either at rest or moving with constant velocity.

### Examples:
1. A book lying on a table remains at rest until a force is applied to move it.
2. A moving car will continue moving in the absence of friction or air resistance.

## Second Law: Force = Mass × Acceleration
**The acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.**

This law states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. This is expressed as:

$$F = ma$$

Where:
- $F$ is the net force applied
- $m$ is the mass of the object
- $a$ is the acceleration

### Examples:
1. A car accelerates faster when the gas pedal is pressed harder (more force applied).
2. A heavier object requires more force to reach the same acceleration as a lighter object.

## Third Law: Action and Reaction
**For every action, there is an equal and opposite reaction.**

This law states that for every force acting on a body, the body exerts a force of equal magnitude in the opposite direction on the body that exerted the original force.

### Examples:
1. The recoil of a gun when it is fired.
2. A swimmer pushing water backward to propel forward.

## Applications
Newton's laws of motion form the foundation for classical mechanics and have widespread applications in engineering, physics, and everyday life. They are used in:

1. Designing vehicles and transportation systems
2. Sports science for optimizing athletic performance
3. Construction and structural engineering
4. Space exploration and rocket science
5. Robotics and automation

## Limitations
While Newton's laws are extremely useful for most applications, they break down at:
- Speeds approaching the speed of light (where relativistic effects become significant)
- Subatomic scales (where quantum mechanics takes over)
- Extremely strong gravitational fields (where general relativity is needed)

## Key Formulas
1. Net Force: $F_{net} = ma$
2. Weight: $W = mg$ (where g is the acceleration due to gravity)
3. Momentum: $p = mv$
4. Impulse: $J = F\\Delta t = \\Delta p$

## Practice Questions
1. A 5kg object is subjected to a force of 20N. What is its acceleration?
2. If a car accelerates from 0 to 60 km/h in 5 seconds, what is the average force applied if the car's mass is 1500kg?
3. Explain why a person in a car not wearing a seat belt continues to move forward when the car suddenly stops.
`,
    relatedConcepts: [
      { id: '2', title: 'Conservation of Momentum' },
      { id: '3', title: 'Circular Motion' },
      { id: '4', title: 'Work, Energy and Power' }
    ],
    video: {
      url: 'https://www.youtube.com/embed/kKKM8Y-u7ds',
      transcript: `In this video, we'll be discussing Newton's three laws of motion.
      
Newton's first law states that an object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction, unless acted upon by an unbalanced force. This is also known as the law of inertia.

The second law gives us the mathematical relationship between force, mass, and acceleration. It states that the force applied to an object equals its mass times its acceleration, or F=ma.

Finally, Newton's third law tells us that for every action, there is an equal and opposite reaction. When one object exerts a force on another object, the second object exerts an equal and opposite force on the first.

These three laws form the foundation of classical mechanics and help us understand how objects move and interact with each other.`
    },
    practice: {
      mcq: [
        {
          question: 'According to Newton\'s First Law, an object in motion will:',
          options: [
            'Always come to a stop eventually',
            'Accelerate in the direction of motion',
            'Continue moving with constant velocity unless acted upon by an external force',
            'Move in a circular path'
          ],
          correctAnswer: 2
        },
        {
          question: 'Newton\'s Second Law is represented by which equation?',
          options: [
            'F = mv',
            'F = ma',
            'F = mg',
            'F = 1/2mv²'
          ],
          correctAnswer: 1
        }
      ],
      shortAnswer: [
        'Explain how Newton\'s Third Law applies when you are walking on the ground.',
        'Why do passengers in a car lurch forward when the driver applies brakes suddenly?'
      ]
    }
  };

  // Simulating loading markdown content
  useEffect(() => {
    const fetchMarkdown = async () => {
      setGlobalLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setMarkdown(conceptData.content);
      } catch (error) {
        console.error("Error fetching markdown:", error);
        toast({
          title: "Error",
          description: "Failed to load concept content",
          variant: "destructive",
        });
      } finally {
        setGlobalLoading(false);
      }
    };
    
    fetchMarkdown();
  }, [id, toast, setGlobalLoading]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark removed" : "Bookmark added",
      description: isBookmarked 
        ? `Removed ${conceptData.title} from your bookmarks` 
        : `Added ${conceptData.title} to your bookmarks for later review`,
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const content = typeof markdown === 'string' ? markdown : markdown.join('\n');
    const file = new Blob([content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${conceptData.title.split(' ').join('_')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download started",
      description: `Downloading ${conceptData.title} as markdown`,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Concept link copied to clipboard",
    });
  };

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  // Render content based on markdown
  const renderContentFromMarkdown = () => {
    const contentStr = typeof markdown === 'string' ? markdown : markdown.join('\n');
    
    // Very simple markdown parser for demonstration
    const sections = contentStr.split('\n## ').map((section, index) => {
      if (index === 0) return section; // First part contains intro
      return `## ${section}`; // Add the heading back for other sections
    });

    const parseSections = (text: string) => {
      // Replace headers
      text = text.replace(/# (.*)/g, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>');
      text = text.replace(/## (.*)/g, '<h2 class="text-xl font-semibold mt-5 mb-3">$1</h2>');
      text = text.replace(/### (.*)/g, '<h3 class="text-lg font-medium mt-4 mb-2">$1</h3>');
      
      // Replace bold text
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Replace italic text
      text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // Replace lists
      text = text.replace(/^\d+\. (.*)/gm, '<li class="ml-5 list-decimal">$1</li>');
      text = text.replace(/^- (.*)/gm, '<li class="ml-5 list-disc">$1</li>');
      
      // Replace code blocks (simplified)
      text = text.replace(/```(.*?)```/gs, '<pre class="bg-gray-100 dark:bg-gray-800 p-3 rounded my-3 overflow-auto"><code>$1</code></pre>');
      
      // Replace inline code
      text = text.replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-1 rounded text-sm">$1</code>');
      
      // Replace math expressions (without actual rendering)
      text = text.replace(/\$\$(.*?)\$\$/g, '<div class="my-2 px-4 py-2 bg-gray-50 dark:bg-gray-900 rounded overflow-auto">$1</div>');
      text = text.replace(/\$(.*?)\$/g, '<span class="font-mono">$1</span>');
      
      // Replace paragraphs (add margin between paragraphs)
      text = text.split('\n\n').map(para => {
        if (!para.startsWith('<h') && !para.startsWith('<pre') && 
            !para.startsWith('<ul') && !para.startsWith('<ol') && !para.trim().startsWith('<li')) {
          return `<p class="my-3">${para}</p>`;
        }
        return para;
      }).join('\n');
      
      return text;
    };

    return (
      <div className="concept-content">
        {sections.map((section, idx) => (
          <div key={idx} dangerouslySetInnerHTML={{ __html: parseSections(section) }} />
        ))}
      </div>
    );
  };

  if (!conceptData) {
    return (
      <div className="p-6 text-center">
        <p>Loading concept content...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-theme(spacing.16))] overflow-hidden bg-white dark:bg-gray-950">
      {/* Header with breadcrumb */}
      <div className="bg-white dark:bg-gray-900 px-4 py-3 border-b dark:border-gray-800 flex flex-col space-y-1">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-8 w-8" 
            onClick={handleGoBack}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button 
              variant={isBookmarked ? "default" : "outline"} 
              size="sm" 
              onClick={handleBookmark}
              className="gap-1"
            >
              {isBookmarked ? <Bookmark className="h-4 w-4" /> : <BookmarkPlus className="h-4 w-4" />}
              {isBookmarked ? "Bookmarked" : "Bookmark"}
            </Button>
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Breadcrumb className="text-xs">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/student/concepts">Concepts</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/student/concepts?subject=${conceptData.subject}`}>{conceptData.subject}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/dashboard/student/concepts?chapter=${conceptData.chapter}`}>{conceptData.chapter}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Title and progress */}
      <div className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/20 dark:to-violet-950/20 px-4 py-3 border-b dark:border-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">{conceptData.title}</h1>
          <Badge variant={
            conceptData.difficulty === 'Easy' ? 'outline' : 
            conceptData.difficulty === 'Medium' ? 'secondary' : 
            'default'
          }>
            {conceptData.difficulty}
          </Badge>
        </div>
        <div className="mt-2 flex flex-col space-y-1">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
            <span>Your progress</span>
            <span>{conceptProgress}%</span>
          </div>
          <Progress value={conceptProgress} className="h-1.5" />
        </div>
        <div className="mt-3 flex flex-wrap gap-1">
          {conceptData.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs bg-white/50 dark:bg-gray-800/50">
              <Hash className="h-3 w-3 mr-1" /> {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Tabs navigation */}
      <div className="bg-white dark:bg-gray-900 px-4 pt-2 border-b dark:border-gray-800">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-5 h-[unset]">
            <TabsTrigger value="overview" className="flex flex-col py-2 px-0 gap-1">
              <Info className="h-4 w-4" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex flex-col py-2 px-0 gap-1">
              <Book className="h-4 w-4" />
              <span className="text-xs">Learn</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex flex-col py-2 px-0 gap-1">
              <Play className="h-4 w-4" />
              <span className="text-xs">Video</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="flex flex-col py-2 px-0 gap-1">
              <ListChecks className="h-4 w-4" />
              <span className="text-xs">Practice</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex flex-col py-2 px-0 gap-1">
              <Paperclip className="h-4 w-4" />
              <span className="text-xs">Resources</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Tab content */}
      <div 
        ref={contentRef}
        className="flex-grow overflow-y-auto p-4 bg-white dark:bg-gray-950"
      >
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <Info className="h-4 w-4" />
                  About this concept
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{conceptData.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="text-sm font-medium">Subject</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{conceptData.subject}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Chapter</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{conceptData.chapter}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Estimated Time</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{conceptData.estimatedTime}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Last Updated</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{conceptData.lastUpdated}</div>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={conceptData.author.avatar} alt={conceptData.author.name} />
                    <AvatarFallback>{conceptData.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{conceptData.author.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{conceptData.author.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <Lightbulb className="h-4 w-4" />
                  Key Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <div className="min-w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs">
                      1
                    </div>
                    <span>Newton's First Law: An object will remain at rest or in uniform motion unless acted upon by an external force.</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="min-w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs">
                      2
                    </div>
                    <span>Newton's Second Law: The acceleration of an object is directly proportional to the force applied, and inversely proportional to its mass (F=ma).</span>
                  </li>
                  <li className="flex gap-2">
                    <div className="min-w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs">
                      3
                    </div>
                    <span>Newton's Third Law: For every action, there is an equal and opposite reaction.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  Related Concepts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {conceptData.relatedConcepts.map((concept, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    className="w-full justify-start text-left"
                    onClick={() => navigate(`/dashboard/student/concepts/card/${concept.id}`)}
                  >
                    <Zap className="h-4 w-4 mr-2 text-indigo-600" />
                    {concept.title}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'learn' && (
          <div className="concept-learn-content prose dark:prose-invert max-w-none">
            {renderContentFromMarkdown()}
          </div>
        )}
        
        {activeTab === 'video' && (
          <div className="space-y-4">
            <div className="aspect-video rounded-lg overflow-hidden border dark:border-gray-800">
              <iframe
                src={conceptData.video.url}
                className="w-full h-full"
                title={conceptData.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Video Transcript</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowTranscript(!showTranscript)}
              >
                {showTranscript ? "Hide" : "Show"} Transcript
              </Button>
            </div>
            
            {showTranscript && (
              <Card className="mt-2">
                <CardContent className="p-4">
                  <p className="text-sm whitespace-pre-line">{conceptData.video.transcript}</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
        
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Multiple Choice Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {conceptData.practice.mcq.map((question, idx) => (
                  <div key={idx} className="space-y-3">
                    <div className="font-medium">{idx + 1}. {question.question}</div>
                    <div className="space-y-2 ml-4">
                      {question.options.map((option, optIdx) => (
                        <div 
                          key={optIdx} 
                          className={`flex items-center space-x-2 p-2 rounded-md border ${
                            optIdx === question.correctAnswer ? 
                            'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900' : 
                            'border-gray-200 dark:border-gray-800'
                          }`}
                        >
                          <div className="flex-shrink-0 h-5 w-5 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-xs">
                            {String.fromCharCode(65 + optIdx)}
                          </div>
                          <span>{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Short Answer Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {conceptData.practice.shortAnswer.map((question, idx) => (
                  <div key={idx}>
                    <div className="font-medium mb-2">{idx + 1}. {question}</div>
                    <div className="p-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-md text-sm text-gray-500 dark:text-gray-400">
                      Write your answer here...
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
        
        {activeTab === 'resources' && (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Additional resources for {conceptData.title} are available for download below.
              </AlertDescription>
            </Alert>
            
            <Card className="overflow-hidden">
              <CardHeader className="p-0">
                <CardTitle className="bg-gray-100 dark:bg-gray-800 px-4 py-2 text-base">
                  Available Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y dark:divide-gray-800">
                  <Button variant="ghost" className="w-full justify-start rounded-none py-4 px-4 h-auto">
                    <FileText className="h-4 w-4 mr-3 text-blue-600" />
                    <div className="text-left">
                      <div className="font-medium">Comprehensive Notes</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">PDF · 1.2 MB</div>
                    </div>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-none py-4 px-4 h-auto">
                    <FileText className="h-4 w-4 mr-3 text-green-600" />
                    <div className="text-left">
                      <div className="font-medium">Practice Worksheet</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Excel · 422 KB</div>
                    </div>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start rounded-none py-4 px-4 h-auto">
                    <FileText className="h-4 w-4 mr-3 text-purple-600" />
                    <div className="text-left">
                      <div className="font-medium">Formula Sheet</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">PDF · 765 KB</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">External Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Book className="h-4 w-4 mr-2" />
                  Khan Academy: Newton's Laws
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Play className="h-4 w-4 mr-2" />
                  MIT OpenCourseWare: Classical Mechanics
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Physics Interactive Simulations
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConceptCardDetail;
