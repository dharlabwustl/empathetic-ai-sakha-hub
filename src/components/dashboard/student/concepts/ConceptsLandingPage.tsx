import React from 'react';
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, BookOpen, FileText, Award, Clock, BarChart2, Bookmark, PenTool, Layers } from "lucide-react";

const ConceptsLandingPage: React.FC = () => {
  // State and handlers for your concept cards functionality
  
  return (
    <SharedPageLayout 
      title="Concept Cards" 
      subtitle="Explore, learn, and master key concepts with interactive concept cards"
      showBackButton={false}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Your Concept Library</h2>
            <p className="text-muted-foreground">Deepen your understanding with our comprehensive concept cards</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Filter</Button>
            <Button>Browse All Concepts</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All Concepts</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="mastered">Mastered</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample concept cards with enhanced features */}
              <ConceptCard 
                title="Newton's Laws of Motion"
                subject="Physics"
                masteryScore={85}
                lastReviewed="2 days ago"
                progressStats={{
                  accuracyRate: 92,
                  timeSpent: "45 min",
                  retentionScore: 87
                }}
              />
              
              <ConceptCard 
                title="Chemical Bonding"
                subject="Chemistry"
                masteryScore={72}
                lastReviewed="5 days ago"
                progressStats={{
                  accuracyRate: 68,
                  timeSpent: "35 min",
                  retentionScore: 65
                }}
              />
              
              <ConceptCard 
                title="Cell Division"
                subject="Biology"
                masteryScore={79}
                lastReviewed="1 week ago"
                progressStats={{
                  accuracyRate: 75,
                  timeSpent: "50 min",
                  retentionScore: 72
                }}
              />
            </div>
            
            {/* Concept Progress Analytics Section */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress Overview</CardTitle>
                <CardDescription>Track your concept mastery and retention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Overall Concept Mastery</div>
                    <div className="text-2xl font-bold">78%</div>
                    <div className="h-2 bg-muted rounded-full">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-violet-600 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Concepts Reviewed This Week</div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-green-600">+3 from last week</div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium text-muted-foreground">Due for Revision</div>
                    <div className="text-2xl font-bold">5</div>
                    <div className="text-xs text-amber-600">Review recommended today</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Smart Recommendations Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Recommended for You</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <RecommendationCard 
                  title="Quantum Numbers & Atomic Structure"
                  reason="Related to your recently studied concepts"
                  icon={<Layers className="h-5 w-5" />}
                />
                <RecommendationCard 
                  title="Law of Conservation of Momentum"
                  reason="Builds on Newton's Laws of Motion"
                  icon={<BookOpen className="h-5 w-5" />}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Other tab contents */}
          <TabsContent value="in-progress">
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Your in-progress concepts will appear here</h3>
              <p>Start studying to see your progress tracked!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="mastered">
            <div className="text-center py-12 text-muted-foreground">
              <Award className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Your mastered concepts will appear here</h3>
              <p>Complete concept studies to mark them as mastered!</p>
            </div>
          </TabsContent>
          
          <TabsContent value="bookmarked">
            <div className="text-center py-12 text-muted-foreground">
              <Bookmark className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Your bookmarked concepts will appear here</h3>
              <p>Bookmark important concepts to find them quickly later!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

// Helper component for concept cards with enhanced features
interface ConceptCardProps {
  title: string;
  subject: string;
  masteryScore: number;
  lastReviewed: string;
  progressStats: {
    accuracyRate: number;
    timeSpent: string;
    retentionScore: number;
  };
}

const ConceptCard: React.FC<ConceptCardProps> = ({ 
  title, 
  subject, 
  masteryScore, 
  lastReviewed,
  progressStats 
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all">
      <div className="h-2 bg-gradient-to-r from-purple-500 to-violet-600"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{subject}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Mastery</span>
            <div className="flex items-center">
              <span className="text-lg font-bold">{masteryScore}%</span>
              {masteryScore >= 80 && (
                <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
              )}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-muted-foreground">Last Reviewed</span>
            <span className="text-sm">{lastReviewed}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2 text-xs border-t pt-2">
            <div className="flex flex-col items-center">
              <BarChart2 className="h-3 w-3 mb-1 text-purple-500" />
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-medium">{progressStats.accuracyRate}%</span>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-3 w-3 mb-1 text-purple-500" />
              <span className="text-muted-foreground">Time Spent</span>
              <span className="font-medium">{progressStats.timeSpent}</span>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-3 w-3 mb-1 text-purple-500" />
              <span className="text-muted-foreground">Retention</span>
              <span className="font-medium">{progressStats.retentionScore}%</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between pt-2">
          <Button variant="outline" size="sm" className="text-xs h-8">
            <FileText className="h-3 w-3 mr-1" />
            Study
          </Button>
          <Button variant="outline" size="sm" className="text-xs h-8">
            <PenTool className="h-3 w-3 mr-1" />
            Add Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper component for recommendation cards
interface RecommendationCardProps {
  title: string;
  reason: string;
  icon: React.ReactNode;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ title, reason, icon }) => {
  return (
    <Card className="overflow-hidden border-dashed hover:border-purple-300 hover:bg-purple-50/30 transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="bg-purple-100 p-2 rounded-md">
            {icon}
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>{reason}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" className="w-full justify-start text-purple-600">
          <BookOpen className="h-4 w-4 mr-2" />
          Explore this concept
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConceptsLandingPage;
