
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserProfileType } from '@/types/user/base';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

interface ProfileDetailsSectionProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: userProfile.personalInfo?.firstName || userProfile.name?.split(' ')[0] || '',
      lastName: userProfile.personalInfo?.lastName || userProfile.name?.split(' ')?.[1] || '',
      dob: userProfile.personalInfo?.dob || '',
      gender: userProfile.personalInfo?.gender || '',
      occupation: userProfile.personalInfo?.occupation || 'Student',
      location: userProfile.personalInfo?.location || userProfile.location || '',
    },
    contactInfo: {
      phoneNumber: userProfile.personalInfo?.phoneNumber || userProfile.phoneNumber || '',
      email: userProfile.email || '',
      city: userProfile.personalInfo?.city || '',
      state: userProfile.personalInfo?.state || '',
      address: '',
    },
    educationInfo: {
      school: userProfile.personalInfo?.school || '',
      grade: userProfile.personalInfo?.grade || '',
      board: userProfile.personalInfo?.board || '',
    }
  });

  const { toast } = useToast();

  const handleInputChange = (
    section: 'personalInfo' | 'contactInfo' | 'educationInfo',
    field: string,
    value: string
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };

  const handleSubmit = () => {
    // Update the profile with the form data
    onUpdateProfile({
      personalInfo: {
        ...formData.personalInfo,
        ...formData.contactInfo,
        ...formData.educationInfo,
      },
      name: `${formData.personalInfo.firstName} ${formData.personalInfo.lastName}`.trim()
    });
    
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile details have been successfully updated.",
    });
  };

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Personal Information</h2>
          <p className="text-sm text-muted-foreground">Update your personal details and preferences</p>
        </div>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>
      
      {isEditing ? (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <CardDescription>Update your basic information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={formData.personalInfo.firstName} 
                    onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={formData.personalInfo.lastName} 
                    onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input 
                  id="dob" 
                  type="date" 
                  value={formData.personalInfo.dob} 
                  onChange={(e) => handleInputChange('personalInfo', 'dob', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup 
                  value={formData.personalInfo.gender} 
                  onValueChange={(value) => handleInputChange('personalInfo', 'gender', value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Select 
                  value={formData.personalInfo.occupation} 
                  onValueChange={(value) => handleInputChange('personalInfo', 'occupation', value)}
                >
                  <SelectTrigger id="occupation">
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student">Student</SelectItem>
                    <SelectItem value="Teacher">Teacher</SelectItem>
                    <SelectItem value="Professional">Working Professional</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>How can we reach you?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={formData.contactInfo.email} 
                    readOnly 
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-xs text-muted-foreground">Contact support to change your email</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={formData.contactInfo.phoneNumber} 
                    onChange={(e) => handleInputChange('contactInfo', 'phoneNumber', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    value={formData.contactInfo.city} 
                    onChange={(e) => handleInputChange('contactInfo', 'city', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input 
                    id="state" 
                    value={formData.contactInfo.state} 
                    onChange={(e) => handleInputChange('contactInfo', 'state', e.target.value)} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Education Details</CardTitle>
              <CardDescription>Tell us about your educational background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="school">School/Institution</Label>
                <Input 
                  id="school" 
                  value={formData.educationInfo.school} 
                  onChange={(e) => handleInputChange('educationInfo', 'school', e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Class</Label>
                  <Input 
                    id="grade" 
                    value={formData.educationInfo.grade} 
                    onChange={(e) => handleInputChange('educationInfo', 'grade', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="board">Education Board</Label>
                  <Select 
                    value={formData.educationInfo.board} 
                    onValueChange={(value) => handleInputChange('educationInfo', 'board', value)}
                  >
                    <SelectTrigger id="board">
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CBSE">CBSE</SelectItem>
                      <SelectItem value="ICSE">ICSE</SelectItem>
                      <SelectItem value="State">State Board</SelectItem>
                      <SelectItem value="IB">International Baccalaureate</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>Save Changes</Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</dt>
                    <dd>{userProfile.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
                    <dd>{userProfile.email}</dd>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Gender</dt>
                    <dd>{userProfile.personalInfo?.gender || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</dt>
                    <dd>{userProfile.personalInfo?.dob || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Occupation</dt>
                    <dd>{userProfile.personalInfo?.occupation || 'Student'}</dd>
                  </div>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone Number</dt>
                    <dd>{userProfile.personalInfo?.phoneNumber || userProfile.phoneNumber || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                    <dd>
                      {[
                        userProfile.personalInfo?.city, 
                        userProfile.personalInfo?.state
                      ].filter(Boolean).join(', ') || userProfile.location || 'Not specified'}
                    </dd>
                  </div>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Education Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">School/Institution</dt>
                    <dd>{userProfile.personalInfo?.school || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Grade/Class</dt>
                    <dd>{userProfile.personalInfo?.grade || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Education Board</dt>
                    <dd>{userProfile.personalInfo?.board || 'Not specified'}</dd>
                  </div>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProfileDetailsSection;
