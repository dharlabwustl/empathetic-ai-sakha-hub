
import React from 'react';
import { UserProfileType } from '@/types/user/base';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ProfileDetailsSectionProps {
  userProfile: UserProfileType;
  onEdit?: () => void;
}

const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({ userProfile, onEdit }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your profile details</CardDescription>
        </div>
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" /> Edit Profile
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Full Name</Label>
              <div className="font-medium">{userProfile.name}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Email</Label>
              <div className="font-medium">{userProfile.email}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Phone</Label>
              <div className="font-medium">{userProfile.personalDetails?.phone || userProfile.personalDetails?.phoneNumber || 'Not provided'}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Address</Label>
              <div className="font-medium">{userProfile.personalDetails?.address || 'Not provided'}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Date of Birth</Label>
              <div className="font-medium">{userProfile.personalDetails?.dateOfBirth || 'Not provided'}</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Bio</Label>
              <div className="font-medium">{userProfile.personalDetails?.bio || 'No bio provided'}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">School</Label>
              <div className="font-medium">{userProfile.personalDetails?.school || 'Not provided'}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Grade</Label>
              <div className="font-medium">{userProfile.personalDetails?.grade || 'Not provided'}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Interests</Label>
              <div className="font-medium">
                {userProfile.personalDetails?.interests && userProfile.personalDetails.interests.length > 0 
                  ? userProfile.personalDetails.interests.join(', ') 
                  : 'None specified'}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsSection;
