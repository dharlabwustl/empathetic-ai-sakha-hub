
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Book, Video, Lightbulb, FileText, FlaskConical, Play,
  Brain, MessageCircle, CheckCircle2, Download, Share2, Bookmark, 
  ThumbsUp, MoreHorizontal, Heart, Award, Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ConceptNote {
  id: string;
  content: string;
  createdAt: Date;
}

interface RelatedConcept {
  id: string;
  title: string;
  subject: string;
}

interface Resource {
  id: string;
  title: string;
  type: 'video' | 'pdf' | 'article' | 'quiz';
  duration?: string;
  url: string;
}

interface EnhancedConceptDetailProps {
  conceptId: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completionPercentage: number;
  bookmarked?: boolean;
  liked?: boolean;
  mastered?: boolean;
  content?: string;
  notes?: ConceptNote[];
  relatedConcepts?: RelatedConcept[];
  resources?: Resource[];
}

const EnhancedConceptDetail: React.FC<EnhancedConceptDetailProps> = ({
  conceptId,
  title = "Chemical Bonding",
  description = "Understanding how atoms form bonds and molecules, including ionic, covalent, and metallic bonds",
  subject = "Chemistry",
  difficulty = "medium",
  completionPercentage = 68,
  bookmarked = false,
  liked = false,
  mastered = false,
  content = "Chemical bonding is the process where atoms form connections by sharing or transferring electrons to achieve a more stable electron configuration, typically similar to that of a noble gas.",
  notes = [],
  relatedConcepts = [
    { id: "c1", title: "Ionic Bonding", subject: "Chemistry" },
    { id: "c2", title: "Covalent Bonding", subject: "Chemistry" },
    { id: "c3", title: "Atomic Structure", subject: "Chemistry" },
  ],
  resources = [
    { id: "r1", title: "Introduction to Chemical Bonds", type: "video", duration: "12:45", url: "#" },
    { id: "r2", title: "Practice Problems: Bonding", type: "quiz", url: "#" },
    { id: "r3", title: "Advanced Bonding Concepts", type: "article", url: "#" },
    { id: "r4", title: "Chemical Bonds Explained", type: "pdf", duration: "15 pages", url: "#" },
  ]
}) => {
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [isLiked, setIsLiked] = useState(liked);
  const [isMastered, setIsMastered] = useState(mastered);
  const [userNotes, setUserNotes] = useState(notes);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note = {
      id: `note-${Date.now()}`,
      content: newNote,
      createdAt: new Date(),
    };
    
    setUserNotes([note, ...userNotes]);
    setNewNote("");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video size={16} />;
      case 'pdf': return <FileText size={16} />;
      case 'article': return <FileText size={16} />;
      case 'quiz': return <Brain size={16} />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Concept Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              {subject}
            </Badge>
            <Badge variant="outline" className={getDifficultyColor(difficulty)}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Badge>
            {isMastered && (
              <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                <Award size={14} className="mr-1" /> Mastered
              </Badge>
            )}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>
        
        <div className="flex flex-row md:flex-col gap-2 justify-end">
          <Button 
            variant={isBookmarked ? "default" : "outline"} 
            size="sm"
            onClick={() => setIsBookmarked(!isBookmarked)}
          >
            <Bookmark size={16} className="mr-1" />
            {isBookmarked ? "Saved" : "Save"}
          </Button>
          
          <Button 
            variant={isMastered ? "success" : "outline"} 
            size="sm"
            onClick={() => setIsMastered(!isMastered)}
            className={isMastered ? "bg-green-600 hover:bg-green-700 text-white" : ""}
          >
            <CheckCircle2 size={16} className="mr-1" />
            {isMastered ? "Mastered" : "Mark as Mastered"}
          </Button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Your Progress</span>
          <span className="font-medium">{completionPercentage}%</span>
        </div>
        <Progress value={completionPercentage} className="h-2" />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="content">
            <Book size={16} className="mr-1 hidden sm:inline" />
            Content
          </TabsTrigger>
          <TabsTrigger value="resources">
            <FileText size={16} className="mr-1 hidden sm:inline" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="notes">
            <Lightbulb size={16} className="mr-1 hidden sm:inline" />
            Notes
          </TabsTrigger>
          <TabsTrigger value="practice">
            <Brain size={16} className="mr-1 hidden sm:inline" />
            Practice
          </TabsTrigger>
          <TabsTrigger value="lab">
            <FlaskConical size={16} className="mr-1 hidden sm:inline" />
            Lab
          </TabsTrigger>
        </TabsList>
        
        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Concept Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose dark:prose-invert max-w-none">
                <p>{content}</p>
                <h3>Ionic Bonding</h3>
                <p>Ionic bonds form when electrons are transferred from one atom to another, creating positively and negatively charged ions that attract each other.</p>
                
                <h3>Covalent Bonding</h3>
                <p>Covalent bonds involve the sharing of electron pairs between atoms, allowing them to achieve full outer electron shells.</p>
                
                <h3>Metallic Bonding</h3>
                <p>In metallic bonding, metal atoms arrange themselves in a lattice structure with their valence electrons free to move throughout the structure.</p>
              </div>
              
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <Lightbulb size={18} className="mr-2 text-yellow-500" />
                  Key Takeaways
                </h4>
                <ul className="space-y-1 list-disc pl-5">
                  <li>Chemical bonds are formed to achieve stability through filled electron shells</li>
                  <li>Ionic bonds involve the transfer of electrons between atoms</li>
                  <li>Covalent bonds involve the sharing of electron pairs</li>
                  <li>Metallic bonds feature a sea of delocalized electrons</li>
                  <li>Bond strength varies depending on the type and participating atoms</li>
                </ul>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="gap-2"
                >
                  {isLiked ? <Heart fill="red" size={16} /> : <ThumbsUp size={16} />}
                  {isLiked ? "Liked" : "Like"}
                </Button>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-1" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 size={16} className="mr-1" />
                    Share
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Print concept</DropdownMenuItem>
                      <DropdownMenuItem>Report issue</DropdownMenuItem>
                      <DropdownMenuItem>Add to custom list</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {relatedConcepts?.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Related Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {relatedConcepts.map((concept) => (
                    <Button 
                      key={concept.id} 
                      variant="outline" 
                      className="justify-start h-auto py-2 px-3"
                      onClick={() => console.log(`Navigate to concept ${concept.id}`)}
                    >
                      <div>
                        <div className="font-medium text-left">{concept.title}</div>
                        <div className="text-xs text-muted-foreground text-left">{concept.subject}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Resources Tab */}
        <TabsContent value="resources">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Learning Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {resources.map((resource) => (
                  <div key={resource.id} className="flex items-center gap-3 border-b pb-3 last:border-0">
                    <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                      {getResourceIcon(resource.type)}
                    </div>
                    
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm">{resource.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs py-0 h-5">
                          {resource.type.toUpperCase()}
                        </Badge>
                        {resource.duration && (
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            {resource.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button size="sm">
                      {resource.type === 'video' ? (
                        <>
                          <Play size={14} className="mr-1" /> Watch
                        </>
                      ) : resource.type === 'quiz' ? (
                        <>
                          <Brain size={14} className="mr-1" /> Start
                        </>
                      ) : (
                        <>
                          <FileText size={14} className="mr-1" /> Open
                        </>
                      )}
                    </Button>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-2">
                  View All Resources
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notes Tab */}
        <TabsContent value="notes">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Your Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add your notes about this concept..."
                  className="w-full min-h-[100px] p-3 border rounded-md bg-background resize-y"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddNote}>Save Note</Button>
                </div>
              </div>
              
              <Separator />
              
              {userNotes.length > 0 ? (
                <div className="space-y-4">
                  {userNotes.map((note) => (
                    <div key={note.id} className="bg-muted p-3 rounded-md">
                      <p className="whitespace-pre-wrap">{note.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {note.createdAt.toLocaleDateString()} • {note.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Lightbulb size={24} className="mx-auto mb-2" />
                  <p>No notes yet. Add your first note above!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Practice Tab */}
        <TabsContent value="practice">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Practice & Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button className="h-auto py-4 flex flex-col items-center justify-center">
                  <Brain size={24} className="mb-2" />
                  <span className="font-medium">Take Quick Quiz</span>
                  <span className="text-xs">10 questions • 10 minutes</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <FileText size={24} className="mb-2" />
                  <span className="font-medium">Practice Problems</span>
                  <span className="text-xs">15 problems • Moderate</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <MessageCircle size={24} className="mb-2" />
                  <span className="font-medium">Discussion Questions</span>
                  <span className="text-xs">5 questions • Deep learning</span>
                </Button>
                
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <Award size={24} className="mb-2" />
                  <span className="font-medium">Master Challenge</span>
                  <span className="text-xs">Advanced • 20 minutes</span>
                </Button>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Your Practice History</h4>
                <div className="space-y-2">
                  <div className="bg-muted p-3 rounded-md flex justify-between items-center">
                    <div>
                      <div className="font-medium">Quick Quiz</div>
                      <div className="text-xs text-muted-foreground">7/10 correct • 2 days ago</div>
                    </div>
                    <Button size="sm" variant="outline">Retry</Button>
                  </div>
                  
                  <div className="bg-muted p-3 rounded-md flex justify-between items-center">
                    <div>
                      <div className="font-medium">Practice Problems</div>
                      <div className="text-xs text-muted-foreground">12/15 correct • 1 week ago</div>
                    </div>
                    <Button size="sm" variant="outline">Retry</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Lab Tab */}
        <TabsContent value="lab">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Interactive Lab</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <FlaskConical size={48} className="mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Chemical Bonding Interactive Lab</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                  Explore ionic, covalent, and metallic bonds through interactive simulations. Build molecules and observe how different atoms bond together.
                </p>
                <Button>
                  <Play size={16} className="mr-2" />
                  Launch Interactive Lab
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 bg-muted/50 rounded-lg p-4">
                <div>
                  <h4 className="font-medium mb-2">Lab Activities</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span>Build NaCl crystal structure</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span>Create water molecules</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                      <span>Explore metallic crystal lattices</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                      <span>Compare bond energies</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Your Achievements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-yellow-500" />
                      <span>Basic Lab Skills</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Award size={16} />
                      <span>Advanced Molecule Builder</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Award size={16} />
                      <span>Lab Master</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedConceptDetail;
