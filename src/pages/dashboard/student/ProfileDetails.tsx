
import React, { useState } from "react";
import { UserProfileType } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Book, 
  CalendarDays, 
  GraduationCap 
} from "lucide-react";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSave = (updatedProfile: Partial<UserProfileType>) => {
    onUpdateProfile(updatedProfile);
    setIsEditing(false);
    
    toast({
      title: "Profile updated",
      description: "Your profile details have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-8">
          {isEditing ? (
            <EditForm 
              userProfile={userProfile}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ViewProfile 
              userProfile={userProfile}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

const EditForm: React.FC<{
  userProfile: UserProfileType;
  onSave: (updates: Partial<UserProfileType>) => void;
  onCancel: () => void;
}> = ({ userProfile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: userProfile.name || "",
    bio: userProfile.bio || "",
    email: userProfile.email || "",
    phoneNumber: userProfile.phoneNumber || "",
    examPreparation: userProfile.examPreparation || "",
    education: {
      level: userProfile.education?.level || "",
      institution: userProfile.education?.institution || "",
      graduationYear: userProfile.education?.graduationYear || undefined
    },
    address: {
      street: userProfile.address?.street || "",
      city: userProfile.address?.city || "",
      state: userProfile.address?.state || "",
      zipCode: userProfile.address?.zipCode || ""
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="examPreparation">Exam Preparation</Label>
          <Input
            id="examPreparation"
            name="examPreparation"
            value={formData.examPreparation}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="education.level">Education Level</Label>
            <Input
              id="education.level"
              name="education.level"
              value={formData.education.level}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education.institution">Institution</Label>
            <Input
              id="education.institution"
              name="education.institution"
              value={formData.education.institution}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education.graduationYear">Graduation Year</Label>
            <Input
              id="education.graduationYear"
              name="education.graduationYear"
              type="number"
              value={formData.education.graduationYear || ""}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address.street">Street Address</Label>
            <Input
              id="address.street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address.city">City</Label>
            <Input
              id="address.city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address.state">State</Label>
            <Input
              id="address.state"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address.zipCode">ZIP Code</Label>
            <Input
              id="address.zipCode"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

const ViewProfile: React.FC<{
  userProfile: UserProfileType;
  onEdit: () => void;
}> = ({ userProfile, onEdit }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile Details</h2>
        <Button onClick={onEdit}>
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoSection 
          icon={<User className="h-5 w-5" />}
          label="Full Name"
          value={userProfile.name}
        />
        
        <InfoSection 
          icon={<Mail className="h-5 w-5" />}
          label="Email"
          value={userProfile.email}
        />
        
        <InfoSection 
          icon={<Phone className="h-5 w-5" />}
          label="Phone"
          value={userProfile.phoneNumber}
        />
        
        <InfoSection 
          icon={<Book className="h-5 w-5" />}
          label="Exam Preparation"
          value={userProfile.examPreparation}
        />
        
        <InfoSection 
          icon={<CalendarDays className="h-5 w-5" />}
          label="Member Since"
          value={userProfile.joinDate ? new Date(userProfile.joinDate).toLocaleDateString() : "N/A"}
        />
      </div>

      {userProfile.bio && (
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Bio</h3>
          <p className="text-gray-700 dark:text-gray-300">{userProfile.bio}</p>
        </div>
      )}

      {userProfile.education && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoSection 
              icon={<GraduationCap className="h-5 w-5" />}
              label="Level"
              value={userProfile.education.level}
            />
            
            <InfoSection 
              icon={<Book className="h-5 w-5" />}
              label="Institution"
              value={userProfile.education.institution}
            />
            
            <InfoSection 
              icon={<CalendarDays className="h-5 w-5" />}
              label="Graduation Year"
              value={userProfile.education.graduationYear?.toString()}
            />
          </div>
        </div>
      )}

      {userProfile.address && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <InfoSection 
                icon={<MapPin className="h-5 w-5" />}
                label="Street Address"
                value={userProfile.address.street}
              />
            </div>
            
            <InfoSection 
              icon={<MapPin className="h-5 w-5" />}
              label="City"
              value={userProfile.address.city}
            />
            
            <InfoSection 
              icon={<MapPin className="h-5 w-5" />}
              label="State"
              value={userProfile.address.state}
            />
            
            <InfoSection 
              icon={<MapPin className="h-5 w-5" />}
              label="ZIP Code"
              value={userProfile.address.zipCode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const InfoSection: React.FC<{
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}> = ({ icon, label, value }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-1 text-gray-500">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value || "Not provided"}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
