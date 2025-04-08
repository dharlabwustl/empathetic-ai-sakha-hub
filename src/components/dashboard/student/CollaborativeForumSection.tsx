
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Users, Calendar, Tag, PlusCircle, ExternalLink, ThumbsUp } from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  author: {
    name: string;
    avatar: string;
  };
  subject: string;
  topic: string;
  dateCreated: string;
  replies: number;
  participants: number;
  lastActive: string;
  tags: string[];
}

const mockForumPosts: ForumPost[] = [
  {
    id: "p1",
    title: "Understanding Integration by Parts for JEE Advanced",
    author: {
      name: "Ananya Singh",
      avatar: "/lovable-uploads/2a3b330c-09e1-40bd-b9bd-85ecb5cc394a.png",
    },
    subject: "Mathematics",
    topic: "Calculus",
    dateCreated: "2023-06-15",
    replies: 24,
    participants: 8,
    lastActive: "2023-06-18",
    tags: ["JEE", "Mathematics", "Calculus", "Integration"]
  },
  {
    id: "p2",
    title: "Solving Complex Chemical Equilibrium Problems",
    author: {
      name: "Rahul Gupta",
      avatar: "/lovable-uploads/26a404be-3145-4a01-9204-8e74a5984c36.png",
    },
    subject: "Chemistry",
    topic: "Chemical Equilibrium",
    dateCreated: "2023-06-14",
    replies: 16,
    participants: 5,
    lastActive: "2023-06-17",
    tags: ["NEET", "Chemistry", "Equilibrium"]
  },
  {
    id: "p3",
    title: "Strategies for Modern Indian History Questions in UPSC",
    author: {
      name: "Vikram Dhawan",
      avatar: "/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png",
    },
    subject: "History",
    topic: "Modern India",
    dateCreated: "2023-06-12",
    replies: 32,
    participants: 12,
    lastActive: "2023-06-18",
    tags: ["UPSC", "History", "Modern India"]
  }
];

const CollaborativeForumSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const filteredPosts = mockForumPosts.filter(post => {
    if (activeTab === "my-discussions" || activeTab === "invited") {
      return false;
    }
    
    if (selectedSubject && post.subject !== selectedSubject) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return post.title.toLowerCase().includes(query) || 
        post.topic.toLowerCase().includes(query) || 
        post.tags.some(tag => tag.toLowerCase().includes(query));
    }
    
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Collaborative Forums</h2>
          <p className="text-muted-foreground">
            Join study groups and discuss with peers preparing for similar exams.
            <Badge variant="premium" className="ml-2">Premium</Badge>
          </p>
        </div>
        <Button 
          className="gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white"
          onClick={() => setShowCreateForm(true)}
        >
          <PlusCircle size={16} />
          Create Discussion
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6 w-full md:w-[400px]">
          <TabsTrigger value="all">All Discussions</TabsTrigger>
          <TabsTrigger value="my-discussions">My Discussions</TabsTrigger>
          <TabsTrigger value="invited">Invited</TabsTrigger>
        </TabsList>

        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Search discussions..."
            className="w-full md:flex-1" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Subjects</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Biology">Biology</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Geography">Geography</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all" className="space-y-4 mt-0">
          {showCreateForm ? (
            <Card>
              <CardHeader>
                <CardTitle>Create New Discussion</CardTitle>
                <CardDescription>Start a collaborative discussion with your peers</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Input placeholder="Discussion title" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="geography">Geography</SelectItem>
                      </SelectContent>
                    </Select>

                    <Input placeholder="Topic (e.g. Vectors, Organic Chemistry)" />
                  </div>

                  <div className="space-y-2">
                    <Textarea 
                      placeholder="Describe what you want to discuss..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Input placeholder="Add participants (comma separated user IDs)" />
                    <p className="text-xs text-muted-foreground">
                      Enter the user IDs of people you want to invite
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Input placeholder="Add tags (comma separated)" />
                    <p className="text-xs text-muted-foreground">
                      Example: JEE, Mathematics, Calculus
                    </p>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                <Button className="bg-gradient-to-r from-violet-600 to-purple-600">
                  Create Discussion
                </Button>
              </CardFooter>
            </Card>
          ) : filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg font-medium">{post.title}</CardTitle>
                    <Badge variant="outline" className="ml-2">{post.subject}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{post.author.name}</span>
                    <span className="text-muted-foreground">• {post.topic}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <Badge variant="secondary" key={tag} className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{post.participants} participants</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      <span>{post.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>Created {post.dateCreated}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 ml-auto">
                    <ExternalLink size={14} className="mr-1" />
                    Join Discussion
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-6">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <h3 className="text-lg font-medium mb-1">No discussions found</h3>
                  <p className="text-muted-foreground mb-4">No discussions match your search criteria</p>
                  <Button 
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSubject('');
                    }}
                    variant="outline"
                  >
                    Clear filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="my-discussions">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <h3 className="text-lg font-medium mb-1">No discussions created</h3>
                <p className="text-muted-foreground mb-4">You haven't created any discussions yet</p>
                <Button 
                  className="bg-gradient-to-r from-violet-600 to-purple-600"
                  onClick={() => setShowCreateForm(true)}
                >
                  Create Your First Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invited">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <h3 className="text-lg font-medium mb-1">No invitations</h3>
                <p className="text-muted-foreground mb-4">You haven't been invited to any discussions yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Popular Topics This Week</h3>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="rounded-full">
            <ThumbsUp size={14} className="mr-1 text-violet-600" />
            JEE Mathematics
          </Button>
          <Button variant="outline" className="rounded-full">
            <ThumbsUp size={14} className="mr-1 text-violet-600" />
            NEET Biology
          </Button>
          <Button variant="outline" className="rounded-full">
            <ThumbsUp size={14} className="mr-1 text-violet-600" />
            UPSC Current Affairs
          </Button>
          <Button variant="outline" className="rounded-full">
            <ThumbsUp size={14} className="mr-1 text-violet-600" />
            Banking Exam Quantitative Aptitude
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeForumSection;
