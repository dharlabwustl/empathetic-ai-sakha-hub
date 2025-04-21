
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserProfileType } from '@/types/user/base';
import ProfileBillingSection from './ProfileBillingSection';
import ProfileDetailsSection from './ProfileDetailsSection';
import BatchManagementSection from './BatchManagementSection';

interface SettingsTabContentProps {
  userProfile?: UserProfileType;
}

const SettingsTabContent: React.FC<SettingsTabContentProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState("profile");
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            Manage your account details, subscription and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="profile">Profile Details</TabsTrigger>
              <TabsTrigger value="billing">Billing & Plan</TabsTrigger>
              <TabsTrigger value="batch">Study Batch</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-4">
              <ProfileDetailsSection userProfile={userProfile} />
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-4">
              <ProfileBillingSection 
                subscriptionId={userProfile?.subscription?.id}
                planName={userProfile?.subscription?.plan}
                currentPeriodEnd={userProfile?.subscription?.expiresAt}
              />
            </TabsContent>
            
            <TabsContent value="batch" className="space-y-4">
              <BatchManagementSection
                isLeader={userProfile?.isGroupLeader}
                batchName={userProfile?.batchName}
                batchCode={userProfile?.batchCode}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTabContent;
