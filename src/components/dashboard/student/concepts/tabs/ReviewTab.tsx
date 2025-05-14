
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Review {
  id: string;
  user: {
    name: string;
    avatar?: string;
  };
  rating: number;
  comment: string;
  date: string;
}

const ReviewTab: React.FC = () => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  
  // Sample reviews
  const reviews: Review[] = [
    {
      id: "1",
      user: {
        name: "Rahul M.",
        avatar: "/assets/avatars/user1.jpg"
      },
      rating: 5,
      comment: "This concept explanation was incredibly clear. The animations in the video really helped me understand the applications.",
      date: "2 weeks ago"
    },
    {
      id: "2",
      user: {
        name: "Priya S."
      },
      rating: 4,
      comment: "Good explanation, but could use more practice problems for reinforcement.",
      date: "1 month ago"
    },
    {
      id: "3",
      user: {
        name: "Aditya R.",
        avatar: "/assets/avatars/user3.jpg"
      },
      rating: 5,
      comment: "The video explanation was perfect. I was struggling with this concept for weeks, and now it makes complete sense!",
      date: "2 months ago"
    }
  ];
  
  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };
  
  const handleSubmitReview = () => {
    alert(`Review submitted with rating ${userRating} and comment: ${userReview}`);
    setUserRating(0);
    setUserReview("");
  };
  
  // Star rating component
  const StarRating = ({ rating, clickable = false, onRate, onHover, onLeave }: any) => {
    return (
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => clickable && onRate(i + 1)}
            onMouseEnter={() => clickable && onHover(i + 1)}
            onMouseLeave={() => clickable && onLeave()}
            className={`${clickable ? 'cursor-pointer' : ''} p-0 m-0 bg-transparent border-none`}
          >
            <StarIcon
              className={`${
                i < rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              } h-5 w-5`}
            />
          </button>
        ))}
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      {/* Summary of ratings */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Concept Rating</h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                <StarRating rating={averageRating} />
                <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm">Helpfulness</div>
              <div className="text-lg font-medium text-green-600">95%</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Write a review */}
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-3">Write a Review</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Your Rating</label>
                <div className="text-sm text-muted-foreground">
                  {userRating > 0 ? `${userRating}/5` : "Click to rate"}
                </div>
              </div>
              <StarRating 
                rating={hoverRating || userRating} 
                clickable={true}
                onRate={handleRatingClick}
                onHover={setHoverRating}
                onLeave={() => setHoverRating(0)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Review (Optional)</label>
              <Textarea
                placeholder="Share your experience with this concept..."
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSubmitReview}
                disabled={userRating === 0}
              >
                Submit Review
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* List of reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Student Reviews</h3>
        
        {reviews.map((review) => (
          <Card key={review.id} className="border shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{review.user.name}</p>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>
                  <div className="flex items-center">
                    <StarRating rating={review.rating} />
                    <span className="ml-2 text-xs font-medium">{review.rating}/5</span>
                  </div>
                  <p className="text-sm mt-2">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="flex justify-center">
          <Button variant="outline">Load More Reviews</Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewTab;
