
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { UserProfileType, SubscriptionType } from "@/types/user/base";
import { FileText, Book, Video, Download, Search, BookOpen, Clock, Crown, Lock, ArrowRight } from "lucide-react";

interface ResourcesTabProps {
  userProfile: UserProfileType;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ userProfile }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('materials');
  
  // Sample study materials
  const materials = [
    {
      id: "mat-1",
      title: "Complete JEE Physics Formula Sheet",
      type: "pdf",
      size: "2.4 MB",
      downloads: 1245,
      rating: 4.8,
      subject: "Physics",
      isPremium: false
    },
    {
      id: "mat-2",
      title: "Organic Chemistry Reaction Mechanisms",
      type: "pdf",
      size: "3.8 MB",
      downloads: 982,
      rating: 4.6,
      subject: "Chemistry",
      isPremium: true
    },
    {
      id: "mat-3",
      title: "Integration Techniques Cheat Sheet",
      type: "pdf",
      size: "1.2 MB",
      downloads: 1856,
      rating: 4.9,
      subject: "Mathematics",
      isPremium: false
    },
    {
      id: "mat-4",
      title: "Thermodynamics Comprehensive Notes",
      type: "pdf",
      size: "5.1 MB",
      downloads: 728,
      rating: 4.7,
      subject: "Physics",
      isPremium: true
    }
  ];
  
  // Sample video lectures
  const videos = [
    {
      id: "vid-1",
      title: "Understanding Vectors and Scalars",
      duration: "45 min",
      instructor: "Dr. Rajesh Sharma",
      views: 15420,
      subject: "Physics",
      thumbnail: "/thumbnails/physics-vectors.jpg",
      isPremium: false
    },
    {
      id: "vid-2",
      title: "Solving Complex Integration Problems",
      duration: "62 min",
      instructor: "Prof. Ananya Gupta",
      views: 9876,
      subject: "Mathematics",
      thumbnail: "/thumbnails/math-integration.jpg",
      isPremium: true
    },
    {
      id: "vid-3",
      title: "Periodic Table and Element Properties",
      duration: "58 min",
      instructor: "Dr. Vikram Reddy",
      views: 12543,
      subject: "Chemistry",
      thumbnail: "/thumbnails/chemistry-periodic.jpg",
      isPremium: false
    },
    {
      id: "vid-4",
      title: "Mechanics: Newton's Laws of Motion",
      duration: "72 min",
      instructor: "Dr. Rajesh Sharma",
      views: 18965,
      subject: "Physics",
      thumbnail: "/thumbnails/physics-newton.jpg",
      isPremium: true
    }
  ];
  
  // Sample practice books
  const books = [
    {
      id: "book-1",
      title: "HC Verma: Concepts of Physics Vol. 1",
      author: "H.C. Verma",
      pages: 624,
      rating: 4.9,
      subject: "Physics",
      cover: "/covers/hcverma-vol1.jpg",
      isPremium: false
    },
    {
      id: "book-2",
      title: "Problems in Physical Chemistry for JEE",
      author: "Narendra Awasthi",
      pages: 542,
      rating: 4.8,
      subject: "Chemistry",
      cover: "/covers/narendra-chemistry.jpg",
      isPremium: true
    },
    {
      id: "book-3",
      title: "Objective Mathematics for JEE Main & Advanced",
      author: "R.D. Sharma",
      pages: 876,
      rating: 4.7,
      subject: "Mathematics",
      cover: "/covers/rdshama-math.jpg",
      isPremium: false
    },
    {
      id: "book-4",
      title: "Modern Approach to Chemical Calculations",
      author: "R.C. Mukherjee",
      pages: 498,
      rating: 4.6,
      subject: "Chemistry",
      cover: "/covers/rcmukherjee-chem.jpg",
      isPremium: true
    }
  ];
  
  // Helper function to determine if user has premium access
  const hasPremiumAccess = () => {
    if (!userProfile.subscription) return false;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.plan !== SubscriptionType.Free && 
             userProfile.subscription.plan !== SubscriptionType.Basic;
    }
    
    return userProfile.subscription !== SubscriptionType.Free && 
           userProfile.subscription !== SubscriptionType.Basic;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Learning Resources</h2>
          <p className="text-muted-foreground">Access study materials, video lectures and practice books</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="materials">Study Materials</TabsTrigger>
          <TabsTrigger value="videos">Video Lectures</TabsTrigger>
          <TabsTrigger value="books">Practice Books</TabsTrigger>
        </TabsList>
        
        <TabsContent value="materials" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {materials.map((material) => (
              <Card key={material.id} className={material.isPremium && !hasPremiumAccess() ? 'opacity-70' : ''}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-base flex items-center">
                          {material.title}
                          {material.isPremium && (
                            <Badge variant="outline" className="ml-2 text-xs bg-amber-100 text-amber-700 border-amber-200">
                              <Crown className="h-3 w-3 mr-1 text-amber-500" />
                              Premium
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-xs">{material.type.toUpperCase()} • {material.size}</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2 pt-0">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs">Subject</div>
                      <div className="font-medium">{material.subject}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Downloads</div>
                      <div className="font-medium">{material.downloads.toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  {material.isPremium && !hasPremiumAccess() ? (
                    <Button disabled className="w-full text-xs flex gap-2 items-center">
                      <Lock className="h-3.5 w-3.5" />
                      Upgrade to Download
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full text-xs">
                      <Download className="h-3.5 w-3.5 mr-1" />
                      Download
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline" className="w-full md:w-auto">
              View All Study Materials
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            {videos.map((video) => (
              <Card key={video.id} className={video.isPremium && !hasPremiumAccess() ? 'opacity-70' : ''}>
                <div className="relative">
                  <div className="h-40 bg-gray-100 dark:bg-gray-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-3xl text-gray-400">📺</div>
                    </div>
                    {video.isPremium && !hasPremiumAccess() && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="h-8 w-8 text-white mx-auto mb-2" />
                          <p className="text-white font-medium">Premium Video</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 text-xs rounded-md flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {video.duration}
                    </div>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base flex items-center">
                        {video.title}
                        {video.isPremium && (
                          <Badge variant="outline" className="ml-2 text-xs bg-amber-100 text-amber-700 border-amber-200">
                            <Crown className="h-3 w-3 mr-1 text-amber-500" />
                            Premium
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-xs">{video.instructor}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pb-2 pt-0">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-muted-foreground text-xs">Subject</div>
                      <div className="font-medium">{video.subject}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs">Views</div>
                      <div className="font-medium">{video.views.toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter>
                  {video.isPremium && !hasPremiumAccess() ? (
                    <Button disabled className="w-full text-xs flex gap-2 items-center">
                      <Lock className="h-3.5 w-3.5" />
                      Upgrade to Watch
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full text-xs">
                      <Video className="h-3.5 w-3.5 mr-1" />
                      Watch Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline" className="w-full md:w-auto">
              View All Video Lectures
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="books" className="mt-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {books.map((book) => (
              <Card key={book.id} className={`overflow-hidden ${book.isPremium && !hasPremiumAccess() ? 'opacity-70' : ''}`}>
                <div className="relative h-44 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <div className="text-5xl">📚</div>
                  {book.isPremium && !hasPremiumAccess() && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center">
                        <Lock className="h-6 w-6 text-white mx-auto mb-1" />
                        <p className="text-white text-sm font-medium">Premium</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm line-clamp-2">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{book.author}</p>
                    </div>
                    {book.isPremium && (
                      <Badge variant="outline" className="text-xs bg-amber-100 text-amber-700 border-amber-200">
                        <Crown className="h-3 w-3 mr-1 text-amber-500" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <div className="text-xs">
                      <div className="text-muted-foreground">Subject</div>
                      <div className="font-medium">{book.subject}</div>
                    </div>
                    <div className="text-xs">
                      <div className="text-muted-foreground">Pages</div>
                      <div className="font-medium">{book.pages}</div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0">
                  {book.isPremium && !hasPremiumAccess() ? (
                    <Button disabled className="w-full text-xs flex gap-2 items-center">
                      <Lock className="h-3.5 w-3.5" />
                      Upgrade to Access
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full text-xs">
                      <BookOpen className="h-3.5 w-3.5 mr-1" />
                      Read Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline" className="w-full md:w-auto">
              View All Books
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border-purple-100 dark:border-purple-900/50">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium text-purple-900 dark:text-purple-300">Access All Premium Resources</h3>
            <p className="text-sm text-purple-700 dark:text-purple-400">Upgrade your subscription to unlock all premium study materials, video lectures and practice books</p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade Now
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
