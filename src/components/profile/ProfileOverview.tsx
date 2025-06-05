
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Calendar } from 'lucide-react';

interface ProfileOverviewProps {
  userProfile: any;
  onUpdateProfile: (updates: any) => void;
}

export const ProfileOverview = ({ userProfile, onUpdateProfile }: ProfileOverviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={userProfile.avatar} />
            <AvatarFallback>{userProfile.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">{userProfile.name}</h3>
            <p className="text-gray-600">{userProfile.email}</p>
            <Badge variant="secondary" className="mt-1">
              {userProfile.subscription?.planType || 'Free Plan'}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{userProfile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{userProfile.phone || 'Not provided'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Joined {new Date(userProfile.createdAt || Date.now()).toLocaleDateString()}</span>
          </div>
        </div>
        
        <Button variant="outline" onClick={() => onUpdateProfile({})}>
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};
