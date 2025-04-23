
import React from 'react';
import { UserProfileType } from '@/types/user/base';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ProfileDetailsSectionProps {
  userProfile: UserProfileType;
  onEdit?: () => void;
  onUpdateProfile?: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({ userProfile, onEdit, onUpdateProfile }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </div>
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" /> Edit
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
              <Label className="text-xs text-muted-foreground">Phone Number</Label>
              <div className="font-medium">{userProfile.personalDetails?.phoneNumber || userProfile.phoneNumber || 'Not provided'}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">City</Label>
              <div className="font-medium">{userProfile.personalDetails?.city || 'Not provided'}</div>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">State</Label>
              <div className="font-medium">{userProfile.personalDetails?.state || 'Not provided'}</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">School/College</Label>
              <div className="font-medium">{userProfile.personalDetails?.school || 'Not provided'}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Grade/Year</Label>
              <div className="font-medium">{userProfile.personalDetails?.grade || 'Not provided'}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Board</Label>
              <div className="font-medium">{userProfile.personalDetails?.board || 'Not provided'}</div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Member Since</Label>
              <div className="font-medium">
                {userProfile.createdAt 
                  ? new Date(userProfile.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                  : 'Unknown'
                }
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetailsSection;
