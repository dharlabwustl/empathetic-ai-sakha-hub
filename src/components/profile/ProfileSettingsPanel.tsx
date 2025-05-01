
import React, { useState } from "react";
import { UserProfileBase } from "@/types/user/base";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Shield, Key, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

interface ProfileSettingsPanelProps {
  userProfile: UserProfileBase | null;
}

const ProfileSettingsPanel: React.FC<ProfileSettingsPanelProps> = ({ userProfile }) => {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  });
  
  const handlePasswordChange = (data: any) => {
    // In a real app, this would call an API to update the password
    console.log("Password change data:", data);
    
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "Error",
        description: "New password and confirmation do not match",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate successful password change
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully.",
    });
    
    // Reset form
    form.reset();
  };
  
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
      
      {/* Password Change Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Key className="h-5 w-5 mr-2 text-muted-foreground" />
            Password Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handlePasswordChange)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPassword ? "text" : "password"}
                  {...form.register("currentPassword")}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  {...form.register("newPassword")}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                type="password"
                {...form.register("confirmPassword")}
              />
            </div>
            
            <Button type="submit">Update Password</Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Privacy Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Shield className="h-5 w-5 mr-2 text-muted-foreground" />
            Privacy Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Share Learning Activity</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Allow others to see your study progress and achievements
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Receive email updates about your learning progress
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Recommendation Data</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Allow us to use your learning data for personalized recommendations
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Profile Visibility</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Make your profile visible to other students in your batch
                </p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettingsPanel;
