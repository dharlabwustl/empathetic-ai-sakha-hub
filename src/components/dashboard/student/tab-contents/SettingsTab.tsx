
import React from 'react';
import { UserProfileType } from "@/types/user/base";
import SettingsTabContent from '../SettingsTabContent';

interface SettingsTabProps {
  userProfile: UserProfileType;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ userProfile }) => {
  return <SettingsTabContent userProfile={userProfile} />;
};

export default SettingsTab;
