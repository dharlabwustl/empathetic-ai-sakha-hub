
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Plus, 
  Star, 
  FileText, 
  Check, 
  Clock, 
  ArrowRight,
  BarChart 
} from 'lucide-react';
import { useStudyGroups } from '../hooks/useStudyGroups';

interface PeerReviewsProps {
  groupId: string;
}

interface ReviewItem {
  id: string;
  title: string;
  description: string;
  submittedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  submittedAt: Date;
  type: 'essay' | 'answer' | 'notes' | 'other';
  status: 'pending' | 'reviewed';
  reviews?: Array<{
    reviewerId: string;
    reviewerName: string;
    reviewerAvatar?: string;
    rating: number;
    comment: string;
    submittedAt: Date;
  }>;
}

const PeerReviews: React.FC<PeerReviewsProps> = ({ groupId }) => {
  const [activeTab, setActiveTab] = useState('pending');
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchPeerReviews } = useStudyGroups();

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const fetchedReviews = await fetchPeerReviews(groupId);
        setReviewItems(fetchedReviews);
      } catch (error) {
        console.error('Failed to load peer reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [groupId, fetchPeerReviews]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const pendingReviews = reviewItems.filter(item => item.status === 'pending');
  const completedReviews = reviewItems.filter(item => item.status === 'reviewed');

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Star className="h-5 w-5" />
          Peer Reviews
        </h2>
        <Button className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          Submit for Review
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab as any}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="pending" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Pending Reviews ({pendingReviews.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            Completed ({completedReviews.length})
          </TabsTrigger>
          <TabsTrigger value="stats" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {pendingReviews.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Clock size={48} strokeWidth={1.5} />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No pending reviews</h3>
              <p className="mt-1 text-sm text-gray-500">
                Great! You've reviewed all the submissions
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingReviews.map(item => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        {item.type === 'essay' ? 'Essay' : 
                         item.type === 'answer' ? 'Answer' :
                         item.type === 'notes' ? 'Notes' : 'Other'}
                      </Badge>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
                        Needs Review
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={item.submittedBy.avatar} alt={item.submittedBy.name} />
                        <AvatarFallback>{item.submittedBy.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{item.submittedBy.name}</span>
                      <span className="text-gray-400">•</span>
                      <span>{new Date(item.submittedAt).toLocaleDateString()}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                      Review Submission
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedReviews.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-100">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <Check size={48} strokeWidth={1.5} />
              </div>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No completed reviews yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Reviews will appear here once they've been completed
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedReviews.map(item => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-200">
                        {item.type === 'essay' ? 'Essay' : 
                         item.type === 'answer' ? 'Answer' :
                         item.type === 'notes' ? 'Notes' : 'Other'}
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">
                        Reviewed
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{item.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src={item.submittedBy.avatar} alt={item.submittedBy.name} />
                        <AvatarFallback>{item.submittedBy.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{item.submittedBy.name}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    
                    {item.reviews && item.reviews.length > 0 && (
                      <div className="space-y-2 mt-4 pt-3 border-t">
                        <h4 className="text-sm font-medium">Reviews ({item.reviews.length})</h4>
                        {item.reviews.slice(0, 2).map((review, index) => (
                          <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="h-5 w-5">
                                <AvatarImage src={review.reviewerAvatar} alt={review.reviewerName} />
                                <AvatarFallback>{review.reviewerName[0]}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{review.reviewerName}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`h-3 w-3 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-1">
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Review Statistics</CardTitle>
              <CardDescription>Your peer review performance and contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Reviews Provided</p>
                      <p className="text-4xl font-bold">12</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Avg. Rating Given</p>
                      <p className="text-4xl font-bold">4.2</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Your Submissions</p>
                      <p className="text-4xl font-bold">5</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Avg. Rating Received</p>
                      <p className="text-4xl font-bold">4.7</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PeerReviews;
