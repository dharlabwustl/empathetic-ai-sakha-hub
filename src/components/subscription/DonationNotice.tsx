
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, School, BookOpen } from 'lucide-react';

interface DonationNoticeProps {
  variant?: 'compact' | 'full';
}

const DonationNotice: React.FC<DonationNoticeProps> = ({ variant = 'full' }) => {
  const handleDonate = () => {
    // This would link to a donation platform in a real implementation
    window.open('https://example.com/donate', '_blank');
  };

  if (variant === 'compact') {
    return (
      <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md text-sm border border-amber-100 dark:border-amber-800/30">
        <div className="flex items-center gap-1 mb-1">
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span className="font-medium text-amber-800 dark:text-amber-300">Support PREPZR</span>
        </div>
        <p className="text-amber-700 dark:text-amber-300/80 text-xs mb-2">
          Your donation helps us provide free education tools to students worldwide.
        </p>
        <Button size="sm" variant="outline" className="w-full text-xs bg-white dark:bg-gray-900" onClick={handleDonate}>
          Donate Now
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          Support Our Mission
        </CardTitle>
        <CardDescription>
          Help us make quality education accessible to all
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          PREPZR is committed to providing free exam preparation tools to students worldwide. Your donation helps us:
        </p>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-2">
            <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
              <School className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Support Education</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Provide free access to students who can't afford paid resources</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="p-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30">
              <BookOpen className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Develop Content</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Create high-quality educational content and resources</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
              <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="text-sm font-medium">Reach More Students</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Expand our reach to underserved communities</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleDonate}>
          <Heart className="h-4 w-4 mr-2" /> Donate Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DonationNotice;
