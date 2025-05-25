
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Settings, User } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface TopNavigationControlsProps {
  user: User;
  onNotificationClick: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
}

const TopNavigationControls: React.FC<TopNavigationControlsProps> = ({
  user,
  onNotificationClick,
  onSettingsClick,
  onProfileClick
}) => {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="sm" onClick={onNotificationClick}>
        <Bell className="h-4 w-4" />
      </Button>
      
      <Button variant="ghost" size="sm" onClick={onSettingsClick}>
        <Settings className="h-4 w-4" />
      </Button>
      
      <Button variant="ghost" size="sm" onClick={onProfileClick}>
        <User className="h-4 w-4" />
        <span className="ml-2">{user.name}</span>
      </Button>
    </div>
  );
};

export default TopNavigationControls;
