
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, Clock, Calendar, Search, Tag, Play, ThumbsUp, List, Grid } from "lucide-react";

interface VideoResource {
  id: string;
  title: string;
  subject: string;
  topic: string;
  duration: string;
  thumbnail: string;
  dateAdded: string;
  source: string;
  tags: string[];
  views: number;
  rating: number;
}

const mockVideos: VideoResource[] = [
  {
    id: "v1",
    title: "JEE Advanced: Vector Calculus - Complete Concept Overview",
    subject: "Mathematics",
    topic: "Vector Calculus",
    duration: "45:20",
    thumbnail: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=600&h=400&fit=crop",
    dateAdded: "2023-05-20",
    source: "Expert Faculty",
    tags: ["JEE Advanced", "Mathematics", "Vector Calculus", "Recommended"],
    views: 1240,
    rating: 4.8
  },
  {
    id: "v2",
    title: "Understanding Organic Chemistry Mechanisms for NEET",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    duration: "56:10",
    thumbnail: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=600&h=400&fit=crop",
    dateAdded: "2023-05-18",
    source: "Expert Faculty",
    tags: ["NEET", "Chemistry", "Organic Chemistry", "Mechanisms"],
    views: 980,
    rating: 4.7
  },
  {
    id: "v3",
    title: "UPSC Prelims: Indian Polity and Constitution Complete Overview",
    subject: "Political Science",
    topic: "Indian Polity",
    duration: "1:23:45",
    thumbnail: "https://images.unsplash.com/photo-1568411859245-4457cfa37260?w=600&h=400&fit=crop",
    dateAdded: "2023-05-15",
    source: "Top Educator",
    tags: ["UPSC", "Political Science", "Indian Polity", "Constitution"],
    views: 2100,
    rating: 4.9
  },
  {
    id: "v4",
    title: "Banking Exams: Quantitative Aptitude Shortcuts",
    subject: "Quantitative Aptitude",
    topic: "Number Series",
    duration: "38:15",
    thumbnail: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
    dateAdded: "2023-05-12",
    source: "Banking Expert",
    tags: ["Banking Exams", "Quantitative Aptitude", "Shortcuts", "Number Series"],
    views: 1560,
    rating: 4.6
  }
];

const VideoLibrarySection = () => {
  const [activeTab, setActiveTab] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const filteredVideos = mockVideos.filter(video => {
    if (selectedSubject && video.subject !== selectedSubject) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return video.title.toLowerCase().includes(query) || 
        video.topic.toLowerCase().includes(query) || 
        video.tags.some(tag => tag.toLowerCase().includes(query));
    }
    
    if (activeTab === "recommended") {
      return video.tags.includes("Recommended");
    }
    
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Video Library</h2>
          <p className="text-muted-foreground">
            Access curated video resources for your exam preparation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className={viewMode === "grid" ? "bg-slate-100" : ""}
            onClick={() => setViewMode("grid")}
          >
            <Grid size={16} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={viewMode === "list" ? "bg-slate-100" : ""}
            onClick={() => setViewMode("list")}
          >
            <List size={16} />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="recommended" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6 w-full md:w-[400px]">
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="watched">Watched</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <div className="flex flex-wrap gap-4 mb-6">
          <Input
            placeholder="Search videos..."
            className="w-full md:flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={18} />}
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
              <SelectItem value="Political Science">Political Science</SelectItem>
              <SelectItem value="Quantitative Aptitude">Quantitative Aptitude</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="recommended" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="object-cover w-full h-full" 
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                        <Play className="h-8 w-8 text-violet-700" />
                      </Button>
                    </div>
                    <Badge className="absolute top-2 right-2 bg-violet-600">{video.duration}</Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg leading-tight">{video.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <BookOpen size={14} />
                      <span>{video.subject} - {video.topic}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {video.tags.slice(0, 2).map((tag) => (
                        <Badge variant="outline" key={tag} className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {video.tags.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{video.tags.length - 2} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{video.dateAdded}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={14} />
                        <span>{video.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="outline" className="w-full text-violet-600 hover:bg-violet-50">
                      Watch Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-sm transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative md:w-64 aspect-video">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="object-cover w-full h-full" 
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                          <Play className="h-8 w-8 text-violet-700" />
                        </Button>
                      </div>
                      <Badge className="absolute top-2 right-2 bg-violet-600">{video.duration}</Badge>
                    </div>
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-medium mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{video.subject} - {video.topic}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {video.tags.map((tag) => (
                          <Badge variant="outline" key={tag} className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{video.dateAdded}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp size={14} />
                          <span>{video.rating}</span>
                        </div>
                        <div className="ml-auto">
                          <Button variant="outline" size="sm" className="text-violet-600 hover:bg-violet-50">
                            Watch Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {filteredVideos.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-6">
                  <Video className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                  <h3 className="text-lg font-medium mb-1">No videos found</h3>
                  <p className="text-muted-foreground mb-4">No videos match your search criteria</p>
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

        <TabsContent value="all">
          {/* Similar content as recommended tab */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <h3 className="text-lg font-medium mb-1">All videos</h3>
                <p className="text-muted-foreground mb-4">Browse all available videos</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="watched">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <h3 className="text-lg font-medium mb-1">No watched videos</h3>
                <p className="text-muted-foreground mb-4">Videos you've watched will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-6">
                <Video className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                <h3 className="text-lg font-medium mb-1">No saved videos</h3>
                <p className="text-muted-foreground mb-4">Videos you save will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Recently Added</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockVideos.slice(0, 4).map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative aspect-video">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="object-cover w-full h-full" 
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button variant="secondary" size="icon" className="rounded-full bg-white/80 hover:bg-white">
                    <Play className="h-6 w-6 text-violet-700" />
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2 bg-violet-600">{video.duration}</Badge>
              </div>
              <CardContent className="p-3">
                <h4 className="font-medium line-clamp-2 mb-1">{video.title}</h4>
                <p className="text-xs text-muted-foreground">{video.subject}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoLibrarySection;
