
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileType } from "@/types/user";
import ProfileImageUpload from "./ProfileImageUpload";
import BatchManagement from "./BatchManagement";
import SubscriptionDetails from "./SubscriptionDetails";
import { useLocation, useNavigate } from 'react-router-dom';
import VoiceSettingsTab from "./VoiceSettingsTab";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  userProfile,
  onUpdateProfile,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabFromQuery = queryParams.get("tab");
  
  // Set default tab or use query param
  const [activeTab, setActiveTab] = useState<string>(
    tabFromQuery || "personal"
  );

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL with the new tab without reloading the page
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", value);
    navigate(`${location.pathname}?tab=${value}`, { replace: true });
  };

  // Update active tab when query param changes
  useEffect(() => {
    if (tabFromQuery && tabFromQuery !== activeTab) {
      setActiveTab(tabFromQuery);
    }
  }, [tabFromQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Profile Image */}
        <div className="w-full md:w-1/3">
          <ProfileImageUpload
            currentImage={userProfile.avatar}
            onUpdate={(imageUrl) => onUpdateProfile({ avatar: imageUrl })}
          />
        </div>

        {/* Profile Information */}
        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="batch">Batch</TabsTrigger>
              <TabsTrigger value="subscription">Subscription</TabsTrigger>
              <TabsTrigger value="voice">Voice</TabsTrigger>
            </TabsList>
            <TabsContent value="personal" className="pt-4">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <div className="text-md">{userProfile.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <div className="text-md">{userProfile.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone
                  </label>
                  <div className="text-md">
                    {userProfile.phoneNumber || "Not provided"}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Current Goal
                  </label>
                  <div className="text-md">
                    {userProfile.goals?.length ? userProfile.goals[0].title : "No goal set"}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="batch" className="pt-4">
              <BatchManagement userProfile={userProfile} />
            </TabsContent>
            <TabsContent value="subscription" className="pt-4">
              <SubscriptionDetails userProfile={userProfile} />
            </TabsContent>
            <TabsContent value="voice" className="pt-4">
              <VoiceSettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
