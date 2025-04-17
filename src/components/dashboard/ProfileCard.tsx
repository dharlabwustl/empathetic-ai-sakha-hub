import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { UserProfileType } from "@/types/user";
import { StudentAvatar } from "./student/avatar/StudentAvatar";

interface ProfileCardProps {
  profile: UserProfileType;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const timeSinceJoin = profile.joinDate
    ? formatDistanceToNow(new Date(profile.joinDate), { addSuffix: true })
    : "Recently";

  return (
    <Card className="p-6">
      <div className="flex items-start space-x-4">
        <StudentAvatar 
          userProfile={profile} 
          currentMood={profile.currentMood}
          size="lg"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{profile.name}</h2>
          <p className="text-sm text-gray-500">{profile.email}</p>
          <div className="mt-2">
            <Badge variant="secondary">
              {profile.role}
            </Badge>
          </div>
          <p className="mt-3 text-sm">
            Joined {timeSinceJoin}
          </p>
        </div>
      </div>
    </Card>
  );
}
