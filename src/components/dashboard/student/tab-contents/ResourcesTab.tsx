import React from 'react';
import { UserProfileType, SubscriptionType } from '@/types/user/base';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceItem {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'pdf' | 'video' | 'article';
  isPremium: boolean;
}

const mockResources: ResourceItem[] = [
  {
    id: '1',
    title: 'Mastering Calculus - PDF',
    description: 'Comprehensive guide to calculus with examples.',
    url: '#',
    type: 'pdf',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Quantum Physics Explained - Video',
    description: 'A simplified explanation of quantum physics concepts.',
    url: '#',
    type: 'video',
    isPremium: true,
  },
  {
    id: '3',
    title: 'The Art of Programming - Article',
    description: 'An insightful article on becoming a better programmer.',
    url: '#',
    type: 'article',
    isPremium: false,
  },
  {
    id: '4',
    title: 'Advanced Algorithms - PDF',
    description: 'In-depth analysis of advanced algorithm techniques.',
    url: '#',
    type: 'pdf',
    isPremium: true,
  },
  {
    id: '5',
    title: 'Effective Study Habits - Video',
    description: 'Proven strategies for more effective studying.',
    url: '#',
    type: 'video',
    isPremium: false,
  },
  {
    id: '6',
    title: 'Stock Market Investing - Article',
    description: 'Learn the basics of investing in the stock market.',
    url: '#',
    type: 'article',
    isPremium: true,
  },
];

interface ResourcesTabProps {
  userProfile: UserProfileType;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ userProfile }) => {
  const userSubscription = userProfile.subscription?.planName || 'Free';

  // Function to determine if a resource is premium and the user does not have access
  const isPremiumResource = (resource, userSubscription) => {
    if (!resource.isPremium) return false;
    
    // Check if user has premium subscription
    return !(userSubscription === SubscriptionType.Premium.toString() ||
      userSubscription === SubscriptionType.Enterprise.toString());
  };

  const canAccessStudyMaterial = (userSubscription) => {
    return userSubscription === SubscriptionType.Premium.toString() ||
      userSubscription === SubscriptionType.Enterprise.toString();
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Study Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockResources.map((resource) => (
            <div key={resource.id} className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">{resource.title}</h3>
                <p className="text-xs text-muted-foreground">{resource.description}</p>
              </div>
              <div>
                {isPremiumResource(resource, userSubscription) ? (
                  <Badge variant="secondary" className="ml-2">
                    <Lock className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                ) : (
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Resources</CardTitle>
        </CardHeader>
        <CardContent>
          {canAccessStudyMaterial(userSubscription) ? (
            <p>Access granted to premium study materials!</p>
          ) : (
            <p>Upgrade to Premium to unlock more resources.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourcesTab;
