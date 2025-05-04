import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, PlusCircle, MessageSquare, BookOpen, Calendar, Lock, Share2, UserPlus, FileText, BookOpenCheck, Lightbulb, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

const StudyGroupsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("my-groups");
  const [showPremiumDialog, setShowPremiumDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [showCollaborationFeatures, setShowCollaborationFeatures] = useState(false);
  const [showSharedNotes, setShowSharedNotes] = useState(false);
  const [showPeerReviewPanel, setShowPeerReviewPanel] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [showChallengesPanel, setShowChallengesPanel] = useState(false);

  const myGroups = [
    {
      id: '1',
      name: 'Physics Masters',
      description: 'Advanced preparation for JEE Physics',
      members: 5,
      maxMembers: 8,
      isAdmin: true,
      category: 'Physics',
      lastActivity: '2 hours ago',
      avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png'
    },
    {
      id: '2',
      name: 'Chemistry Study Circle',
      description: 'NEET Chemistry preparation group',
      members: 7,
      maxMembers: 10,
      isAdmin: false,
      category: 'Chemistry',
      lastActivity: 'Yesterday',
      avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png'
    }
  ];

  const recommendedGroups = [
    {
      id: '3',
      name: 'Math Wizards',
      description: 'Advanced calculus and algebra for JEE',
      members: 8,
      maxMembers: 10,
      category: 'Mathematics',
      lastActivity: '3 hours ago',
      avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png'
    },
    {
      id: '4',
      name: 'Biology Group',
      description: 'NEET biology preparation with weekly quizzes',
      members: 12,
      maxMembers: 15,
      category: 'Biology',
      lastActivity: 'Just now',
      avatar: '/lovable-uploads/8c62154a-6dbf-40c6-8117-f1c9cfd1effa.png'
    },
    {
      id: '5',
      name: 'UPSC General Studies',
      description: 'Current affairs discussion and notes sharing',
      members: 20,
      maxMembers: 25,
      category: 'UPSC',
      lastActivity: '1 day ago',
      avatar: '/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png'
    }
  ];

  // Sample shared notes data
  const sharedNotes = [
    {
      id: 'note1',
      title: 'Physics Mechanics Summary',
      author: 'Rahul S.',
      date: '2 days ago',
      excerpt: 'Key formulas and concepts for NEET Physics mechanics section...',
      likes: 8
    },
    {
      id: 'note2',
      title: 'Organic Chemistry Reaction Pathways',
      author: 'Priya M.',
      date: 'Yesterday',
      excerpt: 'Comprehensive flowchart of organic chemistry reactions...',
      likes: 12
    },
    {
      id: 'note3',
      title: 'Biology Important Diagrams',
      author: 'Ajay K.',
      date: '5 hours ago',
      excerpt: 'Collection of important diagrams for NEET Biology...',
      likes: 5
    }
  ];

  // Sample peer review data
  const peerReviews = [
    {
      id: 'review1',
      question: 'Explain the process of photosynthesis and its stages.',
      answer: 'Photosynthesis is the process by which green plants, algae and some bacteria convert light energy into chemical energy...',
      submittedBy: 'Deepak R.',
      reviewers: ['Ananya G.', 'Priya M.'],
      status: 'Needs review'
    },
    {
      id: 'review2',
      question: 'Solve this differential equation: dy/dx + Py = Q',
      answer: 'This is a first-order linear differential equation. To solve it, we use an integrating factor...',
      submittedBy: 'Sanjay V.',
      reviewers: ['Rahul S.'],
      status: 'Reviewed'
    }
  ];

  // Weekly challenge data
  const weeklyChallenges = [
    {
      id: 'challenge1',
      title: 'Physics Week',
      description: 'Complete all practice problems in the Mechanics section',
      deadline: '3 days left',
      progress: 60,
      participants: 15
    },
    {
      id: 'challenge2',
      title: 'Biology Mastery',
      description: 'Create and review 50 flashcards on Human Physiology',
      deadline: '5 days left',
      progress: 30,
      participants: 12
    },
    {
      id: 'challenge3',
      title: 'Daily Streak',
      description: 'Maintain a 5-day study streak this week',
      deadline: 'Ongoing',
      progress: 80,
      participants: 28
    }
  ];

  const handleCreateGroup = () => {
    // For demo, we'll simulate checking if user has group plan
    const hasGroupPlan = false;
    
    if (!hasGroupPlan) {
      setShowPremiumDialog(true);
      return;
    }

    // If user has group plan, show creation dialog
    // Implementation would go here
  };

  const handleJoinGroup = (groupId: string) => {
    // For demo, we'll simulate checking if user has group plan
    const hasGroupPlan = false;
    
    if (!hasGroupPlan) {
      setShowPremiumDialog(true);
      return;
    }

    toast({
      title: "Joined study group",
      description: "You've successfully joined the group.",
    });
  };

  const handleSubmitNewGroup = () => {
    if (!newGroupName.trim()) {
      toast({
        title: "Group name required",
        description: "Please enter a name for your study group.",
        variant: "destructive"
      });
      return;
    }

    // In real app, would create group in backend
    toast({
      title: "Group created!",
      description: "Your new study group has been created successfully."
    });
  };

  const handleViewGroupFeatures = (groupId: string) => {
    setActiveGroupId(groupId);
    setShowCollaborationFeatures(true);
  };

  const handleViewSharedNotes = () => {
    setShowSharedNotes(true);
    setShowCollaborationFeatures(false);
  };

  const handleViewPeerReview = () => {
    setShowPeerReviewPanel(true);
    setShowCollaborationFeatures(false);
  };

  const handleViewChallenges = () => {
    setShowChallengesPanel(true);
  };

  const handleJoinChallenge = (challengeId: string) => {
    toast({
      title: "Challenge joined!",
      description: "You've successfully joined the challenge.",
    });
  };

  const handleSubmitPeerReview = () => {
    toast({
      title: "Review submitted",
      description: "Your peer review has been submitted. Thank you for your feedback!",
    });
    setShowPeerReviewPanel(false);
  };

  return (
    <SharedPageLayout
      title="Study Groups"
      subtitle="Collaborate with peers on your exam preparation"
      showBackButton
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Group Study</h2>
            <p className="text-muted-foreground">Create or join study groups for better exam preparation</p>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleViewChallenges} variant="outline" className="flex items-center">
              <Award className="mr-2 h-4 w-4" />
              Challenges
            </Button>
            <Button onClick={handleCreateGroup} className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Group
            </Button>
          </div>
        </div>
        
        {/* Daily/Weekly Challenges Panel */}
        {showChallengesPanel && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div>
                  <CardTitle>Daily & Weekly Challenges</CardTitle>
                  <CardDescription>Complete challenges to build consistent study habits</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowChallengesPanel(false)}>
                  <X size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {weeklyChallenges.map(challenge => (
                  <Card key={challenge.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                      <Badge variant="outline" className="mb-1 w-fit">{challenge.deadline}</Badge>
                      <CardTitle className="text-base">{challenge.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm mb-3">{challenge.description}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>{challenge.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div 
                            className="bg-indigo-600 h-2.5 rounded-full" 
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-xs">
                            <Users className="h-3 w-3" />
                            <span>{challenge.participants} participants</span>
                          </div>
                          <Button size="sm" onClick={() => handleJoinChallenge(challenge.id)}>Join Challenge</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="my-groups">My Groups</TabsTrigger>
            <TabsTrigger value="discover">Discover Groups</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-groups" className="space-y-4">
            {myGroups.length > 0 ? (
              <>
                {myGroups.map(group => (
                  <Card key={group.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-muted">
                            <AvatarImage src={group.avatar} />
                            <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{group.name}</CardTitle>
                            <CardDescription>{group.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                            {group.category}
                          </Badge>
                          {group.isAdmin && (
                            <Badge className="bg-amber-50 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                              Admin
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{group.members}/{group.maxMembers} members</span>
                        </div>
                        <div className="text-muted-foreground">Last active: {group.lastActivity}</div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-4 flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Group Chat
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleViewSharedNotes()}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Shared Notes
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleViewPeerReview()}>
                        <BookOpenCheck className="h-4 w-4 mr-2" />
                        Peer Reviews
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Session
                      </Button>
                      {group.isAdmin && (
                        <Button variant="outline" size="sm" className="flex items-center">
                          <UserPlus className="h-4 w-4 mr-2" />
                          Invite Members
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </>
            ) : (
              <Card className="text-center p-8">
                <div className="flex flex-col items-center space-y-4">
                  <Users className="h-12 w-12 text-muted-foreground" />
                  <CardTitle>No Groups Yet</CardTitle>
                  <CardDescription>You haven't joined any study groups yet.</CardDescription>
                  <Button onClick={() => setActiveTab("discover")}>Discover Groups</Button>
                </div>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="discover" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recommendedGroups.map(group => (
                <Card key={group.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-muted">
                          <AvatarImage src={group.avatar} />
                          <AvatarFallback>{group.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base">{group.name}</CardTitle>
                          <CardDescription className="text-xs">{group.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {group.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{group.members}/{group.maxMembers} members</span>
                      </div>
                      <div className="text-muted-foreground text-xs">Last active: {group.lastActivity}</div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-2">
                    <Button variant="outline" size="sm" className="mr-2" onClick={() => handleJoinGroup(group.id)}>
                      Join Group
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Shared Notes Dialog */}
        <Dialog open={showSharedNotes} onOpenChange={setShowSharedNotes}>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Shared Study Notes</DialogTitle>
              <DialogDescription>
                Collaborate with your group members through shared notes and materials
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Input 
                  placeholder="Search notes..." 
                  className="max-w-xs" 
                />
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Note
                </Button>
              </div>
              
              <ScrollArea className="h-[400px] pr-4">
                {sharedNotes.map(note => (
                  <Card key={note.id} className="mb-3">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{note.title}</CardTitle>
                        <Badge variant="outline" className="ml-2">{note.likes} likes</Badge>
                      </div>
                      <CardDescription className="flex justify-between">
                        <span>By {note.author}</span>
                        <span>{note.date}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{note.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Lightbulb className="h-3.5 w-3.5 mr-1" />
                        Like
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        View Full Note
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Peer Review Dialog */}
        <Dialog open={showPeerReviewPanel} onOpenChange={setShowPeerReviewPanel}>
          <DialogContent className="sm:max-w-[725px]">
            <DialogHeader>
              <DialogTitle>Peer Review System</DialogTitle>
              <DialogDescription>
                Review and get feedback on practice answers from your peers
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="review">
              <TabsList className="mb-4">
                <TabsTrigger value="review">Review Answers</TabsTrigger>
                <TabsTrigger value="submit">Submit For Review</TabsTrigger>
              </TabsList>
              
              <TabsContent value="review" className="space-y-4">
                <ScrollArea className="h-[400px] pr-4">
                  {peerReviews.map(review => (
                    <Card key={review.id} className="mb-4">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">Question</CardTitle>
                            <p className="text-sm mt-1">{review.question}</p>
                          </div>
                          <Badge variant={review.status === 'Reviewed' ? 'outline' : 'secondary'}>
                            {review.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium">Answer by {review.submittedBy}</h4>
                          <p className="text-sm border-l-2 border-gray-200 pl-3 py-1">{review.answer}</p>
                          
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Users className="h-3.5 w-3.5" />
                            <span>Reviewers: {review.reviewers.join(', ')}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button 
                          size="sm" 
                          disabled={review.status === 'Reviewed'}
                          className="w-full"
                        >
                          {review.status === 'Reviewed' ? 'Already Reviewed' : 'Review This Answer'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </ScrollArea>
              </TabsContent>
              
              <TabsContent value="submit">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>Mathematics</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Question</label>
                    <Textarea 
                      placeholder="Enter the question you're answering..."
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Answer</label>
                    <Textarea 
                      placeholder="Enter your answer for peer review..."
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <Button onClick={handleSubmitPeerReview} className="w-full">Submit for Review</Button>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
        
        {/* Premium Plan Required Dialog */}
        <Dialog open={showPremiumDialog} onOpenChange={setShowPremiumDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Premium Feature</DialogTitle>
              <DialogDescription>
                Group study features are available exclusively to users with a Group Plan subscription.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <Alert className="bg-amber-50 border-amber-200">
                <AlertDescription className="text-amber-800">
                  Upgrade to a Group Plan to create and join study groups, access shared resources, and participate in group discussions.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <h4 className="font-medium">Group Plan Benefits:</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Create and join up to 5 study groups</li>
                  <li>Group chat and discussion forums</li>
                  <li>Shared resource library with your peers</li>
                  <li>Schedule group study sessions</li>
                  <li>Track group progress and achievements</li>
                </ul>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPremiumDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowPremiumDialog(false);
                window.location.href = "/dashboard/student/subscription";
              }}>
                View Group Plans
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* New Group Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <span className="hidden">Create Group</span> {/* Hidden trigger - we use the button instead */}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Study Group</DialogTitle>
              <DialogDescription>
                Set up a collaborative study environment for your exam preparation.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Group Name</label>
                <Input 
                  placeholder="Enter group name..." 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="What will your group focus on?" 
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Mathematics</option>
                  <option>General Studies</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Privacy</label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="private-group" />
                  <label htmlFor="private-group" className="text-sm flex items-center">
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    Private Group (Invite only)
                  </label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSubmitNewGroup}>Create Group</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </SharedPageLayout>
  );
};

export default StudyGroupsPage;
